# Hotel Management System

A complete hotel management system with a React + Vite frontend, Node.js + Express backend, Prisma + PostgreSQL database, JWT authentication and role-based access control.

## Stack
- Frontend: React, Vite, TypeScript, Tailwind CSS, Recharts, Lucide React
- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL
- Auth: JWT + bcrypt + RBAC
- Testing: Vitest + Supertest

## Repository structure
- `frontend/` - Customer/admin frontend experience
- `backend/` - REST API, business logic, Prisma schema, tests
- `docker-compose.yml` - Local PostgreSQL development setup

## Quick start

### 1. Clone and install
```bash
npm install --workspaces
```

### 2. Start PostgreSQL
```bash
docker compose up -d postgres
```

### 3. Configure environment
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 4. Initialize database
```bash
npm run prisma:generate --workspace backend
npm run prisma:migrate --workspace backend
npm run seed --workspace backend
```

### 5. Run the app
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Demo admin
- Email: `admin@hotel.local`
- Password: `Secret123!`

## Main features
- Admin dashboard with revenue and occupancy analytics
- Room management, search/filtering and status tracking
- Guest profile management
- Reservation lifecycle: create, assign, check-in/check-out, cancel
- Billing and invoice generation
- Housekeeping and maintenance tracking
- Role-based auth and audit logging
- Reports with date-range filters

## Scripts

Root workspace scripts:
```bash
npm run dev
npm run build
npm run test
```

Backend scripts:
```bash
npm run dev
npm run build
npm run test
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
npm run seed
```

Frontend scripts:
```bash
npm run dev
npm run build
npm run lint
```

## Notes
- Card numbers, CVVs and payment secrets are never stored.
- All calculations for totals and balances are processed on the backend.
- The project is structured for extension into multi-property deployments.
