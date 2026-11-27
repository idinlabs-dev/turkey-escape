# 🦃 Turkey Escape

An original, fully offline HTML5 Canvas game — built for the make.fun bounty **turkey-run-game-01** ("Make the best turkey escape game", $250 total, 20 paid spots).

**Play it:** open `index.html` in any desktop browser. No install, no server, no internet needed — all art is drawn in code and all sound is synthesized with WebAudio. No external CDN, fonts, images or network calls anywhere.

## The game

You are a turkey on Thanksgiving morning. The farmer is chasing you — run 1500m through the autumn fields, dodge his traps, grab corn, and reach the safety of the forest.

- **3 lanes** — switch lanes to dodge what's coming
- **Obstacles:** wooden **fence** (jump it), brick **oven** (jump it), hanging **net** (duck under it)
- **Corn** — collect for +25 points each
- **Farmer** — he chases from behind; every hit costs a life and brings him closer. 3 hits and you're caught.
- **Difficulty ramps** — speed and obstacle density increase with distance
- **Win:** reach **1500m** and you escape to the forest

## Controls

| Key | Action |
| --- | --- |
| ← → or A / D | Switch lane |
| Space / W / ↑ | Jump (over fences & ovens) |
| S / ↓ | Duck (under nets) |
| P | Pause / resume |
| R | Restart |
| M | Mute / unmute |
| Click / tap | Jump (also works on the START / RESTART buttons) |

HUD shows score, corn collected, distance to the forest, 3 hearts (lives), and a forest progress bar. Pause and mute buttons are also clickable in the bottom-right corner.

## Screens

Title screen (how to play + big START button) → gameplay → Pause → Game Over ("CAUGHT!") or Win ("YOU ESCAPED!") with score, corn, lives/best and a restart button. Best score is saved in the browser.

## Tech

- Single file: `index.html` (vanilla JS + Canvas 2D, 960×540, scales to any window)
- All visuals are original vector art drawn in code: turkey with fanning tail feathers, farmer with pitchfork, fences, ovens, nets, corn, parallax trees, falling autumn leaves, clouds and sun
- Juice: squash-and-stretch on jump/landing, particles, screen shake + red flash on hit
- Audio: original WebAudio synth only — jump, coin, crash, gobble, win fanfare, and a cheerful looping melody (mutable)
- `TRANSCRIPT.md` — build log / AI session transcript for the make.fun submission
