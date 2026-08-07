import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTypewriter } from '../useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns empty string when trigger is false', () => {
    const { result } = renderHook(() =>
      useTypewriter('Hello', 50, false)
    );
    expect(result.current).toBe('');
  });

  it('types full text after enough time', () => {
    const { result } = renderHook(() =>
      useTypewriter('Hi', 50, true)
    );
    // "Hi" has 2 chars at 50ms each = 100ms total
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('Hi');
  });

  it('returns empty string initially when triggered', () => {
    const { result } = renderHook(() =>
      useTypewriter('Hello', 50, true)
    );
    expect(result.current).toBe('');
  });
});
