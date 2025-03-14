
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useLicense } from '../hooks/useLicense';
import { Loader2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FirstRunLicenseCheckProps {
  children: ReactNode;
}

const FirstRunLicenseCheck: React.FC<FirstRunLicenseCheckProps> = ({ children }) => {
  const { licenseStatus, isLoading } = useLicense();
  const [firstRun, setFirstRun] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is the first run
    const isFirstRun = !localStorage.getItem('app_initialized');
    setFirstRun(isFirstRun);
    
    // If first run, mark as initialized
    if (isFirstRun) {
      localStorage.setItem('app_initialized', 'true');
    }
  }, []);

  const toggleSidebar = () => {
    // Dispatch a custom event that the sidebar can listen for
    const event = new CustomEvent('toggle-sidebar');
    window.dispatchEvent(event);
  };

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

  // On the activation page, show a menu icon to open the sidebar
  if (location.pathname === '/activate') {
    return (
      <>
        <div className="fixed top-4 right-4 z-50">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} title="فتح القائمة الرئيسية">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {children}
      </>
    );
  }

  return <>{children}</>;
};

export default FirstRunLicenseCheck;
