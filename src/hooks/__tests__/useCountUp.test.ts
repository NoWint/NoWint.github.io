import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCountUp } from '../useCountUp';

// Mock useReducedMotion to return false by default
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useReducedMotion: () => false,
  };
});

describe('useCountUp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('returns 0 when trigger is false', () => {
    const { result } = renderHook(() => useCountUp(100, 1, false));
    expect(result.current).toBe(0);
  });

  it('returns target immediately when trigger is false even after time passes', () => {
    const { result } = renderHook(() => useCountUp(42, 1, false));
    vi.advanceTimersByTime(2000);
    expect(result.current).toBe(0);
  });

  it('eventually reaches target when trigger is true', () => {
    const { result } = renderHook(() => useCountUp(100, 1, true));
    // Advance past the animation duration
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current).toBe(100);
  });
});
