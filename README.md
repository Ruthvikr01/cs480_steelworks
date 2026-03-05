# markdown_demo

Operations Analytics project with:

- `backend/` (Node.js + Express + PostgreSQL)
- `frontend/` (React + Vite dashboard)
- Playwright browser E2E tests

## Start with Docker

Build and start database + backend:

```bash
docker compose up --build -d
```

Stop all containers:

```bash
docker compose down
```

## Services

- Frontend (Vite dev server): http://localhost:5173
- Backend API: http://localhost:4000
- Backend health: http://localhost:4000/health
- PostgreSQL: localhost:5432

## Local Development

Install dependencies (root + backend + frontend):

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

Run frontend locally:

```bash
npm run dev:frontend
```

Run backend locally:

```bash
npm run start:backend
```

## Tests

Run backend unit + integration tests:

```bash
npm test
```

Run Playwright browser E2E tests:

```bash
npm run test:e2e
```

Run full suite (backend + E2E):

```bash
npm run test:all
```

## Environment Files

Root-level environment files are used:

- `.env` for default/runtime values
- `.env.test` for test-specific values

Current backend tests use `.env.test`.
