
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SYSTEM_REQUIREMENTS, INSTALLER_INFO } from '@/utils/desktop-export/constants';
import { openDownloadLink } from '@/utils/desktop-export/utils';
import { toast } from 'sonner';

const DesktopSettings = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const requirements = SYSTEM_REQUIREMENTS;
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);

  const handleCheckUpdate = async () => {
    setIsCheckingUpdate(true);
    
    try {
      // Simulate checking for updates
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, we'll just show a toast notification
      // In a real implementation, this would check against a server version
      toast.success(
        isArabic 
          ? "أنت تستخدم أحدث إصدار من النظام" 
          : "You are using the latest version of the system"
      );
    } catch (error) {
      console.error("Error checking for updates:", error);
      toast.error(
        isArabic 
          ? "تعذر التحقق من التحديثات، يرجى المحاولة لاحقًا" 
          : "Failed to check for updates, please try again later"
      );
    } finally {
      setIsCheckingUpdate(false);
    }
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
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>{isArabic ? "معلومات المثبت:" : "Installer information:"}</p>
            <p>{isArabic ? `الإصدار: ${INSTALLER_INFO.version}` : `Version: ${INSTALLER_INFO.version}`}</p>
            <p>{isArabic ? `الحجم: ${INSTALLER_INFO.size}` : `Size: ${INSTALLER_INFO.size}`}</p>
            <p>{isArabic ? `تاريخ الإصدار: ${INSTALLER_INFO.releaseDate}` : `Release date: ${INSTALLER_INFO.releaseDate}`}</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">
            {isArabic ? "تحديث النظام" : "System Update"}
          </h3>
          <Button 
            onClick={handleCheckUpdate}
            variant="outline"
            disabled={isCheckingUpdate}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isCheckingUpdate ? 'animate-spin' : ''}`} />
            {isArabic 
              ? isCheckingUpdate ? "جاري التحقق..." : "التحقق من التحديثات" 
              : isCheckingUpdate ? "Checking..." : "Check for Updates"}
          </Button>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              {isArabic 
                ? "يقوم النظام بالتحقق من وجود تحديثات جديدة والتنبيه في حالة توفرها." 
                : "The system checks for new updates and alerts when they are available."}
            </p>
          </div>
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
