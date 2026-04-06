'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
  Cell,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { Session } from '@/lib/types'

interface Props {
  sessions: Session[]
}

function formatPace(min: number): string {
  const whole = Math.floor(min)
  const secs = Math.round((min - whole) * 60)
  return `${whole}:${secs.toString().padStart(2, '0')}`
}

function shortDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

// Target trajectory: tempo pace targets per week
const TEMPO_TARGETS: Record<number, number> = {
  1: 4 + 30 / 60,
  2: 4 + 28 / 60,
  3: 4 + 26 / 60,
  4: 4 + 24 / 60,
  5: 4 + 22 / 60,
  6: 4 + 20 / 60,
  7: 4 + 18 / 60,
  8: 4 + 15 / 60,
  9: 4 + 8 / 60,
  10: 4 + 4 / 60,
  11: 4 + 0 / 60,
  12: 4 + 0 / 60,
  13: 4 + 0 / 60,
  14: 4 + 0 / 60,
}

export function TrendsChart({ sessions }: Props) {
  // --- Threshold pace trend ---
  const tempoData = sessions
    .filter((s) => ['Tempo', 'Interval'].includes(s.sessionType) && s.avgPaceMin && s.date)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((s) => ({
      date: shortDate(s.date),
      actual: s.avgPaceMin!,
      planned: s.plannedPaceMin,
      target: s.week ? TEMPO_TARGETS[s.week] ?? null : null,
      isCurrentCycle: s.isCurrentCycle,
      label: s.avgPace,
    }))

  // --- HR drift trend ---
  const driftData = sessions
    .filter(
      (s) =>
        ['Tempo', 'Interval'].includes(s.sessionType) &&
        s.hrDrift !== null &&
        s.isCurrentCycle &&
        s.date
    )
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((s) => ({
      date: shortDate(s.date),
      drift: s.hrDrift!,
    }))

  // --- Easy pace efficiency trend ---
  const easyData = sessions
    .filter((s) => ['Easy', 'Easy Long'].includes(s.sessionType) && s.avgPaceMin && s.date)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-12) // last 12 easy sessions
    .map((s) => ({
      date: shortDate(s.date),
      pace: s.avgPaceMin!,
      hr: s.avgHR,
      isCurrentCycle: s.isCurrentCycle,
    }))

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Threshold Pace Trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <i className="ri-speed-up-line text-base text-muted-foreground" />
            <div>
              <CardTitle className="text-base">Threshold Pace Trend</CardTitle>
              <CardDescription>Tempo sessions · actual vs planned · target trajectory</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {tempoData.length === 0 ? (
            <EmptyState label="No tempo sessions logged yet" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={tempoData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  className="fill-muted-foreground"
                />
                <YAxis
                  domain={[3.9, 4.6]}
                  reversed
                  tickFormatter={formatPace}
                  tick={{ fontSize: 11 }}
                  width={36}
                  className="fill-muted-foreground"
                />
                <Tooltip
                  formatter={(val) => formatPace(Number(val)) + '/km'}
                  labelStyle={{ fontSize: 11 }}
                  contentStyle={{ fontSize: 12, borderRadius: 6 }}
                />
                <ReferenceLine
                  y={4.0}
                  stroke="#22c55e"
                  strokeDasharray="4 2"
                  label={{ value: 'Sub-20 target', position: 'right', fontSize: 10, fill: '#22c55e' }}
                />
                {tempoData.some((d) => d.planned) && (
                  <Line
                    dataKey="planned"
                    name="Planned"
                    stroke="var(--color-muted-foreground)"
                    strokeDasharray="4 2"
                    strokeWidth={1.5}
                    dot={false}
                    connectNulls
                  />
                )}
                <Line
                  dataKey="actual"
                  name="Actual"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  connectNulls
                />
                {tempoData.some((d) => d.target) && (
                  <Line
                    dataKey="target"
                    name="Target"
                    stroke="#f97316"
                    strokeDasharray="6 3"
                    strokeWidth={1.5}
                    dot={false}
                    connectNulls
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* HR Drift Trend */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <i className="ri-heart-pulse-line text-base text-muted-foreground" />
            <div>
              <CardTitle className="text-base">HR Drift (Tempo)</CardTitle>
              <CardDescription>BPM increase across tempo splits · green = under 5 BPM</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {driftData.length === 0 ? (
            <EmptyState label="No HR drift data yet" />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={driftData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis
                  domain={[0, 16]}
                  tick={{ fontSize: 11 }}
                  width={28}
                  unit=" bpm"
                  className="fill-muted-foreground"
                />
                <Tooltip
                  formatter={(val) => [`${val} BPM`, 'HR Drift']}
                  contentStyle={{ fontSize: 12, borderRadius: 6 }}
                />
                <ReferenceLine y={5} stroke="#22c55e" strokeDasharray="4 2" />
                <Bar dataKey="drift" name="HR Drift" radius={[4, 4, 0, 0]}>
                  {driftData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.drift <= 5 ? '#22c55e' : entry.drift <= 10 ? '#f97316' : '#ef4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Easy Pace Efficiency */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <i className="ri-footprint-line text-base text-muted-foreground" />
            <div>
              <CardTitle className="text-base">Easy Run Efficiency</CardTitle>
              <CardDescription>Avg pace on easy/long runs · HR &lt;150 BPM target</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {easyData.length === 0 ? (
            <EmptyState label="No easy run data yet" />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={easyData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis
                  domain={[4.8, 6.2]}
                  reversed
                  tickFormatter={formatPace}
                  tick={{ fontSize: 11 }}
                  width={36}
                  className="fill-muted-foreground"
                />
                <Tooltip
                  formatter={(val) => formatPace(Number(val)) + '/km'}
                  contentStyle={{ fontSize: 12, borderRadius: 6 }}
                />
                <ReferenceLine
                  y={5 + 30 / 60}
                  stroke="#22c55e"
                  strokeDasharray="4 2"
                  label={{ value: 'Target zone', position: 'right', fontSize: 10, fill: '#22c55e' }}
                />
                <Line
                  dataKey="pace"
                  name="Avg Pace"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={(props) => {
                    const { cx, cy, payload } = props
                    return (
                      <circle
                        key={props.key}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={payload.isCurrentCycle ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                        strokeWidth={0}
                      />
                    )
                  }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex h-[180px] items-center justify-center text-sm text-muted-foreground">
      <i className="ri-bar-chart-2-line mr-2 text-base" />
      {label}
    </div>
  )
}
