import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * Hook that handles click outside of the referenced element
 * @param ref - React ref object for the element to detect clicks outside of
 * @param handler - Function to call when a click outside is detected
 * @param enabled - Optional flag to enable/disable the hook
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: Handler,
  enabled: boolean = true,
): void => {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
};
