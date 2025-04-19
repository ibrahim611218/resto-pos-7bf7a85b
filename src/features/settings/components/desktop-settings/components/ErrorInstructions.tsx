
import React from 'react';
import { ShieldAlert, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { APP_INSTRUCTIONS } from '@/utils/desktop-export/constants';
import { toast } from 'sonner';

export const ErrorInstructions = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
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
  );
};

export default ErrorInstructions;
