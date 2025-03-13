
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLicense } from "@/hooks/useLicense";

interface LicenseCheckProps {
  children: React.ReactNode;
}

const LicenseCheck: React.FC<LicenseCheckProps> = ({ children }) => {
  const { licenseState, loading } = useLicense();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    if (!loading) {
      const isActivatePath = location.pathname === "/activate";
      
      // If not licensed and not on the activate page, redirect to activate
      if (!licenseState.isLicensed && !isActivatePath) {
        navigate("/activate");
      }
      
      // If licensed and on the activate page, redirect to home
      if (licenseState.isLicensed && isActivatePath) {
        navigate("/");
      }
      
      setIsChecking(false);
    }
  }, [licenseState, loading, navigate, location.pathname]);
  
  if (loading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <p className="text-lg">جاري التحقق من الترخيص...</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default LicenseCheck;
