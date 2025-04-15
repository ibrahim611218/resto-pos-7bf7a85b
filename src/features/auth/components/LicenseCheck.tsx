
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
  
  // Add a ref to prevent multiple check attempts
  const checkAttempted = useRef(false);
  
  // Optimize the check for admin user
  const isAdminUser = React.useMemo(() => {
    return isAuthenticated && user?.email === 'eng.ibrahimabdalfatah@gmail.com';
  }, [isAuthenticated, user?.email]);
  
  useEffect(() => {
    let isMounted = true;
    
    // Only check license once per component mount
    if (checkAttempted.current) return;
    checkAttempted.current = true;
    
    const verifyLicense = async () => {
      // Use a timeout to prevent infinite loading if something goes wrong
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          setIsChecking(false);
          setHasError(true);
          toast.error('فشل التحقق من الترخيص، يرجى المحاولة مرة أخرى');
          navigate('/activate', { replace: true });
        }
      }, 10000); // 10 second timeout
      
      try {
        if (!isMounted) return;
        setIsChecking(true);
        
        // Skip license check for admin users
        if (isAdminUser) {
          console.log("Admin user detected, skipping license check");
          setIsChecking(false);
          clearTimeout(timeoutId);
          return;
        }
        
        console.log("Starting license check");
        const hasValidLicense = await checkLicense();
        console.log("License check result:", hasValidLicense);
        
        if (!hasValidLicense && isMounted) {
          navigate('/activate', { replace: true });
          clearTimeout(timeoutId);
          return;
        }
        
        // Get license info if valid
        if (isMounted) {
          const licenseInfo = await getLicenseInfo();
          if (licenseInfo) {
            const expiryDate = new Date(licenseInfo.expiryDate);
            const currentDate = new Date();
            const diffTime = expiryDate.getTime() - currentDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setExpiryDays(diffDays);
          }
          
          setIsChecking(false);
          clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error("License check error:", error);
        if (isMounted) {
          setIsChecking(false);
          setHasError(true);
          toast.error('حدث خطأ أثناء التحقق من الترخيص');
          clearTimeout(timeoutId);
        }
      }
    };
    
    // Small delay before check to ensure everything is initialized
    setTimeout(() => {
      verifyLicense();
    }, 100);
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [checkLicense, getLicenseInfo, navigate, isAdminUser]);
  
  // Show loading only if needed
  if (isChecking) {
    return <LicenseCheckLoading />;
  }
  
  // If there's an error, we'll let the navigate in the effect handle it
  if (hasError) {
    return null;
  }
  
  // Don't show warning for admin
  if (isAdminUser) {
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
