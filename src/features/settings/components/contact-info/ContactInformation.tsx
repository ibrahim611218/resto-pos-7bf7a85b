
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { BusinessSettings } from "@/types";

interface ContactInformationProps {
  settings: BusinessSettings;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ 
  settings, 
  isArabic, 
  onChange 
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">
            <Phone className="inline ml-1" size={16} />
            {isArabic ? "رقم الهاتف" : "Phone Number"}
          </Label>
          <Input 
            id="phone"
            name="phone"
            value={settings.phone}
            onChange={onChange}
            placeholder={isArabic ? "أدخل رقم الهاتف" : "Enter phone number"}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">
            <Mail className="inline ml-1" size={16} />
            {isArabic ? "البريد الإلكتروني" : "Email Address"}
          </Label>
          <Input 
            id="email"
            name="email"
            type="email"
            value={settings.email}
            onChange={onChange}
            placeholder={isArabic ? "أدخل البريد الإلكتروني" : "Enter email address"}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">
            <MapPin className="inline ml-1" size={16} />
            {isArabic ? "العنوان" : "Address"}
          </Label>
          <Textarea 
            id="address"
            name="address"
            value={settings.address}
            onChange={onChange}
            placeholder={isArabic ? "أدخل العنوان" : "Enter address"}
            rows={2}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="addressAr">{isArabic ? "العنوان (عربي)" : "Address (Arabic)"}</Label>
          <Textarea 
            id="addressAr"
            name="addressAr"
            value={settings.addressAr || ""}
            onChange={onChange}
            placeholder={isArabic ? "أدخل العنوان بالعربية" : "Enter address in Arabic"}
            rows={2}
            dir="rtl"
          />
        </div>
      </div>
    </>
  );
};

export default ContactInformation;
