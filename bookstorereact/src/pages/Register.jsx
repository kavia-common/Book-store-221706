import React, { useState } from 'react';
import { Button, FormField } from '../components/UI.jsx';
import '../styles/php-theme.css';

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration form visually aligned with PHP register.php */
  const [form, setForm] = useState({
    name: '', uname: '', upassword: '',
    ic: '', email: '', contact: '',
    gender: '', address: ''
  });

  function setField(k, v) { setForm(s => ({ ...s, [k]: v })); }

  return (
    <blockquote>
      <div className="container">
        <form onSubmit={(e) => { e.preventDefault(); alert('Register (stub)'); }}>
          <h1>Register:</h1>

          <FormField label="Full Name:" name="name" value={form.name} onChange={(e) => setField('name', e.target.value)} placeholder="Full Name" />
          <FormField label="User Name:" name="uname" value={form.uname} onChange={(e) => setField('uname', e.target.value)} placeholder="User Name" />
          <FormField label="New Password:" type="password" name="upassword" value={form.upassword} onChange={(e) => setField('upassword', e.target.value)} placeholder="Password" />
          <FormField label="IC Number:" name="ic" value={form.ic} onChange={(e) => setField('ic', e.target.value)} placeholder="xxxxxx-xx-xxxx" />
          <FormField label="E-mail:" name="email" value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="example@email.com" />
          <FormField label="Mobile Number:" name="contact" value={form.contact} onChange={(e) => setField('contact', e.target.value)} placeholder="012-3456789" />

          <div style={{ marginBottom: 12 }}>
            <label>Gender:</label><br />
            <label><input type="radio" name="gender" checked={form.gender === 'Male'} onChange={() => setField('gender', 'Male')} /> Male</label>{' '}
            <label><input type="radio" name="gender" checked={form.gender === 'Female'} onChange={() => setField('gender', 'Female')} /> Female</label>
          </div>

          <FormField label="Address:" type="textarea" name="address" value={form.address} onChange={(e) => setField('address', e.target.value)} placeholder="Address" />

          <Button type="submit" className="button">Submit</Button>{' '}
          <Button type="button" className="button" onClick={() => window.history.back()}>Cancel</Button>
        </form>
      </div>
    </blockquote>
  );
}
