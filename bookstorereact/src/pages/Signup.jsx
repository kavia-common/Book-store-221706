import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
export default function Signup() {
  /** Signup page that matches Login visual style using form-panel and shared tokens. */
  const nav = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    contact: '',
    ic: '',
    gender: '',
    address: '',
  });
  const [error, setError] = useState('');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      nav('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="form-panel" role="region" aria-label="Signup panel">
      <div aria-hidden="true" style={{height:8}} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom:8 }}>
        <span aria-hidden="true" style={{
          display:'inline-block', width:48, height:28,
          backgroundImage:'url(/assets/php_login.svg)',
          backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'left center',
          marginRight:8
        }}/>
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 16px 0' }}>Create account</h1>
      {!!error && <div className="small" style={{ color: '#C62828', marginBottom: 12 }}>{error}</div>}
      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="name" className="label">Full Name</label>
          <input id="name" name="name" className="input" value={form.name} onChange={onChange} placeholder="Full Name" required />
        </div>
        <div className="field">
          <label htmlFor="username" className="label">Username</label>
          <input id="username" name="username" className="input" value={form.username} onChange={onChange} placeholder="User Name" required />
        </div>
        <div className="field">
          <label htmlFor="password" className="label">Password</label>
          <input id="password" type="password" name="password" className="input" value={form.password} onChange={onChange} placeholder="Password" required />
        </div>
        <div className="field">
          <label htmlFor="ic" className="label">IC Number</label>
          <input id="ic" name="ic" className="input" value={form.ic} onChange={onChange} placeholder="xxxxxx-xx-xxxx" />
        </div>
        <div className="field">
          <label htmlFor="email" className="label">Email</label>
          <input id="email" type="email" name="email" className="input" value={form.email} onChange={onChange} placeholder="example@email.com" />
        </div>
        <div className="field">
          <label htmlFor="contact" className="label">Mobile Number</label>
          <input id="contact" name="contact" className="input" value={form.contact} onChange={onChange} placeholder="012-3456789" />
        </div>
        <div className="field">
          <label htmlFor="gender" className="label">Gender</label>
          <select id="gender" name="gender" className="select" value={form.gender} onChange={onChange}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="address" className="label">Address</label>
          <textarea id="address" name="address" className="textarea" rows="3" value={form.address} onChange={onChange} placeholder="Address" />
        </div>
        <div className="toolbar" style={{ marginTop: 8, flexWrap: 'wrap' }}>
          <button className="btn" type="submit">Create account</button>
          <Link to="/" className="btn secondary" style={{ textDecoration: 'none' }}>Cancel</Link>
          <div className="spacer" />
          <Link to="/login" className="small">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}
