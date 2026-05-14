---
description: Apply illness decision rules and update health files
argument-hint: <symptoms, severity, energy level>
---

Process a health / illness update for the Sub-20 5K campaign.

Report: $ARGUMENTS

Steps:
1. Apply the illness decision rules from CLAUDE.md strictly:
   - Sore throat, any severity → complete rest.
   - Cough or phlegm → complete rest.
   - Return to training only when 100% symptom-free.
2. State the action clearly: rest or train, and which sessions are affected.
3. Update `Sub20_Summer2026/current_status.md`.
4. Log the episode in `Sub20_Summer2026/05_health_recovery/` (illness log).
5. If sessions are cancelled, note the impact on the week in `Sub20_Summer2026/current_week_plan.md`.
6. If this follows a gap in Barry's attendance, flag that the first lower-body session back should substitute walking lunges for jumping lunges.
7. Commit and push.

Be direct. Lead with the action.
