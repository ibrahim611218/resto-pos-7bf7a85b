
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLicense } from '../hooks/useLicense';
import { Loader2 } from 'lucide-react';

interface FirstRunLicenseCheckProps {
  children: ReactNode;
}

const FirstRunLicenseCheck: React.FC<FirstRunLicenseCheckProps> = ({ children }) => {
  const { licenseStatus, isLoading } = useLicense();
  const [firstRun, setFirstRun] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if this is the first run
    const isFirstRun = !localStorage.getItem('app_initialized');
    setFirstRun(isFirstRun);
    
    // If first run, mark as initialized
    if (isFirstRun) {
      localStorage.setItem('app_initialized', 'true');
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading...</span>
      </div>
    );
  }

  // If it's first run and license not active, redirect to activation
  if (firstRun && !licenseStatus.isActive && location.pathname !== '/activate') {
    return <Navigate to="/activate" replace />;
  }

  return <>{children}</>;
};

export default FirstRunLicenseCheck;
