'use client'

import { useId } from 'react'

type MiniChartProps = {
  data: number[]
  color?: string
  height?: number
  className?: string
  area?: boolean
}

/**
 * Aerospace-grade sparkline: transparent background, thin glowing line,
 * optional area fill and end-point glow.
 */
export function MiniChart({
  data,
  color = 'var(--primary)',
  height = 44,
  className,
  area = true,
}: MiniChartProps) {
  const id = useId()
  const width = 100
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((d - min) / range) * (height - 8) - 4
    return [x, y] as const
  })

  const line = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ')

  const areaPath = `${line} L${width},${height} L0,${height} Z`
  const [lastX, lastY] = points[points.length - 1]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={{ width: '100%', height }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* grid lines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2={width}
          y1={height * g}
          y2={height * g}
          stroke="white"
          strokeOpacity="0.04"
          strokeWidth="0.5"
        />
      ))}

      {area && <path d={areaPath} fill={`url(#fill-${id})`} />}
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#glow-${id})`}
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={lastX} cy={lastY} r="2" fill={color} filter={`url(#glow-${id})`} />
    </svg>
  )
}
