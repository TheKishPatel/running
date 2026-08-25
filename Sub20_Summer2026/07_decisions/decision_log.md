# Decision Log

Material coaching and planning decisions, with the evidence behind them. Newest first.

---

## 2026-08-02 — Data integrity: `training_log.csv` malformed rows repaired

**Found:** 10 of 40 rows did not parse at the header's 23 columns — 8 had fields silently
shifted into the wrong columns, so any programmatic read of those sessions returned wrong
values (e.g. 4 Jun's Notes sat in `Alcohol_Drinks`, its Conditions in `Notes`). Pre-existing;
predates the half block.

**Three causes, all repaired without altering content:**
1. **Unquoted comma split `Outcome` in two** (+1 col) — 26 Apr, 27 Jun, 2 Jul, 5 Jul, 25 Jul.
   The two halves were rejoined with the comma restored.
2. **Missing field** (−1 col) — 27/29 Mar missing `Conditions`; 4/7 Jun missing
   `Sleep_Quality_1_10`. An empty field was inserted at the correct position, restoring
   alignment of `Notes` / `Conditions` / `Outcome` / `Phase_Target_Met`.
3. **One surplus blank** before `Alcohol_Drinks` (+1 col) — 2 Jun. Removed.

**Verification:** all 40 rows now parse at 23 columns; exactly 10 lines changed in the diff;
the file's alphanumeric content is character-identical before and after (23,745 chars), so no
value was lost, reworded or re-attributed — only delimiters and quoting changed.

**Cause and prevention:** free-text `Outcome` values containing commas were written unquoted.
All future appends quote every free-text field. Structure is validated (row count + column
count + content-preservation check) after each append.

---

## 2026-07-25 (later) — NEW GOAL: The Big Half, Sun 6 Sep 2026. Dual-goal block agreed.

**Athlete has entered The Big Half (21.1 km, Sun 6 Sep 2026)** and wants to keep progressing at
5K. Both are on. Block written to `big_half_block_Sep2026.md`; Week 1 in `current_week_plan.md`.

**Readiness read — the engine is fine, the endurance is not.** Aerobic efficiency is
campaign-best (5:19/km @ 142 BPM, 5 Jul), threshold 4:20/km clean (2 Jul). But the
**longest run ever logged is 11.0 km** (7 Jun) — not "not recently", never, across the entire
Oct 2025 – Jul 2026 record — off **2–3 runs and 15–24 km/week**. Riegel off the 20:59 PB gives
1:36:30 and is not usable: it assumes a base that doesn't exist.

**Target: 1:42–1:45 (4:50–4:58/km). Stretch 1:40. Race pace 4:50/km.** Threshold at 4:20 puts
HM pace at threshold +25–30 sec/km given the thin base. Doing nothing different = ~1:50+ with
the last 5 km collapsing.

**Decision: run both goals off one block, not two.** 5K and HM share threshold as the primary
engine. What gets parked is ~6 weeks of top-end VO2max, which returns in 3 weeks; aerobic base
takes months. **Sequence: half (6 Sep) → 4-week 5K sharpening block → cool-weather 5K,
early-to-mid Oct** for the PB/sub-20:30 the heat denied on 25 Jul.

**Why this is not a compromise:** the sub-20 campaign stalled at 4:00/km with threshold never
executed below 4:20 and volume at 20–25 km/week against a planned 35–40. **Low volume is the
one plausible ceiling that has never been tested.** This block forces the base the campaign
never had. The route to sub-20 goes through the half, not around it.

**Structure:** Mon rest / Tue Barry's lower / **Wed easy (new 4th run)** / Thu quality /
Fri rest / Sat easy / Sun long. Long run steps **12 → 14 → 16 → 18 km**, peak 23 Aug
(~1 h 40 on feet = race duration). **No 21 km training run.** Volume 24 → 40 km peak → taper.

**Governing constraint — no third hard day.** Tue Barry's + Thu quality is already two.
**Sunday long run HR 150 is a hard cap, not a target.** If the long run becomes an effort it
is a third hard day plus Barry's, and the illness record says what follows.

**Risks recorded:** (1) illness — 5 episodes this campaign, volume rising ~60%, weeks 4–5 the
vulnerable window; (2) injury from the 11→18 km ramp plus a 4th run — **hold volume flat rather
than progress if anything reads wrong**; (3) the habitual 10–15 sec/km overspeed, affordable on
5 km and not on 16; (4) never fuelled a run >90 min — gels practised on the 16 and 18 km runs;
(5) aggressive opens (4:04 parkrun, gate rep 3, 3 of 4 reps hot on 23 Jul) — race plan mandates
4:55/km for the first 5 km.

**Barry's Wednesday question (athlete, social upper-body session with sister, Wed 29 Jul):**
**keep Thursday's run on Thursday.** Upper-body Barry's is unrestricted per `CLAUDE.md` and
costs the legs nothing. Rule for the block: a *lower*-body Wednesday would move Thursday to
Friday; an upper-body one does not.

**Flag raised in the same turn:** last lower-body Barry's was **7 Jul → 21-day gap** by Tue
28 Jul. **Walking lunges 28 Jul and 4 Aug**, normal from 11 Aug — the 31 Mar VMO twinge came
from exactly this pattern.

---

## 2026-07-25 — GOAL RACE: ~21:27 in 24°C sun, heat-limited, PB intact

**Result:** ~21:27, 4:17/km avg, 24°C **sunny**. Splits 4:12 / 4:16 / 4:22 / 4:16 / 4:21.
No chest strap (mandated) → no race HR. **Not a PB (20:59 stands).**

**Read: the deficit is heat, not fitness.** Gate-derived good-conditions pace was 4:08–4:10/km;
a 24°C sunny 5K costs a non-heat-adapted runner ~7–9 sec/km → ~4:16–4:18. He averaged 4:17
— i.e., ran **to his heat-adjusted ceiling.** Not an underperformance.

**Pacing:** opened 4:12 — **disciplined**, avoiding the week's #1 risk (a km1 blow-up after the
gate rep-3 fade + hot Thu 400s). km2 drifted to 4:16 rather than settling, km3 sagged to 4:22
as the heat bit, **km4 regathered to 4:16 (fought back, didn't unravel)**, km5 4:21 to the line.
Lesson for next race: past the opener, lock **effort** and refuse the mid-race sag (found that
gear in km4, one km late). And **wear the chest strap** — a second race with no HR.

**Campaign verdict:** currently a **~20:45 / low-21 runner, conditions-dependent.** Sub-20 was
correctly ruled out at the gate; the cool-day PB existed and the weather took it. This block was
**gutted twice by illness (URTI in June, food poisoning in July)** — that the fitness still raced
to its ceiling in the heat is the real result.

**Next:** target a **cool-weather 5K (autumn)** for the PB / sub-20:30 the conditions denied.
Build off this base — no illness interruptions is the single biggest lever. Decide the race and
a fresh block when ready.

---

## 2026-07-16 — GATE RESULT: sub-20 off, race 25 Jul for a PB

**Session:** 3×1600m @ 4:00/km gate. Ran **4:10 / 4:07 / 4:18** (could not hold 4:00 on
any rep, positive fade), RPE **9–10/10** with retch/wrenching near the end; wanted to quit
after rep 2. Optical watch used (chest strap mandated, not worn) → HR undercounts 25–35 bpm
on hard efforts, so unusable; **power is the honest read: 288/287/279 W = at/above 2 Jul
threshold power (271–281 W), fading.** At threshold-plus wattage the athlete produced
4:07–4:18, not 4:00.

**Decision: sub-20 is OFF for 25 Jul. Race a PB.**
- Race **~4:08–4:10/km, even or slight negative split → ~20:40–20:50** (PB vs 20:59).
  **Sub-20:30 the stretch** if cool + rested. **Do NOT open at 4:00** (rep 3 shows the
  blow-up). **Chest strap mandatory** on race day.

**Recorded caveat — not a clean fitness verdict:** 5–6h sleep (history: ~11 sec/km cost,
14 May), off an illness-disrupted low-volume fortnight, threshold never executed below 4:20
this cycle, intro VO2max dropped. The 4:00 speed was never built. Per plan rule, a rough
gate isn't a fitness verdict — but race pacing goes off what the gate showed. Pace
conservative; let him outrun it.

**Positives:** completed all 3 reps off a wrecked fortnight; jog recoveries executed
(207→176→143 m); went to the ceiling (max 180 + retch = genuine max effort, no toughness
deficit). Full analysis: `03_session_analyses/2026-07-16_gate_3x1600_racepace.md`.

**Run-in:** protect sleep (biggest controllable — gate was on 5–6h); easy + strides;
4×400m @ 3:50 sharpness Thu 23 Jul; light taper; race Sat 25 Jul.

---

## 2026-06-27 (later) — Goal race chosen: Sat 25 July 2026

**Race:** Sat 25 Jul 2026, 4-week build. Plan written to `build_plan_Jul2026.md`; Week A set.

**Goal framing (honest):**
- Primary realistic: **PB / sub-20:30** (20:1x–20:2x). Stretch: **sub-20**, decided at the
  16 Jul rehearsal (3×1600m @ 4:00).
- Threshold never executed below ~4:24 this cycle; 4 weeks sharpens the base into a PB, it
  does not rebuild threshold 10 sec/km. Sub-20 is the ceiling, not the expectation.

**Block:** A (re-entry + threshold restart) → B (VO2max intro 5×1000m) → C (peak + 16 Jul
3×1600m gate) → D (taper + race). Barry's walking lunges weeks A–B (illness gap).

**Carry-overs:** HR-governed with conservative km1/rep1 (km2-blowup pattern); jog recoveries
not walk; chest strap for rehearsal + race (optical undercounts ~25–35 bpm in races);
illness = full stop.

---

## 2026-06-27 — Tune-up done; pivot to late-July sub-20 build

**Result:** 5K ~22:21 in ~30°C, eased by design (opened 4:11/km @ 293W, faded to ~4:40 @
260W). HR feed invalid (sensor undercount — same as 8 Mar). Controlled, well-judged; no
symptoms. Not a fitness verdict (heat + easing + bad HR), but power shows leg speed +
threshold intact 6 days post-illness.

**Decisions / next:**
- Sub-20 goal proceeds to a **clean late-July race (date TBD — athlete to choose).**
- Build a full uninterrupted run-in off the existing base: easy rebuild → threshold →
  VO2max → race-specific → taper (~4–5 weeks).
- **Use a chest-strap HR monitor for the goal race** (optical undercounts badly in races).
- This week: easy/recovery; watch for any post-race symptom flare.

---

## 2026-06-24 — Illness cleared: 27 Jun reinstated as a sub-21 tune-up

**Inputs:** Symptoms gone by Wed 24 Jun. Clean post-illness re-entry run 21 Jun (5km @
6:16/km on Mersea beach, HR 142–151 Zone 2, no symptom return). 3 days to race; ~25°C
forecast.

**Decision: run 27 Jun as a controlled sub-21 tune-up, NOT the deferred sub-20.**
- Sub-21 (4:12/km) is PB-grade and sub-maximal — a low-risk fitness check 5–6 days
  post-illness, unlike the maximal sub-20 grind we shelved.
- **Sub-20 goal stays on a later race (~late July, TBD)**, chosen after Saturday, built on
  the existing aerobic base.
- Run on HR, not pace: km1 ≤170 → build → hard ceiling 183. Abort to easy tempo on any
  chest symptom or heat distress. Heat adds 5–8 bpm for given pace; respect the ceiling.
- Mini-taper Wed–Fri (easy + strides, hydrate); abort race if symptoms return.

**Why reinstate vs. stay deferred:** the 15 Jun deferral was correct *while illness was
climbing*. It cleared faster than the worst case, and a sub-max tune-up is genuinely useful
(fitness read + confidence) at acceptable risk — distinct from racing an all-out sub-20 on
recovering lungs, which we still won't do.

---

## 2026-06-15 — DECIDED: defer the 27 Jun race; target a later sub-20

**Inputs:** Cough/phlegm still climbing Mon 15 Jun (day 4, no peak). No backup race on
27 Jun; athlete comfortable finding a new target.

**Decision: do not race 27 Jun as a goal effort — defer the sub-20 to a later race
(~late July, TBD).**
- Earliest realistic symptom-free ~20–23 Jun → race day would be 3–4 days into a cautious
  return off a chest infection. No goal time available; a max 5K on recovering lungs risks
  relapse (Feb-2026 pattern). No upside to racing it.
- 27 Jun may be jogged socially only.
- **Recovery first**, then pick a target race ~4–6 weeks out and build a clean,
  uninterrupted sharpening block off the existing aerobic base (5:30/km @ 140, 7 Jun —
  best of campaign). This is the run-in the campaign never got.
- **Do not select the race or plan training until symptoms are clearly easing.**

**Why this is the right call:** the base is intact (illness interrupts sharpening, not
aerobic fitness); there is no sunk cost (replacement race available); racing sick has
historically cost this athlete weeks. Deferral preserves both health and the goal.

---

## 2026-06-14 — Illness worsening: rehearsal cancelled, sub-20 under review

**Status:** Phlegm + cough increasing through Sun 14 Jun (chest involvement). No fever/aches.
Sunday long run skipped — correct. Likely the Fri 12 Jun hard session triggered the
escalation (post-exercise immune window) — mirrors 21 Feb 2026.

**Decisions:**
- **Thu 18 Jun race rehearsal (2×2000m) cancelled.** Will not run hard 4 days into a
  worsening chest infection. This removes the fitness read and the sub-20/20:30 gate.
- **Sub-20 for 27 Jun treated as realistically off.** Even a fast recovery consumes the
  race-specific week; no sharpening before race day.
- **Race goal decided on recovery timeline, once symptom-free** — not now:
  - clears ≤~17–18 Jun → salvage 27 Jun as controlled ~20:30–21:00 on feel;
  - clears ~20–22 Jun → 27 Jun = tune-up, target a later sub-20;
  - not clear by ~22 Jun → DNS/defer.
- Complete rest; return only via test run (5km @ 6:00, HR <145) after 24h+ symptom-free.

**Open question for athlete:** is there a backup July 5K? Determines salvage vs. defer.

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

## 5 Aug 2026 — Resting HR 59 on Wed morning: Thursday threshold protocol

**Situation.** Wed 5 Aug morning resting HR **59**, against three consecutive seated
TICKR readings of **52** (1, 2, 4 Aug). +7 bpm, ~13% above a firmly established
baseline — but **under the >60 rest-day rule**. Sleep declining: 7.0 → 6.5 → 6.0 h.
No symptoms reported. Tue 4 Aug Barry's was the first genuine lower-body conditioning
stimulus in four weeks (135 avg, Zone 2–3 = 64% vs 32% on 28 Jul).

**Read.** A +7 bpm morning reading the day after the hardest lower-body session since
7 Jul, on 6 h sleep, is an expected training response before it is an illness signal.
It is not dismissed — it needs a second data point, not a decision made on one.

**Decision 1 — Wed 5 Aug easy 6 km: RUN IT, as the diagnostic.**
5:45/km, HR <150, strictly HR-governed. Its only job is volume, and the HR-for-pace
read is the cheapest corroborating evidence available. Reference: 5:36/km @ 137 (19 Jul),
5:29/km @ 138 (1 Aug). If HR at 5:45/km sits ≥8–10 bpm above that line, the 59 is real.

**Decision 2 — the threshold does NOT move to Friday. Correction to the 4 Aug note.**
Fri 7 Aug is rest; Sat 8 easy; **Sun 9 is the 14 km — the Week 2 gate.** Threshold on
Thursday leaves two days before it; on Friday, one. **Protecting the Sunday outranks
protecting Thursday's full 5 km** — the 14 km gates progression to 16 km, and four more
quality sessions remain in the block. Trimming the threshold is the correct lever,
not shifting the day.

**Thursday morning ladder (decided in advance, off Thu's own numbers):**
| Thu 6 Aug reading | Action |
|---|---|
| RHR ≤55, no symptoms | **Threshold as prescribed — 5 km @ 4:18/km.** Open at 4:20. |
| RHR 56–60, no symptoms | **Trim to 4 km @ 4:18/km**, same execution rules. Still a progression on the 2 Jul benchmark (4 km @ 4:20). |
| RHR >60 | **Complete rest.** Standing rule, no negotiation. Sunday 14 km stays. |
| Any throat / cough / phlegm, any severity | **Complete rest** per `CLAUDE.md`. Overrides every row above. |

**Open — measurement source.** The 59 must be confirmed as a **seated chest-strap
reading**, not Apple's daily computed figure. That distinction already produced one
withdrawn flag (63 on 1 Aug). Apple's number is a trend line only and is never compared
against the <55 baseline.

---
**Resolved 5 Aug (same day):** the 59 is confirmed as a **seated Wahoo TICKR reading,
no symptoms**. Directly comparable to the 52s — the flag stands as amber and the ladder
above applies unchanged. Added in-run abort for the Wed 6 km: **HR 150 at 5:45/km → cut
the run short, and Thursday becomes complete rest rather than a trim.**

---

## 5 Aug 2026 — Saturday unavailable (childcare): cancel the easy run, keep threshold on Thursday

**Situation.** Athlete has his kids all day Sat 8 Aug and cannot run. Proposed: rest
Thursday, move the threshold to Friday, rest Saturday, long run Sunday.

**Decision. Threshold stays Thursday. Saturday's easy 6 km is cancelled, not relocated.**

Revised week: Mon rest / Tue Barry's ✅ / Wed easy 6 km ✅ / **Thu threshold** / Fri rest /
Sat rest / **Sun 14 km**. Volume ~27.5 km, down from ~34 planned, up from ~24.5 in Week 1.

**Rationale.**
1. **Spacing to the gate.** Fri quality → Sun 14 km is one day; Thu → Sun is two. The Week 2
   gate is *14 km completed at HR <150*. Threshold legs 36 h out raise Sunday's HR and risk
   failing a gate that would otherwise pass — the cost of which is repeating 14 km instead
   of progressing to 16 km, i.e. a lost week of the ramp with 32 days to the race.
2. **Easy volume is the cheapest thing in the week.** 6 km of Zone 2 against the block's
   first quality session and the ramp's second rung is not a close call.
3. **The proposal's one real benefit — an extra night's sleep before quality, with sleep at
   6.0 h for four nights — is purchasable more cheaply by sleeping tonight.**
4. **Net: the revised week is better than the original.** Two clear days before the 14 km
   where the plan had one rest day plus an easy run.

**Contingency.** If Thursday's morning numbers trigger the rest row (RHR >60, or any
throat/cough/phlegm), **the threshold is dropped for the week rather than rolled to Friday**
— same spacing logic, and Week 3's VO2max session is 7 days out. Sunday's long run then
becomes the week's only stimulus and stays strictly aerobic.

---

## 6 Aug 2026 — Unstable resting HR reading: run the threshold, trimmed to 4 km

**Situation.** Thursday morning. Sleep **7.5–8 h with one wakeup** — best of the week, first
at target after 7.0 / 6.5 / 6.0 / 6.0. Resting HR **would not settle: 52/56 up to the mid-60s,
no consistent value.** No symptoms.

**Decision. Threshold goes ahead — main set 4 km @ 4:18/km, not 5 km.**

**Rationale.**
1. **Sleep was the dominant variable and it resolved.** The ~11 sec/km short-sleep penalty
   (14 May tempo) does not apply today.
2. **The ladder cannot be read** — there is no number to place in it. **Unresolved uncertainty
   takes the middle row, not the optimistic one.** The ladder was set in advance precisely to
   keep this decision out of the moment.
3. **The range including 52 is informative.** An athlete incubating something does not touch
   baseline at all. Combined with Wednesday's clean diagnostic (139 @ 5:46, Zone 3 zero,
   post-run 131→96→96) there is no illness signal here.
4. **4 km @ 4:18 is still a progression** on the 2 Jul benchmark (4 km @ 4:20) and is the first
   quality session in 12 days. Sunday's 14 km gate outranks the fifth kilometre.

**Measurement finding — the reading itself is the problem, not the athlete.** A seated strap
reading swinging 52 → mid-60s is instrument/method noise: dry electrodes for the first 30–90 s,
and respiratory sinus arrhythmia (beat-to-beat variation with the breath, larger in trained
athletes). **Protocol v2 recorded in `current_status.md`: wet the contacts, settle 2 minutes,
record a 60-second AVERAGE with the range noted, and compare only the average to the <55
baseline.** This retroactively weakens the 5 Aug 59, which may have been an unstable
instantaneous read rather than a real elevation.

**In-session override (outranks any morning number).** If km1 at 4:20/km costs HR above 176,
abandon the main set and jog home. Real-time HR-for-pace beats a morning reading.

---

## 20 Aug 2026 — Posteromedial right knee, traction injury: threshold CANCELLED, Sunday protected

**Situation.** Thursday morning of PEAK WEEK, 17 days out from The Big Half.
**Systemic readings are green: resting HR 53** (inside the 49–55 baseline band, and the second-lowest
of the block after 16 Aug's 49), **sleep 6.5 h, interrupted but with no wakeups.** Wednesday's
diagnostic was the best HR-for-pace of the block (5:46/km @ 137, efficiency 1.552 w/bpm).
**Nothing in the fatigue or illness picture argues against the session.**

**The injury.** Wed 19 Aug, non-training mechanism: **his daughter gripped the right leg and went
deadweight** — a sudden traction/valgus load through a planted leg. Pain reported at the
**posteromedial right knee, behind and inside the joint** (photo supplied, pointing at the
posteromedial joint line — the region of the **distal medial hamstring tendons
(semimembranosus/semitendinosus) and the posteromedial corner**; pes anserinus sits slightly
distal and anterior to it). **~18 h later: still slightly painful. Point tenderness on palpation.
Some running movements produce no pain at all.**

**Decision. The 2×3 km threshold is CANCELLED. Not trimmed, not rolled to Friday.**
Replaced by a **graded functional test** and, only if that is clean, an **easy 5 km @ 5:50–6:00,
HR <145**, on flat even ground.

**Rationale.**
1. **The standing rule already decided this.** `current_week_plan.md`, written Sunday, before any
   of this: *"Sunday outranks everything… If Thursday has to go again, drop it; do not roll it to
   Friday."* The trigger was written as a morning-numbers trigger; the principle does not care that
   the trigger turned out to be a knee instead.
2. **Threshold is the single worst session to run on this structure.** 4:18/km against 5:45/km is
   a large step up in hamstring force, knee flexion velocity and ground reaction force. The medial
   hamstring tendons are loaded hardest exactly where pace comes from. An easy run is a different
   order of load; the threshold is not a scaled-down version of the same risk.
3. **Point tenderness with pain-free movement is a low-grade strain — and low-grade is a state you
   can leave in either direction.** The mechanism (external traction, not overuse) means the tissue
   took a discrete insult ~18 h ago and is in the acute window. Loading it hard now is how a
   two-week annoyance becomes a six-week one.
4. **The cost is correctly placed.** Losing this threshold costs the **October 5K**, not 6 Sep —
   the same accounting applied on 6 Aug and 13 Aug. Aggravating a medial knee structure costs
   **the race**. That asymmetry is not close.

**Third consecutive compromised Thursday** (6 Aug under-pressed, 13 Aug cancelled on RHR 62,
20 Aug cancelled on injury). **Name it plainly: this block will finish with essentially no
threshold progression.** That is now a settled fact rather than a risk, and it is the October
5K's problem. The half-marathon build is carried by the long runs, and those have all landed.

**The functional test (this morning, before any decision to run).** Each step pain-free to
progress; **pain *during* a movement stops it there — palpation tenderness alone does not.**
1. Walk 5 minutes on the flat — any limp or pain = stop, rest day.
2. Stairs down, then up.
3. Single-leg stand, right, 30 s.
4. Single-leg squat to ~45°, right, ×5.
5. Heel raises, right, ×10.
6. Easy jog 400 m.
Clear through all six → the easy 5 km. **Abort mid-run at the first pain, walk home.**

**SUNDAY — THE 18 km IS NOW CONDITIONAL AND HAS BEEN DOWNGRADED IN PRIORITY.**
It was named "the block's real gate." That framing was written before an injury existed and is
now wrong. **16 km at 5:42 with 3 km at 4:52 @ 161 bpm / 246 w is already in the bank, and the
athlete has 5–6 previous half marathons.** The marginal value of 18 km over 16 km is modest;
the cost of a torn medial structure 17 days out is the race itself.
- **Clean Thursday test + clean Saturday 6 km → 18 km as prescribed.**
- **Any residual symptom → 14 km @ 5:45, HR <150, abort at any knee pain.**
- **Pain walking, or pain at rest, on Saturday → no long run. Rest.**

**Escalate to a physio, do not self-manage, if any of these appear:** swelling around the joint,
the knee giving way or feeling unstable, locking or catching, inability to fully straighten or
fully bend, pain on sleeping/at night, pain that is worse on Friday than it was on Thursday, or
anything still present in 5–7 days. A traction mechanism with posteromedial pain deserves hands-on
assessment if it does not settle quickly — this log is not a substitute for one.

**Tue 25 Aug Barry's — flagged in advance.** Jumping lunges resumed only on 18 Aug. If the knee is
still symptomatic, **modify every plyometric element again** (jumping lunges, jump squats, box
jumps) regardless of how good the leg feels that morning. Barry's still happens — per `CLAUDE.md`
it is a conditioning asset — but the plyometrics are the negotiable part.

---

## 22 Aug 2026 — Knee resolved, Saturday gate missed: **18 km CONFIRMED for Sunday**

**Situation.** Saturday of peak week. The 5 km gate test could not be run (family commitments) —
the third Saturday lost in the block. **But the knee has fully resolved: no pain, and no pain on
pressing.** Cycled during the day, pain-free.

**Decision. Sunday runs at 18 km as originally prescribed** — reverting the 21 Aug downgrade to
16 km. Straight aerobic, 5:45/km, HR <150 hard cap, no race-pace finish.

**Rationale — this meets the criterion I set myself, not a relaxed version of it.**
On 21 Aug the standing rule was: *"Clean Saturday, press pain gone → 16 km, and 18 is back on the
table only if the knee is completely silent."* **It is now completely silent.** The residual
palpation tenderness — the single symptom holding the decision at 16 — has cleared.

1. **Two independent pain-free loading exposures.** Fri 21 Aug: six graded functional-test steps
   plus a full 5 km, zero pain. Sat 22 Aug: cycling, zero pain. Plus complete resolution of point
   tenderness at ~3 days post-mechanism. **That is a better evidence set than the Saturday run
   would have produced on its own.**
2. **The missed Saturday helps rather than hurts.** It converts to a second consecutive rest day,
   giving **48 h between Friday's 5 km and Sunday's 18 km** on a knee three days post-injury.
   Had Saturday gone ahead, Sunday would have been the third run in three days.
3. **18 km has no substitute left in the calendar.** Week 5 is 14 km with 6 km at race pace;
   Week 6 is race week. **If Sunday is 16 km, the campaign's longest run stays 16 km** — and
   "time on feet beyond 16 km" is the one gap this repo has named repeatedly as the remaining
   deficit for 6 Sep. Skipping it does not defer the stimulus, it deletes it.
4. **The session itself is low-risk by design.** Straight aerobic, HR-capped, no race-pace finish
   — the 16 Aug run's fast finish (249 w) was the mechanically demanding part and this run has
   none of it. 18 km at 5:45 is ~11 minutes more of the same aerobic load already tolerated.

**The residual risk is real and is handled in-run, not by shortening the distance.** A four-day-old
medial strain fails under fatigued mechanics in the last quarter, not in the first. Distance is a
poor control for that; **an abort rule is a good one.**

**NON-NEGOTIABLE IN-RUN RULE: any knee pain at all → STOP AND WALK. Not ease off, not shorten
the stride — stop.** Turning round at km9 is a good outcome, not a failed session. This overrides
every other instruction on the run, including the distance.

**Route and surface conditions (new, injury-specific).**
- **Loop close to home, or out-and-back**, so aborting at any point is cheap. Not a point-to-point
  route that leaves him 6 km from home at km12.
- **Flat, even ground. Avoid road camber** — a cambered surface loads the medial knee
  asymmetrically for the whole run. This is the one case where the usual trail suggestion is
  *wrong*: uneven ground is the higher risk here.
- Conservative km1 at 6:00–6:10 as always.

**Pace revised 5:40 → 5:45, and slower is correct.** The 21 Aug run reopened the overspeed flag in
its most consequential form: **km4 at 5:28/km, 22 sec/km faster than the floor, 222 w, on the one
run whose entire purpose was minimum load through the knee.** Body-km spread was 28 sec/km against
5 sec/km on 19 Aug. **On 18 km, a 5:28 kilometre on this leg is the failure mode.** 16 Aug proved
the creep can be held (5 sec/km drift over 12 km) — that is the standard for Sunday.

**Morning gate before starting:** press-test the knee. **Any return of tenderness → 14 km, and
abort on any pain.** No tenderness → 18 km as above.

**Week lands at ~30 km across 3 runs + 1 Barry's** against ~40.5 planned. The shortfall is the
cancelled threshold and the lost Saturday. A lighter week into the peak long run is not a problem
and is arguably the better taper into it.

---

