---
description: Analyze a training session, update logs, flag issues
argument-hint: [session notes or inbox file]
---

Analyze a completed training session for the Sub-20 5K campaign.

Session input: $ARGUMENTS
If no input is given, check `Sub20_Summer2026/08_inbox/` for new files.

Steps:
1. Read `Sub20_Summer2026/current_week_plan.md` for the prescribed target (pace, HR, session type).
2. Compare actual vs. target — pace, HR, splits. State the gap precisely.
3. Append a row to `Sub20_Summer2026/training_log.csv`.
4. Update `Sub20_Summer2026/current_status.md`.
5. For a notable session, write a detailed analysis to `Sub20_Summer2026/03_session_analyses/`.
6. Flag issues per the decision rules in CLAUDE.md — pace discipline (HR primary; easy runs >15 sec/km too fast), Barry's HR zones, illness signals.
7. Move the processed inbox file into `Sub20_Summer2026/02_training_log/session_data/`.
8. Commit and push.

Keep the response concise and data-driven. State the verdict first.
