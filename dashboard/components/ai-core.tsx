'use client'

import { useMemo, useEffect, useState } from 'react'
import { BrainCircuit, ShieldAlert, Cpu, Activity } from 'lucide-react'
import { useTelemetry } from '@/lib/telemetry-context'

const layers = [3, 5, 5, 2]

function NeuralNet() {
  const { nodes, edges } = useMemo(() => {
    const w = 260
    const h = 150
    const padX = 24
    const padY = 18
    const colGap = (w - padX * 2) / (layers.length - 1)

    const nodes = layers.flatMap((count, li) => {
      const rowGap = (h - padY * 2) / (count - 1 || 1)
      return Array.from({ length: count }, (_, ni) => ({
        id: `${li}-${ni}`,
        x: padX + li * colGap,
        y: count === 1 ? h / 2 : padY + ni * rowGap,
        layer: li,
      }))
    })

    const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] =
      []
    for (let li = 0; li < layers.length - 1; li++) {
      const from = nodes.filter((n) => n.layer === li)
      const to = nodes.filter((n) => n.layer === li + 1)
      from.forEach((a) =>
        to.forEach((b) =>
          edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, key: `${a.id}-${b.id}` }),
        ),
      )
    }
    return { nodes, edges, w, h }
  }, [])

  return (
    <svg
      viewBox="0 0 260 150"
      className="h-auto w-full"
      aria-hidden="true"
    >
      {edges.map((e, i) => (
        <line
          key={e.key}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="var(--primary)"
          strokeOpacity="0.18"
          strokeWidth="0.6"
          strokeDasharray="3 4"
          className="animate-data-flow"
          style={{ animationDelay: `${(i % 7) * 0.25}s` }}
        />
      ))}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r="4.5"
            fill="var(--card)"
            stroke="var(--primary)"
            strokeWidth="1"
          />
          <circle
            cx={n.x}
            cy={n.y}
            r="2"
            fill="var(--primary)"
            className="animate-telemetry"
            style={{ animationDelay: `${(n.layer + 1) * 0.3}s` }}
          />
        </g>
      ))}
    </svg>
  )
}

function Stat({
  label,
  value,
  accent = 'text-primary',
}: {
  label: string
  value: string
  accent?: string
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-surface/50 px-3 py-2.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`font-heading text-sm font-semibold ${accent}`}>
        {value}
      </span>
    </div>
  )
}

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-heading font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function AiCore() {
  const { threatLevel, isCritical } = useTelemetry()
  const [confidence, setConfidence] = useState(0.987)

  // Slight jitter for realism
  useEffect(() => {
    const int = setInterval(() => {
      setConfidence(0.98 + Math.random() * 0.015)
    }, 2000)
    return () => clearInterval(int)
  }, [])

  return (
    <section aria-labelledby="ai-heading" className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-primary" />
          <h2
            id="ai-heading"
            className="font-heading text-sm font-semibold uppercase tracking-[0.18em]"
          >
            AI Intelligence Core
          </h2>
        </div>
        <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] ${isCritical ? 'text-destructive' : 'text-success'}`}>
          <span className={`h-1.5 w-1.5 rounded-full animate-telemetry ${isCritical ? 'bg-destructive' : 'bg-success'}`} />
          {isCritical ? 'THREAT DETECTED' : 'Inferring'}
        </span>
      </header>

      <div className={`glass rounded-xl p-4 transition-colors ${isCritical ? 'border-destructive/40 bg-destructive/5' : ''}`}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BrainCircuit className={`h-4 w-4 ${isCritical ? 'text-destructive' : 'text-primary'}`} />
          Neural Inference Network
        </div>
        <div className="mt-2 rounded-lg border border-border/50 bg-surface/40 p-2">
          <NeuralNet />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="TinyML Status" value="ONLINE" accent="text-success" />
        <Stat label="Model Health" value="98.4%" />
        <Stat label="Confidence" value={confidence.toFixed(3)} />
        <Stat label="Latency" value={isCritical ? '12 ms' : '42 ms'} />
      </div>

      <div className="glass flex flex-col gap-3 rounded-xl p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Environmental Risk
        </div>
        <Bar label="Atmospheric" value={isCritical ? 85 : 28} color={isCritical ? 'var(--warning)' : 'var(--success)'} />
        <Bar label="Gas Concentration" value={isCritical ? 98 : 14} color={isCritical ? 'var(--destructive)' : 'var(--success)'} />
        <Bar label="Structural" value={12} color="var(--success)" />
      </div>

      <div className={`glass flex items-center justify-between rounded-xl p-4 transition-colors ${isCritical ? 'border-destructive/50 bg-destructive/10' : ''}`}>
        <div className="flex items-center gap-3">
          <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${isCritical ? 'border-destructive/30 bg-destructive/20 text-destructive' : 'border-success/30 bg-success/10 text-success'}`}>
            <ShieldAlert className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Threat Analysis</p>
            <p className={`font-heading text-sm font-semibold ${isCritical ? 'text-destructive animate-pulse' : 'text-success'}`}>
              {threatLevel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Cpu className="h-3.5 w-3.5" />
          14 vectors
        </div>
      </div>
    </section>
  )
}
