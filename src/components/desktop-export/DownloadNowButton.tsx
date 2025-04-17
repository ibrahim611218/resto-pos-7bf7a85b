
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { handleDesktopExport } from '@/utils/desktop-export';
import { toast } from 'sonner';

export const DownloadNowButton = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const handleDownload = () => {
    // Show loading toast
    toast.loading(
      isArabic ? 'جاري إعداد التنزيل...' : 'Preparing download...',
      { duration: 2000 }
    );
    
    // Start download after a short delay
    setTimeout(() => {
      handleDesktopExport(language);
    }, 1000);
  };
  
  return (
    <Button 
      onClick={handleDownload}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg rounded-lg shadow-lg"
      size="lg"
    >
      <Download className="h-6 w-6" />
      {isArabic ? 'تنزيل النسخة المكتبية الآن' : 'Download Desktop Version Now'}
    </Button>
  );
};

export default DownloadNowButton;
