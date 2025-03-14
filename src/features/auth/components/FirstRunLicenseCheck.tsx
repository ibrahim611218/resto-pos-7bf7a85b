
import React, { useState, useEffect } from 'react';
import { useLicense } from '../hooks/useLicense';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';

interface FirstRunLicenseCheckProps {
  children: React.ReactNode;
}

const FirstRunLicenseCheck: React.FC<FirstRunLicenseCheckProps> = ({ children }) => {
  const { checkLicense } = useLicense();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    const checkAppLicense = async () => {
      setIsChecking(true);
      
      // Skip license check for admin users (they're already authenticated)
      if (isAuthenticated && user?.email === 'eng.ibrahimabdalfatah@gmail.com') {
        setIsChecking(false);
        return;
      }
      
      try {
        const hasValidLicense = await checkLicense();
        if (!hasValidLicense) {
          navigate('/activate');
        }
      } finally {
        setIsChecking(false);
      }
    };
    
    checkAppLicense();
  }, [checkLicense, navigate, isAuthenticated, user]);
  
  const handleNavigateToActivation = () => {
    navigate('/activate');
  };
  
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-2xl font-bold">جاري التحقق من الترخيص...</div>
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }
  
  // If the admin is logged in, don't show the activation page button
  if (isAuthenticated && user?.email === 'eng.ibrahimabdalfatah@gmail.com') {
    return <>{children}</>;
  }
  
  return (
    <>
      {children}
      <div className="fixed bottom-4 left-4 z-50">
        <Button onClick={handleNavigateToActivation} variant="outline">
          صفحة التفعيل
        </Button>
      </div>
    </>
  );
};

export default FirstRunLicenseCheck;
