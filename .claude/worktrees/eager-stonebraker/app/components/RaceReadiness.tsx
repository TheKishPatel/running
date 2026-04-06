'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Props {
  predictedRaceTimeMin: number | null
  targetRaceTimeMin: number
  pb5k: string
  injuryFlag: string | null
  weeksToRace: number
  currentWeek: number
  latestThresholdPaceMin: number | null
}

function formatTime(minutes: number): string {
  const m = Math.floor(minutes)
  const s = Math.round((minutes - m) * 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function timeToSeconds(minutes: number): number {
  return minutes * 60
}

export function RaceReadiness({
  predictedRaceTimeMin,
  targetRaceTimeMin,
  pb5k,
  injuryFlag,
  weeksToRace,
  currentWeek,
  latestThresholdPaceMin,
}: Props) {
  // Convert PB string to minutes
  const pbParts = pb5k.split(':')
  const pbMin = parseInt(pbParts[0]) + parseInt(pbParts[1]) / 60

  // Gap to sub-20
  const gapSeconds = predictedRaceTimeMin
    ? Math.round((predictedRaceTimeMin - targetRaceTimeMin) * 60)
    : null

  // Progress: 0% = PB time, 100% = target time
  const progressToTarget = predictedRaceTimeMin
    ? Math.max(
        0,
        Math.min(
          100,
          Math.round(
            ((pbMin - predictedRaceTimeMin) / (pbMin - targetRaceTimeMin)) * 100
          )
        )
      )
    : 0

  // Confidence range: ±15 seconds
  const confLow = predictedRaceTimeMin ? predictedRaceTimeMin - 15 / 60 : null
  const confHigh = predictedRaceTimeMin ? predictedRaceTimeMin + 15 / 60 : null

  const isSub20 = predictedRaceTimeMin !== null && predictedRaceTimeMin < targetRaceTimeMin

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <i className="ri-bar-chart-grouped-line text-base text-muted-foreground" />
        <h2 className="text-base font-semibold">Race Readiness</h2>
      </div>

      {/* Predicted time card */}
      <Card className={isSub20 ? 'border-green-300 bg-green-50/50' : ''}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Predicted 5K Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          {predictedRaceTimeMin ? (
            <div className="space-y-3">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold tabular-nums tracking-tight">
                  {formatTime(predictedRaceTimeMin)}
                </span>
                {isSub20 ? (
                  <Badge variant="default" className="mb-1 bg-green-500 text-white border-green-500">
                    <i className="ri-checkbox-circle-fill mr-1" /> Sub-20!
                  </Badge>
                ) : (
                  gapSeconds !== null && (
                    <Badge variant="secondary" className="mb-1">
                      {gapSeconds > 0 ? `${gapSeconds}s off target` : 'On target'}
                    </Badge>
                  )
                )}
              </div>

              {confLow && confHigh && (
                <p className="text-xs text-muted-foreground">
                  Confidence range: {formatTime(confLow)} – {formatTime(confHigh)}
                </p>
              )}

              {/* Progress bar toward sub-20 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>PB {pb5k}</span>
                  <span className="font-medium">{progressToTarget}% to target</span>
                  <span>Target 19:59</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progressToTarget}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Based on latest threshold pace{' '}
                {latestThresholdPaceMin ? (
                  <span className="font-medium tabular-nums">
                    {Math.floor(latestThresholdPaceMin)}:
                    {Math.round((latestThresholdPaceMin % 1) * 60)
                      .toString()
                      .padStart(2, '0')}
                    /km
                  </span>
                ) : '—'}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No tempo data yet</p>
          )}
        </CardContent>
      </Card>

      {/* Key metrics row */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon="ri-calendar-todo-line"
          label="Weeks remaining"
          value={`${weeksToRace}`}
          sub={`of 14 · Week ${currentWeek}`}
        />
        <MetricCard
          icon={injuryFlag ? 'ri-alert-line' : 'ri-heart-pulse-line'}
          label="Health status"
          value={injuryFlag ? 'Flag' : 'Clear'}
          sub={injuryFlag ? 'VMO twinge (minor)' : 'No injuries logged'}
          alert={!!injuryFlag}
        />
      </div>

      {/* Risk flags */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Coaching Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <CoachingNote
            icon="ri-shield-check-line"
            text="HR drift improving: 12 BPM → 5 BPM in W2. Keep building."
            type="positive"
          />
          <CoachingNote
            icon="ri-speed-up-line"
            text="Pace discipline improving — W2 self-corrected after fast km1."
            type="positive"
          />
          {injuryFlag && (
            <CoachingNote
              icon="ri-alert-line"
              text="VMO twinge: substitute walking lunges for jumping lunges (2–3 sessions)."
              type="warning"
            />
          )}
          <CoachingNote
            icon="ri-no-smoking-line"
            text="Zero alcohol from May 18 (Phase 3 start). Currently: monitor."
            type="info"
          />
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  sub,
  alert,
}: {
  icon: string
  label: string
  value: string
  sub: string
  alert?: boolean
}) {
  return (
    <Card className={alert ? 'border-orange-200 bg-orange-50/50' : ''}>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <i className={`${icon} text-sm ${alert ? 'text-orange-500' : 'text-muted-foreground'}`} />
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
        <p className={`text-xl font-bold tabular-nums ${alert ? 'text-orange-600' : ''}`}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
      </CardContent>
    </Card>
  )
}

function CoachingNote({
  icon,
  text,
  type,
}: {
  icon: string
  text: string
  type: 'positive' | 'warning' | 'info'
}) {
  const colors = {
    positive: 'text-green-600',
    warning: 'text-orange-500',
    info: 'text-muted-foreground',
  }

  return (
    <div className="flex items-start gap-2 text-sm">
      <i className={`${icon} text-sm mt-0.5 shrink-0 ${colors[type]}`} />
      <span className="text-muted-foreground">{text}</span>
    </div>
  )
}
