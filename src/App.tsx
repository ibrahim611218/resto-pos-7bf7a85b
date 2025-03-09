
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index language="en" />} />
            <Route path="/pos" element={<Pos language="en" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/inventory" element={<h1 className="text-2xl font-bold">المخزون</h1>} />
            <Route path="/inventory/add" element={<h1 className="text-2xl font-bold">إضافة مخزون</h1>} />
            <Route path="/invoices" element={<h1 className="text-2xl font-bold">الفواتير</h1>} />
            <Route path="/reports/sales" element={<h1 className="text-2xl font-bold">تقارير المبيعات</h1>} />
            <Route path="/reports/inventory" element={<h1 className="text-2xl font-bold">تقارير المخزون</h1>} />
            <Route path="/reports/customers" element={<h1 className="text-2xl font-bold">تقارير العملاء</h1>} />
            <Route path="/settings" element={<h1 className="text-2xl font-bold">الإعدادات</h1>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
