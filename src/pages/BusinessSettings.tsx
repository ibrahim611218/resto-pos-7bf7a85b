
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
      <div className="flex-1 overflow-hidden p-2 sm:p-4">
        <div className="h-full max-w-6xl mx-auto">
          <Tabs defaultValue="business" className="h-full flex flex-col">
            <TabsList className="flex w-full sm:max-w-md sm:mx-auto mb-3 sm:mb-4 flex-shrink-0 overflow-x-auto gap-1 p-1">
              <TabsTrigger value="business" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-3 py-2 min-h-[40px]">
                <span className="truncate">{isArabic ? "المؤسسة" : "Business"}</span>
              </TabsTrigger>
              <TabsTrigger value="display" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-3 py-2 min-h-[40px]">
                <span className="truncate">{isArabic ? "العرض" : "Display"}</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex-1 min-w-0 text-xs sm:text-sm px-2 sm:px-3 py-2 min-h-[40px]">
                <span className="truncate">{isArabic ? "البيانات" : "Data"}</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="business" className="h-full">
                <ScrollArea className="h-full">
                  <div className="px-1 sm:px-0">
                    <BusinessSettingsForm />
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="display" className="h-full">
                <ScrollArea className="h-full">
                  <Card>
                    <CardHeader className="p-3 sm:p-6">
                      <CardTitle className="text-base sm:text-lg">{isArabic ? "إعدادات العرض" : "Display Settings"}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6 pt-0">
                      <DisplaySettings />
                      <SidebarCustomization />
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="data" className="h-full">
                <ScrollArea className="h-full">
                  <Card>
                    <CardHeader className="p-3 sm:p-6">
                      <CardTitle className="text-base sm:text-lg">{isArabic ? "إدارة البيانات" : "Data Management"}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6 pt-0">
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
