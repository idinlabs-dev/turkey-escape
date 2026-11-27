// Turkey Escape — local dev server (make.fun entrypoint)
// Serves index.html over plain HTTP with zero dependencies.
// Usage:
//   node --experimental-strip-types main.ts
//   npx tsx main.ts
// Then open http://localhost:8080 in a desktop browser.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT ?? 8080);

const server = createServer(async (request, response) => {
  if (request.method !== "GET") {
    response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Method not allowed");
    return;
  }
  // Only the game page itself is served; anything else is a 404,
  // so a stray asset path can never leak a directory listing or file.
  const path = new URL(request.url ?? "/", "http://localhost").pathname;
  if (path !== "/" && path !== "/index.html") {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  try {
    const page = await readFile(join(here, "index.html"));
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(page);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`Turkey Escape running at http://localhost:${port}`);
});
