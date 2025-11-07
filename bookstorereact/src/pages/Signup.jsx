import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
export default function Signup() {
  /** Signup styled to match PHP register.php UI exactly using .container and .button. */
  const nav = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    ic: '',
    email: '',
    contact: '',
    gender: '',
    address: '',
  });
  const [error, setError] = useState('');

  const onChange = (e) => setForm((f)=>({ ...f, [e.target.name]: e.target.value }));

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
    <div>
      <div className="container">
        <form onSubmit={onSubmit}>
          <h1>Register:</h1>

          Full Name:<br/><input type="text" name="name" placeholder="Full Name" value={form.name} onChange={onChange} />
          <br/><br/>

          User Name:<br/><input type="text" name="username" placeholder="User Name" value={form.username} onChange={onChange} />
          <br/><br/>

          New Password:<br/><input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
          <br/><br/>

          IC Number:<br/><input type="text" name="ic" placeholder="xxxxxx-xx-xxxx" value={form.ic} onChange={onChange} />
          <br/><br/>

          E-mail:<br/><input type="text" name="email" placeholder="example@email.com" value={form.email} onChange={onChange} />
          <br/><br/>

          Mobile Number:<br/><input type="text" name="contact" placeholder="012-3456789" value={form.contact} onChange={onChange} />
          <br/><br/>

          <label>Gender:</label><br/>
          <label><input type="radio" name="gender" value="Male" checked={form.gender==='Male'} onChange={onChange}/>Male</label>
          <label style={{ marginLeft: 12 }}><input type="radio" name="gender" value="Female" checked={form.gender==='Female'} onChange={onChange}/>Female</label>
          <br/><br/>

          <label>Address:</label><br/>
          <textarea name="address" cols={50} rows={5} placeholder="Address" value={form.address} onChange={onChange} />
          <br/><br/>

          {!!error && <div style={{ color:'red', marginBottom:12 }}>{error}</div>}

          <input className="button" type="submit" value="Submit" />
          <Link to="/" className="button" style={{ textDecoration:'none', marginLeft:8 }}>Cancel</Link>
        </form>
      </div>
    </div>
  );
}
