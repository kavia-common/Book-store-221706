import React from 'react';
import { getTheme } from '../theme';
import '../styles/php-theme.css';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page with theme badge and welcome text, PHP-like spacing. */
  const { colors } = getTheme();
  return (
    <blockquote>
      <div className="container">
        <center><h1 style={{ marginTop: 0 }}>Welcome to Book Store</h1></center>
        <p>This React UI mirrors the PHP app layout and theme.</p>
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
      </div>
    </blockquote>
  );
}
