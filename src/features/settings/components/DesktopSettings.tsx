
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, FileDown, GitFork } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SYSTEM_REQUIREMENTS, INSTALLER_INFO, APP_INSTRUCTIONS } from '@/utils/desktop-export/constants';
import { openDownloadLink } from '@/utils/desktop-export/utils';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';

const DesktopSettings = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isArabic = language === 'ar';
  const requirements = SYSTEM_REQUIREMENTS;
  const instructions = isArabic ? APP_INSTRUCTIONS.ar : APP_INSTRUCTIONS.en;
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(
    localStorage.getItem('lastUpdateCheck')
  );

  const handleCheckUpdate = async () => {
    setIsCheckingUpdate(true);
    
    try {
      // Simulate checking for updates
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store last check timestamp
      const now = new Date().toISOString();
      localStorage.setItem('lastUpdateCheck', now);
      setLastChecked(now);
      
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

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? 'ar-SA' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center mb-4 gap-3">
            <img 
              src="/lovable-uploads/ed39ec95-a279-49a0-b70f-aca7ccdcd2c0.png" 
              alt="RestoPOS Logo" 
              className="h-10 w-10" 
            />
            <h3 className="text-lg font-medium">
              {isArabic ? "تحميل نسخة سطح المكتب" : "Download Desktop Version"}
            </h3>
          </div>
          
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
            <p className="font-semibold">{isArabic ? `اسم الملف: ${INSTALLER_INFO.filename}` : `Filename: ${INSTALLER_INFO.filename}`}</p>
          </div>
          
          <Separator className="my-4" />
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">{instructions.title}</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              {instructions.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
            <p className="text-sm flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">ℹ️</span>
              {isArabic 
                ? "سيتم تنزيل ملف التثبيت مباشرة. تأكد من تشغيل الملف بعد التنزيل لبدء عملية التثبيت."
                : "The installer file will be downloaded directly. Make sure to run the file after download to start the installation process."}
            </p>
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
          
          {lastChecked && (
            <p className="mt-2 text-xs text-muted-foreground text-center">
              {isArabic 
                ? `آخر تحقق: ${formatDate(lastChecked)}` 
                : `Last checked: ${formatDate(lastChecked)}`}
            </p>
          )}
          
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
      
      <Card className="p-6 bg-muted/50">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <FileDown className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">
              {isArabic ? "مشكلة في تثبيت التطبيق؟" : "Having trouble installing the app?"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isArabic 
                ? `تأكد من النقر مرتين على ملف ${INSTALLER_INFO.filename} بعد التنزيل لبدء عملية التثبيت.`
                : `Make sure to double-click the ${INSTALLER_INFO.filename} file after downloading to start the installation process.`}
            </p>
            <Button variant="secondary" className="text-sm" onClick={() => {
              window.open('https://github.com/electron/electron', '_blank');
            }}>
              <GitFork className="h-4 w-4 mr-2" />
              {isArabic ? "الحصول على المساعدة" : "Get Help"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DesktopSettings;
