
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import DownloadButtons from './components/DownloadButtons';
import FileInformation from './components/FileInformation';
import InstallInstructions from './components/InstallInstructions';
import ErrorInstructions from './components/ErrorInstructions';
import AdditionalInfo from './components/AdditionalInfo';

const DownloadCard = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <Card className="p-6">
      <div className="flex items-center mb-4 gap-3">
        <img 
          src="/lovable-uploads/ed39ec95-a279-49a0-b70f-aca7ccdcd2c0.png" 
          alt="RestoPOS Logo" 
          className="h-12 w-12" 
        />
        <h3 className="text-lg font-medium">
          {isArabic ? "تحميل نسخة سطح المكتب" : "Download Desktop Version"}
        </h3>
      </div>
      
      <DownloadButtons />
      <FileInformation />
      <Separator className="my-4" />
      <InstallInstructions />
      <ErrorInstructions />
      <AdditionalInfo />
    </Card>
  );
};

export default DownloadCard;
