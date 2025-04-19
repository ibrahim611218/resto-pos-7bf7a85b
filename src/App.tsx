
import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Kitchen from "@/pages/Kitchen";
import Invoices from "@/pages/Invoices";
import Customers from "@/pages/Customers";
import Products from "@/pages/Products";
import Categories from "@/pages/Categories";
import Inventory from "@/pages/Inventory";
import SalesReport from "@/pages/SalesReport";
import InventoryReport from "@/pages/InventoryReport";
import CustomersReport from "@/pages/CustomersReport";
import BusinessSettings from "@/pages/BusinessSettings";
import UserManagement from "@/pages/UserManagement";
import Login from "@/features/auth/Login";
import RetrieveInvoice from "@/pages/RetrieveInvoice";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import LicenseActivation from "./pages/LicenseActivation";
import LicenseGenerator from "./pages/LicenseGenerator";
import FirstRunLicenseCheck from "./features/auth/components/FirstRunLicenseCheck";
import LicenseCheck from "./features/auth/components/LicenseCheck";
import { useLanguage } from "./context/LanguageContext";
import Pos from "./pages/Pos";
import { CartProvider } from "./features/pos/hooks/useCart";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import LicenseCheckLoading from "./features/auth/components/LicenseCheckLoading";
import Purchases from "./pages/Purchases";
import VatReportPage from "./pages/VatReport";

// Fallback component for suspense with shorter timeout
const LoadingFallback = () => {
  const [showFallback, setShowFallback] = React.useState(false);
  
  useEffect(() => {
    // Only show loading after a short delay to prevent flashes
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!showFallback) return null;
  return <LicenseCheckLoading />;
};

function App() {
  const { language } = useLanguage();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Pre-load license information when app starts
  useEffect(() => {
    // Create a default license in localStorage if not exists for browser mode
    if (!localStorage.getItem('active-license')) {
      const now = Date.now();
      const defaultLicense = {
        key: 'DEFAULT-LICENSE',
        type: 'trial',
        issuedAt: now,
        expiryDate: now + 30 * 24 * 60 * 60 * 1000, // 30 days
        durationDays: 30,
        used: true,
        activatedAt: now
      };
      localStorage.setItem('active-license', JSON.stringify(defaultLicense));
      console.log("Created default license for faster startup");
    }
  }, []);
  
  // Show offline warning if needed
  useEffect(() => {
    if (isOffline) {
      toast.warning('لا يوجد اتصال بالإنترنت، بعض الميزات قد لا تعمل بشكل صحيح', {
        duration: 5000,
        id: 'offline-warning'
      });
    } else {
      toast.dismiss('offline-warning');
    }
  }, [isOffline]);
  
  return (
    <>
      <Toaster position="top-center" richColors dir={language === "ar" ? "rtl" : "ltr"} />
      <CartProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public routes - no auth or license required */}
            <Route path="/login" element={<Login language={language} />} />
            <Route path="/activate" element={<LicenseActivation />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes with license check */}
            <Route element={<FirstRunLicenseCheck><LicenseCheck /></FirstRunLicenseCheck>}>
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/pos" element={<Pos />} />
                  <Route path="/kitchen" element={<Kitchen />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/retrieve-invoice" element={<RetrieveInvoice />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/add" element={<ProductForm />} />
                  <Route path="/products/edit/:id" element={<ProductForm />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/add" element={<CategoryForm />} />
                  <Route path="/categories/edit/:id" element={<CategoryForm />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/purchases" element={<Purchases />} />
                  <Route path="/vat-report" element={<VatReportPage />} />
                  <Route path="/sales-report" element={<SalesReport />} />
                  <Route path="/inventory-report" element={<InventoryReport />} />
                  <Route path="/customers-report" element={<CustomersReport />} />
                  <Route path="/business-settings" element={<BusinessSettings />} />
                  <Route path="/user-management" element={<UserManagement />} />
                  <Route path="/license-generator" element={<LicenseGenerator />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
            </Route>
            
            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </>
  );
}

export default App;
