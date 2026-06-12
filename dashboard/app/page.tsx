import Link from 'next/link'
import {
  ArrowRight,
  Activity,
  Cpu,
  Radio,
  ShieldCheck,
  Gauge,
  Globe2,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { BrandMark } from '@/components/brand-mark'
import { SpaceBackdrop } from '@/components/space-backdrop'
import { EarthCanvas } from '@/components/earth-canvas'

const stats = [
  { label: 'AI Accuracy', value: '99.2%', icon: Cpu },
  { label: 'Monitoring', value: 'Real-Time', icon: Activity },
  { label: 'On-Device', value: 'TinyML', icon: ShieldCheck },
  { label: 'Architecture', value: 'Edge Compute', icon: Radio },
]

const capabilities = [
  {
    icon: Globe2,
    title: 'Orbital Environmental Sensing',
    body: 'Continuous atmospheric, thermal and gas telemetry streamed from the AeroAI-01 payload.',
  },
  {
    icon: Cpu,
    title: 'TinyML Edge Inference',
    body: 'On-device neural models classify anomalies in milliseconds — no ground round-trip required.',
  },
  {
    icon: Gauge,
    title: 'Predictive Threat Analysis',
    body: 'Confidence-scored risk modeling flags methane spikes and system faults before they escalate.',
  },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <SpaceBackdrop />

      {/* Nav */}
      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <BrandMark />
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#capabilities" className="transition-colors hover:text-foreground">
              Capabilities
            </a>
            <Link
              href="/mission-control#telemetry"
              className="transition-colors hover:text-foreground"
            >
              Telemetry
            </Link>
            <span className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              SYSTEMS NOMINAL
            </span>
          </div>
          <Link
            href="/mission-control"
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              className: 'border-primary/30',
            })}
          >
            Open Ground Control
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        {/* Earth canvas as background centerpiece */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
          <EarthCanvas className="h-[115vh] w-full max-w-6xl translate-y-[18vh] opacity-95" />
        </div>

        {/* Readability scrim */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 38%, oklch(0.16 0.04 250 / 0.85) 0%, oklch(0.16 0.04 250 / 0.4) 45%, transparent 75%)',
          }}
        />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 pt-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
            <Radio className="h-3.5 w-3.5" />
            Next Generation Edge Intelligence
          </div>

          <h1 className="mt-8 max-w-4xl font-heading text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
            AeroAI{' '}
            <span className="text-primary text-glow-cyan">Edge-Sat</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
            AI-Powered Edge Intelligence for Next Generation Environmental
            Monitoring — a miniature aerospace mission control platform.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/mission-control"
              className={buttonVariants({
                size: 'lg',
                className: 'glow-cyan h-11 px-6 text-sm',
              })}
            >
              Launch Mission
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/mission-control"
              className={buttonVariants({
                variant: 'secondary',
                size: 'lg',
                className: 'h-11 px-6 text-sm',
              })}
            >
              Open Ground Control
            </Link>
            <Link
              href="/mission-control#telemetry"
              className={buttonVariants({
                variant: 'ghost',
                size: 'lg',
                className: 'h-11 px-6 text-sm text-muted-foreground',
              })}
            >
              View Telemetry
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-6">
        <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-2 bg-card/40 px-6 py-7 text-center"
            >
              <s.icon className="h-5 w-5 text-primary" />
              <span className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section
        id="capabilities"
        className="relative z-10 mx-auto max-w-6xl px-6 py-28"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
            Mission Capabilities
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Built for organizations that operate at the edge of the atmosphere
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className="glass group rounded-2xl p-7 transition-colors hover:border-primary/30"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all group-hover:glow-cyan">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-32">
        <div className="glass-strong relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16">
          <div className="grid-overlay absolute inset-0 opacity-40" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Step into the AeroAI command center
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
              Live orbital telemetry, AI intelligence core, and real-time threat
              analysis — all in one mission control surface.
            </p>
            <Link
              href="/mission-control"
              className={buttonVariants({
                size: 'lg',
                className: 'glow-cyan mt-8 h-11 px-7',
              })}
            >
              Enter Mission Control
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground md:flex-row">
          <BrandMark />
          <span>
            AeroAI Edge-Sat — Aerospace Mission Control Platform · Concept
          </span>
        </div>
      </footer>
    </div>
  )
}
