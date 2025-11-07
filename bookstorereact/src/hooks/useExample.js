import { useEffect } from "react";

// PUBLIC_INTERFACE
export default function useExample(effect = () => {}) {
  /** Example hook showing how we can organize hooks directory for future logic. */
  useEffect(() => {
    effect();
  }, [effect]);
}
