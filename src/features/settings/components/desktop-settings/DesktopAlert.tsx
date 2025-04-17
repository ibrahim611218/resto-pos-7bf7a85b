
import React from 'react';
import { Download } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/context/LanguageContext';

const DesktopAlert = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <Alert className="mb-6 border-green-500">
      <Download className="h-4 w-4 text-green-500" />
      <AlertTitle>{isArabic ? "تنزيل مباشر" : "Direct Download"}</AlertTitle>
      <AlertDescription>
        {isArabic 
          ? "سيتم تنزيل ملف التثبيت مباشرةً على جهازك عند النقر على زر التحميل." 
          : "The installer file will be downloaded directly to your device when you click the download button."}
      </AlertDescription>
    </Alert>
  );
};

export default DesktopAlert;
