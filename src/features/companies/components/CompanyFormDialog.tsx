
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Company } from "@/features/users/types";

interface CompanyFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company;
  onCompanyChange: (company: Company) => void;
  onSave: (company: Company) => void;
  title: string;
  isArabic: boolean;
}

const CompanyFormDialog: React.FC<CompanyFormDialogProps> = ({
  isOpen,
  onOpenChange,
  company,
  onCompanyChange,
  onSave,
  title,
  isArabic
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(company);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onCompanyChange({
      ...company,
      [name]: value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    onCompanyChange({
      ...company,
      isActive: checked,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{isArabic ? "اسم الشركة" : "Company Name"}</Label>
              <Input
                id="name"
                name="name"
                placeholder={isArabic ? "أدخل اسم الشركة" : "Enter company name"}
                value={company.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">{isArabic ? "العنوان" : "Address"}</Label>
              <Input
                id="address"
                name="address"
                placeholder={isArabic ? "أدخل عنوان الشركة" : "Enter company address"}
                value={company.address || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">{isArabic ? "رقم الهاتف" : "Phone Number"}</Label>
              <Input
                id="phone"
                name="phone"
                placeholder={isArabic ? "أدخل رقم الهاتف" : "Enter phone number"}
                value={company.phone || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{isArabic ? "البريد الإلكتروني" : "Email"}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={isArabic ? "أدخل البريد الإلكتروني" : "Enter email address"}
                value={company.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxNumber">{isArabic ? "الرقم الضريبي" : "Tax Number"}</Label>
              <Input
                id="taxNumber"
                name="taxNumber"
                placeholder={isArabic ? "أدخل الرقم الضريبي" : "Enter tax number"}
                value={company.taxNumber || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                id="isActive" 
                checked={company.isActive}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isActive">{isArabic ? "نشط" : "Active"}</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit">{isArabic ? "حفظ" : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyFormDialog;
