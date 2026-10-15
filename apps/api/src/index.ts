import Fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';
import { challengeRoutes } from './routes/challenges';

const server = Fastify({ logger: true });

await server.register(cors, { origin: true });

// core health
server.get('/health', async () => ({ status: 'ok', service: 'hackarena-api' }));

// register challenge and admin routes
await challengeRoutes(server);

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
