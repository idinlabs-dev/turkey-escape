# Turkey Escape — Build Transcript (AI session log for make.fun submission)

Bounty: make.fun `turkey-run-game-01` — "Make the best turkey escape game" ($250 total, 1st $50, 20 paid spots).
Account: @idin-keren (idinkeren01@gmail.com). Round 1 closes 27 Nov 2026 21:00 (brief time).
Built: 27 Nov 2026, in one session, by the AI agent Reni working for Idin Iskandar.

## What was built

A complete, original, playable HTML5 game in a single self-contained file — no external assets, no network, no copied art.

Files changed/created in `~/workspace/makefun-turkey-escape/`:
- `index.html` (created) — the whole game: title screen, HUD, gameplay, pause, game-over and win screens, Canvas vector art, WebAudio synth sounds, input (keyboard + mouse + touch).
- `README.md` (created) — how to play, controls, tech notes.
- `TRANSCRIPT.md` (created, this file) — build log for the submission.

## Design decisions (in order)

1. Read the bounty spec first: single-page game, `index.html` at repo root, offline, Node 22 + browser grading, title screen with controls + START, HUD (score / lives / distance), 3 lanes, jump/duck obstacles, farmer chase, difficulty ramp, 1500m win, pause / game-over / restart, original art, screenshot-friendly.
2. Chose vanilla JS + Canvas 2D in one file — zero dependencies, so it cannot fail on a missing CDN in the grading sandbox.
3. Lanes: 3 vertical lanes (y = 170 / 285 / 400). Left/Right (or A/D) switches lane; Up also moves up a lane. Space/W jumps, S/Down ducks. P pause, R restart, M mute, click/tap jumps. This matches the spec's control list exactly.
4. Obstacles: fence + oven = must jump (collision only counts if the turkey is low); net = must duck (collision only counts if not ducking). Corn pickups give +25 and a coin sound.
5. Farmer: drawn behind the turkey, bobs while running, lunges 34px closer on every hit, slowly falls back on clean running. 3 hits = game over.
6. Difficulty: speed 260 → up to 480 px/s and spawn interval 1.25s → 0.55s as distance grows. Score = distance × 2 + corn × 25 + 5 per obstacle cleared.
7. Visuals for the AI judge's screenshots: bright autumn gradient sky, sun, drifting clouds, two parallax tree layers, falling leaves, a "FOREST AHEAD!" glow in the last 350m, big readable title card, squash-and-stretch, particles and screen shake on hits.
8. Audio: all original WebAudio synth — jump sweep, two-note coin, noise-burst crash, gobble, win arpeggio, and a 16-note looping melody. Mute toggle (M + on-screen button).
9. Verification (see below) before handing over: JS syntax check, no-external-URL grep, feature grep, and a headless render attempt.

## Verification performed

- `node --check` on the extracted game script — syntax OK (see build log in the submission report).
- Grepped `index.html` for `http://`, `https://`, `src=`, CDN/font/image references — none in the game code.
- Confirmed `index.html` exists at the project root and contains: title screen, START button, HUD (score/lives/distance), 3 lanes, fence/oven/net, corn, farmer chase, difficulty ramp, 1500m win, pause, game over, restart, mute, WebAudio.
- Headless runtime smoke test (stubbed DOM/Canvas in Node): title screen rendered 5 frames, `resetGame()` started play, 600 frames of gameplay with jump + lane switches ran with no errors. A long run (~8000 frames, no dodging) correctly ended in `game over` — hit detection + lives work. A variant with WIN_DIST shortened to 80m correctly reached the `win` state — win path + win screen work.
- Attempted a headless screenshot render; no Chromium/Playwright was available in this sandbox, so no pixel screenshot could be taken — see "Known gaps".

## Known gaps

- No screenshot could be taken in this sandbox (no headless Chromium installed). The game was verified by syntax + feature checks, not by a pixel screenshot. It should be opened once in a real desktop browser before submitting to confirm the title screen renders as intended.
- Best score uses `localStorage`, guarded with try/catch so it still runs in sandboxed/file:// contexts where storage is blocked.
