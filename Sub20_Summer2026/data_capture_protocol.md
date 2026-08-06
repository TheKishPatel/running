# Data Capture Protocol

*Created 6 Aug 2026, after a 1.5 km warm-up made the threshold session unreadable.*

The purpose of a session is the training effect. The purpose of the *data* is to decide the
next session. If the splits can't be read cleanly, the second half of that is lost — and
every decision downstream gets made on worse evidence.

---

## The problem

Apple's auto-splits fire every whole kilometre **from the start of the workout**. They know
nothing about warm-ups, main sets, or cool-downs.

A 1.5 km warm-up therefore produces:

| Watch split | What's actually in it |
|---|---|
| km1 | warm-up |
| km2 | 0.5 km warm-up + **0.5 km of the main set** ← contaminated |
| km3 | 0.5 km rep 1 + 0.5 km rep 2 ← straddles |
| km4 | 0.5 km rep 2 + 0.5 km rep 3 ← straddles |

Every number after the first is a blend of two different intensities. The pace is an average
of two paces, the HR is an average of two HRs, and **the one thing that matters most — whether
km1 of the main set was the slowest rep — cannot be recovered at all.**

---

## Rule 1 — whole-kilometre warm-ups and cool-downs, always

**Never 1.5 km. Never 0.5 km. Never any fraction.** 1 km, 2 km, or 3 km.

With a **2 km warm-up** and a 4 km main set, the watch splits map straight onto the session:

| Watch split | Segment |
|---|---|
| km1–2 | warm-up |
| **km3–6** | **main set reps 1–4** |
| km7 | cool-down |

No arithmetic, no contamination, no lost rep 1.

**This is a planning rule, not just a running rule** — it belongs in the prescription before
the session is ever run. It is recorded in `CLAUDE.md`.

## Rule 2 — start the main set on the beep

Even with a whole-km warm-up, drifting 100 m past the km marker before picking up the pace
smears the boundary. **Hold warm-up pace until the watch buzzes the kilometre, then go.** Same
at the end of the main set — finish the rep, let the beep land, then drop to cool-down pace.

## Rule 3 — anything with sub-kilometre reps needs a structured workout

400s, 800s, strides, and short hill reps **cannot** be captured by auto-splits at all. For
those, build the session as a **Custom workout on the watch** (Workout app → Running →
Custom): Warmup block → Work/Recovery blocks → Cooldown. The watch then reports each block
separately and the splits are exact regardless of distance.

The same approach works for the km-based sessions too and is strictly better than relying on
auto-splits — **use it whenever the session has more than one intensity.** The whole-km rule
is the fallback for when the workout wasn't built in advance.

**Manual lap** (tap the screen mid-run) is the low-effort version: one tap at the end of the
warm-up, one at the end of the main set. Better than nothing, worse than a built workout,
because it depends on remembering.

---

## What to send after every session

Two screenshots, which is already the working pattern:

1. **Splits** — per-km time, pace, HR, power.
2. **Heart Rate** — avg, max, the five zone durations, and the post-workout trace.

Plus, typed:

- **Seated resting HR** — 60-second average per protocol v2 in `current_status.md`, with the
  range noted.
- **Hours slept** and number of wakeups.
- Conditions (time of day, temperature) and anything that affected the session.

For a structured workout, the per-block breakdown lives in Fitness → the workout → segments;
send that instead of the km splits.

**Typing the numbers is always acceptable and has worked better than screenshots on several
occasions.** Screenshots have failed to upload more than once.

---

## Sessions already affected

- **Thu 6 Aug 2026 threshold** — prescribed with a 1.5 km warm-up. Corrected to 2 km before
  the session. Any data captured under the original prescription is degraded by one split.
