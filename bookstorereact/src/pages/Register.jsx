import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration form with basic validation; updates mock user context. */
  const { register } = useUser()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.name.trim().length < 2) return setError('Name must be at least 2 characters.')
    if (!/.+@.+\..+/.test(form.email)) return setError('Valid email is required.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Register failed.')
    }
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 480, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={onSubmit}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} type="email" fullWidth sx={{ mb: 2 }} required />
        <TextField label="Password" name="password" value={form.password} onChange={handleChange} type="password" fullWidth sx={{ mb: 2 }} required />
        <Button type="submit" variant="contained" fullWidth>Create Account</Button>
      </Box>
    </Paper>
  )
}
