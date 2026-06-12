import type { Metadata } from 'next'
import { SpaceBackdrop } from '@/components/space-backdrop'
import { DashboardHeader } from '@/components/dashboard-header'
import { TelemetryPanel } from '@/components/telemetry-panel'
import { AiCore } from '@/components/ai-core'
import { EarthViewport } from '@/components/earth-viewport'
import { AlertCenter } from '@/components/alert-center'
import { ChartsPanel } from '@/components/charts-panel'
import { MissionMap } from '@/components/mission-map'

export const metadata: Metadata = {
  title: 'Mission Control | AeroAI Edge-Sat',
  description:
    'Live orbital telemetry, AI intelligence core, threat analysis and mission trajectory for the AeroAI-01 payload.',
}

export default function MissionControlPage() {
  return (
    <div className="relative min-h-screen">
      <SpaceBackdrop />
      <DashboardHeader />

      <main className="mx-auto max-w-[1600px] px-5 py-6">
        {/* Command-center: telemetry | earth + alerts | AI core */}
        <div className="grid gap-6 xl:grid-cols-12">
          {/* Left — Telemetry */}
          <div className="xl:col-span-3">
            <TelemetryPanel />
          </div>

          {/* Center — Earth centerpiece + alerts */}
          <div className="flex flex-col gap-6 xl:col-span-6">
            <EarthViewport />
            <AlertCenter />
          </div>

          {/* Right — AI Intelligence Core */}
          <div className="xl:col-span-3">
            <AiCore />
          </div>
        </div>

        {/* Charts */}
        <div className="mt-6">
          <ChartsPanel />
        </div>

        {/* Map */}
        <div className="mt-6">
          <MissionMap />
        </div>

        <footer className="mt-10 border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
          AeroAI Edge-Sat — Aerospace Mission Control Platform · All telemetry
          values are demonstration data
        </footer>
      </main>
    </div>
  )
}
