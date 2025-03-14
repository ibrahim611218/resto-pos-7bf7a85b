
import React, { useEffect } from "react";
import BusinessSettingsForm from "@/features/settings/BusinessSettingsForm";
import { useLanguage } from "@/context/LanguageContext";
import DataManagement from "@/features/settings/components/DataManagement";
import DisplaySettings from "@/features/settings/components/DisplaySettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BusinessSettings = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  // تطبيق أي إعدادات عرض محفوظة عند تحميل الصفحة
  useEffect(() => {
    const storedSettings = localStorage.getItem("display-settings");
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings);
        if (settings.touchMode) {
          document.body.classList.add("touch-target-fix");
        }
      } catch (error) {
        console.error("Error loading stored display settings:", error);
      }
    }
  }, []);
  
  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="business">
            {isArabic ? "إعدادات المؤسسة" : "Business Settings"}
          </TabsTrigger>
          <TabsTrigger value="display">
            {isArabic ? "إعدادات العرض" : "Display Settings"}
          </TabsTrigger>
          <TabsTrigger value="data">
            {isArabic ? "إدارة البيانات" : "Data Management"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="business">
          <BusinessSettingsForm language={language} />
        </TabsContent>
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "إعدادات العرض" : "Display Settings"}</CardTitle>
            </CardHeader>
            <CardContent>
              <DisplaySettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "إدارة البيانات" : "Data Management"}</CardTitle>
            </CardHeader>
            <CardContent>
              <DataManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessSettings;
