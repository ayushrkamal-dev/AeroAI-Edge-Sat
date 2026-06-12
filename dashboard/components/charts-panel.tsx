import { MiniChart } from '@/components/mini-chart'

type ChartDef = {
  title: string
  value: string
  unit: string
  color: string
  data: number[]
}

const charts: ChartDef[] = [
  {
    title: 'Temperature Profile',
    value: '-12.4',
    unit: '°C',
    color: 'var(--chart-1)',
    data: [10, 7, 5, 2, 0, -3, -6, -8, -10, -11, -12, -12.4],
  },
  {
    title: 'Gas Concentration',
    value: '1840',
    unit: 'ppm',
    color: 'var(--chart-4)',
    data: [420, 460, 510, 590, 720, 880, 1040, 1260, 1480, 1660, 1780, 1840],
  },
  {
    title: 'Altitude',
    value: '12.4',
    unit: 'km',
    color: 'var(--chart-2)',
    data: [11.8, 11.9, 12, 12.1, 12.0, 12.2, 12.3, 12.3, 12.4, 12.4, 12.4, 12.4],
  },
  {
    title: 'Battery Discharge',
    value: '87.3',
    unit: '%',
    color: 'var(--chart-3)',
    data: [94, 93, 93, 92, 91, 90, 90, 89, 88, 88, 87.5, 87.3],
  },
]

export function ChartsPanel() {
  return (
    <section aria-labelledby="charts-heading">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-primary" />
          <h2
            id="charts-heading"
            className="font-heading text-sm font-semibold uppercase tracking-[0.18em]"
          >
            Signal Analytics
          </h2>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          last 60 min
        </span>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {charts.map((c) => (
          <article key={c.title} className="glass rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{c.title}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-heading text-xl font-bold tracking-tight">
                {c.value}
              </span>
              <span className="text-xs text-muted-foreground">{c.unit}</span>
            </div>
            <div className="mt-3">
              <MiniChart data={c.data} color={c.color} height={56} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
