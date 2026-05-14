---
description: Generate the coming week's training plan from last week's data
argument-hint: [week number or start date, optional]
---

Generate the next week's training plan for the Sub-20 5K campaign.

Target week: $ARGUMENTS (if blank, infer the next week from `current_week_plan.md` and the log).

Steps:
1. Read `Sub20_Summer2026/training_log.csv`, `current_status.md`, `phase_progress.md`, and `master_plan.md`.
2. Assess last week — sessions completed, pace vs. HR trend, any flags or illness.
3. Apply the progression rules from CLAUDE.md: conservative start to each phase, adapt aggressively only on a data-supported breakthrough, never rush.
4. Write the new plan to `Sub20_Summer2026/current_week_plan.md` with precise targets — exact pace and HR range per session (Thu / Sun / Tue Barry's).
5. Archive the prior week's summary into `Sub20_Summer2026/02_training_log/weekly_summaries/`.
6. Update `Sub20_Summer2026/phase_progress.md`.
7. Commit and push.

Output the week's sessions with targets. Concise.
