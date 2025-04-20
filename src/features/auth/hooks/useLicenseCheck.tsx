
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLicense } from './useLicense';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useLicenseCheck = () => {
  const { checkLicense } = useLicense();
  const { user, isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(false);
  const checkAttempted = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // في النسخة الأونلاين، نعتبر جميع المستخدمين كمشرفين لتجاوز التحقق من الترخيص
  const isAdminUser = true;
  
  useEffect(() => {
    // في النسخة الأونلاين، نتخطى التحقق من الترخيص
    setIsChecking(false);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);
  
  return {
    isChecking: false,
    isAdminUser: true
  };
};
