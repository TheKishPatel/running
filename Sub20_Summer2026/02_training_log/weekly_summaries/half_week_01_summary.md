# Half Block — Week 1 Summary (Mon 27 Jul – Sun 2 Aug 2026)

**Theme:** Recovery + re-entry after the 25 Jul goal race. **Verdict: complete, fully on plan.**

---

## Sessions

| Day | Session | Result |
|-----|---------|--------|
| Tue 28 Jul | Barry's (lower), walking lunges | 125 avg / 168 max. Z1 30:06 / Z2 12:39 / Z3 1:31 / Z4 0:05 / Z5 0:00 |
| Wed 29 Jul | Barry's (upper), social | 133 avg / 168 max. Z3 12:14. Post 147→126 |
| Thu 30 Jul | Easy 5 km (trimmed from 6) + 4 strides | 5:38/km @ 143. Post 102→94→94 |
| Sat 1 Aug | Easy 6.30 km | Solo 5 km at 5:29/km @ ~138. Post 97→87→**70** |
| Sun 2 Aug | **Long 12 km** | **136 avg / 152 max, 99.1% Zone 1–2.** Post 138→98→90 |

**Volume: ~24.5 km across 3 runs + 2 Barry's** (planned ~24 km).

---

## What the week established

**1. The long-run ceiling moved for the first time since 7 Jun.** 12 km beats the 11 km that had stood as the campaign's longest run. Executed at 136/152 with **only 59 seconds above 150** across 67 minutes — the cap was exceeded by 2 bpm at the very end, which is ordinary cardiac drift, not indiscipline.

**2. Aerobic fitness is intact and reads normal-to-good post-race.**

| Long run | Pace | HR |
|----------|------|-----|
| 7 Jun — 11 km | 5:39/km | 137 / 150 |
| 19 Jul — 9.66 km | 5:36/km | 137 / 150 |
| **2 Aug — 12 km** | ~5:36/km | **136 / 152** |

Further than either, at the same heart rate.

**3. Thursday's elevated HR was correctly diagnosed.** Thu 30 Jul read 5:38/km @ 143 — high for the pace. Attributed to poor sleep, 20°C and 5 days post-race rather than fitness. Saturday confirmed it: **5:29/km @ 138, nine sec/km faster at five bpm lower.**

**4. Recovery markers are excellent throughout.** Post-run traces of 102→94→94, 97→87→**70**, and 138→98→90 after 67 minutes. The 70 bpm at two minutes is the best figure in the log.

**5. Resting HR baseline established at 52** (seated chest strap, 1 and 2 Aug). See the correction below.

---

## Flags

**⚠️ Overspeed pattern — three consecutive sessions. The live flag of the block.**
- **23 Jul** 400s — 3 of 4 reps 12–19 sec/km hot
- **30 Jul** strides — escalated 3:57 → 3:28 → 3:09 → **2:50/km** against a flat 3:30–3:40 prescription; max HR 179 on a recovery-week run
- **1 Aug** easy run — **5:29/km vs 5:50 prescribed**, on the one day the prescription said *"deliberately easy, day before a long run"*

Physiological cost has been near zero each time and no session was compromised. **The pattern is the problem, not the sessions.** The HR-governed defence works while runs are short; from Week 2 the long runs are long enough that a Saturday overspeed costs the Sunday. Notably, the 12 km itself was *not* overspeed — 99.1% Zone 1–2 — so the discipline is available when it matters.

**⚠️ Barry's intensity has inverted.** Tue 28 Jul came in at 125 avg with **30:06 in Zone 1** — under the <155 cap but below a useful conditioning stimulus. Partly the walking-lunge substitution (jumping lunges drive the HR), partly a soft session. Correct for a recovery week; **from 4 Aug the target is the 7 Jul profile (~138 avg, meaningful Zone 2–3).** The historical flag was Barry's being too hard at 8–9/10 — the current risk is the reverse.

**🟢 Resting HR flag raised and withdrawn.** A reading of 63 was flagged against the <55 baseline and the >60 rest-day rule. The 63 was **Apple Health's daily computed resting HR — an algorithmic estimate from inactive periods across the whole day, not a measurement.** The actual seated chest-strap reading was **52**. Not comparable metrics; the comparison was an error. Protocol now fixed: `Resting_HR_Morning` is the seated strap reading, Apple's daily figure is a trend line only.

**🟢 VMO / lunge gap — no response.** No pain after the first lower-body session back off a 21-day gap. One walking-lunge session remains (4 Aug).

---

## Equipment

**Wahoo TICKR acquired 30 Jul.** Three independent points now favour it as the recorded feed: it caught 20-second strides at 179 (optical cannot — 4 Jun rep 1 went untracked, 16 Jul undercounted maximal 1600s by 25–35 bpm), it gives a usable seated resting pulse, and the long-run traces are clean. **This closes the three-races-with-no-usable-HR problem** if it holds through the block.

---

## Data quality

`training_log.csv` had **10 of 40 rows failing to parse at the header's 23 columns**, 8 with fields silently shifted into wrong slots (4 Jun's Notes sat in `Alcohol_Drinks`). Pre-existing since March. All repaired 2 Aug with content verified character-identical. Cause was unquoted commas in free-text `Outcome` values; prevention rule recorded in the decision log.

---

## Into Week 2

**~34 km, 4 runs + 1 Barry's.** Two new stressors at once: **threshold returns Thu 6 Aug (5 km @ 4:18)** — the first quality session since the race and 2 sec/km faster than the 2 Jul benchmark — and **the long run steps to 14 km**. A 4th weekly run enters on Wednesday.

**Gate to Week 3:** 14 km completed at HR <150 with no soreness beyond 48 h → progress to 16 km. Otherwise repeat 14 km. Week 3 brings the first run over 90 minutes and the first gel practice, so the base must be genuinely there.
