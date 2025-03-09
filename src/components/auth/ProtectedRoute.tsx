
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
  allowedRoles?: UserRole | UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasPermission(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
