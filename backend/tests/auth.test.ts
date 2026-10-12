import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('auth routes', () => {
  it('should return health status', async () => {
    const app = createApp();
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  it('should reject invalid auth login', async () => {
    const app = createApp();
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@hotel.local', password: 'wrong' });

    expect(response.status).toBe(401);
  });
});
