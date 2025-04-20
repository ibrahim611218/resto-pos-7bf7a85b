
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import CategoryAdd from './pages/CategoryAdd'
import CategoryEdit from './pages/CategoryEdit'
import ProductAdd from "./pages/ProductAdd";
import Invoices from "./pages/Invoices";
import Purchases from "./pages/Purchases";
import { Orders as OrdersContent } from './pages/Orders'
import { Settings as SettingsContent } from './pages/Settings'
import { ProductAddContent } from "./pages/ProductAdd";
import MainLayout from './components/layout/MainLayout'
import Login from './pages/Login'
import { useAuth } from './features/auth/hooks/useAuth'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Pos from './pages/Pos'

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
      
      <Route element={<ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>}>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductAddContent />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/add" element={<CategoryAdd />} />
        <Route path="/categories/:id/edit" element={<CategoryEdit />} />
        <Route path="/orders" element={<OrdersContent />} />
        <Route path="/settings" element={<SettingsContent />} />
        <Route path="/pos" element={<Pos />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/purchases" element={<Purchases />} />
      </Route>
    </Routes>
  )
}

export default App;
