# HackArena

HackArena is an ethical cybersecurity challenge platform starter for a web app, mobile app, and backend API. It is designed for a CTF-style learning experience with a challenge feed, leaderboard, and admin-ready structure.

## Stack

- Web: Next.js + TypeScript + Tailwind CSS
- Mobile: Expo + React Native + TypeScript
- API: Fastify + TypeScript
- Database: PostgreSQL / Supabase
- Auth: Supabase Auth (ready for integration)

## Project structure

- `apps/web` — Next.js application
- `apps/mobile` — Expo mobile app
- `apps/api` — Fastify backend API
- `database/schema.sql` — PostgreSQL schema for users, challenges, submissions, and leaderboard
- `.env.example` — environment variable template

## Getting started

1. Install dependencies:

   npm install

2. Copy environment file:

   cp .env.example .env

3. Start the API:

   npm run dev:api

4. Start the web app:

   npm run dev:web

5. Start the mobile app:

   npm run dev:mobile

## Default admin credentials

The starter does not implement a user database yet. You can plug in Supabase Auth and protect the admin routes in the API and web app.

## Important notes

- This repository is a starter and not a production security system.
- The challenge validation logic is intentionally simple for demonstration purposes.
- Use this for legal and ethical training scenarios only.

## License

MIT
