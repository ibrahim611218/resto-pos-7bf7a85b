
import React, { useState, useEffect } from 'react';
import { useLicenseCheck } from '../hooks/useLicenseCheck';
import LicenseCheckLoading from './LicenseCheckLoading';
import ActivationButton from './ActivationButton';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff } from 'lucide-react';

interface FirstRunLicenseCheckProps {
  children: React.ReactNode;
}

const FirstRunLicenseCheck: React.FC<FirstRunLicenseCheckProps> = ({ children }) => {
  const { isChecking, isAdminUser } = useLicenseCheck();
  const [checkTimeout, setCheckTimeout] = useState(false);
  const navigate = useNavigate();
  
  // Add timeout protection with shorter time (5 seconds)
  useEffect(() => {
    console.log("FirstRunLicenseCheck mounted, setting timeout");
    const timer = setTimeout(() => {
      if (isChecking) {
        console.log("License check timeout triggered in FirstRunLicenseCheck");
        setCheckTimeout(true);
        toast.error('تجاوز وقت التحقق من الترخيص، يرجى التأكد من اتصال الإنترنت');
      }
    }, 5000); // Reduced from 8s to 5s for faster response
    
    return () => {
      console.log("FirstRunLicenseCheck unmounted, clearing timeout");
      clearTimeout(timer);
    };
  }, [isChecking]);
  
  // Direct navigation if timeout occurs
  useEffect(() => {
    if (checkTimeout) {
      console.log("Timeout occurred, showing activation button");
      // Auto-navigate to activation page after 1 second if we hit a timeout
      const redirectTimer = setTimeout(() => {
        navigate('/activate');
      }, 1000); // Reduced from 2s to 1s for faster response
      
      return () => clearTimeout(redirectTimer);
    }
  }, [checkTimeout, navigate]);
  
  // Return loading state while checking license
  if (isChecking && !checkTimeout) {
    console.log("Showing license check loading");
    return <LicenseCheckLoading />;
  }
  
  // If the admin is logged in, don't show the activation page button
  if (isAdminUser) {
    console.log("Admin user detected, rendering children");
    return <>{children}</>;
  }
  
  // If timeout occurred and we're not an admin, show error and activation button
  if (checkTimeout) {
    console.log("Timeout detected, rendering activation button with children");
    return (
      <>
        <Alert variant="destructive" className="mb-4 max-w-md mx-auto mt-4">
          <WifiOff className="h-4 w-4 mr-2" />
          <AlertDescription>
            تجاوز وقت التحقق من الترخيص، يرجى التأكد من اتصال الإنترنت والتوجه لصفحة التفعيل
          </AlertDescription>
        </Alert>
        {children}
        <ActivationButton />
      </>
    );
  }
  
  return (
    <>
      {children}
      <ActivationButton />
    </>
  );
};

export default FirstRunLicenseCheck;
