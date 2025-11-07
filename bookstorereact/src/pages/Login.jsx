import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ username:'', password:'' });
  const [error, setError] = useState('');

  const onChange = (e)=> setForm((f)=>({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.username, form.password);
      const redirectTo = (location.state && location.state.from) || '/';
      nav(redirectTo);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const inputErrorStyle = error ? { borderColor: '#C62828', boxShadow:'0 0 0 2px rgba(198,40,40,0.12)' } : {};

  return (
    <div className="form-panel" role="region" aria-label="Login panel">
      <div aria-hidden="true" style={{height:8}} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom:8 }}>
        <span aria-hidden="true" style={{
          display:'inline-block', width:48, height:28,
          backgroundImage:'url(/assets/php_login.png)',
          backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'left center',
          marginRight:8
        }}/>
      </div>
      <h1 style={{ fontSize:24, fontWeight:600, margin:'0 0 16px 0' }}>Login</h1>
      {!!error && <div className="small" style={{ color:'#C62828', marginBottom:12 }}>{error}</div>}
      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label className="label" htmlFor="username">Username or Email</label>
          <input
            id="username"
            name="username"
            className="input"
            value={form.username}
            onChange={onChange}
            aria-invalid={!!error}
            style={inputErrorStyle}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="input"
            value={form.password}
            onChange={onChange}
            aria-invalid={!!error}
            style={inputErrorStyle}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="toolbar" style={{ marginTop: 8, flexWrap:'wrap' }}>
          <button className="btn" type="submit">Login</button>
          <Link to="/" className="btn secondary" style={{ textDecoration:'none' }}>Cancel</Link>
          <div className="spacer" />
          <Link to="/register" className="small">Create account</Link>
        </div>
      </form>
    </div>
  );
}
