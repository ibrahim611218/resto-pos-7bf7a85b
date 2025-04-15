
import React, { useEffect, useState, useRef } from 'react';
import { useLicense } from '../hooks/useLicense';
import { useNavigate, Outlet } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LicenseCheckLoading from './LicenseCheckLoading';
import { toast } from 'sonner';

const LicenseCheck: React.FC = () => {
  const { checkLicense, getLicenseInfo } = useLicense();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [expiryDays, setExpiryDays] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [skipCheck, setSkipCheck] = useState(false);
  
  // Add a ref to prevent multiple check attempts
  const checkAttempted = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Optimize the check for admin user
  const isAdminUser = React.useMemo(() => {
    return isAuthenticated && (
      user?.email === 'eng.ibrahimabdalfatah@gmail.com' ||
      user?.role === 'admin' ||
      user?.role === 'owner'
    );
  }, [isAuthenticated, user?.email, user?.role]);
  
  // Skip check logic - if timeout occurs, allow user to continue
  useEffect(() => {
    const skipTimeout = setTimeout(() => {
      if (isChecking) {
        console.log("LicenseCheck component - skip timeout triggered");
        setSkipCheck(true);
        setIsChecking(false);
        toast.warning('تم تجاوز التحقق من الترخيص مؤقتًا، ستتم المحاولة لاحقًا');
      }
    }, 5000); // Reduced timeout to 5 seconds
    
    return () => clearTimeout(skipTimeout);
  }, [isChecking]);
  
  useEffect(() => {
    let isMounted = true;
    
    // Only check license once per component mount
    if (checkAttempted.current) {
      console.log("License check already attempted in LicenseCheck");
      return;
    }
    
    checkAttempted.current = true;
    
    // Early exit for admin users
    if (isAdminUser) {
      console.log("Admin user detected, skipping license check in LicenseCheck component");
      setIsChecking(false);
      return;
    }
    
    const verifyLicense = async () => {
      // Use a timeout to prevent infinite loading if something goes wrong
      timeoutRef.current = setTimeout(() => {
        if (isMounted) {
          console.log("License check timeout in LicenseCheck component");
          setIsChecking(false);
          setHasError(true);
          toast.error('فشل التحقق من الترخيص، يرجى المحاولة مرة أخرى');
          navigate('/activate', { replace: true });
        }
      }, 7000); // 7 second timeout
      
      try {
        if (!isMounted) return;
        
        console.log("Starting license check in LicenseCheck component");
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for render
        
        const hasValidLicense = await checkLicense();
        console.log("License check result in LicenseCheck:", hasValidLicense);
        
        if (!hasValidLicense && isMounted) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          navigate('/activate', { replace: true });
          return;
        }
        
        // Get license info if valid
        if (isMounted && !skipCheck) {
          const licenseInfo = await getLicenseInfo();
          if (licenseInfo) {
            const expiryDate = new Date(licenseInfo.expiryDate);
            const currentDate = new Date();
            const diffTime = expiryDate.getTime() - currentDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setExpiryDays(diffDays);
          }
          
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setIsChecking(false);
        }
      } catch (error) {
        console.error("License check error:", error);
        if (isMounted) {
          setIsChecking(false);
          setHasError(true);
          toast.error('حدث خطأ أثناء التحقق من الترخيص');
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
      }
    };
    
    // Small delay before check to ensure everything is initialized
    setTimeout(() => {
      if (isMounted && !skipCheck) verifyLicense();
    }, 200);
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [checkLicense, getLicenseInfo, navigate, isAdminUser, skipCheck]);
  
  // Show loading only if needed and not skipped
  if (isChecking && !skipCheck) {
    return <LicenseCheckLoading />;
  }
  
  // If there's an error, we'll let the navigate in the effect handle it
  if (hasError && !skipCheck) {
    return null;
  }
  
  // Skip check or admin user - just render content
  if (skipCheck || isAdminUser) {
    return <Outlet />;
  }
  
  return (
    <>
      {expiryDays !== null && expiryDays <= 7 && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>تنبيه</AlertTitle>
          <AlertDescription>
            ستنتهي صلاحية الترخيص الخاص بك خلال {expiryDays} {expiryDays === 1 ? 'يوم' : 'أيام'}. يرجى تجديد الترخيص.
          </AlertDescription>
        </Alert>
      )}
      <Outlet />
    </>
  );
};

export default LicenseCheck;
