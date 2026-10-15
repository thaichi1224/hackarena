import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { supabaseAdmin } from '../lib/supabaseServer';

const ADMIN_HEADER = 'x-admin-secret';

export async function challengeRoutes(server: FastifyInstance) {
  server.get('/challenges', async () => {
    const { data, error } = await supabaseAdmin
      .from('challenges')
      .select('id, title, slug, description, difficulty, points, category_id')
      .eq('is_active', true)
      .order('points', { ascending: false });

    if (error) {
      server.log.error(error);
      return { challenges: [] };
    }

    return { challenges: data };
  });

  server.get('/challenges/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const { data, error } = await supabaseAdmin
      .from('challenges')
      .select('id, title, slug, description, difficulty, points, category_id')
      .eq('slug', slug)
      .limit(1)
      .single();

    if (error) return reply.code(404).send({ error: 'Challenge not found' });
    return data;
  });

  server.post('/submit', async (request, reply) => {
    const bodySchema = z.object({ challengeSlug: z.string(), flag: z.string() });
    const parsed = bodySchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'Invalid payload' });

    const { challengeSlug, flag } = parsed.data;

    const { data: challenge, error } = await supabaseAdmin
      .from('challenges')
      .select('id, flag, points')
      .eq('slug', challengeSlug)
      .limit(1)
      .maybeSingle();

    if (error || !challenge) return reply.code(404).send({ error: 'Challenge not found' });

    const correct = flag.trim() === challenge.flag;

    // If correct, insert submission and update scores table
    try {
      await supabaseAdmin.from('submissions').insert([{ challenge_id: challenge.id, submitted_flag: flag, is_correct: correct }]);

      if (correct) {
        // Upsert scores: add points to anonymous score entry for now
        // In a full app, you would use the authenticated user id
        const { data: scores } = await supabaseAdmin
          .from('scores')
          .select('*')
          .limit(1);

        if (scores && scores.length === 0) {
          await supabaseAdmin.from('scores').insert([{ total_points: challenge.points }]);
        } else {
          const row = scores[0];
          await supabaseAdmin.from('scores').update({ total_points: row.total_points + challenge.points }).eq('id', row.id);
        }
      }
    } catch (err) {
      server.log.error(err);
    }

    return { correct, message: correct ? 'Flag accepted' : 'Incorrect flag' };
  });

  // Admin CRUD (protected by ADMIN_HEADER)
  server.get('/admin/challenges', async (request, reply) => {
    const adminSecret = String(request.headers[ADMIN_HEADER] || '');
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) return reply.code(401).send({ error: 'Unauthorized' });

    const { data, error } = await supabaseAdmin.from('challenges').select('*').order('created_at', { ascending: false });
    if (error) return reply.code(500).send({ error: 'DB error' });
    return { challenges: data };
  });

  server.post('/admin/challenges', async (request, reply) => {
    const adminSecret = String(request.headers[ADMIN_HEADER] || '');
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) return reply.code(401).send({ error: 'Unauthorized' });

    const schema = z.object({ title: z.string(), slug: z.string(), description: z.string().optional(), difficulty: z.string(), points: z.number(), category_id: z.number().optional(), flag: z.string() });
    const parsed = schema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'Invalid payload', issues: parsed.error.flatten() });

    const payload = parsed.data;
    const { data, error } = await supabaseAdmin.from('challenges').insert([payload]).select().maybeSingle();
    if (error) return reply.code(500).send({ error: 'DB insert failed' });
    return reply.code(201).send({ challenge: data });
  });

  server.put('/admin/challenges/:id', async (request, reply) => {
    const adminSecret = String(request.headers[ADMIN_HEADER] || '');
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) return reply.code(401).send({ error: 'Unauthorized' });

    const { id } = request.params as { id: string };
    const schema = z.object({ title: z.string().optional(), description: z.string().optional(), difficulty: z.string().optional(), points: z.number().optional(), is_active: z.boolean().optional() });
    const parsed = schema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'Invalid payload', issues: parsed.error.flatten() });

    const { data, error } = await supabaseAdmin.from('challenges').update(parsed.data).eq('id', id).select().maybeSingle();
    if (error) return reply.code(500).send({ error: 'DB update failed' });
    return { challenge: data };
  });

  server.delete('/admin/challenges/:id', async (request, reply) => {
    const adminSecret = String(request.headers[ADMIN_HEADER] || '');
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) return reply.code(401).send({ error: 'Unauthorized' });

    const { id } = request.params as { id: string };
    const { error } = await supabaseAdmin.from('challenges').delete().eq('id', id);
    if (error) return reply.code(500).send({ error: 'DB delete failed' });
    return { ok: true };
  });
}
