
import React, { useState } from "react";
import LicenseKeyGenerator from "@/features/license/admin/LicenseKeyGenerator";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LicenseType } from "@/types/license";
import { Download } from "lucide-react";
import { toast } from "sonner";

const LicenseManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [generatedKeys, setGeneratedKeys] = useState<{
    trial: string[];
    monthly: string[];
    yearly: string[];
  }>({
    trial: [],
    monthly: [],
    yearly: [],
  });
  
  // Generate a unique license key based on type and current date
  const generateLicenseKey = (type: LicenseType): string => {
    // Create type prefix
    let prefix = "";
    switch (type) {
      case "trial":
        prefix = "T";
        break;
      case "monthly":
        prefix = "M";
        break;
      case "yearly":
        prefix = "Y";
        break;
    }
    
    // Random alphanumeric characters
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const getRandomChar = () => chars.charAt(Math.floor(Math.random() * chars.length));
    
    // Generate parts of the key
    const firstPart = prefix + Array(3).fill(0).map(() => getRandomChar()).join("");
    const secondPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    const thirdPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    const fourthPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    
    return `${firstPart}-${secondPart}-${thirdPart}-${fourthPart}`;
  };

  const generateAllKeys = () => {
    const trialKeys = Array(60).fill(0).map(() => generateLicenseKey("trial"));
    const monthlyKeys = Array(60).fill(0).map(() => generateLicenseKey("monthly"));
    const yearlyKeys = Array(60).fill(0).map(() => generateLicenseKey("yearly"));
    
    setGeneratedKeys({
      trial: trialKeys,
      monthly: monthlyKeys,
      yearly: yearlyKeys
    });
    
    toast.success(isArabic ? "تم إنشاء جميع المفاتيح بنجاح" : "All keys generated successfully");
  };

  const exportAllKeys = () => {
    // Create a CSV with all license keys
    const header = "License Type,License Key,Duration\n";
    const trialRows = generatedKeys.trial.map(key => `trial,${key},14 days`).join("\n");
    const monthlyRows = generatedKeys.monthly.map(key => `monthly,${key},30 days`).join("\n");
    const yearlyRows = generatedKeys.yearly.map(key => `yearly,${key},1 year`).join("\n");
    
    const csv = header + trialRows + "\n" + monthlyRows + "\n" + yearlyRows;
    
    // Create a blob and download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `license-keys-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(isArabic ? "تم تصدير جميع المفاتيح بنجاح" : "All keys exported successfully");
  };
  
  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold mb-6">{isArabic ? "إدارة التراخيص" : "License Management"}</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{isArabic ? "إنشاء مفاتيح ترخيص متعددة" : "Generate Multiple License Keys"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>{isArabic ? "انقر على الزر أدناه لإنشاء:" : "Click the button below to generate:"}</p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>{isArabic ? "60 مفتاح ترخيص تجريبي (14 يوم)" : "60 Trial license keys (14 days)"}</li>
              <li>{isArabic ? "60 مفتاح ترخيص شهري (30 يوم)" : "60 Monthly license keys (30 days)"}</li>
              <li>{isArabic ? "60 مفتاح ترخيص سنوي (سنة واحدة)" : "60 Yearly license keys (1 year)"}</li>
            </ul>
            
            <div className="flex flex-wrap gap-3">
              <Button onClick={generateAllKeys}>
                {isArabic ? "إنشاء جميع المفاتيح" : "Generate All Keys"}
              </Button>
              
              {generatedKeys.trial.length > 0 && (
                <Button variant="outline" onClick={exportAllKeys}>
                  <Download className="h-4 w-4 ml-2" />
                  {isArabic ? "تصدير جميع المفاتيح (CSV)" : "Export All Keys (CSV)"}
                </Button>
              )}
            </div>
            
            {generatedKeys.trial.length > 0 && (
              <div className="pt-4">
                <p className="text-green-600 font-medium">
                  {isArabic 
                    ? `تم إنشاء ${generatedKeys.trial.length + generatedKeys.monthly.length + generatedKeys.yearly.length} مفتاح بنجاح!` 
                    : `Successfully generated ${generatedKeys.trial.length + generatedKeys.monthly.length + generatedKeys.yearly.length} keys!`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isArabic 
                    ? "استخدم زر التصدير للحصول على ملف CSV يحتوي على جميع المفاتيح."
                    : "Use the export button to get a CSV file with all keys."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <LicenseKeyGenerator />
    </div>
  );
};

export default LicenseManagement;
