# Cowork Setup Specification - Sub-20 5K Training

**Athlete:** Kish  
**Training Goal:** Sub-20:00 5K (Summer 2026)  
**Duration:** 12-14 weeks  
**Cowork Role:** Persistent training assistant for session tracking, plan generation, and adaptive coaching

---

## Quick Start

1. **Create folder:** `~/Running/Sub20_Summer2026/`
2. **Run setup script** (see below) to create folder structure
3. **Upload 3 context files** to `00_context/`
4. **Enable Cowork access** to this folder
5. **Initialize:** Tell Cowork your start date, it sets up everything

---

## Folder Structure

```
~/Running/Sub20_Summer2026/
│
├── 00_context/                         # Reference documents (read-only)
│   ├── 5K_Training_Context_Kish_March_2026.md
│   ├── Summer_Sub20_Plan_Template.md
│   ├── Training_Data_Nov2025_Mar2026.csv
│   └── athlete_preferences.md
│
├── 01_plans/                           # Training plans
│   ├── master_plan.md
│   ├── current_week_plan.md
│   ├── next_week_preview.md
│   └── phase_progress.md
│
├── 02_training_log/                    # Session tracking
│   ├── training_log.csv
│   ├── weekly_summaries/
│   └── session_data/                   # Watch screenshots
│
├── 03_session_analyses/                # Detailed breakdowns
│
├── 04_fitness_tracking/                # Benchmarks
│   ├── threshold_progression.csv
│   ├── vo2max_progression.csv
│   └── easy_pace_efficiency.csv
│
├── 05_health_recovery/                 # Health monitoring
│   ├── illness_log.md
│   ├── recovery_metrics.csv
│   ├── alcohol_log.md
│   └── current_status.md
│
├── 06_race_prep/                       # Race week files
│   ├── taper_checklist.md
│   ├── race_day_plan.md
│   └── pacing_strategy.md
│
├── 07_decisions/                       # Decision tracking
│   └── decision_log.md
│
└── 08_inbox/                           # Drop zone
    └── [upload watch screenshots here]
```

---

## Setup Script

Copy/paste this into Terminal on your Mac:

```bash
#!/bin/bash

# Create root directory
mkdir -p ~/Running/Sub20_Summer2026
cd ~/Running/Sub20_Summer2026

# Create all subdirectories
mkdir -p 00_context
mkdir -p 01_plans
mkdir -p 02_training_log/weekly_summaries
mkdir -p 02_training_log/session_data
mkdir -p 03_session_analyses
mkdir -p 04_fitness_tracking/fitness_charts
mkdir -p 05_health_recovery
mkdir -p 06_race_prep
mkdir -p 07_decisions
mkdir -p 08_inbox

# Create placeholder file in inbox
echo "# Drop Watch Screenshots Here

After each training session:
1. Take Apple Watch screenshots (splits, HR, summary)
2. Drop them in this folder
3. Cowork will automatically analyze and move to session_data/

That's it!" > 08_inbox/DROP_WATCH_SCREENSHOTS_HERE.md

echo "✓ Folder structure created at ~/Running/Sub20_Summer2026"
echo "Next steps:"
echo "1. Upload 3 context files to 00_context/"
echo "2. Enable Cowork access to this folder"
echo "3. Tell Cowork your training start date"
```

---

## File Templates

### athlete_preferences.md

Create this file in `00_context/`:

```markdown
# Athlete Preferences - Kish

## Coaching Style
- Direct, analytical, no flattery
- Data-driven decisions with evidence
- Precise targets (exact paces, not ranges)
- Honest assessments even when harsh

## Training Philosophy
- HR primacy over pace
- Smart recovery (illness, sleep, alcohol)
- Aggressive illness rest (neck check rule)
- Conservative progression, aggressive adaptation

## Key Patterns
1. Pushes pace faster than prescribed
2. Barry's historically too hard (use HR data)
3. Trail running = natural pace governor
4. Conservative race starts critical

## Life Context
- Training: 5-6am
- Family: 18-month daughter
- Tuesday: Barry's Bootcamp
- Location: London, Victoria Park
- Shoes: Boom Zone (race), Norda 001 (trail), Cloud 6 (training)

## Alcohol
- 1-2 drinks: OK
- 4+ drinks: Compromised 2-3 days
- Target: Zero final 6 weeks, max 2/week during build
```

### COWORK_INSTRUCTIONS.md

Create this file in root directory:

```markdown
# Cowork Instructions

## Your Role
Persistent training assistant for 12-14 week sub-20 5K campaign.

## Communication Style
- Direct, analytical, no flattery
- Data-driven with evidence
- Precise targets (4:15/km not "around 4:15")
- Concise unless detail requested

Example good: "4:21 @ 168 BPM. Faster pace at lower HR vs last week. Fitness improving."
Example bad: "Great work! Amazing effort!"

## Key Responsibilities

1. **Session Analysis** - Analyze every upload, update logs, flag issues
2. **Weekly Planning** - Generate Monday plans based on last week
3. **Health Monitoring** - Track illness, intervene early
4. **Adaptive Coaching** - Adjust based on performance
5. **Pattern Recognition** - Identify trends across weeks

## Decision Rules

**Illness:**
- Sore throat ANY severity → complete rest
- Cough/phlegm → complete rest
- Return: Only when 100% symptom-free

**Pace Discipline:**
- HR primary governor (not pace)
- Flag easy runs >15 sec/km too fast
- Suggest trail for discipline issues

**Barry's:**
- Should average <155 BPM
- Majority time Zone 2-3
- Flag if consistently Zone 4-5

**Progression:**
- Conservative start each phase
- Aggressive adapt if breakthrough
- Never rush without data support

## Automation

**Auto-analyze:** New files in inbox
**Auto-generate:** Weekly summaries (Sunday), week plans (Monday)
**Auto-alert:** Red flags, illness, elevated HR, missed targets

## Files

**Read-only:** Everything in 00_context/
**Update always:** training_log.csv, current_status.md
**Generate weekly:** weekly_summary.md, current_week_plan.md
**Generate as-needed:** Session analyses, decision logs

## Success Metrics
- 90%+ sessions completed
- Illness episodes <7 days (aggressive rest)
- Fitness trends improving
- Athlete confident for race
- Sub-20 achieved
```

---

## Initialization Command

Once folder is set up and Cowork has access, say:

```
I'm starting the Summer Sub-20 5K training plan on [START_DATE].

Please:
1. Read all context files in 00_context/
2. Create master_plan.md from Summer_Sub20_Plan_Template.md
3. Initialize training_log.csv with headers
4. Create Week 1 plan in current_week_plan.md  
5. Set up phase_progress.md
6. Create current_status.md

Training starts [FIRST_THURSDAY_DATE].
Confirm when setup complete and show Week 1 plan.
```

---

## Weekly Workflow

### Monday (5 min)
**You:** "Cowork, what's this week's plan?"
**Cowork:** Provides Thu/Sun/Tue sessions with targets

### Thursday Evening (2 min)
**You:** Drop watch screenshots in 08_inbox/
**Cowork:** Auto-analyzes, updates logs, provides summary

### Sunday Evening (5 min)
**You:** Drop watch screenshots, then "Cowork, weekly summary"
**Cowork:** Full week assessment + next week preview

### As Needed
**Health:** "Cowork, sore throat 4/10, energy 6/10"
**Questions:** "Cowork, should I do Barry's tomorrow?"
**Progress:** "Cowork, am I on track for sub-20?"

---

## Example Interactions

### Week 1 Start
**You:** "Cowork, set up Week 1 plan"

**Cowork:**
```
Week 1 Plan generated.

Thu: 3km tempo @ 4:30/km (165-172 BPM)
Sun: 8km easy @ 5:50/km (<150 BPM)
Tue: Barry's 6/10 (<155 BPM avg)

Files ready:
✓ current_week_plan.md
✓ master_plan.md
✓ training_log.csv

Good luck with Week 1.
```

### Thursday Session
**You:** [Drops screenshot: 3km @ 4:28/km, 168 BPM]

**Cowork (auto):**
```
Session analyzed: Week 1 Thu Tempo

Target: 4:30 @ 165-172
Actual: 4:28 @ 168 ✓

Excellent execution. 2 sec/km faster, HR controlled.
Fitness indicator: Threshold responding well.

Next: Sun 8km @ 5:50 - stick to pace, don't drift.

Full analysis: week01_thu_tempo_analysis.md
```

### Sunday Summary
**You:** "Cowork, weekly summary"

**Cowork:**
```
Week 1: 3/3 sessions ✓, 27km (target 25)

Performance:
✓ Thu: 4:28 @ 168 (excellent)
✓ Sun: 5:51 @ 148 (good discipline)
✓ Tue: HR 152 (perfect 6/10)

Fitness: Threshold improving
Health: Zero illness, sleep 8.1hrs
Goal probability: 75%

Next week: Continue base, slight progression
Thu: 3km @ 4:28
```

### Illness Detection
**You:** "Sore throat 4/10, tired, energy 5/10"

**Cowork:**
```
⚠️ ILLNESS PROTOCOL

Action: Complete rest
This week: All sessions cancelled
Next assessment: Tomorrow morning

Rest until 100% symptom-free.
Goal: 75% → 70% (pending duration)

current_status.md + illness_log.md updated
```

---

## Why Cowork vs Regular Chats

| Feature | Regular Chat | Cowork |
|---------|-------------|---------|
| Context | Upload each time | Always present |
| Files | Screenshots only | Manages entire folder |
| Tracking | Manual | Auto-updates CSV |
| Planning | You ask each time | Auto-generates weekly |
| Patterns | Limited | Analyzes across 14 weeks |
| Continuity | Resets | Persistent |

---

## What You Still Do

- Run the training sessions
- Take Apple Watch screenshots
- Upload screenshots to inbox
- Make final decisions
- Execute race day

**Cowork doesn't:**
- Auto-capture watch data (privacy)
- Run for you
- Force decisions
- Access watch directly

---

## Is This Worth It?

### YES if you want:
- Persistent tracking without re-uploading context
- Automated weekly plan generation
- Pattern recognition across 12-14 weeks
- Minimal manual data entry
- Folder that evolves with your training

### NO if you prefer:
- Just chat-based coaching
- Manual spreadsheet tracking
- Don't want folder management
- Only occasional check-ins

---

## Getting Started Checklist

**Initial Setup:**
- [ ] Run folder creation script
- [ ] Upload 3 context files
- [ ] Create athlete_preferences.md
- [ ] Create COWORK_INSTRUCTIONS.md
- [ ] Enable Cowork folder access
- [ ] Initialize with start date
- [ ] Review Week 1 plan

**Week 1:**
- [ ] Read current_week_plan.md
- [ ] Thursday tempo → upload screenshot
- [ ] Sunday long → upload screenshot
- [ ] Sunday evening → request summary
- [ ] Review Week 2 plan

**Ongoing:**
- [ ] Monday: Check week plan
- [ ] Post-session: Upload data
- [ ] Sunday: Weekly summary
- [ ] Daily: Health updates if issues

---

## Quick Reference

**Commands:**
- "What's this week's plan?" → Current week details
- "Weekly summary" → Full week assessment
- "Am I on track for sub-20?" → Probability update
- [Drop screenshot] → Auto-analyzes
- "Sore throat 4/10" → Illness protocol

**Key Files:**
- `current_week_plan.md` → This week's sessions
- `training_log.csv` → All session data
- `current_status.md` → Current health/recovery
- `phase_progress.md` → Overall tracking
- `08_inbox/` → Drop screenshots here

---

**Ready to set up. Create the folder structure, upload context files, and initialize Cowork when ready to start training.**

**Sub-20 campaign: 12-14 weeks of persistent, data-driven coaching.**
