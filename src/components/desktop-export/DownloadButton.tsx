
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const DownloadButton = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const handleDownload = () => {
    // Get the correct download path based on OS
    const downloadUrl = process.platform === 'win32' 
      ? '../out/make/squirrel.windows/x64/resto-pos-setup.exe'
      : '../out/make/resto-pos.AppImage';

    // Open the file in a new window
    window.open(downloadUrl, '_blank');
  };

  return (
    <Button 
      onClick={handleDownload}
      className="flex items-center gap-2"
      variant="default"
    >
      <Download className="h-4 w-4" />
      {isArabic ? 'تحميل نسخة سطح المكتب' : 'Download Desktop Version'}
    </Button>
  );
};

export default DownloadButton;
