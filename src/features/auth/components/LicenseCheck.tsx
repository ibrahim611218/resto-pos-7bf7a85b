
import React, { useEffect, useState } from 'react';
import { useLicense } from '../hooks/useLicense';
import { useNavigate, Outlet } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LicenseCheck: React.FC = () => {
  const { checkLicense, getLicenseInfo } = useLicense();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [expiryDays, setExpiryDays] = useState<number | null>(null);
  
  const isAdminUser = isAuthenticated && user?.email === 'eng.ibrahimabdalfatah@gmail.com';
  
  useEffect(() => {
    const verifyLicense = async () => {
      setIsChecking(true);
      
      // Skip license check for admin users - immediately set checking to false
      if (isAdminUser) {
        setIsChecking(false);
        return;
      }
      
      try {
        const hasValidLicense = await checkLicense();
        if (!hasValidLicense) {
          navigate('/activate');
          return;
        }
        
        // Get license info if valid
        const licenseInfo = await getLicenseInfo();
        if (licenseInfo) {
          const expiryDate = new Date(licenseInfo.expiryDate);
          const currentDate = new Date();
          const diffTime = expiryDate.getTime() - currentDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setExpiryDays(diffDays);
        }
      } finally {
        setIsChecking(false);
      }
    };
    
    verifyLicense();
  }, [checkLicense, getLicenseInfo, navigate, isAuthenticated, user, isAdminUser]);
  
  // Show loading only if needed
  if (isChecking) {
    return <LicenseCheckLoading />;
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

// Import the loading component to avoid circular dependencies
const LicenseCheckLoading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-2xl font-bold">جاري التحقق من الترخيص...</div>
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default LicenseCheck;
