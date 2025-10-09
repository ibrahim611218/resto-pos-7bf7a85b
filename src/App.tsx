
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
import ProductEdit from "./pages/ProductEdit"; 
import Invoices from "./pages/Invoices";
import Purchases from "./pages/Purchases";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import SalesReport from "./pages/SalesReport";
import InventoryReport from "./pages/InventoryReport";
import CustomersReport from "./pages/CustomersReport";
import VatReport from "./pages/VatReport";
import ExpensesReport from "./pages/ExpensesReport";
import FinancialReport from "./pages/FinancialReport";
import Kitchen from "./pages/Kitchen";
import Pos from "./pages/Pos";
import CompanyManagementPage from './pages/CompanyManagement';
import UserManagementPage from './pages/UserManagement';
import BusinessSettingsPage from './pages/BusinessSettings';

import DownloadApp from './pages/DownloadApp';

function App() {
  const { isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Force redirect to login if not authenticated and not already on login page
  useEffect(() => {
    if (isInitialized && !isAuthenticated && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [isInitialized, isAuthenticated, navigate, location.pathname]);

  return (
    <Routes>
      {/* Root path always redirects to login if not authenticated */}
      <Route path="/" element={!isAuthenticated ? <Navigate to="/login" replace /> : <Navigate to="/pos" replace />} />
      
      {/* Login route is accessible for non-authenticated users */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/pos" replace /> : <Login />} />
      
      {/* All other routes require authentication */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/pos" element={<Pos />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
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
        
        <Route path="/download-app" element={<DownloadApp />} />
        
        <Route path="/reports" element={<Reports />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/inventory-report" element={<InventoryReport />} />
        <Route path="/customers-report" element={<CustomersReport />} />
        <Route path="/vat-report" element={<VatReport />} />
        <Route path="/expenses-report" element={<ExpensesReport />} />
        <Route path="/financial-report" element={<FinancialReport />} />
        <Route path="/business-settings" element={<BusinessSettingsPage />} />
      </Route>

      {/* Catch-all route redirects to login if not authenticated */}
      <Route path="*" element={!isAuthenticated ? <Navigate to="/login" replace /> : <Navigate to="/pos" replace />} />
    </Routes>
  );
}

export default App;
