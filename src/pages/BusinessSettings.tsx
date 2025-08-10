
import React, { useEffect } from "react";
import BusinessSettingsForm from "@/features/settings/BusinessSettingsForm";
import { useLanguage } from "@/context/LanguageContext";
import DataManagement from "@/features/settings/components/DataManagement";
import DisplaySettings from "@/features/settings/components/DisplaySettings";
import SidebarCustomization from "@/features/settings/components/SidebarCustomization";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="h-screen w-full overflow-hidden flex flex-col" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full max-w-6xl mx-auto">
          <Tabs defaultValue="business" className="h-full flex flex-col">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-4 flex-shrink-0 overflow-x-auto whitespace-nowrap gap-2">
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
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="business" className="h-full">
                <ScrollArea className="h-full">
                  <BusinessSettingsForm />
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="display" className="h-full">
                <ScrollArea className="h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>{isArabic ? "إعدادات العرض" : "Display Settings"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DisplaySettings />
                      <SidebarCustomization />
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="data" className="h-full">
                <ScrollArea className="h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>{isArabic ? "إدارة البيانات" : "Data Management"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DataManagement />
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettings;
