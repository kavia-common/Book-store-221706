import React, { useMemo, useState } from 'react'
import {
  Box, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, TextField, MenuItem, Select, InputLabel, FormControl, Pagination
} from '@mui/material'
import { books, categories } from '../data/books.js'
import { useCart } from '../context/CartContext.jsx'

export default function Catalog() {
  // Mock-only catalog: search/filter/sort against local data; no API calls.
  const { add } = useCart()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('title')
  const [page, setPage] = useState(1)
  const perPage = 6

  const filtered = useMemo(() => {
    let list = books.filter(b => {
      const matchQ = q.trim().length === 0 ||
        b.title.toLowerCase().includes(q.toLowerCase()) ||
        b.author.toLowerCase().includes(q.toLowerCase()) ||
        b.isbn.toLowerCase().includes(q.toLowerCase())
      const matchC = cat === 'All' || b.category === cat
      return matchQ && matchC
    })
    if (sort === 'title') list = list.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'price_asc') list = list.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list = list.sort((a, b) => b.price - a.price)
    return list
  }, [q, cat, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Catalog</Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search by title, author, ISBN"
            fullWidth
            value={q}
            onChange={e => { setQ(e.target.value); setPage(1); }}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="cat-label">Category</InputLabel>
            <Select
              labelId="cat-label"
              label="Category"
              value={cat}
              onChange={e => { setCat(e.target.value); setPage(1); }}
            >
              <MenuItem value="All">All</MenuItem>
              {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort</InputLabel>
            <Select
              labelId="sort-label"
              label="Sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <MenuItem value="title">Title (A-Z)</MenuItem>
              <MenuItem value="price_asc">Price (Low to High)</MenuItem>
              <MenuItem value="price_desc">Price (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {paginated.map(b => (
          <Grid item xs={12} sm={6} md={4} key={b.id}>
            <Card>
              <CardMedia component="img" height="160" image={b.image} alt={b.title} />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>{b.title}</Typography>
                <Typography variant="body2" color="text.secondary">{b.author}</Typography>
                <Typography variant="caption" color="text.secondary">{b.category}</Typography>
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
        {paginated.length === 0 && (
          <Grid item xs={12}>
            <Typography>No results.</Typography>
          </Grid>
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} color="primary" />
      </Box>
    </Box>
  )
}
