import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { createApp } from './app.js';
import { env } from './config/env.js';

const prisma = new PrismaClient();

async function startServer() {
  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`Hotel API listening on http://localhost:${env.PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
