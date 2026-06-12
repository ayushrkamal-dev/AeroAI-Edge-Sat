'use client'

import dynamic from 'next/dynamic'
import { Satellite, Gauge, Navigation, Wifi } from 'lucide-react'

const EarthScene = dynamic(
  () => import('@/components/earth-scene').then((m) => m.EarthScene),
  { ssr: false },
)

const readout = [
  { icon: Navigation, label: 'Altitude', value: '12.4 km' },
  { icon: Gauge, label: 'Velocity', value: '287 km/h' },
  { icon: Wifi, label: 'Status', value: 'Connected', ok: true },
]

export function EarthViewport() {
  return (
    <section
      aria-label="Live orbital view"
      className="glass relative overflow-hidden rounded-2xl"
    >
      {/* radar sweep accent */}
      <div className="pointer-events-none absolute right-4 top-4 z-10 h-16 w-16 opacity-40">
        <div className="absolute inset-0 rounded-full border border-primary/30" />
        <div className="absolute inset-0 origin-center animate-radar">
          <div
            className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom"
            style={{
              background:
                'linear-gradient(to top, var(--primary), transparent)',
            }}
          />
        </div>
      </div>

      {/* satellite ID card */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2.5 rounded-lg border border-primary/30 bg-surface/70 px-3 py-2 backdrop-blur-md">
        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
          <Satellite className="h-4 w-4" />
        </span>
        <div className="leading-none">
          <p className="font-heading text-sm font-bold tracking-tight">
            AeroAI-01
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Payload Active
          </p>
        </div>
      </div>

      {/* 3D Earth */}
      <EarthScene interactive className="h-[420px] w-full md:h-[480px]" />

      {/* bottom telemetry readout */}
      <div className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-3 gap-px border-t border-border/60 bg-surface/40 backdrop-blur-md">
        {readout.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-center gap-2 px-3 py-3 text-center"
          >
            <r.icon className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] text-muted-foreground">{r.label}</span>
            <span
              className={`font-heading text-xs font-semibold ${
                r.ok ? 'text-success' : 'text-foreground'
              }`}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
