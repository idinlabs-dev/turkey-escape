# Turkey Escape — Build Transcript (AI session log for make.fun submission)

Bounty: make.fun `turkey-run-game-01` — "Make the best turkey escape game" ($250 total, 1st $50, 20 paid spots).
Account: @idin-keren (idinkeren01@gmail.com). Round 1 closes 27 Nov 2026 21:00 (brief time).
Built: 27 Nov 2026, fresh in one session, by the AI agent Reni working for Idin Iskandar.

## What was built

A complete, original, playable HTML5 game in a single self-contained file — no external assets, no network, no copied art. This is a fresh rebuild, written from the bounty spec in this session.

Files in `~/workspace/makefun-turkey-v2/`:
- `index.html` — the whole game: title screen, HUD, gameplay, pause, game-over and win screens, Canvas vector art, WebAudio synth sounds, keyboard + mouse input.
- `main.ts` — zero-dependency Node HTTP server for `index.html` (port 8080).
- `README.md` — how to play, controls, tech notes.
- `TRANSCRIPT.md` — this build log.
- `.makefun/owner.json` — proves the repo belongs to the agent wallet.
- `LICENSE` — MIT.

## Design decisions (in order)

1. Read the bounty spec first: single-page game, `index.html` at repo root, offline, Node 22 + browser grading, title screen with controls + START, HUD (score / lives / distance), 3 lanes, jump/duck obstacles, farmer chase, difficulty ramp, 1500m win, pause / game-over / restart, original art, screenshot-friendly.
2. Chose vanilla JS + Canvas 2D in one file — zero dependencies, so it cannot fail on a missing CDN in the grading sandbox.
3. Lanes: 3 horizontal lanes (y = 180 / 292 / 404). Left/Right (or A/D) switches lane; Space/W jumps, S/Down ducks. P pause, R restart, M mute, click/tap jumps. This matches the spec's control list exactly.
4. Obstacles: fence + oven = must jump (collision only counts if the turkey is low); net = must duck (collision only counts if not ducking). Corn pickups give +25 and a coin sound.
5. Farmer: drawn behind the turkey, bobs while running, lunges closer on every hit, slowly falls back on clean running. 3 hits = game over.
6. Difficulty: speed 250 → up to 480 px/s and spawn interval 1.25s → 0.55s as distance grows. Score = distance × 2 + corn × 25 + 5 per obstacle cleared.
7. Visuals for the AI judge's screenshots: bright autumn gradient sky, sun, drifting clouds, two parallax tree layers, falling leaves, a "FOREST AHEAD!" glow in the last 350m, big readable title card, squash-and-stretch, particles and screen shake on hits.
8. Audio: all original WebAudio synth — jump sweep, two-note coin, noise-burst crash, gobble, win arpeggio, and a looping 8-note melody. Mute toggle (M + on-screen button).
9. Verification before handing over: JS syntax check, no-external-URL grep, feature grep, and a headless runtime smoke test (see below). A second edit round tuned the game after the first smoke test.

## Verification performed

- Extracted the game script and ran `node --check` — syntax OK.
- Grepped `index.html` for `http://`, `https://`, `src=` — no external URLs in the game code (only the make.fun badges in README.md).
- Headless runtime smoke test (stubbed DOM/Canvas in Node): title screen rendered, reset started play, hundreds of frames of gameplay with jump + lane switches ran with no errors, and the win path was reached when the win distance was shortened.
- Second-round edits after the smoke test: difficulty and spawn tuning plus a server hardening fix (see the edit round in the session).

## Known gaps

- No screenshot could be taken in this sandbox (no headless Chromium installed). The game was verified by syntax + feature checks, not by a pixel screenshot. It should be opened once in a real desktop browser before submitting to confirm the title screen renders as intended.
- Best score uses `localStorage`, guarded with try/catch so it still runs in sandboxed/file:// contexts where storage is blocked.
