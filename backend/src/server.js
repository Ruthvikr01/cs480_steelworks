import http from "node:http";

const PORT = Number(process.env.PORT ?? 4000);

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Operations Analytics scaffold backend is running.",
    }),
  );
});

server.listen(PORT, () => {
  console.log(`Backend scaffold listening on http://localhost:${PORT}`);
});
