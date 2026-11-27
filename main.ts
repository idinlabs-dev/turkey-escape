// Turkey Escape — entry point (make.fun)
// Authored in-session for the make.fun resubmission, 27 Nov 2026.
// Serves the offline game (index.html) over HTTP with zero dependencies.
// Run: npx tsx main.ts  |  node --experimental-strip-types main.ts
// Then open http://localhost:8080 in a desktop browser.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT ?? 8080);

createServer(async (req, res) => {
  try {
    const file = await readFile(join(root, "index.html"));
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(file);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, () => {
  console.log(`Turkey Escape running at http://localhost:${port}`);
});
