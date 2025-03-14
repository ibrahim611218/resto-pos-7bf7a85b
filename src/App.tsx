
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import Pos from "./pages/Pos";
import Invoices from "./pages/Invoices";
import RetrieveInvoice from "./pages/RetrieveInvoice";
import Login from "./features/auth/Login";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./features/auth/hooks/useAuth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Kitchen from "./pages/Kitchen";
import Inventory from "./pages/Inventory";
import BusinessSettings from "./pages/BusinessSettings";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Customers from "./pages/Customers";
import SalesReport from "./pages/SalesReport";
import UserManagement from "./pages/UserManagement";
import InventoryReportPage from "./pages/InventoryReport";
import CustomersReportPage from "./pages/CustomersReport";
import LicenseActivation from "./pages/LicenseActivation";
import LicenseGenerator from "./pages/LicenseGenerator";
import LicenseCheck from "./features/auth/components/LicenseCheck";
import FirstRunLicenseCheck from "./features/auth/components/FirstRunLicenseCheck";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <BrowserRouter>
                <FirstRunLicenseCheck>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="/activate" element={<LicenseActivation />} />
                    
                    {/* Protected routes - First check license */}
                    <Route element={<LicenseCheck />}>
                      {/* Then check authentication */}
                      <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>
                          <Route path="/" element={<Index />} />
                          
                          {/* Routes accessible to cashiers and admins */}
                          <Route element={<ProtectedRoute allowedRoles={["admin", "cashier"]} />}>
                            <Route path="/pos" element={<Pos />} />
                            <Route path="/retrieve-invoice" element={<RetrieveInvoice />} />
                            <Route path="/invoices" element={<Invoices />} />
                            <Route path="/customers" element={<Customers />} />
                          </Route>
                          
                          {/* Routes accessible to kitchen staff and admins */}
                          <Route element={<ProtectedRoute allowedRoles={["admin", "kitchen"]} />}>
                            <Route path="/kitchen" element={<Kitchen />} />
                          </Route>
                          
                          {/* Routes accessible only to admins */}
                          <Route element={<ProtectedRoute allowedRoles="admin" />}>
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/add" element={<ProductForm />} />
                            <Route path="/products/edit/:id" element={<ProductForm />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/categories/add" element={<CategoryForm />} />
                            <Route path="/categories/edit/:id" element={<CategoryForm />} />
                            <Route path="/inventory" element={<Inventory />} />
                            <Route path="/settings" element={<BusinessSettings />} />
                            <Route path="/reports/sales" element={<SalesReport />} />
                            <Route path="/users" element={<UserManagement />} />
                            
                            {/* License Generator - Special Admin Route */}
                            <Route path="/license-generator" element={<LicenseGenerator />} />
                          </Route>
                          
                          {/* Reports Routes - Move inside MainLayout */}
                          <Route path="/reports/sales" element={<SalesReport />} />
                          <Route path="/reports/inventory" element={<InventoryReportPage />} />
                          <Route path="/reports/customers" element={<CustomersReportPage />} />
                        </Route>
                      </Route>
                    </Route>
                    
                    {/* Catch-all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </FirstRunLicenseCheck>
              </BrowserRouter>
              <Sonner position="top-center" />
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
