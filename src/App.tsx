import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./features/auth/hooks/useAuth";
import { OfflineProvider } from "./context/OfflineContext";

// Import your pages
import Home from "./pages/Index";
import Pos from "./pages/Pos";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./pages/CategoryForm";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import RetrieveInvoicePage from "./pages/RetrieveInvoice";
import BusinessSettings from "./pages/BusinessSettings";
import Kitchen from "./pages/Kitchen";
import UserManagementPage from "./pages/UserManagement";

// Import Report pages
import SalesReport from "./pages/SalesReport";
import CustomersReport from "./pages/CustomersReport";
import VatReport from "./pages/VatReport";
import InventoryReport from "./pages/InventoryReport";

import "./App.css";
import "./index.css";
import "@/styles/index";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <OfflineProvider>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/" element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Home />} />
                <Route path="pos" element={<Pos />} />
                <Route path="products">
                  <Route index element={<Products />} />
                  <Route path="add" element={<ProductForm />} />
                  <Route path="edit/:id" element={<ProductForm />} />
                </Route>
                <Route path="categories">
                  <Route index element={<Categories />} />
                  <Route path="add" element={<CategoryForm />} />
                  <Route path="edit/:id" element={<CategoryForm />} />
                </Route>
                <Route path="customers" element={<Customers />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="retrieve-invoice" element={<RetrieveInvoicePage />} />
                <Route path="kitchen" element={<Kitchen />} />
                <Route path="settings" element={<BusinessSettings />} />
                <Route path="users" element={<UserManagementPage />} />

                {/* Reports */}
                <Route path="reports">
                  <Route path="sales" element={<SalesReport />} />
                  <Route path="customers" element={<CustomersReport />} />
                  <Route path="vat" element={<VatReport />} />
                  <Route path="inventory" element={<InventoryReport />} />
                </Route>
              </Route>

              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <SonnerToaster position="top-right" />
            <Toaster />
          </OfflineProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
