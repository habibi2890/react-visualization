export function ProgressRing({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex items-center gap-4">
      <div
        className="grid size-20 place-items-center rounded-full"
        style={{
          background: `conic-gradient(var(--primary) ${clamped}%, color-mix(in srgb, var(--border) 80%, transparent) 0)`,
        }}
        aria-label={`${label}: ${clamped}% complete`}
        role="img"
      >
        <div className="grid size-14 place-items-center rounded-full bg-surface text-sm font-bold">
          {clamped}%
        </div>
      </div>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted">visual path progress</p>
      </div>
    </div>
  );
}
