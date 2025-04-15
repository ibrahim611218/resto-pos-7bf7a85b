
import React, { useState, useEffect } from 'react';
import { useLicenseCheck } from '../hooks/useLicenseCheck';
import LicenseCheckLoading from './LicenseCheckLoading';
import ActivationButton from './ActivationButton';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface FirstRunLicenseCheckProps {
  children: React.ReactNode;
}

const FirstRunLicenseCheck: React.FC<FirstRunLicenseCheckProps> = ({ children }) => {
  const { isChecking, isAdminUser } = useLicenseCheck();
  const [checkTimeout, setCheckTimeout] = useState(false);
  const navigate = useNavigate();
  
  // Add timeout protection with shorter time (8 seconds)
  useEffect(() => {
    console.log("FirstRunLicenseCheck mounted, setting timeout");
    const timer = setTimeout(() => {
      if (isChecking) {
        console.log("License check timeout triggered in FirstRunLicenseCheck");
        setCheckTimeout(true);
        toast.error('تجاوز وقت التحقق من الترخيص، يرجى التأكد من اتصال الإنترنت');
      }
    }, 8000); // Reduced from 15s to 8s
    
    return () => {
      console.log("FirstRunLicenseCheck unmounted, clearing timeout");
      clearTimeout(timer);
    };
  }, [isChecking]);
  
  // Direct navigation if timeout occurs
  useEffect(() => {
    if (checkTimeout) {
      console.log("Timeout occurred, showing activation button");
      // Auto-navigate to activation page after 2 seconds if we hit a timeout
      const redirectTimer = setTimeout(() => {
        navigate('/activate');
      }, 2000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [checkTimeout, navigate]);
  
  if (isChecking && !checkTimeout) {
    console.log("Showing license check loading");
    return <LicenseCheckLoading />;
  }
  
  // If the admin is logged in, don't show the activation page button
  if (isAdminUser) {
    console.log("Admin user detected, rendering children");
    return <>{children}</>;
  }
  
  if (checkTimeout) {
    console.log("Timeout detected, rendering activation button with children");
  }
  
  return (
    <>
      {children}
      <ActivationButton />
    </>
  );
};

export default FirstRunLicenseCheck;
