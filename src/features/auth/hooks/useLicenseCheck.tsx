
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Optimize admin detection to prevent unnecessary checks
  const isAdminUser = isAuthenticated && (
    user?.email === 'eng.ibrahimabdalfatah@gmail.com' || 
    user?.role === 'admin' || 
    user?.role === 'owner'
  );
  
  useEffect(() => {
    let isMounted = true;
    
    // Skip check if already completed or admin user
    if (checkAttempted.current) {
      console.log("License check already attempted, skipping");
      return;
    }
    
    if (isAdminUser) {
      console.log("Admin user detected, skipping license check");
      setIsChecking(false);
      checkAttempted.current = true;
      return;
    }
    
    checkAttempted.current = true;
    
    // Set a timeout to prevent infinite loading (reduced to 6 seconds)
    timeoutRef.current = setTimeout(() => {
      if (isMounted) {
        console.log("License check timed out in useLicenseCheck hook");
        setIsChecking(false);
        toast.error('تعذر التحقق من الترخيص، انتقال إلى صفحة التفعيل');
        navigate('/activate');
      }
    }, 6000); // 6 seconds timeout (reduced from 10s)
    
    const checkAppLicense = async () => {
      try {
        setIsChecking(true);
        
        console.log("Starting license check in useLicenseCheck");
        
        // Add small delay to ensure clean render
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const hasValidLicense = await checkLicense();
        console.log("License check completed in useLicenseCheck:", hasValidLicense);
        
        if (isMounted) {
          if (!hasValidLicense) {
            navigate('/activate');
          }
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setIsChecking(false);
        }
      } catch (error) {
        console.error("Error in license check:", error);
        if (isMounted) {
          navigate('/activate');
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setIsChecking(false);
          toast.error('حدث خطأ أثناء التحقق من الترخيص');
        }
      }
    };
    
    checkAppLicense();
    
    return () => {
      isMounted = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [checkLicense, navigate, isAdminUser]);
  
  return {
    isChecking,
    isAdminUser
  };
};
