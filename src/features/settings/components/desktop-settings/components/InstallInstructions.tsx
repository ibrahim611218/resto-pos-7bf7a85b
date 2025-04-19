
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { APP_INSTRUCTIONS } from '@/utils/desktop-export/constants';

export const InstallInstructions = () => {
  const { language } = useLanguage();
  const instructions = language === 'ar' ? APP_INSTRUCTIONS.ar : APP_INSTRUCTIONS.en;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 flex items-center gap-2">
        {instructions.title}
      </h4>
      <ol className="list-decimal pl-5 space-y-2 text-sm">
        {instructions.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default InstallInstructions;
