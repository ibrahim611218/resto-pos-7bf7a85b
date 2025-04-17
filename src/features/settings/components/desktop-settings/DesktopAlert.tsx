
import React from 'react';
import { Download, Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/context/LanguageContext';

const DesktopAlert = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <div className="space-y-4">
      <Alert className="mb-2 border-green-500">
        <Download className="h-4 w-4 text-green-500" />
        <AlertTitle>{isArabic ? "تنزيل مباشر" : "Direct Download"}</AlertTitle>
        <AlertDescription>
          {isArabic 
            ? "سيتم تنزيل ملف التثبيت مباشرةً على جهازك عند النقر على زر التحميل." 
            : "The installer file will be downloaded directly to your device when you click the download button."}
        </AlertDescription>
      </Alert>
      
      <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-900/20">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertTitle>{isArabic ? "تعليمات مهمة" : "Important Instructions"}</AlertTitle>
        <AlertDescription className="space-y-1">
          {isArabic ? (
            <>
              <p>في حالة ظهور رسالة خطأ <span className="font-semibold">"لا يمكن تشغيل هذا التطبيق على الكمبيوتر لديك"</span>، اتبع الخطوات التالية:</p>
              <ul className="list-disc pl-5 pt-1">
                <li>انقر بزر الماوس الأيمن على الملف واختر "تشغيل كمسؤول"</li>
                <li>إذا استمرت المشكلة، انقر على "مزيد من المعلومات" ثم "تشغيل على أي حال"</li>
                <li>قم بتعطيل برنامج مكافحة الفيروسات مؤقتًا أثناء التثبيت</li>
              </ul>
            </>
          ) : (
            <>
              <p>If you see the error message <span className="font-semibold">"This app can't run on your PC"</span>, follow these steps:</p>
              <ul className="list-disc pl-5 pt-1">
                <li>Right-click on the file and select "Run as administrator"</li>
                <li>If the problem persists, click "More info" then "Run anyway"</li>
                <li>Temporarily disable your antivirus during installation</li>
              </ul>
            </>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DesktopAlert;
