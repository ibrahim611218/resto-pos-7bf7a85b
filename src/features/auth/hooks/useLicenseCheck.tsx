
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLicense } from './useLicense';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useLicenseCheck = () => {
  const { checkLicense } = useLicense();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const checkAttempted = useRef(false);
  
  const isAdminUser = isAuthenticated && user?.email === 'eng.ibrahimabdalfatah@gmail.com';
  
  useEffect(() => {
    let isMounted = true;
    
    // Only check once per component mount
    if (checkAttempted.current) return;
    checkAttempted.current = true;
    
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.log("License check timed out");
        setIsChecking(false);
        toast.error('تعذر التحقق من الترخيص، انتقال إلى صفحة التفعيل');
        navigate('/activate');
      }
    }, 10000); // 10 seconds timeout
    
    const checkAppLicense = async () => {
      try {
        setIsChecking(true);
        
        // Skip license check for admin users (they're already authenticated)
        if (isAdminUser) {
          console.log("Admin user detected, skipping useLicenseCheck");
          clearTimeout(timeoutId);
          setIsChecking(false);
          return;
        }
        
        console.log("Starting license check in useLicenseCheck");
        const hasValidLicense = await checkLicense();
        console.log("License check completed in useLicenseCheck:", hasValidLicense);
        
        if (isMounted) {
          if (!hasValidLicense) {
            navigate('/activate');
          }
          clearTimeout(timeoutId);
          setIsChecking(false);
        }
      } catch (error) {
        console.error("Error in license check:", error);
        if (isMounted) {
          navigate('/activate');
          clearTimeout(timeoutId);
          setIsChecking(false);
          toast.error('حدث خطأ أثناء التحقق من الترخيص');
        }
      }
    };
    
    // Small delay to ensure auth context is ready
    setTimeout(() => {
      checkAppLicense();
    }, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [checkLicense, navigate, isAdminUser]);
  
  return {
    isChecking,
    isAdminUser
  };
};
