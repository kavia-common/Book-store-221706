import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import CatalogPage from "../pages/CatalogPage";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Defines the client-side routes for the Book Store app. */
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}
