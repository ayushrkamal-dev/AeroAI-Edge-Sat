'use client'

import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from 'react-simple-maps'

const GEO_URL = '/countries-110m.json'

// Mission route checkpoints [lng, lat]
const route: [number, number][] = [
  [-74, 40.7], // New York
  [-30, 35],
  [10, 48], // Europe
  [55, 25], // Gulf
  [90, 23], // South Asia
  [121, 31], // Shanghai
]

const checkpoints: {
  coords: [number, number]
  label: string
  type: 'ok' | 'alert'
}[] = [
  { coords: [-74, 40.7], label: 'GS-01', type: 'ok' },
  { coords: [10, 48], label: 'GS-02', type: 'ok' },
  { coords: [55, 25], label: 'ANOMALY', type: 'alert' },
  { coords: [121, 31], label: 'GS-03', type: 'ok' },
]

export function MissionMap() {
  return (
    <section aria-labelledby="map-heading" className="glass rounded-xl p-4">
      <header className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-primary" />
          <h2
            id="map-heading"
            className="font-heading text-sm font-semibold uppercase tracking-[0.18em]"
          >
            Mission Trajectory
          </h2>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          orbit 4,218
        </span>
      </header>

      <div className="grid-overlay relative overflow-hidden rounded-lg border border-border/50 bg-surface/40">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 150 }}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="color-mix(in oklch, var(--secondary) 14%, transparent)"
                  stroke="color-mix(in oklch, var(--primary) 22%, transparent)"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      outline: 'none',
                      fill: 'color-mix(in oklch, var(--primary) 22%, transparent)',
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          <Line
            coordinates={route}
            stroke="var(--primary)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="4 5"
            className="animate-data-flow"
            fill="none"
          />

          {checkpoints.map((c) => (
            <Marker key={c.label} coordinates={c.coords}>
              <circle
                r={c.type === 'alert' ? 5 : 3.5}
                fill={
                  c.type === 'alert'
                    ? 'var(--destructive)'
                    : 'var(--primary)'
                }
                opacity={0.25}
              />
              <circle
                r={c.type === 'alert' ? 2.5 : 2}
                fill={
                  c.type === 'alert'
                    ? 'var(--destructive)'
                    : 'var(--primary)'
                }
              />
              <text
                textAnchor="middle"
                y={-8}
                className="font-mono"
                style={{
                  fill:
                    c.type === 'alert'
                      ? 'var(--destructive)'
                      : 'var(--muted-foreground)',
                  fontSize: 6,
                  letterSpacing: 0.5,
                }}
              >
                {c.label}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </section>
  )
}
