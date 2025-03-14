
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
  
  // Temporarily bypass license check to allow access to dashboard
  useEffect(() => {
    if (!loading) {
      const isActivatePath = location.pathname === "/activate";
      
      // If on the activate page and user wants to bypass, go to dashboard
      if (isActivatePath) {
        navigate("/");
      }
      
      setIsChecking(false);
    }
  }, [loading, navigate, location.pathname]);
  
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
