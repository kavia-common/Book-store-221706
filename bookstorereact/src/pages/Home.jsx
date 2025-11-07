import React from 'react';
import { getTheme } from '../theme';

// PUBLIC_INTERFACE
export default function Home() {
  /** Placeholder Home route component showing a landing confirmation. */
  const { colors } = getTheme();
  return (
    <section>
      <h2 className="placeholder-title">Home</h2>
      <p>React frontend scaffolding is set up and running.</p>
      <div
        style={{
          display: 'inline-block',
          background: colors.secondary,
          color: colors.accent,
          borderRadius: 8,
          padding: '6px 10px',
          fontSize: 12,
          fontWeight: 600
        }}
      >
        primary {colors.primary} • secondary {colors.secondary}
      </div>
    </section>
  );
}
