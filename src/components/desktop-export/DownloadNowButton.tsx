
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Disc } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { handleDesktopExport } from '@/utils/desktop-export';
import { downloadIsoFile } from '@/utils/desktop-export/utils';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const DownloadNowButton = () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg rounded-lg shadow-lg"
          size="lg"
        >
          <Download className="h-6 w-6" />
          {isArabic ? 'تنزيل النظام بالحجم الكامل' : 'Download Full-Size System'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={handleExeDownload}>
          <Download className="h-5 w-5 mr-2" />
          {isArabic ? 'تنزيل ملف التثبيت (25MB)' : 'Download Installer (25MB)'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleIsoDownload}>
          <Disc className="h-5 w-5 mr-2" />
          {isArabic ? 'تنزيل بصيغة ISO (700MB)' : 'Download ISO Format (700MB)'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadNowButton;
