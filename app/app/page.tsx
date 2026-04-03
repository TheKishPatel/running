import { getDashboardData } from '@/lib/data'
import { DashboardHeader } from '@/components/DashboardHeader'
import { TrendsChart } from '@/components/TrendsChart'
import { PhaseGates } from '@/components/PhaseGates'
import { RaceReadiness } from '@/components/RaceReadiness'

export default async function Home() {
  const data = getDashboardData()

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader
        daysToRace={data.daysToRace}
        weeksToRace={data.weeksToRace}
        currentWeek={data.currentWeek}
        currentPhase={data.currentPhase}
        pb5k={data.pb5k}
      />

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Charts: span 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <TrendsChart sessions={data.sessions} />
            <PhaseGates phases={data.phases} />
          </div>

          {/* Sidebar: race readiness */}
          <div className="lg:col-span-1">
            <RaceReadiness
              predictedRaceTimeMin={data.predictedRaceTimeMin}
              targetRaceTimeMin={data.targetRaceTimeMin}
              pb5k={data.pb5k}
              injuryFlag={data.injuryFlag}
              weeksToRace={data.weeksToRace}
              currentWeek={data.currentWeek}
              latestThresholdPaceMin={data.latestThresholdPaceMin}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
