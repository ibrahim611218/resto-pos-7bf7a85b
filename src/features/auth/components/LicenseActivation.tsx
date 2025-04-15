
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
  
  const handleActivate = () => {
    // التحقق من إدخال رمز التفعيل
    if (!licenseKey.trim()) {
      toast.error('الرجاء إدخال رمز التفعيل');
      return;
    }
    
    // منع النقرات المتعددة
    if (isActivating) {
      return;
    }
    
    // تعيين حالة التفعيل إلى قيد التنفيذ
    setIsActivating(true);
    
    // إظهار رسالة للمستخدم أن عملية التفعيل قيد التنفيذ
    toast.loading('جاري التحقق من رمز التفعيل...', {
      id: 'license-activation',
      duration: 10000 // وقت أطول لضمان استمرار الرسالة
    });

    // استدعاء وظيفة التفعيل بسلسلة وعود واضحة
    activateLicense(licenseKey)
      .then(success => {
        if (success) {
          toast.dismiss('license-activation');
          toast.success('تم تفعيل الترخيص بنجاح');
          // تأخير قصير قبل التنقل للتأكد من ظهور رسالة النجاح
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 500);
          return true;
        } else {
          throw new Error('فشل التفعيل');
        }
      })
      .catch(error => {
        toast.dismiss('license-activation');
        console.error('خطأ في التفعيل:', error);
        toast.error('فشل تفعيل الرمز، يرجى التأكد من صحة الرمز والمحاولة مرة أخرى');
      })
      .finally(() => {
        // التأكد من إعادة تعيين حالة التفعيل في جميع الحالات
        setIsActivating(false);
      });
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isActivating) {
      e.preventDefault(); // منع السلوك الافتراضي
      handleActivate();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // تنسيق رمز التفعيل تلقائياً (إزالة المسافات الزائدة)
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
                maxLength={19} // 16 أحرف + 3 شرطات
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
