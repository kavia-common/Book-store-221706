import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Login page visually mirrors PHP login.php:
 * - Uses header already in Layout
 * - Uses .container wrapper and .button classes
 */
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
    <div>
      <div className="container">
        <center><h1>Login</h1></center>
        {!!error && <div style={{ color:'red', marginBottom: 8, textAlign:'center' }}>{error}</div>}
        <form onSubmit={onSubmit} method="post">
          Username:<br/><input type="text" name="username" value={form.username} onChange={onChange} />
          <br/><br/>
          Password:<br/><input type="password" name="password" value={form.password} onChange={onChange} />
          <br/><br/>
          <input className="button" type="submit" value="Login"/>
          <Link to="/" className="button" style={{ textDecoration:'none', marginLeft:8 }}>Cancel</Link>
        </form>
      </div>
    </div>
  );
}
