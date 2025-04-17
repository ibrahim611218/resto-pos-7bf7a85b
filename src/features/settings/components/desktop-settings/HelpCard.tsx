
import React from 'react';
import { FileDown, GitFork } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const HelpCard = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
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
              ? `النظام متاح حاليًا عبر الإنترنت فقط. سيتم توفير نسخة سطح المكتب قريبًا.`
              : `The system is currently only available online. A desktop version will be available soon.`}
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
  );
};

export default HelpCard;
