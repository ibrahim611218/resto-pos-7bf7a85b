
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import CategoryAdd from './pages/CategoryAdd'
import CategoryEdit from './pages/CategoryEdit'
import ProductAdd from "./pages/ProductAdd";
import { Orders as OrdersContent } from './pages/Orders'
import { Settings as SettingsContent } from './pages/Settings'
import { ProductAddContent } from "./pages/ProductAdd";
import MainLayout from './components/layout/MainLayout'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductAddContent />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/add" element={<CategoryAdd />} />
        <Route path="/categories/:id/edit" element={<CategoryEdit />} />
        <Route path="/orders" element={<OrdersContent />} />
        <Route path="/settings" element={<SettingsContent />} />
      </Route>
    </Routes>
  )
}

export default App;
