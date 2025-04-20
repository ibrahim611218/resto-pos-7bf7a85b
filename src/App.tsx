
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/hooks/useAuth';
import Login from './pages/Login';
import MainLayout from './components/layout/MainLayout';
import Pos from './pages/Pos';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Kitchen from './pages/Kitchen';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';
import BusinessSettings from './pages/BusinessSettings';
import LicenseGenerator from './pages/LicenseGenerator';
import SalesReport from './pages/SalesReport';
import InventoryReport from './pages/InventoryReport';
import CustomersReport from './pages/CustomersReport';
import VatReport from './pages/VatReport';
import Purchases from './pages/Purchases';
import CompanyManagement from './pages/CompanyManagement';

// ProtectedRoute component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const authData = localStorage.getItem('user');
  const auth = authData ? JSON.parse(authData) : null;

  if (!auth) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    // Redirect to a "no access" page or home if the role is not allowed
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <AuthProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<ProtectedRoute allowedRoles={["cashier", "supervisor", "admin", "owner", "kitchen", "manager"]}><Pos /></ProtectedRoute>} />
                <Route path="/pos" element={<ProtectedRoute allowedRoles={["cashier", "supervisor", "admin", "owner"]}><Pos /></ProtectedRoute>} />
                <Route path="/products" element={<ProtectedRoute allowedRoles={["supervisor", "admin", "owner"]}><Products /></ProtectedRoute>} />
                <Route path="/categories" element={<ProtectedRoute allowedRoles={["supervisor", "admin", "owner"]}><Categories /></ProtectedRoute>} />
                <Route path="/invoices" element={<ProtectedRoute allowedRoles={["cashier", "supervisor", "admin", "owner"]}><Invoices /></ProtectedRoute>} />
                <Route path="/purchases" element={<ProtectedRoute allowedRoles={["supervisor", "admin", "owner"]}><Purchases /></ProtectedRoute>} />
                <Route path="/customers" element={<ProtectedRoute allowedRoles={["cashier", "supervisor", "admin", "owner"]}><Customers /></ProtectedRoute>} />
                <Route path="/inventory" element={<ProtectedRoute allowedRoles={["supervisor", "admin", "owner"]}><Inventory /></ProtectedRoute>} />
                <Route path="/kitchen" element={<ProtectedRoute allowedRoles={["kitchen", "supervisor", "admin", "owner"]}><Kitchen /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute allowedRoles={["supervisor", "admin", "owner"]}><Reports /></ProtectedRoute>} />
                <Route path="/user-management" element={<ProtectedRoute allowedRoles={["admin", "owner"]}><UserManagement /></ProtectedRoute>} />
                <Route path="/business-settings" element={<ProtectedRoute allowedRoles={["admin", "owner"]}><BusinessSettings /></ProtectedRoute>} />
                <Route path="/license-generator" element={<ProtectedRoute allowedRoles={["admin", "owner"]}><LicenseGenerator /></ProtectedRoute>} />
                <Route path="/sales-report" element={<ProtectedRoute allowedRoles={["supervisor", "admin", "owner"]}><SalesReport /></ProtectedRoute>} />
                <Route path="/inventory-report" element={<ProtectedRoute allowedRoles={["supervisor", "admin", "owner"]}><InventoryReport /></ProtectedRoute>} />
                <Route path="/customers-report" element={<ProtectedRoute allowedRoles={["supervisor", "admin", "owner"]}><CustomersReport /></ProtectedRoute>} />
                <Route path="/vat-report" element={<ProtectedRoute allowedRoles={["supervisor", "admin", "owner"]}><VatReport /></ProtectedRoute>} />
                
                <Route
                  path="/company-management"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "owner"]}>
                      <CompanyManagement />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainLayout>
          </AuthProvider>
        }
      />
    </Routes>
  );
}

export default App;
