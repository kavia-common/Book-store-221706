import React from 'react'
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, TextField, Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useCart } from '../context/CartContext.jsx'
import { useNavigate } from 'react-router-dom'

// PUBLIC_INTERFACE
export default function CartPage() {
  /** Dedicated cart page mirroring drawer functionality with totals and navigation to checkout. */
  const { state, setQty, remove, subtotal } = useCart()
  const navigate = useNavigate()

  if (state.items.length === 0) {
    return <Typography>Your cart is empty.</Typography>
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Your Cart</Typography>
      <Grid container spacing={2}>
        {state.items.map(item => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia component="img" image={item.image} sx={{ width: 120, objectFit: 'cover' }} />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">${item.price.toFixed(2)}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <TextField
                    label="Qty"
                    type="number"
                    size="small"
                    value={item.qty}
                    onChange={(e) => setQty(item.id, parseInt(e.target.value || '1', 10))}
                    inputProps={{ min: 1, max: 99 }}
                    sx={{ width: 96 }}
                  />
                  <IconButton color="error" onClick={() => remove(item.id)} aria-label="remove">
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2, alignItems: 'center' }}>
        <Typography variant="h6">Subtotal: ${subtotal.toFixed(2)}</Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/checkout')}>Checkout</Button>
      </Box>
    </Box>
  )
}
