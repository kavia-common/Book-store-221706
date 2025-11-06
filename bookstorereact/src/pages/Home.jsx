import React from 'react'
import { Box, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material'
import { books } from '../data/books.js'
import { useCart } from '../context/CartContext.jsx'

export default function Home() {
  const featured = books.slice(0, 3)
  const { add } = useCart()

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Welcome to the Book Store</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>Discover our featured titles.</Typography>

      <Grid container spacing={2}>
        {featured.map(b => (
          <Grid item xs={12} sm={6} md={4} key={b.id}>
            <Card>
              <CardMedia component="img" height="160" image={b.image} alt={b.title} />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>{b.title}</Typography>
                <Typography variant="body2" color="text.secondary">{b.author}</Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>${b.price.toFixed(2)}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={() => add({ id: b.id, title: b.title, price: b.price, image: b.image }, 1)}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
