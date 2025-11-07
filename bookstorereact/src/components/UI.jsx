import React from 'react';
import '../styles/php-theme.css';

// PUBLIC_INTERFACE
export function Button({ variant = 'primary', className = '', ...props }) {
  /** Button styled per PHP .button/.btn/.cbtn variants. */
  const base =
    variant === 'primary' ? 'button' :
    variant === 'accent' ? 'btn' :
    'cbtn';
  return <button className={`${base} ${className}`} {...props} />;
}

// PUBLIC_INTERFACE
export function Table({ columns = [], data = [], header = null, style = {}, className = '' }) {
  /** Generic table matching PHP table style (blue header, white rows). */
  return (
    <table className={className} style={style}>
      {header}
      <thead>
        <tr>
          {columns.map((c, idx) => (
            <th key={idx} style={{ textAlign: 'left' }}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, r) => (
          <tr key={r}>
            {columns.map((c, ci) => (
              <td key={ci}>{typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// PUBLIC_INTERFACE
export function FormField({ label, type = 'text', name, value, onChange, placeholder, children }) {
  /** Input field with PHP form style and label. */
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>}
      {type === 'textarea' ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={5} style={{ width: '100%' }} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      )}
      {children}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Modal({ open, title, children, onClose, actions }) {
  /** Simple modal matching theme spacing and typography. */
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" style={overlayStyle}>
      <div className="card" style={modalStyle}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <div>{children}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          {actions}
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  zIndex: 1000
};

const modalStyle = {
  width: 'min(560px, 96vw)'
};
