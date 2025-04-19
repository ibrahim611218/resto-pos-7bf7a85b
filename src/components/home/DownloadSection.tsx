
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Disc } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { INSTALLER_INFO, SYSTEM_REQUIREMENTS } from '@/utils/desktop-export/constants';
import { handleDesktopExport } from '@/utils/desktop-export';
import { downloadIsoFile } from '@/utils/desktop-export/utils';
import { toast } from 'sonner';

export const DownloadSection = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const handleExeDownload = () => {
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
  
  const handleIsoDownload = () => {
    downloadIsoFile(language);
  };
  
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800 rounded-lg my-8 shadow-md">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          {isArabic ? 'نسخة سطح المكتب' : 'Desktop Version'}
        </h2>
        
        <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
          {isArabic 
            ? 'قم بتنزيل نسخة سطح المكتب من Resto POS واستمتع بجميع الميزات دون الحاجة إلى اتصال بالإنترنت.'
            : 'Download the desktop version of Resto POS and enjoy all features without needing an internet connection.'}
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
          <Button 
            onClick={handleExeDownload}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg rounded-lg shadow-lg"
            size="lg"
          >
            <Download className="h-5 w-5" />
            {isArabic ? 'تنزيل ملف التثبيت (25MB)' : 'Download Installer (25MB)'}
          </Button>
          
          <Button 
            onClick={handleIsoDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-lg rounded-lg shadow-lg"
            size="lg"
          >
            <Disc className="h-5 w-5" />
            {isArabic ? 'تنزيل بصيغة ISO (700MB)' : 'Download ISO Format (700MB)'}
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-start">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-3">
              {isArabic ? 'معلومات التثبيت' : 'Installation Details'}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <span className="font-medium">{isArabic ? 'الإصدار:' : 'Version:'}</span> {INSTALLER_INFO.version}
              </li>
              <li>
                <span className="font-medium">{isArabic ? 'حجم الملف:' : 'File Size:'}</span> {INSTALLER_INFO.size}
              </li>
              <li>
                <span className="font-medium">{isArabic ? 'التاريخ:' : 'Release Date:'}</span> {INSTALLER_INFO.releaseDate}
              </li>
              <li>
                <span className="font-medium">{isArabic ? 'اسم الملف:' : 'Filename:'}</span> {INSTALLER_INFO.filename}
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-3">
              {isArabic ? 'متطلبات النظام' : 'System Requirements'}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>{isArabic ? SYSTEM_REQUIREMENTS.os.ar : SYSTEM_REQUIREMENTS.os.en}</li>
              <li>{isArabic ? SYSTEM_REQUIREMENTS.processor.ar : SYSTEM_REQUIREMENTS.processor.en}</li>
              <li>{isArabic ? SYSTEM_REQUIREMENTS.memory.ar : SYSTEM_REQUIREMENTS.memory.en}</li>
              <li>{isArabic ? SYSTEM_REQUIREMENTS.storage.ar : SYSTEM_REQUIREMENTS.storage.en}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
