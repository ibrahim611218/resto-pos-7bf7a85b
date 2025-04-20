
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/add" element={<ProductAdd />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/add" element={<CategoryAdd />} />
      <Route path="/categories/:id/edit" element={<CategoryEdit />} />
      <Route path="/orders" element={<Orders />}>
        <Route index element={<OrdersContent />} />
      </Route>
      <Route path="/settings" element={<Settings />}>
        <Route index element={<SettingsContent />} />
      </Route>
    </Routes>
  )
}

export default App;
