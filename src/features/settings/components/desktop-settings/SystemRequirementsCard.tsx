
import React from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { SYSTEM_REQUIREMENTS } from '@/utils/desktop-export/constants';

const SystemRequirementsCard = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const requirements = SYSTEM_REQUIREMENTS;
  
  return (
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
  );
};

export default SystemRequirementsCard;
