
import React, { useState } from "react";
import { Language } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import LogoUploader from "./components/LogoUploader";
import BusinessInfoFields from "./components/BusinessInfoFields";

interface BusinessSettingsFormProps {
  language: Language;
}

const BusinessSettingsForm: React.FC<BusinessSettingsFormProps> = ({ language }) => {
  const isArabic = language === "ar";
  
  const { settings, updateSettings, loading } = useBusinessSettings();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle tax rate field specifically
    if (name === "taxRate") {
      // Only update if the value is a valid number or empty
      if (value === "" || !isNaN(parseFloat(value))) {
        updateSettings({
          [name]: value === "" ? 0 : parseFloat(value)
        });
      }
    } else {
      updateSettings({
        [name]: value
      });
    }
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    updateSettings({
      [name]: checked
    });
  };
  
  const handleLogoChange = (logoData: string) => {
    updateSettings({
      logo: logoData
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    toast({
      title: isArabic ? "تم حفظ الإعدادات" : "Settings Saved",
      description: isArabic ? "تم حفظ إعدادات المطعم بنجاح" : "Restaurant settings have been saved successfully",
    });
  };
  
  return (
    <div className="container mx-auto py-6">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="ml-2" size={18} />
              {isArabic ? "إعدادات المطعم" : "Restaurant Settings"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo Upload Section */}
            <LogoUploader 
              logo={settings.logo || null} 
              isArabic={isArabic} 
              onLogoChange={handleLogoChange} 
            />
            
            {/* Business Information */}
            <BusinessInfoFields 
              settings={settings} 
              isArabic={isArabic} 
              onChange={handleInputChange} 
              onSwitchChange={handleSwitchChange}
            />
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              <Save className="ml-2" size={16} />
              {isArabic ? "حفظ الإعدادات" : "Save Settings"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default BusinessSettingsForm;
