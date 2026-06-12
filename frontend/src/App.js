/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Argon Dashboard 2 MUI themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

// Argon Dashboard 2 MUI contexts
import { useArgonController } from "context";
import { AuthProvider } from "context/AuthContext";

// Icon Fonts
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-svg.css";

// Public Pages
import Home from "layouts/public/Home";
import PublicMahasiswa from "layouts/public/PublicMahasiswa";
import PublicMahasiswaDetail from "layouts/public/PublicMahasiswaDetail";

// Admin Pages
import AdminLogin from "layouts/admin/Login";
import Dashboard from "layouts/admin/Dashboard";
import MahasiswaList from "layouts/admin/MahasiswaList";
import MahasiswaForm from "layouts/admin/MahasiswaForm";
import MahasiswaDetail from "layouts/admin/MahasiswaDetail";

// Protected Route
import ProtectedRoute from "components/ProtectedRoute";

export default function App() {
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <AuthProvider>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/mahasiswa" element={<PublicMahasiswa />} />
          <Route path="/mahasiswa/detail/:id" element={<PublicMahasiswaDetail />} />
          
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/mahasiswa" element={<ProtectedRoute><MahasiswaList /></ProtectedRoute>} />
          <Route path="/admin/mahasiswa/tambah" element={<ProtectedRoute><MahasiswaForm /></ProtectedRoute>} />
          <Route path="/admin/mahasiswa/edit/:id" element={<ProtectedRoute><MahasiswaForm /></ProtectedRoute>} />
          <Route path="/admin/mahasiswa/detail/:id" element={<ProtectedRoute><MahasiswaDetail /></ProtectedRoute>} />
          
          {/* Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
