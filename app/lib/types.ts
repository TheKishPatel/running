export interface Session {
  date: string // YYYY-MM-DD
  sessionType: string
  distanceKm: number
  avgPace: string // e.g. "4:25/km"
  avgPaceMin: number | null // decimal min/km
  avgHR: number | null
  maxHR: number | null
  splits: string
  notes: string
  week: number | null
  phase: string | null
  isCurrentCycle: boolean
  plannedPace: string | null
  plannedPaceMin: number | null
  hrDrift: number | null // BPM drift across tempo splits
}

export interface PhaseGate {
  id: string
  label: string
  target: string
  current: string | null
  progress: number // 0–100
  met: boolean
}

export interface PhaseInfo {
  name: string
  shortName: string
  dateRange: string
  weekRange: string
  status: 'completed' | 'in_progress' | 'upcoming'
  gates: PhaseGate[]
}

export interface DashboardData {
  sessions: Session[]
  currentWeek: number
  currentPhase: string
  daysToRace: number
  weeksToRace: number
  pb5k: string
  latestThresholdPaceMin: number | null
  predictedRaceTimeMin: number | null
  targetRaceTimeMin: number
  phases: PhaseInfo[]
  injuryFlag: string | null
}
