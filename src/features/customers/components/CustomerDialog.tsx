
import React, { useState, useEffect } from "react";
import { Customer } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";

interface CustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
  customer: Customer | null;
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  customer
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const [formData, setFormData] = useState<Customer>({
    name: "",
    phone: "",
    email: "",
    taxNumber: ""
  });

  // Reset form when dialog opens or customer changes
  useEffect(() => {
    if (customer) {
      setFormData({ ...customer });
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        taxNumber: ""
      });
    }
  }, [customer, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {customer ? 
              (isArabic ? "تعديل بيانات العميل" : "Edit Customer") : 
              (isArabic ? "إضافة عميل جديد" : "Add New Customer")}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {isArabic ? "الاسم" : "Name"} *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder={isArabic ? "أدخل اسم العميل" : "Enter customer name"}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">
                {isArabic ? "رقم الهاتف" : "Phone Number"}
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                placeholder={isArabic ? "أدخل رقم الهاتف" : "Enter phone number"}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                {isArabic ? "البريد الإلكتروني" : "Email"}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder={isArabic ? "أدخل البريد الإلكتروني" : "Enter email address"}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taxNumber">
                {isArabic ? "الرقم الضريبي" : "Tax Number"}
              </Label>
              <Input
                id="taxNumber"
                name="taxNumber"
                value={formData.taxNumber || ""}
                onChange={handleInputChange}
                placeholder={isArabic ? "أدخل الرقم الضريبي" : "Enter tax number"}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit">
              {isArabic ? "حفظ" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;
