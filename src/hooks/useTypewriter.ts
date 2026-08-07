import { useEffect, useState } from 'react';

/**
 * Reveals text character by character at `speed` ms per character.
 *
 * @param text    - The full text to type out
 * @param speed   - Milliseconds per character (default 50)
 * @param trigger - When false, returns empty string; when true, starts typing (default true)
 */
export function useTypewriter(
  text: string,
  speed: number = 50,
  trigger: boolean = true
): string {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (!trigger) {
      setDisplay('');
      return;
    }
    let i = 0;
    setDisplay('');
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        return;
      }
      i++;
      setDisplay(text.slice(0, i));
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, trigger]);

  return display;
}
