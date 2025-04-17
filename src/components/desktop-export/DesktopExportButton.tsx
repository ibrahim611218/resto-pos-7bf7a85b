
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
              ? 'في حال ظهور رسالة خطأ، انقر بزر الماوس الأيمن على الملف واختر "تشغيل كمسؤول"'
              : 'If you see an error message, right-click the file and select "Run as administrator"',
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
            duration: 8000,
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
      {language === 'ar' ? 'تنزيل مباشر' : 'Direct Download'}
    </Button>
  );
};

export default DesktopExportButton;
