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

  return (
    <div className="card" style={{ maxWidth: 460, margin: '0 auto' }}>
      <h2>Login</h2>
      {!!error && <div className="small" style={{ color:'crimson' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="field"><label className="label">Username</label><input name="username" className="input" value={form.username} onChange={onChange} required/></div>
        <div className="field"><label className="label">Password</label><input type="password" name="password" className="input" value={form.password} onChange={onChange} required/></div>
        <div className="toolbar" style={{ marginTop: 8 }}>
          <button className="btn" type="submit">Login</button>
          <Link to="/register" className="btn secondary" style={{ textDecoration:'none' }}>Register</Link>
        </div>
      </form>
    </div>
  );
}
