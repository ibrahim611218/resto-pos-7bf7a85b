
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Building2, Phone, Percent } from "lucide-react";
import { BusinessSettings } from "@/types";
import GeneralInfo from "./general-info/GeneralInfo";
import TaxSettings from "./tax-settings/TaxSettings";
import ContactInformation from "./contact-info/ContactInformation";

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
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Building2 className="mr-2" size={18} />
          {isArabic ? "معلومات عامة" : "General Information"}
        </h3>
        <GeneralInfo 
          settings={settings} 
          isArabic={isArabic} 
          onChange={onChange} 
        />
      </div>
      
      <Separator />
      
      {/* Tax Settings Section */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Percent className="mr-2" size={18} />
          {isArabic ? "إعدادات الضريبة" : "Tax Settings"}
        </h3>
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
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Phone className="mr-2" size={18} />
          {isArabic ? "معلومات الاتصال" : "Contact Information"}
        </h3>
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
