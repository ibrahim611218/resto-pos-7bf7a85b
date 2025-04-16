
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SYSTEM_REQUIREMENTS } from '@/utils/desktop-export/constants';
import { openDownloadLink } from '@/utils/desktop-export/utils';

const DesktopSettings = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const requirements = SYSTEM_REQUIREMENTS;

  const handleCheckUpdate = () => {
    // This will be implemented when the update system is ready
    console.log("Checking for updates...");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">
            {isArabic ? "تحميل نسخة سطح المكتب" : "Download Desktop Version"}
          </h3>
          <Button 
            onClick={openDownloadLink}
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isArabic ? "تحميل النسخة المحلية" : "Download Local Version"}
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">
            {isArabic ? "تحديث النظام" : "System Update"}
          </h3>
          <Button 
            onClick={handleCheckUpdate}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {isArabic ? "التحقق من التحديثات" : "Check for Updates"}
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">
          {isArabic ? "متطلبات النظام" : "System Requirements"}
        </h3>
        <div className="space-y-2">
          <p>{requirements.os[language]}</p>
          <p>{requirements.processor[language]}</p>
          <p>{requirements.memory[language]}</p>
          <p>{requirements.storage[language]}</p>
        </div>
      </Card>
    </div>
  );
};

export default DesktopSettings;
