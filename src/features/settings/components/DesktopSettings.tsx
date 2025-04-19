
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Monitor, Info, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DesktopSettings = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <div className="space-y-6">
      {/* Desktop Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>
          {isArabic ? "تم حذف نسخة سطح المكتب" : "Desktop Version Removed"}
        </AlertTitle>
        <AlertDescription>
          {isArabic 
            ? "تم إزالة نسخة سطح المكتب من هذا التطبيق. يمكنك الآن استخدام التطبيق عبر المتصفح فقط."
            : "The desktop version has been removed from this application. You can now only use the app via browser."}
        </AlertDescription>
      </Alert>

      {/* Simple download card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            {isArabic ? "إصدار الويب" : "Web Version"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            {isArabic
              ? "يمكنك استخدام هذا التطبيق مباشرة عبر المتصفح دون الحاجة لتثبيت أي برامج إضافية."
              : "You can use this application directly through your browser without installing any additional software."}
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(window.location.origin, '_blank')}
          >
            <Download className="mr-2 h-4 w-4" />
            {isArabic ? "فتح في نافذة جديدة" : "Open in New Window"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesktopSettings;
