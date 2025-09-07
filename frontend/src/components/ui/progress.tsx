import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  className?: string;
  delayMs?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>((
  { className = '', value = 0, max = 100, delayMs = 0, ...props },
  ref
) => {
  const [displayed, setDisplayed] = React.useState(0);
  const target = Math.min(Math.max((value / max) * 100, 0), 100);
  const previous = React.useRef(0);
  const rafId = React.useRef<number | null>(null);

  React.useEffect(() => {
    const startTime = performance.now() + delayMs;
    const duration = 700; // ms
    const from = previous.current;
    const to = target;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (now < startTime) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      const next = from + (to - from) * eased;
      setDisplayed(next);
      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        previous.current = to;
      }
    };

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [target, delayMs]);

  return (
    <div
      ref={ref}
      className={`relative h-3 w-full overflow-hidden rounded-full bg-slate-700/50 ${className}`}
      {...props}
    >
      {/* Track */}
      <div className="absolute inset-0 rounded-full" />

      {/* Fill */}
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_0_12px_rgba(59,130,246,0.35)] transition-[width] duration-200 ease-out will-change-transform"
        style={{ width: `${displayed}%` }}
      />

      {/* Shimmer highlight */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        aria-hidden="true"
      >
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer rounded-full" />
      </div>
    </div>
  );
});
Progress.displayName = 'Progress';

export { Progress };
