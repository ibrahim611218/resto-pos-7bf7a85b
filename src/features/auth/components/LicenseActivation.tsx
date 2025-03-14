
import React, { useState } from 'react';
import { useLicense } from '../hooks/useLicense';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, KeyRound } from 'lucide-react';
import logo from '/assets/restopos-logo.png';
import { toast } from 'sonner';

const LicenseActivation = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const { activateLicense } = useLicense();
  const navigate = useNavigate();

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!licenseKey.trim()) {
      toast.error('الرجاء إدخال رمز التفعيل');
      return;
    }
    
    setIsActivating(true);
    try {
      const result = await activateLicense(licenseKey.trim());
      if (result) {
        navigate('/');
      }
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20">
            <img src={logo} alt="NectarPOS Logo" className="w-full" />
          </div>
          <CardTitle className="text-2xl">تفعيل البرنامج</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleActivate} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="licenseKey" className="text-sm font-medium">
                رمز التفعيل
              </label>
              <div className="flex items-center space-x-2 border rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-ring">
                <span className="px-3 py-2 bg-muted">
                  <KeyRound className="h-5 w-5 text-muted-foreground" />
                </span>
                <Input
                  id="licenseKey"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="flex-1 border-0 focus-visible:ring-0"
                  placeholder="أدخل رمز التفعيل"
                  dir="ltr"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isActivating}>
              {isActivating ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري التفعيل...
                </>
              ) : (
                'تفعيل البرنامج'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            إذا لم يكن لديك رمز تفعيل، يرجى التواصل مع المسؤول
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 NectarPOS. جميع الحقوق محفوظة
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LicenseActivation;
