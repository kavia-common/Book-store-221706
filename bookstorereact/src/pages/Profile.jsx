import React, { useEffect, useState } from 'react'
import { Paper, Typography, TextField, Button, Grid, Alert } from '@mui/material'
import { useUser } from '../context/UserContext.jsx'

// PUBLIC_INTERFACE
export default function Profile() {
  /** Profile page allows editing user name and email locally without persistence to a backend. */
  const { user, updateProfileLocal } = useUser()
  const [form, setForm] = useState({ name: '', email: '' })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (user) setForm({ name: user.name || '', email: user.email || '' })
  }, [user])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function onSave(e) {
    e.preventDefault()
    if (form.name.trim().length < 2) {
      setMsg('Name must be at least 2 characters.')
      return
    }
    if (!/.+@.+\..+/.test(form.email)) {
      setMsg('Please enter a valid email.')
      return
    }
    updateProfileLocal(form)
    setMsg('Profile updated (local only).')
  }

  if (!user) return null

  return (
    <Paper sx={{ p: 3, maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Your Profile</Typography>
      {msg && <Alert severity="info" sx={{ mb: 2 }}>{msg}</Alert>}
      <Grid container spacing={2} component="form" onSubmit={onSave}>
        <Grid item xs={12}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">Save</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
