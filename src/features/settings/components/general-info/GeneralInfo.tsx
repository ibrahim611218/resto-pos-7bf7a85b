
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, FileText } from "lucide-react";
import { BusinessSettings } from "@/types";

interface GeneralInfoProps {
  settings: BusinessSettings;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ settings, isArabic, onChange }) => {
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

export default GeneralInfo;
