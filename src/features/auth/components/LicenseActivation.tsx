
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Key, WifiOff } from 'lucide-react';
import { useLicense } from '../hooks/useLicense';
import { useNavigate } from 'react-router-dom';
import AnimatedTransition from '@/components/ui-custom/AnimatedTransition';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LicenseActivation: React.FC = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const { activateLicense } = useLicense();
  const navigate = useNavigate();
  
  // Check for an internet connection
  useEffect(() => {
    const checkConnection = () => {
      setConnectionError(!navigator.onLine);
    };
    
    // Check initially
    checkConnection();
    
    // Listen for online/offline events
    window.addEventListener('online', () => setConnectionError(false));
    window.addEventListener('offline', () => setConnectionError(true));
    
    return () => {
      window.removeEventListener('online', () => setConnectionError(false));
      window.removeEventListener('offline', () => setConnectionError(true));
    };
  }, []);
  
  const handleActivate = async () => {
    // Check for internet connection
    if (!navigator.onLine) {
      toast.error('يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى');
      setConnectionError(true);
      return;
    }
    
    // Validate license key input
    if (!licenseKey.trim()) {
      toast.error('الرجاء إدخال رمز التفعيل');
      return;
    }
    
    // Prevent multiple clicks
    if (isActivating) {
      return;
    }
    
    // Set activation state to in progress
    setIsActivating(true);
    setConnectionError(false);
    
    // Show a message to the user that activation is in progress
    const toastId = toast.loading('جاري التحقق من رمز التفعيل...', {
      duration: 10000 // Longer duration to ensure message persists
    });

    // Add a small delay to ensure the UI updates first
    await new Promise(resolve => setTimeout(resolve, 10));

    try {
      // Call the activation function directly with await
      const success = await activateLicense(licenseKey);
      
      // Remove loading toast
      toast.dismiss(toastId);
      
      if (success) {
        // Show success message
        toast.success('تم تفعيل الترخيص بنجاح');
        
        // Navigate to home page after a short delay
        // to allow success message to be seen
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 500);
      } else {
        // Show error message
        toast.error('فشل تفعيل الرمز، يرجى التأكد من صحة الرمز والمحاولة مرة أخرى');
      }
    } catch (error) {
      // Remove loading toast in case of error
      toast.dismiss(toastId);
      console.error('خطأ في التفعيل:', error);
      setConnectionError(true);
      toast.error('حدث خطأ أثناء الاتصال بخادم التفعيل، يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى');
    } finally {
      // Make sure to reset activation state in all cases
      setIsActivating(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isActivating) {
      e.preventDefault(); // Prevent default behavior
      handleActivate();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format activation code automatically (remove extra spaces)
    setLicenseKey(e.target.value.trim().toUpperCase());
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary">
      <AnimatedTransition animation="slide-up" className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Key className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">تفعيل البرنامج</CardTitle>
            <CardDescription>
              يرجى إدخال رمز التفعيل الخاص بك لتتمكن من استخدام النظام
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connectionError && (
              <Alert variant="destructive" className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <WifiOff className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    تجاوز وقت التحقق من الترخيص، يرجى التأكد من اتصال الإنترنت
                  </AlertDescription>
                </div>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="license-key">رمز التفعيل</Label>
              <Input
                id="license-key"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={licenseKey}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="h-12 text-center tracking-widest"
                disabled={isActivating}
                autoComplete="off"
                maxLength={19} // 16 characters + 3 dashes
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full h-12"
              onClick={handleActivate}
              disabled={isActivating || connectionError}
            >
              {isActivating ? 'جاري التفعيل...' : 'تفعيل البرنامج'}
            </Button>
          </CardFooter>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default LicenseActivation;
