import Link from 'next/link'
import { Satellite } from 'lucide-react'

export function BrandMark({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-3">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 glow-cyan">
        <Satellite className="h-5 w-5 text-primary" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-sm font-bold tracking-tight text-foreground">
          AeroAI <span className="text-primary">Edge-Sat</span>
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Mission Control
        </span>
      </span>
    </Link>
  )
}
