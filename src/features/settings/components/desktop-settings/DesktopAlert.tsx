
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
      <AlertTitle>{isArabic ? "ملف تثبيت تجريبي" : "Sample Installer File"}</AlertTitle>
      <AlertDescription>
        {isArabic 
          ? "سيتم تنزيل ملف تجريبي. في بيئة الإنتاج، سيكون هذا ملف التثبيت الفعلي للتطبيق." 
          : "A sample file will be downloaded. In production, this would be the actual application installer."}
      </AlertDescription>
    </Alert>
  );
};

export default DesktopAlert;
