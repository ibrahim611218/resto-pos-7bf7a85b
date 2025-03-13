
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Building2, Phone, Percent } from "lucide-react";
import { BusinessSettings } from "@/types";
import GeneralInfo from "./general-info/GeneralInfo";
import TaxSettings from "./tax-settings/TaxSettings";
import ContactInformation from "./contact-info/ContactInformation";
import HeaderSection from "./common/HeaderSection";

interface BusinessInfoFieldsProps {
  settings: BusinessSettings;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange?: (name: string, checked: boolean) => void;
}

const BusinessInfoFields: React.FC<BusinessInfoFieldsProps> = ({ 
  settings, 
  isArabic, 
  onChange,
  onSwitchChange 
}) => {
  return (
    <div className="space-y-6">
      {/* General Information Section */}
      <div>
        <HeaderSection 
          icon={Building2}
          title={isArabic ? "معلومات عامة" : "General Information"}
          isArabic={isArabic}
        />
        <GeneralInfo 
          settings={settings} 
          isArabic={isArabic} 
          onChange={onChange} 
        />
      </div>
      
      <Separator />
      
      {/* Tax Settings Section */}
      <div>
        <HeaderSection 
          icon={Percent}
          title={isArabic ? "إعدادات الضريبة" : "Tax Settings"}
          isArabic={isArabic}
        />
        <TaxSettings 
          settings={settings} 
          isArabic={isArabic} 
          onChange={onChange}
          onSwitchChange={onSwitchChange}
        />
      </div>
      
      <Separator />
      
      {/* Contact Information Section */}
      <div>
        <HeaderSection 
          icon={Phone}
          title={isArabic ? "معلومات الاتصال" : "Contact Information"}
          isArabic={isArabic}
        />
        <ContactInformation 
          settings={settings} 
          isArabic={isArabic} 
          onChange={onChange} 
        />
      </div>
    </div>
  );
};

export default BusinessInfoFields;
