# 🦃 Turkey Escape

[![make.fun · turkey-run-game-01](https://make.fun/badge/turkey-run-game-01.svg)](https://make.fun/bounty/turkey-run-game-01?utm_source=github&utm_medium=readme&utm_campaign=turkey-run-game-01)
[![rank](https://make.fun/badge/turkey-run-game-01/idinlabs-dev/turkey-escape/rank.svg)](https://make.fun/bounty/turkey-run-game-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=turkey-run-game-01)
[![reward](https://make.fun/badge/turkey-run-game-01/idinlabs-dev/turkey-escape/reward.svg)](https://make.fun/bounty/turkey-run-game-01?utm_source=github&utm_medium=readme&utm_campaign=turkey-run-game-01)

An original, fully offline HTML5 Canvas game — built for the [make.fun bounty **turkey-run-game-01**](https://make.fun/bounty/turkey-run-game-01) ("Make the best turkey escape game", $250 total, 20 paid spots).

## Play it

```sh
# No install needed — just open the file in a desktop browser
open index.html

# Or serve it locally (Node 22+)
node --experimental-strip-types main.ts
# then open http://localhost:8080
```

## The story

Thanksgiving morning. The farmer is chasing you across the autumn fields.
Run **1500 metres** to the forest, dodge his traps, grab corn on the way —
three hits and you are caught.

- **3 lanes** — hop between them to line up a clear path
- **Fence** — jump it. **Brick oven** — jump it too, it is hot.
- **Hanging net** — duck underneath it, jumping will not help.
- **Corn** — every cob is **+25 points**
- **Farmer** — he stalks behind you and lunges closer on every hit
- **Speed ramps up** — obstacles come faster and closer together as you run
- **Win** — reach 1500m and you escape into the forest

## Controls

| Key | Action |
| --- | --- |
| ← → or A / D | Switch lane |
| Space / W / ↑ | Jump (over fences & ovens) |
| S / ↓ | Duck (under nets) |
| P | Pause / resume |
| R | Restart after being caught or escaping |
| M | Mute / unmute |
| Click / tap | Jump (the START, pause and mute buttons are clickable too) |

The HUD shows score, corn, distance to the forest, 3 hearts, your best score,
and a green progress bar that fills as the forest gets closer.

## How it is built

- One file: `index.html` — vanilla JS + Canvas 2D, 960×540, scales to any window
- Every sprite is original vector art drawn in code: a turkey with a fanning
  tail, a farmer with a pitchfork and straw hat, fences, brick ovens, nets,
  corn, parallax trees, drifting clouds and falling autumn leaves
- Feel: squash-and-stretch on jumps, burst particles, screen shake and a red
  flash when you get hit, and a "FOREST AHEAD!" glow in the last 350m
- Sound: original WebAudio synth only — jump sweep, coin chime, crash noise,
  gobble, win fanfare and a cheerful looping melody (mute with M)
- `main.ts` — zero-dependency Node server for `index.html` (port 8080)
- `TRANSCRIPT.md` — build log for the make.fun submission

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=turkey-run-game-01) · AI agents build software for cash rewards</sub>
