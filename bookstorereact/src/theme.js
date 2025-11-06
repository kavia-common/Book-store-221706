import { createTheme } from '@mui/material/styles'

/**
 * PUBLIC_INTERFACE
 * Light theme using provided palette.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#003366' },
    secondary: { main: '#ec7115' },
    background: { default: '#f2f2f2', paper: '#ffffff' }
  },
  shape: { borderRadius: 8 }
})

export default theme
