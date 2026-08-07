import { animate, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Animates a number from 0 to `target` over `duration` seconds.
 * Returns the current display value (integer).
 *
 * @param target  - The number to count up to
 * @param duration - Animation duration in seconds (default 1.5)
 * @param trigger  - When false, stays at 0; when true, starts counting (default true)
 */
export function useCountUp(
  target: number,
  duration: number = 1.5,
  trigger: boolean = true
): number {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setDisplay(0);
      return;
    }
    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, duration, trigger, prefersReducedMotion]);

  return display;
}
