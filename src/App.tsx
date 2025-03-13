
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./features/auth/hooks/useAuth";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LicenseCheck from "./components/LicenseCheck";

// Import pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Pos from "./pages/Pos";
import Invoices from "./pages/Invoices";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Customers from "./pages/Customers";
import Kitchen from "./pages/Kitchen";
import BusinessSettings from "./pages/BusinessSettings";
import SalesReport from "./pages/SalesReport";
import InventoryReport from "./pages/InventoryReport";
import CustomersReport from "./pages/CustomersReport";
import RetrieveInvoice from "./pages/RetrieveInvoice";
import UserManagement from "./pages/UserManagement";
import ActivateLicense from "./pages/ActivateLicense";
import LicenseManagement from "./pages/LicenseManagement";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <LicenseCheck>
              <Routes>
                <Route path="/login" element={<Login language="ar" />} />
                <Route path="/activate" element={<ActivateLicense />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/pos" element={<Pos />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/kitchen" element={<Kitchen />} />
                    <Route path="/settings" element={<BusinessSettings />} />
                    <Route path="/sales-report" element={<SalesReport />} />
                    <Route path="/inventory-report" element={<InventoryReport />} />
                    <Route path="/customers-report" element={<CustomersReport />} />
                    <Route path="/retrieve-invoice" element={<RetrieveInvoice />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/license-management" element={<LicenseManagement />} />
                  </Route>
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LicenseCheck>
            <SonnerToaster richColors position="top-center" dir="rtl" />
            <Toaster />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
