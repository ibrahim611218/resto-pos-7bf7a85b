
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
import Pos from "./pages/Pos";
import Invoices from "./pages/Invoices";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  
                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                      <Route path="/" element={<Index />} />
                      
                      {/* Routes accessible to cashiers and admins */}
                      <Route element={<ProtectedRoute allowedRoles={["admin", "cashier"]} />}>
                        <Route path="/pos" element={<Pos />} />
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
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/settings" element={<BusinessSettings />} />
                        <Route path="/reports/sales" element={<SalesReport />} />
                        <Route path="/users" element={<UserManagement />} />
                        {/* Placeholder routes */}
                        <Route path="/reports/inventory" element={<h1 className="text-2xl font-bold">تقارير المخزون</h1>} />
                        <Route path="/reports/customers" element={<h1 className="text-2xl font-bold">تقارير العملاء</h1>} />
                      </Route>
                    </Route>
                  </Route>
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
