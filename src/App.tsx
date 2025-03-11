
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login language="ar" />} />
            <Route path="/unauthorized" element={<Unauthorized language="ar" />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index language="ar" />} />
                
                {/* Routes accessible to cashiers and admins */}
                <Route element={<ProtectedRoute allowedRoles={["admin", "cashier"]} />}>
                  <Route path="/pos" element={<Pos language="ar" />} />
                  <Route path="/invoices" element={<Invoices />} />
                </Route>
                
                {/* Routes accessible to kitchen staff and admins */}
                <Route element={<ProtectedRoute allowedRoles={["admin", "kitchen"]} />}>
                  <Route path="/kitchen" element={<Kitchen language="ar" />} />
                </Route>
                
                {/* Routes accessible only to admins */}
                <Route element={<ProtectedRoute allowedRoles="admin" />}>
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/add" element={<ProductForm />} />
                  <Route path="/products/edit/:id" element={<ProductForm />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/inventory" element={<h1 className="text-2xl font-bold">المخزون</h1>} />
                  <Route path="/inventory/add" element={<h1 className="text-2xl font-bold">إضافة مخزون</h1>} />
                  <Route path="/reports/sales" element={<h1 className="text-2xl font-bold">تقارير المبيعات</h1>} />
                  <Route path="/reports/inventory" element={<h1 className="text-2xl font-bold">تقارير المخزون</h1>} />
                  <Route path="/reports/customers" element={<h1 className="text-2xl font-bold">تقارير العملاء</h1>} />
                  <Route path="/settings" element={<h1 className="text-2xl font-bold">الإعدادات</h1>} />
                </Route>
              </Route>
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
