
import React from 'react';
import { Download, ShieldAlert, HelpCircle, Info, Disc } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import { handleDesktopExport } from '@/utils/desktop-export';
import { downloadIsoFile } from '@/utils/desktop-export/utils';
import { INSTALLER_INFO, APP_INSTRUCTIONS } from '@/utils/desktop-export/constants';
import { toast } from 'sonner';

const DownloadCard = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const instructions = isArabic ? APP_INSTRUCTIONS.ar : APP_INSTRUCTIONS.en;
  
  const handleExeDownload = () => {
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
  
  const handleIsoDownload = () => {
    downloadIsoFile(language);
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
  
  const showScreenshotGuide = () => {
    toast(
      isArabic ? 'حل مشكلة رسالة الخطأ' : 'How to Fix Error Message',
      {
        description: isArabic 
          ? 'انقر على "مزيد من المعلومات" (More info) ثم "تشغيل على أي حال" (Run anyway) في نافذة حماية Windows. إذا لم تظهر هذه الخيارات، استخدم وضع التوافق.'
          : 'Click "More info" then "Run anyway" in the Windows protection dialog. If these options don\'t appear, use compatibility mode.',
        duration: 15000,
        action: {
          label: isArabic ? 'عرض الصور التوضيحية' : 'Show Screenshots',
          onClick: () => showExtendedHelp(),
        }
      }
    );
  };
  
  const showExtendedHelp = () => {
    toast(
      isArabic ? 'خطوات تفعيل وضع التوافق' : 'Compatibility Mode Steps',
      {
        description: isArabic 
          ? '1. انقر بزر الماوس الأيمن على الملف 2. اختر خصائص 3. انتقل لتبويب "توافق" 4. فعّل "تشغيل هذا البرنامج في وضع التوافق" واختر Windows 8 5. فعّل "تشغيل كمسؤول" 6. انقر موافق'
          : '1. Right-click the file 2. Select Properties 3. Go to "Compatibility" tab 4. Enable "Run in compatibility mode" and select Windows 8 5. Check "Run as administrator" 6. Click OK',
        duration: 15000,
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
      
      <div className="flex flex-col gap-3 mb-4">
        <Button 
          onClick={handleExeDownload}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-5 text-lg"
          size="lg"
        >
          <Download className="h-5 w-5" />
          {isArabic ? "تحميل النسخة المكتبية (25MB)" : "Download Desktop Version (25MB)"}
        </Button>
        
        <Button 
          onClick={handleIsoDownload}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-5 text-lg"
          size="lg"
        >
          <Disc className="h-5 w-5" />
          {isArabic ? "تحميل بصيغة ISO (700MB)" : "Download ISO Format (700MB)"}
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>{isArabic ? "معلومات الملف:" : "File information:"}</p>
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
            <div className="flex items-center gap-1 mt-1">
              <img 
                src="/lovable-uploads/19e1159a-767c-4062-b31d-bc1cb300fc61.png" 
                alt="Error screenshot" 
                className="h-12 w-auto border border-amber-300 rounded" 
              />
              <p className="text-sm">
                {isArabic 
                  ? "\"لا يمكن تشغيل هذا التطبيق على الكمبيوتر لديك\""
                  : "\"This app can't run on your PC\""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/50"
                onClick={showTroubleshooting}
              >
                <ShieldAlert className="h-4 w-4 mr-1" />
                {isArabic ? "حلول المشكلة" : "Solutions"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/50"
                onClick={showScreenshotGuide}
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                {isArabic ? "شرح مفصّل" : "Detailed Guide"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
              {isArabic ? "نصائح إضافية:" : "Additional Tips:"}
            </p>
            <ul className="text-sm space-y-1 mt-1 list-disc pl-5">
              <li>
                {isArabic 
                  ? "تم توفير نسخة ISO بحجم 700 ميجابايت تعمل على جميع أجهزة الكمبيوتر"
                  : "ISO version of 700MB is now available and works on all computers"}
              </li>
              <li>
                {isArabic 
                  ? "استخدم وضع التوافق مع Windows 8 إذا استمرت المشكلة"
                  : "Use Windows 8 compatibility mode if issues persist"}
              </li>
              <li>
                {isArabic 
                  ? "تأكد من تشغيل الملف كمسؤول دائماً"
                  : "Always run the file as administrator"}
              </li>
            </ul>
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
