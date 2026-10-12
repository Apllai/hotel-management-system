import type { NextFunction, Request, Response } from 'express';

export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Resource not found.' });
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err?.status || err?.statusCode || 500;
  const message = err?.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
    details: err?.details || null,
  });
};
