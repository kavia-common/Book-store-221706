import React, { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, Container, Box, IconButton, Badge, Button, Drawer, List, ListItem, ListItemAvatar,
  Avatar, ListItemText, ListItemSecondaryAction, Icon, Divider
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useCart } from '../context/CartContext.jsx'
import { useUser } from '../context/UserContext.jsx'

export default function Layout() {
  const { state, totalItems, subtotal, remove, setQty } = useCart()
  const { user, logout } = useUser()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDrawer = (val) => () => setOpen(val)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <MenuBookIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none', mr: 2 }}>
            Book Store
          </Typography>

          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/catalog" color="inherit">Catalog</Button>

          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <>
              <Button component={Link} to="/profile" color="inherit" startIcon={<AccountCircleIcon />}>
                {user.name}
              </Button>
              <Button color="inherit" startIcon={<LogoutIcon />} onClick={() => { logout(); navigate('/'); }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit" startIcon={<LoginIcon />}>Login</Button>
              <Button component={Link} to="/register" color="inherit" startIcon={<PersonAddIcon />}>Register</Button>
            </>
          )}
          <IconButton color="inherit" onClick={toggleDrawer(true)} aria-label="cart">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3, flex: 1 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ bgcolor: 'primary.main', color: '#fff', py: 2, mt: 'auto' }}>
        <Container>
          <Typography variant="body2">© {new Date().getFullYear()} Book Store. All rights reserved.</Typography>
        </Container>
      </Box>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: { xs: 320, sm: 380 }, p: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {state.items.length === 0 && <Typography sx={{ p: 2 }}>Your cart is empty.</Typography>}
            {state.items.map(item => (
              <ListItem key={item.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar variant="rounded" src={item.image} alt={item.title} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={`$${item.price.toFixed(2)} • Qty: `}
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <input
                      aria-label={`Quantity for ${item.title}`}
                      type="number"
                      min={1}
                      max={99}
                      value={item.qty}
                      onChange={(e) => setQty(item.id, parseInt(e.target.value || '1', 10))}
                      style={{ width: 56, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
                    />
                    <IconButton edge="end" color="error" onClick={() => remove(item.id)} aria-label="remove">
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1">Subtotal</Typography>
            <Typography variant="subtitle1">${subtotal.toFixed(2)}</Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={state.items.length === 0}
            onClick={() => { setOpen(false); navigate('/checkout'); }}
          >
            Go to Checkout
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => { setOpen(false); navigate('/cart'); }}
          >
            View Cart Page
          </Button>
        </Box>
      </Drawer>
    </Box>
  )
}
