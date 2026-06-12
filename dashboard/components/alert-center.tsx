'use client'

import { AlertTriangle, Activity, Radio, CheckCircle2 } from 'lucide-react'
import { useTelemetry } from '@/lib/telemetry-context'

type Alert = {
  level: 'critical' | 'warning' | 'info'
  title: string
  detail: string
  meta: string
  time: string
}

const alerts: Alert[] = [
  {
    level: 'critical',
    title: 'METHANE SPIKE DETECTED',
    detail: 'Sector 7G · Confidence 98.7% · Threat Level HIGH',
    meta: 'CH₄ 1840 ppm',
    time: 'now',
  },
  {
    level: 'warning',
    title: 'Air Quality Degrading',
    detail: 'AQI trending upward beyond nominal band',
    meta: 'AQI 184',
    time: '2m',
  },
  {
    level: 'info',
    title: 'Orbit Adjustment Complete',
    detail: 'AeroAI-01 station-keeping burn nominal',
    meta: 'Δv 0.4 m/s',
    time: '11m',
  },
]

const styles = {
  critical: {
    wrap: 'border-destructive/50 animate-pulse-ring',
    glow: 'bg-destructive/10',
    icon: 'text-destructive',
    Icon: AlertTriangle,
    tag: 'text-destructive',
  },
  warning: {
    wrap: 'border-warning/40',
    glow: 'bg-warning/10',
    icon: 'text-warning',
    Icon: Activity,
    tag: 'text-warning',
  },
  info: {
    wrap: 'border-secondary/40',
    glow: 'bg-secondary/10',
    icon: 'text-secondary',
    Icon: Radio,
    tag: 'text-secondary',
  },
} as const

export function AlertCenter() {
  const { alerts, isCritical } = useTelemetry()

  return (
    <section aria-labelledby="alert-heading">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-destructive" />
          <h2
            id="alert-heading"
            className="font-heading text-sm font-semibold uppercase tracking-[0.18em]"
          >
            Alert Center
          </h2>
        </div>
        <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] ${isCritical ? 'text-destructive' : 'text-success'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isCritical ? 'bg-destructive animate-telemetry' : 'bg-success'}`} />
          {isCritical ? '1 critical' : 'nominal'}
        </span>
      </header>

      <div className="flex flex-col gap-3">
        {alerts.map((a) => {
          const s = styles[a.level]
          return (
            <article
              key={a.title}
              className={`glass relative overflow-hidden rounded-xl border ${s.wrap} p-4`}
            >
              <div className={`absolute inset-0 ${s.glow}`} aria-hidden="true" />
              <div className="relative flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-current/20 ${s.icon}`}
                >
                  <s.Icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`font-heading text-sm font-semibold tracking-tight ${s.tag}`}
                    >
                      {a.title}
                    </h3>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {a.time}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {a.detail}
                  </p>
                  <span className="mt-2 inline-block rounded-md border border-border/60 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                    {a.meta}
                  </span>
                </div>
              </div>
            </article>
          )
        })}

        <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-xs ${isCritical ? 'border-destructive/30 bg-destructive/5 text-destructive' : 'border-success/30 bg-success/5 text-success'}`}>
          <CheckCircle2 className="h-4 w-4" />
          {isCritical ? 'Warning: Core life-support parameters exceeding safety thresholds' : 'Core life-support and power systems nominal'}
        </div>
      </div>
    </section>
  )
}
