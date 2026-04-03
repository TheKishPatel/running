'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import type { PhaseInfo } from '@/lib/types'

interface Props {
  phases: PhaseInfo[]
}

export function PhaseGates({ phases }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <i className="ri-checkpoint-line text-base text-muted-foreground" />
        <h2 className="text-base font-semibold">Phase Gate Progress</h2>
      </div>

      {/* Phase timeline strip */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {phases.map((phase, i) => (
          <PhaseChip key={i} phase={phase} index={i} />
        ))}
      </div>

      {/* Active phase gates */}
      {phases
        .filter((p) => p.status === 'in_progress' && p.gates.length > 0)
        .map((phase) => (
          <Card key={phase.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{phase.name}</CardTitle>
                <span className="text-xs text-muted-foreground">{phase.dateRange}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {phase.gates.map((gate) => (
                <div key={gate.id}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-2">
                      {gate.met ? (
                        <i className="ri-checkbox-circle-fill text-green-500 text-base" />
                      ) : gate.progress > 0 ? (
                        <i className="ri-time-line text-orange-400 text-base" />
                      ) : (
                        <i className="ri-circle-line text-muted-foreground text-base" />
                      )}
                      <span className={gate.met ? 'text-muted-foreground line-through' : ''}>
                        {gate.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {gate.current && (
                        <span className="text-xs text-muted-foreground">{gate.current}</span>
                      )}
                      <span className="text-xs font-medium tabular-nums w-8 text-right">
                        {gate.progress}%
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={gate.progress}
                    className={`h-1.5 ${gate.met ? 'bg-green-100' : ''}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

function PhaseChip({ phase, index }: { phase: PhaseInfo; index: number }) {
  const statusColors = {
    completed: 'bg-green-100 text-green-700 border-green-200',
    in_progress: 'bg-primary text-primary-foreground border-primary',
    upcoming: 'bg-muted text-muted-foreground border-border',
  }

  const statusIcons = {
    completed: 'ri-checkbox-circle-fill',
    in_progress: 'ri-loader-4-line',
    upcoming: 'ri-time-line',
  }

  return (
    <div
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${statusColors[phase.status]}`}
    >
      <i className={`${statusIcons[phase.status]} text-xs`} />
      <span>{phase.shortName}</span>
      <span className="opacity-60">{phase.weekRange}</span>
    </div>
  )
}
