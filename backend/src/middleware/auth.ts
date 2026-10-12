import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const signToken = (payload: { id: string; email: string; role: string }) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return next({ status: 401, message: 'Authentication required.' });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return next({ status: 401, message: 'User not found.' });
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch {
    next({ status: 401, message: 'Invalid or expired token.' });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next({ status: 403, message: 'Forbidden: insufficient permissions.' });
    }
    next();
  };
};
