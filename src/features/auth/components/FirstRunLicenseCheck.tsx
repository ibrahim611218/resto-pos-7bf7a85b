
import React, { useState, useEffect } from 'react';
import { useLicenseCheck } from '../hooks/useLicenseCheck';
import LicenseCheckLoading from './LicenseCheckLoading';
import ActivationButton from './ActivationButton';
import { toast } from 'sonner';

interface FirstRunLicenseCheckProps {
  children: React.ReactNode;
}

const FirstRunLicenseCheck: React.FC<FirstRunLicenseCheckProps> = ({ children }) => {
  const { isChecking, isAdminUser } = useLicenseCheck();
  const [checkTimeout, setCheckTimeout] = useState(false);
  
  // Add timeout protection
  useEffect(() => {
    // If checking takes too long (15 seconds), show the UI anyway
    const timer = setTimeout(() => {
      if (isChecking) {
        setCheckTimeout(true);
        toast.error('تجاوز وقت التحقق من الترخيص، يرجى التأكد من اتصال الإنترنت');
      }
    }, 15000);
    
    return () => clearTimeout(timer);
  }, [isChecking]);
  
  if (isChecking && !checkTimeout) {
    return <LicenseCheckLoading />;
  }
  
  // If the admin is logged in, don't show the activation page button
  if (isAdminUser) {
    return <>{children}</>;
  }
  
  return (
    <>
      {children}
      <ActivationButton />
    </>
  );
};

export default FirstRunLicenseCheck;
