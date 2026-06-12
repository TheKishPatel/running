# Decision Log

Material coaching and planning decisions, with the evidence behind them. Newest first.

---

## 2026-06-12 — Illness shutdown: stop hard training until symptom-free

**Trigger:** Woke with phlegm; nasal drip ongoing ~2 weeks. Per CLAUDE.md, cough/phlegm
→ complete rest until 100% symptom-free. GI upset earlier in the week (Tue 9 Jun).

**Decision:**
- Hard training stops. Sun 14 Jun long run → rest by default (very easy 5km @ 6:00 only
  if waking fully clear).
- The DNF 5×1200m (12 Jun, 3/5 reps) is **not** treated as a fitness verdict — HR was
  submaximal at the stop (171 avg vs Zone 5 181+), reps accelerated, power steady. It was
  a compromised session (phlegm + GI + broken sleep + low motivation), not a fitness wall.
- No make-up of the missed reps. VO2max block is effectively complete.
- Explicitly avoiding the Feb-2026 error (trained through phlegm 21 Feb → lost 3+ weeks).

**Consequences / watch:**
- The 18 Jun 2×2000m rehearsal remains the fitness read and the sub-20/20:30 gate, to be
  run rested and clear. If symptoms persist past ~16 Jun, the rehearsal and sub-20 are at
  risk and 20:30 becomes the likely call. 15 days to race; aggressive rest preserves options.
- Return-to-quality requires 24h+ symptom-free then a clean test run (5km @ 6:00, HR <145).

---

## 2026-06-09 — Race date confirmed + dual goal set + repo reconciliation

**Race date: Saturday 27 June 2026 (fixed).**
- Resolved a contradiction in the files: `master_plan.md` previously listed the race
  as Sunday 28 June in three places, while all operational files said Saturday 27 June.
  Athlete confirmed: **Saturday 27 June**. `master_plan.md` taper schedule, header, and
  footer corrected to match. Taper now ends on race day (Sat 27); sharpness 4×400m on
  Thu 25, full rest Fri 26.

**Goal: primary sub-20:00, secondary 20:30.**
- Athlete will commit to a sub-20 attempt but is open to repointing at ~20:30 closer to
  the date if the data doesn't support 4:00/km. **Decision point: the 18 Jun race
  rehearsal (2×2000m).** Pre-agreed rule to remove race-day emotion:
  - Rehearsal completed at/near 3:58–4:02/km, effort ≤8/10, controlled → hold sub-20.
  - Rehearsal completed but 9–10/10 / breaking down → race 20:30.
  - Cannot complete the reps at goal pace → race ~20:30–21:00, run on feel.
- Rationale: threshold has never been cleanly executed below 4:31/km this cycle and the
  first VO2max session (6×800m, 4 Jun) came in at 4:07–4:10/km without reaching Zone 5.
  Aerobic base is strong and improving; the speed/threshold evidence for 4:00/km is not
  there yet with 18 days to go.

**Repo reconciliation (data integrity):**
- `master_plan.md` flagged as the original pre-illness baseline; `phase_progress.md`
  declared the authoritative live tracker.
- `training_log.csv` re-sorted chronologically (was out of order).
- Created `07_decisions/` and `08_inbox/` (referenced by `CLAUDE.md` but previously absent).

**Open item — recovery tracking:** Morning resting HR and sleep are not being logged
(no bed-wearable yet). Athlete to research/purchase one and automate ingestion later.
Until then, the `Resting_HR_Morning` / `Sleep_Hours` / `Sleep_Quality` columns in the
log stay blank by design, not oversight. Illness remains the top risk — symptom-based
rest rules (CLAUDE.md) still govern.

---
