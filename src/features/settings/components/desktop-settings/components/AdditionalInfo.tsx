
import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const AdditionalInfo = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <>
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
              {isArabic ? "نصائح إضافية:" : "Additional Tips:"}
            </p>
            <ul className="text-sm space-y-1 mt-1 list-disc pl-5">
              <li>
                {isArabic 
                  ? "تم توفير نسخة ISO بحجم 700 ميجابايت تعمل على جميع أجهزة الكمبيوتر"
                  : "ISO version of 700MB is now available and works on all computers"}
              </li>
              <li>
                {isArabic 
                  ? "استخدم وضع التوافق مع Windows 8 إذا استمرت المشكلة"
                  : "Use Windows 8 compatibility mode if issues persist"}
              </li>
              <li>
                {isArabic 
                  ? "تأكد من تشغيل الملف كمسؤول دائماً"
                  : "Always run the file as administrator"}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md">
        <p className="text-sm flex items-start gap-2">
          <span className="text-green-600 dark:text-green-400">✓</span>
          {isArabic 
            ? "تنزيل مباشر بدون وسيط ومع شعار المطعم المضمّن"
            : "Direct download without intermediaries, with restaurant logo embedded"}
        </p>
      </div>
    </>
  );
};

export default AdditionalInfo;
