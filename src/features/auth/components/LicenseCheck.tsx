
import { Navigate, Outlet } from 'react-router-dom';
import { useLicense } from '../hooks/useLicense';
import { Loader2 } from 'lucide-react';

const LicenseCheck = () => {
  const { licenseStatus, isLoading } = useLicense();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-2 text-muted-foreground">جاري التحقق من الترخيص...</span>
      </div>
    );
  }

  if (!licenseStatus.isActive) {
    return <Navigate to="/activate" replace />;
  }

  return <Outlet />;
};

export default LicenseCheck;
