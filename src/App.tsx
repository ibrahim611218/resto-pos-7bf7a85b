
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Pos from "@/pages/Pos";
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
import Login from "@/pages/Login";
import RetrieveInvoice from "@/pages/RetrieveInvoice";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import LicenseActivation from "./pages/LicenseActivation";
import LicenseGenerator from "./pages/LicenseGenerator";
import FirstRunLicenseCheck from "./features/auth/components/FirstRunLicenseCheck";
import LicenseCheck from "./features/auth/components/LicenseCheck";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors dir="rtl" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/activate" element={<LicenseActivation />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
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
              <Route path="/categories" element={<Categories />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/reports/sales" element={<SalesReport />} />
              <Route path="/reports/inventory" element={<InventoryReport />} />
              <Route path="/reports/customers" element={<CustomersReport />} />
              <Route path="/settings" element={<BusinessSettings />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/license-generator" element={<LicenseGenerator />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
