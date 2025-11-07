# Book Store Frontend (React) - Scaffold

This is a minimal React scaffolding for the Book Store frontend that will integrate with the PHP backend in `Book-store-221706/bookstore`.

## Tech

- React 18 + react-router-dom v6
- CSS Modules + CSS variables for theming
- Light theme using backend container colors:
  - primary: `#003366`
  - secondary: `#ec7115`
  - background: `#f2f2f2`
  - accent: `#ffffff`

## Project Structure

```
bookstorereact/
  public/
    index.html
  src/
    components/
      BookCard.jsx
      BookCard.module.css
      BookList.jsx
      BookList.module.css
      CartSummary.jsx
      CartSummary.module.css
      layout/
        Header.jsx
        Header.module.css
        Footer.jsx
        Footer.module.css
        Layout.jsx
        Layout.module.css
    hooks/
      useExample.js
    pages/
      HomePage.jsx
      CatalogPage.jsx
      CartPage.jsx
      ProfilePage.jsx
      LoginPage.jsx
    routes/
      AppRoutes.jsx
    services/
      api.js
    styles/
      global.css
      theme.css
    index.js
  package.json
  README.md
```

## Available Routes

- `/` — HomePage
- `/catalog` — CatalogPage
- `/cart` — CartPage
- `/profile` — ProfilePage
- `/login` — LoginPage

## Development

1. Install dependencies:
   - npm install
2. Start the dev server:
   - npm start

The app uses CRA scripts and runs on the default dev server port. Do not change preview settings.

## Environment

- `REACT_APP_API_BASE_URL` — Base URL to the backend (optional). If not set, API placeholders will no-op.

## Notes / TODOs

- Replace placeholder API functions in `src/services/api.js` with actual calls to the PHP backend.
- Implement authentication flow on `LoginPage`.
- Wire cart and catalog pages to backend endpoints.
- Replace placeholder images and data with backend-provided data.
