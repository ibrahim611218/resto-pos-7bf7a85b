
import React, { useState } from "react";
import { BusinessSettings, Language } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Save, Building2, Phone, Mail, Hash, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BusinessSettingsFormProps {
  language: Language;
}

const BusinessSettingsForm: React.FC<BusinessSettingsFormProps> = ({ language }) => {
  const isArabic = language === "ar";
  
  // Sample business settings (in a real app, this would come from an API or database)
  const [settings, setSettings] = useState<BusinessSettings>({
    name: "مطعم الذواق",
    nameAr: "مطعم الذواق",
    taxNumber: "300000000000003",
    address: "شارع الملك فهد، الرياض، المملكة العربية السعودية",
    addressAr: "شارع الملك فهد، الرياض، المملكة العربية السعودية",
    phone: "+966 50 000 0000",
    email: "info@restaurant.com",
    taxRate: 15,
    commercialRegister: "1010000000",
    commercialRegisterAr: "١٠١٠٠٠٠٠٠٠",
    invoiceNotes: "شكراً لزيارتكم، نتمنى أن تزورونا مرة أخرى",
    invoiceNotesAr: "شكراً لزيارتكم، نتمنى أن تزورونا مرة أخرى",
  });
  
  // Logo preview state
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name === "taxRate" ? parseFloat(value) : value
    }));
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setSettings(prev => ({
          ...prev,
          logo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
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
            <div className="border rounded-md p-4 space-y-4 text-center">
              <Label htmlFor="logo">{isArabic ? "شعار المطعم" : "Restaurant Logo"}</Label>
              <div className="flex justify-center">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 w-40 h-40 flex flex-col items-center justify-center">
                  {logoPreview || settings.logo ? (
                    <img 
                      src={logoPreview || settings.logo} 
                      alt="Restaurant Logo" 
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  )}
                </div>
              </div>
              <Button type="button" variant="outline" className="mt-2" onClick={() => document.getElementById('logo-upload')?.click()}>
                <Upload className="ml-2" size={16} />
                {isArabic ? "رفع شعار" : "Upload Logo"}
              </Button>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>
            
            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{isArabic ? "اسم المطعم" : "Restaurant Name"}</Label>
                <Input 
                  id="name"
                  name="name"
                  value={settings.name}
                  onChange={handleInputChange}
                  placeholder={isArabic ? "أدخل اسم المطعم" : "Enter restaurant name"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nameAr">{isArabic ? "اسم المطعم (عربي)" : "Restaurant Name (Arabic)"}</Label>
                <Input 
                  id="nameAr"
                  name="nameAr"
                  value={settings.nameAr || ""}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder={isArabic ? "أدخل نسبة الضريبة" : "Enter tax rate"}
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
                  onChange={handleInputChange}
                  placeholder={isArabic ? "أدخل رقم السجل التجاري" : "Enter commercial register number"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="commercialRegisterAr">{isArabic ? "رقم السجل التجاري (عربي)" : "Commercial Register (Arabic)"}</Label>
                <Input 
                  id="commercialRegisterAr"
                  name="commercialRegisterAr"
                  value={settings.commercialRegisterAr || ""}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder={isArabic ? "أدخل ملاحظات تظهر في الفاتورة بالعربية" : "Enter notes to appear on invoices in Arabic"}
                  rows={2}
                  dir="rtl"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
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
