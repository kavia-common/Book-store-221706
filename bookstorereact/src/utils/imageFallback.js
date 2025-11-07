export const PLACEHOLDER_SRC = '/assets/cover-placeholder.svg';

/**
 * PUBLIC_INTERFACE
 * Returns an onError handler that swaps the image source to a neutral placeholder
 * exactly once to avoid infinite loops.
 */
export function withImageFallback(placeholder = PLACEHOLDER_SRC) {
  return function onError(e) {
    const img = e?.currentTarget;
    if (!img) return;
    // Prevent loops: only replace if not already set to placeholder
    if (img.dataset.fallbackApplied === '1') return;
    img.dataset.fallbackApplied = '1';
    img.src = placeholder;
  };
}
