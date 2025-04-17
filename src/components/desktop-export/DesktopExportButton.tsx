
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleDesktopExport } from '@/utils/desktop-export';
import { useLanguage } from '@/context/LanguageContext';

export const DesktopExportButton = ({ variant = "default" }: { variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link" }) => {
  const { language } = useLanguage();
  
  const handleClick = () => {
    handleDesktopExport(language);
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
