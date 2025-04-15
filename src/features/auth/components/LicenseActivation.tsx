
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Key } from 'lucide-react';
import { useLicense } from '../hooks/useLicense';
import { useNavigate } from 'react-router-dom';
import AnimatedTransition from '@/components/ui-custom/AnimatedTransition';

const LicenseActivation: React.FC = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const { activateLicense } = useLicense();
  const navigate = useNavigate();
  
  const handleActivate = async () => {
    if (!licenseKey.trim()) {
      toast.error('الرجاء إدخال رمز التفعيل');
      return;
    }
    
    setIsActivating(true);
    try {
      const success = await activateLicense(licenseKey);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsActivating(false);
    }
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
            <div className="space-y-2">
              <Label htmlFor="license-key">رمز التفعيل</Label>
              <Input
                id="license-key"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="h-12 text-center tracking-widest"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full h-12"
              onClick={handleActivate}
              disabled={isActivating}
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
