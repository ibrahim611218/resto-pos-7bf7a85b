
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLicense } from './useLicense';
import { useAuth } from './useAuth';

export const useLicenseCheck = () => {
  const { checkLicense } = useLicense();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  
  const isAdminUser = isAuthenticated && user?.email === 'eng.ibrahimabdalfatah@gmail.com';
  
  useEffect(() => {
    const checkAppLicense = async () => {
      setIsChecking(true);
      
      // Skip license check for admin users (they're already authenticated)
      if (isAdminUser) {
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
  }, [checkLicense, navigate, isAdminUser]);
  
  return {
    isChecking,
    isAdminUser
  };
};
