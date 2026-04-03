import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'
import type { Session, DashboardData, PhaseInfo, PhaseGate } from './types'

const DATA_ROOT = path.join(process.cwd(), '..', 'Sub20_Summer2026')
const TRAINING_LOG = path.join(DATA_ROOT, 'training_log.csv')
const HISTORICAL_LOG = path.join(DATA_ROOT, '00_context', 'Training_Data_Nov2025_Mar2026.csv')
const STATUS_FILE = path.join(DATA_ROOT, 'current_status.md')

// ---------- helpers ----------

function paceToMinutes(pace: string): number | null {
  if (!pace || pace.trim() === '' || pace === 'N/A') return null
  const m = pace.match(/(\d+):(\d+)/)
  if (!m) return null
  return parseInt(m[1]) + parseInt(m[2]) / 60
}

function minutesToPaceStr(min: number): string {
  const whole = Math.floor(min)
  const secs = Math.round((min - whole) * 60)
  return `${whole}:${secs.toString().padStart(2, '0')}`
}

function parseHR(hr: string): number | null {
  if (!hr || hr.trim() === '' || hr === 'N/A') return null
  const range = hr.match(/(\d+)-(\d+)/)
  if (range) return (parseInt(range[1]) + parseInt(range[2])) / 2
  const single = hr.match(/~?(\d+)/)
  if (single) return parseInt(single[1])
  return null
}

function computeHRDrift(splits: string): number | null {
  if (!splits) return null
  const hrs: number[] = []
  for (const part of splits.split('|')) {
    const t = part.trim()
    if (/^T\d/i.test(t)) {
      const m = t.match(/(\d+)bpm/i)
      if (m) hrs.push(parseInt(m[1]))
    }
  }
  if (hrs.length < 2) return null
  return hrs[hrs.length - 1] - hrs[0]
}

// ---------- CSV parsers ----------

function parseCurrentLog(): Session[] {
  const raw = fs.readFileSync(TRAINING_LOG, 'utf-8')
  const { data } = Papa.parse<Record<string, string>>(raw, { header: true, skipEmptyLines: true })

  return data.map((row) => {
    const avgPaceMin = paceToMinutes(row['Actual_Avg_Pace'] ?? '')
    const plannedPaceMin = paceToMinutes(row['Planned_Pace'] ?? '')
    return {
      date: row['Date'] ?? '',
      sessionType: row['Session_Type'] ?? '',
      distanceKm: parseFloat(row['Actual_Distance_km'] ?? '0') || 0,
      avgPace: row['Actual_Avg_Pace'] ?? '',
      avgPaceMin,
      avgHR: parseHR(row['Actual_Avg_HR'] ?? ''),
      maxHR: parseHR(row['Actual_Max_HR'] ?? ''),
      splits: row['Splits'] ?? '',
      notes: row['Notes'] ?? '',
      week: parseInt(row['Week'] ?? '0') || null,
      phase: row['Phase'] ?? null,
      isCurrentCycle: true,
      plannedPace: row['Planned_Pace'] ?? null,
      plannedPaceMin,
      hrDrift: computeHRDrift(row['Splits'] ?? ''),
    } satisfies Session
  })
}

function parseHistoricalLog(): Session[] {
  const raw = fs.readFileSync(HISTORICAL_LOG, 'utf-8')
  const { data } = Papa.parse<Record<string, string>>(raw, { header: true, skipEmptyLines: true })

  return data.map((row) => {
    const avgPaceMin = paceToMinutes(row['Avg_Pace'] ?? '')
    return {
      date: row['Date'] ?? '',
      sessionType: row['Session_Type'] ?? '',
      distanceKm: parseFloat(row['Distance_km'] ?? '0') || 0,
      avgPace: row['Avg_Pace'] ?? '',
      avgPaceMin,
      avgHR: parseHR(row['Avg_HR'] ?? ''),
      maxHR: parseHR(row['Max_HR'] ?? ''),
      splits: row['Splits'] ?? '',
      notes: row['Notes'] ?? '',
      week: null,
      phase: null,
      isCurrentCycle: false,
      plannedPace: null,
      plannedPaceMin: null,
      hrDrift: computeHRDrift(row['Splits'] ?? ''),
    } satisfies Session
  })
}

// ---------- phase gate computation ----------

function buildPhaseGates(sessions: Session[]): PhaseInfo[] {
  const tempoSessions = sessions.filter(
    (s) => s.isCurrentCycle && ['Tempo', 'Interval'].includes(s.sessionType) && s.avgPaceMin
  )
  const easySessions = sessions.filter(
    (s) => s.isCurrentCycle && ['Easy', 'Easy Long'].includes(s.sessionType) && s.avgPaceMin
  )

  const bestTempoKm = tempoSessions.reduce((best, s) => Math.max(best, s.distanceKm), 0)
  const bestTempoPace = tempoSessions.reduce<number | null>(
    (best, s) => (s.avgPaceMin && (best === null || s.avgPaceMin < best) ? s.avgPaceMin : best),
    null
  )
  const latestDrift = tempoSessions
    .filter((s) => s.hrDrift !== null)
    .slice(-1)[0]?.hrDrift ?? null
  const bestEasyKm = easySessions.reduce((best, s) => Math.max(best, s.distanceKm), 0)
  const illnessCount = sessions.filter((s) => s.isCurrentCycle && s.sessionType === 'Illness').length

  const phase1Gates: PhaseGate[] = [
    {
      id: 'p1_pace',
      label: '4km tempo @ 4:24/km',
      target: '4:24/km',
      current: bestTempoPace ? `${minutesToPaceStr(bestTempoPace)}/km (${bestTempoKm}km)` : null,
      progress: bestTempoPace
        ? Math.min(100, Math.round(((4.5 - bestTempoPace) / (4.5 - 4.4)) * 100))
        : 0,
      met: bestTempoPace !== null && bestTempoKm >= 4 && bestTempoPace <= 4.4,
    },
    {
      id: 'p1_hr',
      label: 'HR during tempo: 168–172 BPM',
      target: '168–172 BPM',
      current: tempoSessions.length
        ? `${tempoSessions.slice(-1)[0].avgHR ?? '?'} BPM avg`
        : null,
      progress: (() => {
        const lastHR = tempoSessions.slice(-1)[0]?.avgHR
        if (!lastHR) return 0
        if (lastHR >= 168 && lastHR <= 172) return 100
        if (lastHR < 168) return Math.round(((lastHR - 160) / (168 - 160)) * 80)
        return 90
      })(),
      met: (() => {
        const lastHR = tempoSessions.slice(-1)[0]?.avgHR
        return lastHR !== null && lastHR !== undefined && lastHR >= 168 && lastHR <= 172
      })(),
    },
    {
      id: 'p1_drift',
      label: 'HR drift <5 BPM',
      target: '<5 BPM',
      current: latestDrift !== null ? `${latestDrift} BPM` : null,
      progress: latestDrift !== null ? Math.min(100, Math.round((10 - latestDrift) / (10 - 0) * 100)) : 0,
      met: latestDrift !== null && latestDrift <= 5,
    },
    {
      id: 'p1_easy',
      label: '10km easy @ 5:45/km',
      target: '10km',
      current: bestEasyKm > 0 ? `${bestEasyKm}km done` : null,
      progress: Math.min(100, Math.round((bestEasyKm / 10) * 100)),
      met: bestEasyKm >= 10,
    },
    {
      id: 'p1_illness',
      label: 'Zero illness interruptions',
      target: '0 illness days',
      current: illnessCount === 0 ? 'Clean' : `${illnessCount} illness days`,
      progress: illnessCount === 0 ? 100 : 0,
      met: illnessCount === 0,
    },
  ]

  return [
    {
      name: 'Phase 1: Base Rebuild',
      shortName: 'Base',
      dateRange: '26 Mar – 19 Apr',
      weekRange: 'W1–W4',
      status: 'in_progress',
      gates: phase1Gates,
    },
    {
      name: 'Phase 2: Threshold Development',
      shortName: 'Threshold',
      dateRange: '20 Apr – 17 May',
      weekRange: 'W5–W8',
      status: 'upcoming',
      gates: [],
    },
    {
      name: 'Phase 3: VO2max & Speed',
      shortName: 'VO2max',
      dateRange: '18 May – 7 Jun',
      weekRange: 'W9–W11',
      status: 'upcoming',
      gates: [],
    },
    {
      name: 'Phase 4: Race Specific',
      shortName: 'Race Prep',
      dateRange: '8 Jun – 21 Jun',
      weekRange: 'W12–W13',
      status: 'upcoming',
      gates: [],
    },
    {
      name: 'Phase 5: Taper',
      shortName: 'Taper',
      dateRange: '22 Jun – 27 Jun',
      weekRange: 'W14',
      status: 'upcoming',
      gates: [],
    },
  ]
}

// ---------- status parsing ----------

function parseInjuryFlag(): string | null {
  try {
    const text = fs.readFileSync(STATUS_FILE, 'utf-8')
    const m = text.match(/## Active Injury Flag\n\n\*\*(.+?)\*\*/)
    return m ? m[1] : null
  } catch {
    return null
  }
}

// ---------- main export ----------

export function getDashboardData(): DashboardData {
  const currentSessions = parseCurrentLog()
  const historicalSessions = parseHistoricalLog()
  const allSessions = [...historicalSessions, ...currentSessions]

  const RACE_DATE = new Date('2026-06-28')
  const today = new Date('2026-04-02') // Using today's date from context
  const msPerDay = 1000 * 60 * 60 * 24
  const daysToRace = Math.round((RACE_DATE.getTime() - today.getTime()) / msPerDay)
  const weeksToRace = Math.round(daysToRace / 7)

  // Current week: count from Mar 26 start
  const WEEK1_START = new Date('2026-03-26')
  const weeksSinceStart = Math.floor((today.getTime() - WEEK1_START.getTime()) / (7 * msPerDay))
  const currentWeek = Math.max(1, weeksSinceStart + 1)

  // Latest threshold pace (best of last 2 tempo sessions)
  const tempoSessions = currentSessions.filter(
    (s) => ['Tempo', 'Interval'].includes(s.sessionType) && s.avgPaceMin
  )
  const latestThresholdPaceMin = tempoSessions.length
    ? tempoSessions[tempoSessions.length - 1].avgPaceMin
    : null

  // Predicted race time using threshold-to-race factor
  // Empirically: current PB 20:59 at threshold 4:21.6/km → factor ~0.22 min/km
  const predictedRaceTimeMin = latestThresholdPaceMin
    ? (latestThresholdPaceMin - 0.22) * 5
    : null

  const phases = buildPhaseGates(currentSessions)

  return {
    sessions: allSessions,
    currentWeek,
    currentPhase: 'Phase 1: Base Rebuild',
    daysToRace,
    weeksToRace,
    pb5k: '20:59',
    latestThresholdPaceMin,
    predictedRaceTimeMin,
    targetRaceTimeMin: 19.98, // 19:59
    phases,
    injuryFlag: parseInjuryFlag(),
  }
}

export { minutesToPaceStr }
