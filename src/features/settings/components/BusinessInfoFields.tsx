import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Phone, Mail, Hash, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { BusinessSettings } from "@/types";
import TaxInclusionToggle from "./TaxInclusionToggle";

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
  const handleTaxInclusionChange = (checked: boolean) => {
    if (onSwitchChange) {
      onSwitchChange('taxIncluded', checked);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{isArabic ? "اسم المطعم" : "Restaurant Name"}</Label>
          <Input 
            id="name"
            name="name"
            value={settings.name}
            onChange={onChange}
            placeholder={isArabic ? "أدخل اسم المطعم" : "Enter restaurant name"}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nameAr">{isArabic ? "اسم المطعم (عربي)" : "Restaurant Name (Arabic)"}</Label>
          <Input 
            id="nameAr"
            name="nameAr"
            value={settings.nameAr || ""}
            onChange={onChange}
            placeholder={isArabic ? "أدخل اسم المطعم بالعربية" : "Enter restaurant name in Arabic"}
            dir="rtl"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="taxNumber">
            <Hash className="inline ml-1" size={16} />
            {isArabic ? "الرقم الضريبي" : "Tax Number"}
          </Label>
          <Input 
            id="taxNumber"
            name="taxNumber"
            value={settings.taxNumber}
            onChange={onChange}
            placeholder={isArabic ? "أدخل الرقم الضريبي" : "Enter tax number"}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taxRate">{isArabic ? "نسبة الضريبة (%)" : "Tax Rate (%)"}</Label>
          <Input 
            id="taxRate"
            name="taxRate"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={settings.taxRate}
            onChange={onChange}
            placeholder={isArabic ? "أدخل نسبة الضريبة" : "Enter tax rate"}
          />
        </div>
      </div>
      
      <TaxInclusionToggle 
        taxIncluded={settings.taxIncluded}
        isArabic={isArabic}
        onChange={handleTaxInclusionChange}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="commercialRegister">
            <FileText className="inline ml-1" size={16} />
            {isArabic ? "رقم السجل التجاري" : "Commercial Register"}
          </Label>
          <Input 
            id="commercialRegister"
            name="commercialRegister"
            value={settings.commercialRegister || ""}
            onChange={onChange}
            placeholder={isArabic ? "أدخل رقم السجل التجاري" : "Enter commercial register number"}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="commercialRegisterAr">{isArabic ? "رقم السجل التجاري (عربي)" : "Commercial Register (Arabic)"}</Label>
          <Input 
            id="commercialRegisterAr"
            name="commercialRegisterAr"
            value={settings.commercialRegisterAr || ""}
            onChange={onChange}
            placeholder={isArabic ? "أدخل رقم السجل التجاري بالعربية" : "Enter commercial register in Arabic"}
            dir="rtl"
          />
        </div>
      </div>
      
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
          <Label htmlFor="address">{isArabic ? "العنوان" : "Address"}</Label>
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
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="invoiceNotes">{isArabic ? "ملاحظات الفاتورة" : "Invoice Notes"}</Label>
          <Textarea 
            id="invoiceNotes"
            name="invoiceNotes"
            value={settings.invoiceNotes || ""}
            onChange={onChange}
            placeholder={isArabic ? "أدخل ملاحظات تظهر في الفاتورة" : "Enter notes to appear on invoices"}
            rows={2}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="invoiceNotesAr">{isArabic ? "ملاحظات الفاتورة (عربي)" : "Invoice Notes (Arabic)"}</Label>
          <Textarea 
            id="invoiceNotesAr"
            name="invoiceNotesAr"
            value={settings.invoiceNotesAr || ""}
            onChange={onChange}
            placeholder={isArabic ? "أدخل ملاحظات تظهر في الفاتورة بالعربية" : "Enter notes to appear on invoices in Arabic"}
            rows={2}
            dir="rtl"
          />
        </div>
      </div>
    </>
  );
};

export default BusinessInfoFields;
