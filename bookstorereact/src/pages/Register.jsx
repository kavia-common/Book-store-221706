import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const nav = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ username:'', password:'', name:'', email:'', contact:'', ic:'', gender:'', address:'' });
  const [error, setError] = useState('');
  const onChange = (e)=> setForm((f)=>({ ...f, [e.target.name]: e.target.value }));

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
    <div className="card">
      <h2>Register</h2>
      {!!error && <div className="small" style={{ color:'crimson' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="field"><label className="label">Full Name</label><input name="name" className="input" value={form.name} onChange={onChange} required/></div>
        <div className="field"><label className="label">Username</label><input name="username" className="input" value={form.username} onChange={onChange} required/></div>
        <div className="field"><label className="label">Password</label><input type="password" name="password" className="input" value={form.password} onChange={onChange} required/></div>
        <div className="field"><label className="label">IC Number</label><input name="ic" className="input" value={form.ic} onChange={onChange}/></div>
        <div className="field"><label className="label">Email</label><input type="email" name="email" className="input" value={form.email} onChange={onChange}/></div>
        <div className="field"><label className="label">Mobile Number</label><input name="contact" className="input" value={form.contact} onChange={onChange}/></div>
        <div className="field"><label className="label">Gender</label>
          <select name="gender" className="select" value={form.gender} onChange={onChange}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="field"><label className="label">Address</label><textarea name="address" className="textarea" rows="3" value={form.address} onChange={onChange}/></div>
        <div className="toolbar" style={{ marginTop: 8 }}>
          <button className="btn" type="submit">Create account</button>
          <button type="button" className="btn secondary" onClick={()=>nav('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
