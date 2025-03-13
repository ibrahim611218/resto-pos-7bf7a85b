
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
      className="flex items-center gap-2"
    >
      <Download size={16} />
      {language === 'ar' ? 'تحميل نسخة الويندوز' : 'Download Windows Version'}
    </Button>
  );
};

export default DesktopExportButton;
