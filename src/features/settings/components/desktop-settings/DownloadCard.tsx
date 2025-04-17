
import React from 'react';
import { Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import { openDownloadLink } from '@/utils/desktop-export/utils';
import { INSTALLER_INFO, APP_INSTRUCTIONS } from '@/utils/desktop-export/constants';

const DownloadCard = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const instructions = isArabic ? APP_INSTRUCTIONS.ar : APP_INSTRUCTIONS.en;
  
  return (
    <Card className="p-6">
      <div className="flex items-center mb-4 gap-3">
        <img 
          src="/lovable-uploads/ed39ec95-a279-49a0-b70f-aca7ccdcd2c0.png" 
          alt="RestoPOS Logo" 
          className="h-10 w-10" 
        />
        <h3 className="text-lg font-medium">
          {isArabic ? "تحميل نسخة سطح المكتب" : "Download Desktop Version"}
        </h3>
      </div>
      
      <Button 
        onClick={openDownloadLink}
        className="w-full flex items-center justify-center gap-2"
      >
        <Download className="h-4 w-4" />
        {isArabic ? "تحميل النسخة المحلية" : "Download Local Version"}
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
        <h4 className="font-medium mb-2">{instructions.title}</h4>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          {instructions.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <p className="text-sm flex items-start gap-2">
          <span className="text-blue-600 dark:text-blue-400">ℹ️</span>
          {isArabic 
            ? "سيتم تنزيل ملف التثبيت مباشرة. تأكد من تشغيل الملف بعد التنزيل لبدء عملية التثبيت."
            : "The installer file will be downloaded directly. Make sure to run the file after download to start the installation process."}
        </p>
      </div>
    </Card>
  );
};

export default DownloadCard;
