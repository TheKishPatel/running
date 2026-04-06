'use client'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Props {
  daysToRace: number
  weeksToRace: number
  currentWeek: number
  currentPhase: string
  pb5k: string
}

export function DashboardHeader({ daysToRace, weeksToRace, currentWeek, currentPhase, pb5k }: Props) {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: title + phase */}
          <div className="flex items-center gap-3">
            <i className="ri-run-line text-2xl text-primary" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Sub-20 Dashboard</h1>
              <p className="text-sm text-muted-foreground">{currentPhase} · Week {currentWeek}</p>
            </div>
          </div>

          {/* Right: stats row */}
          <div className="flex items-center gap-4 text-sm">
            <Stat
              icon="ri-trophy-line"
              label="5K PB"
              value={pb5k}
              highlight
            />
            <Separator orientation="vertical" className="h-8" />
            <Stat
              icon="ri-calendar-event-line"
              label="Race day"
              value={`${daysToRace}d`}
              sub={`${weeksToRace} weeks`}
            />
            <Separator orientation="vertical" className="h-8" />
            <Badge variant="secondary" className="gap-1.5 text-xs font-medium px-3 py-1.5">
              <i className="ri-flag-2-line text-xs" />
              Jun 28, 2026
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}

function Stat({
  icon,
  label,
  value,
  sub,
  highlight,
}: {
  icon: string
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <i className={`${icon} text-base text-muted-foreground`} />
      <div>
        <p className="text-xs text-muted-foreground leading-none mb-0.5">{label}</p>
        <p className={`font-semibold leading-none ${highlight ? 'text-primary' : ''}`}>{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
