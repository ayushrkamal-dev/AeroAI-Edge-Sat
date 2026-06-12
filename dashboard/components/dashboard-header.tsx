import { Clock, Globe, Signal, Zap } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'

const status = [
  { icon: Signal, label: 'Uplink', value: '98%', ok: true },
  { icon: Zap, label: 'Power', value: '87.3%', ok: true },
  { icon: Globe, label: 'Orbit', value: 'LEO', ok: true },
]

export function DashboardHeader() {
  return (
    <header className="glass-strong sticky top-0 z-30 border-b border-border/60">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-3">
        <div className="flex items-center gap-5">
          <BrandMark />
          <span className="hidden items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-success sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-telemetry" />
            Mission Active
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 sm:flex">
            {status.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 text-xs">
                <s.icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-heading font-semibold text-foreground">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-3 py-1.5 font-mono text-xs text-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            T+ 04:18:42 UTC
          </div>
        </div>
      </div>
    </header>
  )
}
