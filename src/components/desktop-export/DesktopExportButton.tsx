
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleDesktopExport } from '@/utils/desktop-export';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';
import { APP_INSTRUCTIONS } from '@/utils/desktop-export/constants';

export const DesktopExportButton = ({ variant = "default" }: { variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link" }) => {
  const { language } = useLanguage();
  
  const handleClick = () => {
    // Show loading toast
    toast.loading(
      language === 'ar' ? 'جاري إعداد الملف للتحميل...' : 'Preparing download...',
      { duration: 2000 }
    );
    
    // Trigger the download after a short delay to allow the loading toast to show
    setTimeout(() => {
      handleDesktopExport(language);
      
      // Show additional help information after a short delay
      setTimeout(() => {
        const isArabic = language === 'ar';
        const troubleshooting = isArabic ? APP_INSTRUCTIONS.ar.troubleshooting : APP_INSTRUCTIONS.en.troubleshooting;
        
        toast(
          isArabic ? 'تعليمات مهمة للتثبيت' : 'Important Installation Instructions',
          {
            description: isArabic 
              ? 'إذا ظهرت رسالة خطأ "لا يمكن تشغيل هذا التطبيق على الكمبيوتر لديك"، انقر على "مزيد من المعلومات" ثم "تشغيل على أي حال"'
              : 'If you see "This app can\'t run on your PC", click "More info" then "Run anyway"',
            action: {
              label: isArabic ? 'المزيد' : 'More',
              onClick: () => {
                toast(
                  isArabic ? 'حلول إضافية' : 'Additional Solutions',
                  {
                    description: troubleshooting.join(' • '),
                    duration: 8000,
                  }
                );
              },
            },
            duration: 10000,
          }
        );
      }, 2000);
    }, 1000);
  };
  
  return (
    <Button 
      onClick={handleClick} 
      variant={variant}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
    >
      <Download size={18} />
      {language === 'ar' ? 'تنزيل بالحجم الكامل' : 'Full-Size Download'}
    </Button>
  );
};

export default DesktopExportButton;
