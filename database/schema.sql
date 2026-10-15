CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category_id INT REFERENCES categories(id),
  difficulty TEXT NOT NULL DEFAULT 'Easy',
  points INT NOT NULL DEFAULT 100,
  flag TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  challenge_id UUID REFERENCES challenges(id),
  submitted_flag TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  total_points INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO categories (name, description) VALUES
  ('Web', 'Frontend, backend, and access-control challenges'),
  ('Crypto', 'Encryption, hashing, and cryptanalysis labs'),
  ('Forensics', 'Artifact analysis and packet investigation'),
  ('Reverse Engineering', 'Binary analysis and disassembly tasks');

INSERT INTO challenges (title, slug, description, category_id, difficulty, points, flag)
VALUES
  ('Password Reset Puzzle', 'password-reset-puzzle', 'Investigate a suspicious password reset flow.', 1, 'Easy', 100, 'HACKARENA{reset_flow}'),
  ('Shift Cipher', 'shift-cipher', 'Decrypt a Caesar-style message using common patterns.', 2, 'Medium', 200, 'HACKARENA{rot13_solved}'),
  ('Packet Whisper', 'packet-whisper', 'Trace a suspicious packet sequence from a PCAP.', 3, 'Hard', 300, 'HACKARENA{packet_trace}');
