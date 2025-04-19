
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { INSTALLER_INFO } from '@/utils/desktop-export/constants';

export const FileInformation = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <div className="mt-4 text-sm text-muted-foreground">
      <p>{isArabic ? "معلومات الملف:" : "File information:"}</p>
      <p>{isArabic ? `الإصدار: ${INSTALLER_INFO.version}` : `Version: ${INSTALLER_INFO.version}`}</p>
      <p>{isArabic ? `الحجم: ${INSTALLER_INFO.size}` : `Size: ${INSTALLER_INFO.size}`}</p>
      <p>{isArabic ? `تاريخ الإصدار: ${INSTALLER_INFO.releaseDate}` : `Release date: ${INSTALLER_INFO.releaseDate}`}</p>
      <p className="font-semibold">
        {isArabic ? `اسم الملف: ${INSTALLER_INFO.filename}` : `Filename: ${INSTALLER_INFO.filename}`}
      </p>
    </div>
  );
};

export default FileInformation;
