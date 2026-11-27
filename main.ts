// Turkey Escape — make.fun entrypoint (Node 22, standard library only).
// Default run hands the game in, exactly as the kit requires: it copies
// game/ (or the root index.html, for this repo's layout) and screenshots/
// to /output (MAKEFUN_OUTPUT_DIR outside the grader) and writes
// /output/dossier.json with buildDossier from vendor/makefun-game.ts,
// then exits. It never listens, so the grader's 10 s budget is plenty.
//   node main.ts
//   MAKEFUN_OUTPUT_DIR=out node main.ts
// Local play only: --serve starts the dev server instead and keeps running.
//   node main.ts --serve
// Then open http://localhost:8080 in a desktop browser.
import { createServer } from "node:http";
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
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

// Hand the game in: copy game/ and screenshots/ to the output directory
// and write dossier.json with the kit's buildDossier, then exit.
// The kit's layout is game/index.html + screenshots/ + vendor/; this repo
// keeps the game as a root index.html, so that file is handed in as
// game/index.html. vendor/makefun-game.ts must be the kit's copy, unchanged.
async function handIn(): Promise<void> {
  const { buildDossier } = await import("./vendor/makefun-game.ts");
  const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(out, { recursive: true });
  const gameDir = join(here, "game");
  if (existsSync(gameDir)) {
    cpSync(gameDir, join(out, "game"), { recursive: true });
  } else if (existsSync(join(here, "index.html"))) {
    mkdirSync(join(out, "game"), { recursive: true });
    cpSync(join(here, "index.html"), join(out, "game", "index.html"));
  } else {
    throw new Error("no game/ directory and no root index.html to hand in");
  }
  const shotsDir = join(here, "screenshots");
  if (existsSync(shotsDir)) {
    cpSync(shotsDir, join(out, "screenshots"), { recursive: true });
  }
  writeFileSync(
    join(out, "dossier.json"),
    buildDossier(out, {
      text_max_bytes: 163840,
      screenshots: { max: 4, max_bytes: 262144 },
      game_max_files: 993,
      game_max_bytes: 50331648,
      game_path_max_bytes: 1000,
    }),
  );
  console.log(`Turkey Escape handed in to ${out}`);
}

const serve = process.argv.includes("--serve") || process.env.SERVE === "1";
if (serve) {
  server.listen(port, () => {
    console.log(`Turkey Escape running at http://localhost:${port}`);
  });
} else {
  handIn().catch((err: unknown) => {
    console.error(`Turkey Escape hand-in failed: ${(err as Error).message}`);
    console.error("Fix: copy vendor/makefun-game.ts unchanged from the kit,");
    console.error("put the game under game/ (or a root index.html), and add");
    console.error("3 or 4 screenshots/ renders of the game, then run again.");
    process.exitCode = 1;
  });
}
