# markdown_demo

Dockerized scaffold project for Operations Analytics.

## Run with Docker

Build and start services:

```bash
docker compose up --build -d
```

Stop services:

```bash
docker compose down
```

## Services

- Backend: http://localhost:4000
- Backend health check: http://localhost:4000/health
- PostgreSQL: localhost:5432

## Run tests (Docker)

Run all backend tests:

```bash
docker compose exec backend npm test
```

Run one test file:

```bash
docker compose exec backend node --test tests/unit/operationsAnalyticsService.unit.test.js
```

## Notes

- This repository is scaffold-first: many tests are `test.todo` and one AC5 unit test intentionally fails for TDD until service logic is implemented.
