import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use(
    '/api/auth',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 20,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'hotel-management-system-api' });
  });

  app.use('/api', routes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
