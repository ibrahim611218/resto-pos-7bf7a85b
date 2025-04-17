
import React from 'react';
import { Download, Shield, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/context/LanguageContext';
import { INSTALLER_INFO } from '@/utils/desktop-export/constants';

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
            ? `سيتم تنزيل ملف التثبيت (${INSTALLER_INFO.size}) مباشرةً على جهازك عند النقر على زر التحميل. تم زيادة حجم الملف ليعمل بشكل أفضل.` 
            : `The installer file (${INSTALLER_INFO.size}) will be downloaded directly to your device when you click the download button. The file size has been increased for better compatibility.`}
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
                <li>في نافذة حماية Windows، انقر على "مزيد من المعلومات" ثم "تشغيل على أي حال"</li>
                <li>قم بتعطيل برنامج مكافحة الفيروسات مؤقتًا أثناء التثبيت</li>
                <li>جرب تشغيل الملف بوضع التوافق مع Windows 8 (انقر بزر الماوس الأيمن > خصائص > توافق)</li>
              </ul>
            </>
          ) : (
            <>
              <p>If you see the error message <span className="font-semibold">"This app can't run on your PC"</span>, follow these steps:</p>
              <ul className="list-disc pl-5 pt-1">
                <li>Right-click on the file and select "Run as administrator"</li>
                <li>In the Windows protection window, click "More info" then "Run anyway"</li>
                <li>Temporarily disable your antivirus during installation</li>
                <li>Try running the file in Windows 8 compatibility mode (Right-click > Properties > Compatibility)</li>
              </ul>
            </>
          )}
        </AlertDescription>
      </Alert>
      
      <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle>{isArabic ? "حل مشكلة خطأ Windows" : "Windows Error Solution"}</AlertTitle>
        <AlertDescription className="space-y-2">
          {isArabic ? (
            <>
              <div className="flex items-start gap-2 mt-2">
                <div className="border border-red-300 rounded p-1 bg-red-100">
                  <img 
                    src="/lovable-uploads/19e1159a-767c-4062-b31d-bc1cb300fc61.png" 
                    alt="رسالة خطأ" 
                    className="h-16 w-auto" 
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">عند ظهور هذه الرسالة:</p>
                  <ol className="list-decimal pl-5">
                    <li>انقر على زر "إغلاق" في هذه النافذة</li>
                    <li>انقر بزر الماوس الأيمن على ملف التثبيت</li>
                    <li>اختر "خصائص" من القائمة</li>
                    <li>انتقل إلى تبويب "توافق"</li>
                    <li>حدد خيار "تشغيل هذا البرنامج في وضع التوافق مع:"</li>
                    <li>اختر "Windows 8" من القائمة</li>
                    <li>حدد خيار "تشغيل هذا البرنامج كمسؤول"</li>
                    <li>انقر "موافق" ثم حاول تشغيل البرنامج مرة أخرى</li>
                  </ol>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-2 mt-2">
                <div className="border border-red-300 rounded p-1 bg-red-100">
                  <img 
                    src="/lovable-uploads/19e1159a-767c-4062-b31d-bc1cb300fc61.png" 
                    alt="Error message" 
                    className="h-16 w-auto" 
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">When you see this message:</p>
                  <ol className="list-decimal pl-5">
                    <li>Click the "Close" button on this window</li>
                    <li>Right-click on the installer file</li>
                    <li>Choose "Properties" from the menu</li>
                    <li>Navigate to the "Compatibility" tab</li>
                    <li>Check "Run this program in compatibility mode for:"</li>
                    <li>Select "Windows 8" from the dropdown</li>
                    <li>Check "Run this program as administrator"</li>
                    <li>Click "OK" and try running the program again</li>
                  </ol>
                </div>
              </div>
            </>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DesktopAlert;
