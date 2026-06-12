'use client'

import {
  Thermometer,
  Gauge,
  Droplets,
  Wind,
  BatteryFull,
  MapPin,
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react'
import { MiniChart } from '@/components/mini-chart'
import { useTelemetry } from '@/lib/telemetry-context'

type Metric = {
  icon: LucideIcon
  label: string
  value: string
  unit: string
  trend: number
  status: 'ok' | 'warn' | 'crit'
  data: number[]
  color: string
}

const metrics: Metric[] = [
  {
    icon: Thermometer,
    label: 'Temperature',
    value: '-12.4',
    unit: '°C',
    trend: -1.2,
    status: 'ok',
    color: 'var(--chart-1)',
    data: [8, 6, 4, 2, -1, -4, -7, -9, -11, -12],
  },
  {
    icon: Gauge,
    label: 'Pressure',
    value: '264',
    unit: 'hPa',
    trend: 0.6,
    status: 'ok',
    color: 'var(--chart-2)',
    data: [255, 258, 257, 260, 259, 261, 262, 263, 263, 264],
  },
  {
    icon: Droplets,
    label: 'Humidity',
    value: '38',
    unit: '%',
    trend: 2.1,
    status: 'ok',
    color: 'var(--chart-1)',
    data: [30, 31, 33, 32, 34, 35, 35, 37, 37, 38],
  },
  {
    icon: Wind,
    label: 'Air Quality',
    value: '184',
    unit: 'AQI',
    trend: 14.8,
    status: 'warn',
    color: 'var(--chart-4)',
    data: [90, 96, 104, 118, 130, 142, 155, 168, 178, 184],
  },
  {
    icon: BatteryFull,
    label: 'Battery',
    value: '87.3',
    unit: '%',
    trend: -0.4,
    status: 'ok',
    color: 'var(--chart-3)',
    data: [92, 91, 91, 90, 90, 89, 89, 88, 88, 87],
  },
  {
    icon: MapPin,
    label: 'GPS Lock',
    value: '11',
    unit: 'sats',
    trend: 0,
    status: 'ok',
    color: 'var(--chart-2)',
    data: [9, 10, 10, 11, 11, 10, 11, 11, 11, 11],
  },
]

const statusDot: Record<Metric['status'], string> = {
  ok: 'bg-success',
  warn: 'bg-warning',
  crit: 'bg-destructive',
}

export function TelemetryPanel() {
  const { temperature, pressure, humidity, airQuality, battery, gpsLock, isCritical } = useTelemetry()

  const liveMetrics = metrics.map(m => {
    if (m.label === 'Temperature') return { ...m, value: temperature.toString(), status: isCritical ? 'warn' : 'ok', trend: isCritical ? 12 : -1.2 }
    if (m.label === 'Pressure') return { ...m, value: pressure.toString(), status: isCritical ? 'crit' : 'ok', trend: isCritical ? -4.5 : 0.6 }
    if (m.label === 'Humidity') return { ...m, value: humidity.toString(), status: 'ok' }
    if (m.label === 'Air Quality') return { ...m, value: airQuality.toString(), status: isCritical ? 'crit' : 'ok', trend: isCritical ? 240 : 1.2 }
    if (m.label === 'Battery') return { ...m, value: battery.toString(), status: 'ok' }
    if (m.label === 'GPS Lock') return { ...m, value: gpsLock.toString(), status: 'ok' }
    return m
  })

  return (
    <section id="telemetry" aria-labelledby="telemetry-heading">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-primary" />
          <h2
            id="telemetry-heading"
            className="font-heading text-sm font-semibold uppercase tracking-[0.18em]"
          >
            Telemetry Systems
          </h2>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          6 sensors live
        </span>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {liveMetrics.map((m) => {
          const up = m.trend > 0
          const flat = m.trend === 0
          return (
            <article
              key={m.label}
              className="glass rounded-xl p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <m.icon className="h-4 w-4 text-primary" />
                  {m.label}
                </span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${statusDot[m.status]} ${
                    m.status !== 'ok' ? 'animate-telemetry' : ''
                  }`}
                />
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-2xl font-bold tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{m.unit}</span>
                </div>
                <span
                  className={`flex items-center gap-0.5 text-[11px] font-medium ${
                    flat
                      ? 'text-muted-foreground'
                      : up
                        ? m.status === 'warn'
                          ? 'text-warning'
                          : 'text-success'
                        : 'text-secondary'
                  }`}
                >
                  {!flat &&
                    (up ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    ))}
                  {flat ? 'stable' : `${up ? '+' : ''}${m.trend}%`}
                </span>
              </div>

              <div className="mt-2">
                <MiniChart data={m.data} color={m.color} />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
