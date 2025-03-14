
import React, { useEffect, useState } from 'react';
import { useLicense } from '../hooks/useLicense';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface FirstRunLicenseCheckProps {
  children: React.ReactNode;
}

const FirstRunLicenseCheck: React.FC<FirstRunLicenseCheckProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { licenseStatus, checkLicense } = useLicense();
  const navigate = useNavigate();

  useEffect(() => {
    const checkFirstRun = async () => {
      setIsChecking(true);
      try {
        // Check if it's the first run
        const isFirstRun = localStorage.getItem('app-first-run') !== 'false';
        
        // Check license status
        await checkLicense();
        
        if (isFirstRun && !licenseStatus.isActive) {
          setOpen(true);
        }
        
        // Mark that first run has occurred
        localStorage.setItem('app-first-run', 'false');
      } finally {
        setIsChecking(false);
      }
    };
    
    checkFirstRun();
  }, [checkLicense, licenseStatus.isActive]);

  const handleActivate = () => {
    setOpen(false);
    navigate('/activate');
  };

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-2 text-muted-foreground">جاري تهيئة التطبيق...</span>
      </div>
    );
  }

  return (
    <>
      {children}
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تفعيل البرنامج</DialogTitle>
            <DialogDescription>
              مرحباً بك في NectarPOS! يتطلب استخدام البرنامج تفعيل رخصة صالحة.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-3 pt-4">
            <p className="text-sm text-muted-foreground">
              يرجى تفعيل البرنامج باستخدام رمز التفعيل الخاص بك للاستمرار في استخدام كافة المزايا.
            </p>
            
            <div className="flex justify-end gap-2">
              <Button variant="default" onClick={handleActivate}>
                تفعيل الآن
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FirstRunLicenseCheck;
