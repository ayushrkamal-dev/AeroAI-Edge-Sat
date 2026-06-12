export function SpaceBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-background" />
      {/* radial atmospheric glow */}
      <div
        className="absolute left-1/2 top-1/3 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--secondary) 22%, transparent) 0%, transparent 60%)',
        }}
      />
      {/* grid overlay */}
      <div className="grid-overlay absolute inset-0 opacity-50" />
      {/* faint stars */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent), radial-gradient(1px 1px at 85% 15%, white, transparent), radial-gradient(1px 1px at 55% 45%, white, transparent), radial-gradient(1px 1px at 10% 70%, white, transparent), radial-gradient(1px 1px at 90% 90%, white, transparent)',
          backgroundSize: '100% 100%',
        }}
      />
      {/* top + bottom vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
