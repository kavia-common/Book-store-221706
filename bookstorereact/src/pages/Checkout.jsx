import React from 'react'
import { Box, Typography, Grid, Card, CardContent, CardMedia, Divider, Paper, TextField } from '@mui/material'
import { useCart } from '../context/CartContext.jsx'

// PUBLIC_INTERFACE
export default function Checkout() {
  /** Read-only checkout summary with address/payment placeholders (no submission). */
  const { state, subtotal } = useCart()
  const shipping = state.items.length ? 5 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Checkout</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Order Items</Typography>
            {state.items.length === 0 && <Typography>No items in cart.</Typography>}
            {state.items.map(item => (
              <Card key={item.id} sx={{ display: 'flex', mb: 1 }}>
                <CardMedia component="img" image={item.image} sx={{ width: 100 }} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">${item.price.toFixed(2)} • Qty: {item.qty}</Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Shipping Address (placeholder)</Typography>
            <TextField label="Full Name" fullWidth sx={{ mb: 1 }} />
            <TextField label="Address" fullWidth sx={{ mb: 1 }} />
            <TextField label="City" fullWidth sx={{ mb: 1 }} />
            <TextField label="Postal Code" fullWidth sx={{ mb: 1 }} />
            <TextField label="Country" fullWidth />
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Payment (placeholder)</Typography>
            <TextField label="Card Number" fullWidth sx={{ mb: 1 }} />
            <TextField label="Expiry" fullWidth sx={{ mb: 1 }} />
            <TextField label="CVC" fullWidth />
          </Paper>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Summary</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Shipping</Typography>
              <Typography>${shipping.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Tax (10%)</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              This is a demo checkout. No payment is processed.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
