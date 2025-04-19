import React, { useEffect, useState, useRef } from 'react';
import { useLicense } from '../hooks/useLicense';
import { useNavigate, Outlet } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, WifiOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LicenseCheckLoading from './LicenseCheckLoading';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const LicenseCheck: React.FC = () => {
  const { checkLicense, getLicenseInfo } = useLicense();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [expiryDays, setExpiryDays] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [skipCheck, setSkipCheck] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // Add a ref to prevent multiple check attempts
  const checkAttempted = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
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
    }, 4000); // Further reduced timeout to 4 seconds
    
    return () => clearTimeout(skipTimeout);
  }, [isChecking]);

  // Retry license check when coming back online
  useEffect(() => {
    if (!isOffline && hasError) {
      // If we were offline and now we're online again, retry
      const retryCheck = async () => {
        setIsChecking(true);
        setHasError(false);
        try {
          await checkLicense();
        } finally {
          setIsChecking(false);
        }
      };
      
      retryCheck();
    }
  }, [isOffline, hasError, checkLicense]);
  
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
          
          if (isOffline) {
            toast.error('لا يمكن التحقق من الترخيص، تأكد من اتصالك بالإنترنت');
          } else {
            toast.error('فشل التحقق من الترخيص، يرجى المحاولة مرة أخرى');
            navigate('/activate', { replace: true });
          }
        }
      }, 5000); // 5 second timeout (reduced from 7s)
      
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
  }, [checkLicense, getLicenseInfo, navigate, isAdminUser, skipCheck, isOffline]);
  
  // Manual retry function
  const handleRetryCheck = async () => {
    setIsChecking(true);
    setHasError(false);
    checkAttempted.current = false; // Reset so we can check again
    
    try {
      // Directly navigate to activation if offline
      if (!navigator.onLine) {
        navigate('/activate');
        return;
      }
      
      // Otherwise try the check again
      const success = await checkLicense();
      if (!success) {
        navigate('/activate');
      }
    } catch (error) {
      console.error("Error during retry:", error);
      setHasError(true);
      toast.error('فشل التحقق من الترخيص مرة أخرى');
    } finally {
      setIsChecking(false);
    }
  };
  
  // Show loading only if needed and not skipped
  if (isChecking && !skipCheck) {
    return <LicenseCheckLoading />;
  }
  
  // If there's a connection error but we're not skipping, show retry option
  if (hasError && isOffline && !skipCheck) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <Alert variant="destructive" className="mb-8 max-w-md">
          <WifiOff className="h-5 w-5" />
          <AlertTitle>لا يوجد اتصال بالإنترنت</AlertTitle>
          <AlertDescription>
            تعذر التحقق من الترخيص بسبب عدم وجود اتصال بالإنترنت. يرجى التأكد من اتصالك ثم المحاولة مرة أخرى.
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-4">
          <Button onClick={handleRetryCheck} variant="outline">
            إعادة المحاولة
          </Button>
          <Button onClick={() => navigate('/activate')}>
            الانتقال إلى صفحة التفعيل
          </Button>
        </div>
      </div>
    );
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
