
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/context/LanguageContext';

const DesktopAlert = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <Alert className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{isArabic ? "ملف التثبيت غير متاح حاليًا" : "Installer File Not Available Yet"}</AlertTitle>
      <AlertDescription>
        {isArabic 
          ? "ملف التثبيت قيد التطوير وسيكون متاحًا قريبًا. استخدم الإصدار المتصل بالإنترنت في الوقت الحالي." 
          : "The installer file is under development and will be available soon. Please use the online version for now."}
      </AlertDescription>
    </Alert>
  );
};

export default DesktopAlert;
