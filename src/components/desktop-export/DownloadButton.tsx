
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { openDownloadLink } from '@/utils/desktop-export/utils';

export const DownloadButton = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  // Create a wrapper function that handles the MouseEvent
  const handleClick = () => {
    openDownloadLink(false); // Default to EXE file (not ISO)
  };
  
  return (
    <Button 
      onClick={handleClick}
      className="flex items-center gap-2"
      variant="default"
    >
      <Download className="h-4 w-4" />
      {isArabic ? 'تحميل نسخة سطح المكتب' : 'Download Desktop Version'}
    </Button>
  );
};

export default DownloadButton;
