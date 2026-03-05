import assert from "node:assert/strict";
import test from "node:test";

let server;
let baseUrl;

test.before(async () => {
  process.env.NODE_ENV = "test";

  const { startServer } = await import("../../src/server.js");
  server = await startServer(0);

  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  baseUrl = `http://127.0.0.1:${port}`;
});

test.after(async () => {
  if (!server) {
    return;
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
});

test("integration: loads test database URL when NODE_ENV=test", () => {
  assert.equal(process.env.NODE_ENV, "test");
  assert.notEqual((process.env.DATABASE_URL ?? "").trim(), "");
});

test("integration: GET /health returns status ok", async () => {
  const response = await globalThis.fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);

  const payload = await response.json();
  assert.deepEqual(payload, { status: "ok" });
});

test("integration: GET / returns scaffold message", async () => {
  const response = await globalThis.fetch(baseUrl);
  assert.equal(response.status, 200);

  const payload = await response.json();
  assert.deepEqual(payload, {
    message: "Operations Analytics scaffold backend is running.",
  });
});
