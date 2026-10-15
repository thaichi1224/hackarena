import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import 'dotenv/config';

const server = Fastify({ logger: true });

const challenges = [
  {
    id: 'web-001',
    title: 'Password Reset Puzzle',
    category: 'Web',
    difficulty: 'Easy',
    points: 100,
    flag: 'HACKARENA{reset_flow}',
  },
  {
    id: 'crypto-001',
    title: 'Shift Cipher',
    category: 'Crypto',
    difficulty: 'Medium',
    points: 200,
    flag: 'HACKARENA{rot13_solved}',
  },
  {
    id: 'forensics-001',
    title: 'Packet Whisper',
    category: 'Forensics',
    difficulty: 'Hard',
    points: 300,
    flag: 'HACKARENA{packet_trace}',
  },
];

const scoreboard = [
  { name: 'Ada', score: 980 },
  { name: 'Liam', score: 860 },
  { name: 'Nora', score: 760 },
];

await server.register(cors, { origin: true });

server.get('/health', async () => ({ status: 'ok', service: 'hackarena-api' }));

server.get('/challenges', async () => ({ challenges }));

server.get('/scoreboard', async () => ({ leaderboard: scoreboard }));

server.post('/submit', async (request, reply) => {
  const schema = z.object({
    challengeId: z.string(),
    flag: z.string().min(1),
  });

  const parsed = schema.safeParse(request.body);

  if (!parsed.success) {
    return reply.code(400).send({ error: 'Invalid submission payload', issues: parsed.error.flatten() });
  }

  const { challengeId, flag } = parsed.data;
  const challenge = challenges.find((item) => item.id === challengeId);

  if (!challenge) {
    return reply.code(404).send({ error: 'Challenge not found' });
  }

  const correct = flag === challenge.flag;

  return {
    correct,
    message: correct ? 'Flag accepted' : 'Incorrect flag',
    challengeId,
  };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT || 4000);
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`API listening on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
