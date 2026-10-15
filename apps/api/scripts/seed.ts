#!/usr/bin/env node
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment');
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  console.log('Seeding categories and challenges...');

  const categories = [
    { name: 'Web', description: 'Frontend and backend challenges' },
    { name: 'Crypto', description: 'Cryptography puzzles' },
    { name: 'Forensics', description: 'Investigations and PCAPs' },
    { name: 'Reverse Engineering', description: 'Binary analysis' },
  ];

  for (const cat of categories) {
    await supabase.from('categories').upsert(cat, { onConflict: 'name' });
  }

  const { data: cats } = await supabase.from('categories').select('*');
  const catMap: Record<string, number> = {};
  cats?.forEach((c: any) => (catMap[c.name] = c.id));

  const challenges = [
    { title: 'Password Reset Puzzle', slug: 'password-reset-puzzle', description: 'Investigate a suspicious password reset flow.', category_id: catMap['Web'], difficulty: 'Easy', points: 100, flag: 'HACKARENA{reset_flow}' },
    { title: 'Shift Cipher', slug: 'shift-cipher', description: 'Decrypt a Caesar-style message using common patterns.', category_id: catMap['Crypto'], difficulty: 'Medium', points: 200, flag: 'HACKARENA{rot13_solved}' },
    { title: 'Packet Whisper', slug: 'packet-whisper', description: 'Trace a suspicious packet sequence from a PCAP.', category_id: catMap['Forensics'], difficulty: 'Hard', points: 300, flag: 'HACKARENA{packet_trace}' },
  ];

  for (const c of challenges) {
    await supabase.from('challenges').upsert(c, { onConflict: 'slug' });
  }

  console.log('Seeding complete');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
