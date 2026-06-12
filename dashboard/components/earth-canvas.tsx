'use client'

import dynamic from 'next/dynamic'

const EarthScene = dynamic(
  () => import('@/components/earth-scene').then((m) => m.EarthScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Acquiring orbital feed…
        </span>
      </div>
    ),
  },
)

export function EarthCanvas({
  interactive = false,
  className,
}: {
  interactive?: boolean
  className?: string
}) {
  return <EarthScene interactive={interactive} className={className} />
}
