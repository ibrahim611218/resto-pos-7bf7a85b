
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Disc } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { handleDesktopExport } from '@/utils/desktop-export';
import { downloadIsoFile } from '@/utils/desktop-export/utils';
import { toast } from 'sonner';

export const DownloadButtons = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const handleExeDownload = () => {
    toast.loading(
      isArabic ? 'جاري إعداد التنزيل...' : 'Preparing download...',
      { duration: 2000 }
    );
    
    setTimeout(() => {
      handleDesktopExport(language);
    }, 1000);
  };
  
  const handleIsoDownload = () => {
    downloadIsoFile(language);
  };
  
  return (
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
  );
};

export default DownloadButtons;
