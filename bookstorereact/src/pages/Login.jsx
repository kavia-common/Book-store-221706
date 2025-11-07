import React, { useState } from 'react';
import { Button, FormField } from '../components/UI.jsx';
import '../styles/php-theme.css';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login page visually consistent with PHP login.php */
  const [form, setForm] = useState({ username: '', pwd: '' });
  return (
    <blockquote>
      <div className="container">
        <center><h1>Login</h1></center>
        <form onSubmit={(e) => { e.preventDefault(); alert('Login (stub)'); }}>
          <FormField
            label="Username:"
            name="username"
            value={form.username}
            onChange={(e) => setForm(s => ({ ...s, username: e.target.value }))}
          />
          <br />
          <FormField
            label="Password:"
            type="password"
            name="pwd"
            value={form.pwd}
            onChange={(e) => setForm(s => ({ ...s, pwd: e.target.value }))}
          />
          <br />
          <Button type="submit" className="button">Login</Button>{' '}
          <Button type="button" className="button" onClick={() => history.back()}>Cancel</Button>
        </form>
      </div>
    </blockquote>
  );
}
