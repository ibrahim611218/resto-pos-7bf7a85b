
import React from 'react';
import { Download, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import { handleDesktopExport } from '@/utils/desktop-export';
import { INSTALLER_INFO, APP_INSTRUCTIONS } from '@/utils/desktop-export/constants';
import { toast } from 'sonner';

const DownloadCard = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const instructions = isArabic ? APP_INSTRUCTIONS.ar : APP_INSTRUCTIONS.en;
  
  const handleDownload = () => {
    // Show loading toast
    toast.loading(
      isArabic ? 'جاري إعداد الملف للتحميل...' : 'Preparing download...',
      { duration: 2000 }
    );
    
    // Trigger the download after a short delay
    setTimeout(() => {
      handleDesktopExport(language);
    }, 1000);
  };
  
  const showTroubleshooting = () => {
    const troubleshooting = isArabic ? APP_INSTRUCTIONS.ar.troubleshooting : APP_INSTRUCTIONS.en.troubleshooting;
    
    toast(
      isArabic ? 'استكشاف الأخطاء وإصلاحها' : 'Troubleshooting',
      {
        description: troubleshooting.join(' • '),
        duration: 10000,
      }
    );
  };
  
  return (
    <Card className="p-6">
      <div className="flex items-center mb-4 gap-3">
        <img 
          src="/lovable-uploads/ed39ec95-a279-49a0-b70f-aca7ccdcd2c0.png" 
          alt="RestoPOS Logo" 
          className="h-12 w-12" 
        />
        <h3 className="text-lg font-medium">
          {isArabic ? "تحميل نسخة سطح المكتب" : "Download Desktop Version"}
        </h3>
      </div>
      
      <Button 
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
      >
        <Download className="h-5 w-5" />
        {isArabic ? "تحميل مباشر للنسخة النهائية" : "Direct Download of Final Version"}
      </Button>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>{isArabic ? "معلومات المثبت:" : "Installer information:"}</p>
        <p>{isArabic ? `الإصدار: ${INSTALLER_INFO.version}` : `Version: ${INSTALLER_INFO.version}`}</p>
        <p>{isArabic ? `الحجم: ${INSTALLER_INFO.size}` : `Size: ${INSTALLER_INFO.size}`}</p>
        <p>{isArabic ? `تاريخ الإصدار: ${INSTALLER_INFO.releaseDate}` : `Release date: ${INSTALLER_INFO.releaseDate}`}</p>
        <p className="font-semibold">{isArabic ? `اسم الملف: ${INSTALLER_INFO.filename}` : `Filename: ${INSTALLER_INFO.filename}`}</p>
      </div>
      
      <Separator className="my-4" />
      
      <div className="mt-4">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          {instructions.title}
        </h4>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          {instructions.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 rounded-md">
        <div className="flex items-start gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-500">
              {isArabic ? "إذا واجهت رسالة خطأ:" : "If you encounter an error message:"}
            </p>
            <p className="text-sm mt-1">
              {isArabic 
                ? "\"لا يمكن تشغيل هذا التطبيق على الكمبيوتر لديك\""
                : "\"This app can't run on your PC\""}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/50"
              onClick={showTroubleshooting}
            >
              {isArabic ? "عرض حلول المشكلة" : "View Solutions"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md">
        <p className="text-sm flex items-start gap-2">
          <span className="text-green-600 dark:text-green-400">✓</span>
          {isArabic 
            ? "تنزيل مباشر بدون وسيط ومع شعار المطعم المضمّن"
            : "Direct download without intermediaries, with restaurant logo embedded"}
        </p>
      </div>
    </Card>
  );
};

export default DownloadCard;
