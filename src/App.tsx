
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/hooks/useAuth';
import Login from './pages/Login';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import CategoryAdd from './pages/CategoryAdd';
import CategoryEdit from './pages/CategoryEdit';
import ProductAdd from "./pages/ProductAdd";
import Invoices from "./pages/Invoices";
import Purchases from "./pages/Purchases";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import SalesReport from "./pages/SalesReport";
import InventoryReport from "./pages/InventoryReport";
import CustomersReport from "./pages/CustomersReport";
import VatReport from "./pages/VatReport";
import Kitchen from "./pages/Kitchen";
import Pos from "./pages/Pos";
import CompanyManagementPage from './pages/CompanyManagement';
import UserManagementPage from './pages/UserManagement';
import BusinessSettingsPage from './pages/BusinessSettings';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Always start with login route */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/pos" replace />} />
      
      {/* Default route always redirects to login if not authenticated */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/pos" replace /> : <Navigate to="/login" replace />} />
      
      <Route element={<ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>}>
        <Route path="/pos" element={<Pos />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/add" element={<CategoryAdd />} />
        <Route path="/categories/:id/edit" element={<CategoryEdit />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/company-management" element={<CompanyManagementPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        
        <Route path="/reports" element={<Reports />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/inventory-report" element={<InventoryReport />} />
        <Route path="/customers-report" element={<CustomersReport />} />
        <Route path="/vat-report" element={<VatReport />} />
        <Route path="/business-settings" element={<BusinessSettingsPage />} />
      </Route>

      {/* Catch-all route redirects to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
