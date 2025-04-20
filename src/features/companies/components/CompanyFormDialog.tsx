
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Company } from "@/features/users/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CompanyFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company;
  onCompanyChange: (company: Company) => void;
  onSave: (company: Company) => Promise<boolean>;
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
  isArabic,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onCompanyChange({ ...company, [name]: value });
  };

  const handleActiveChange = (checked: boolean) => {
    onCompanyChange({ ...company, isActive: checked });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // تحويل قيمة التاريخ إلى ISO string
    const dateValue = value ? new Date(value).toISOString() : '';
    onCompanyChange({ ...company, [name]: dateValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await onSave(company)) {
      onOpenChange(false);
    }
  };

  // تنسيق التاريخ ليعرض في حقول التاريخ
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    // تحويل التاريخ إلى تنسيق YYYY-MM-DD
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {isArabic ? "اسم الشركة" : "Company Name"}
            </Label>
            <Input
              id="name"
              name="name"
              value={company.name}
              onChange={handleChange}
              required
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
              value={company.email || ''}
              onChange={handleChange}
              placeholder="company@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">
              {isArabic ? "كلمة المرور" : "Password"}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={company.password || ''}
              onChange={handleChange}
              placeholder="********"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">
              {isArabic ? "العنوان" : "Address"}
            </Label>
            <Input
              id="address"
              name="address"
              value={company.address || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">
              {isArabic ? "رقم الهاتف" : "Phone"}
            </Label>
            <Input
              id="phone"
              name="phone"
              value={company.phone || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="taxNumber">
              {isArabic ? "الرقم الضريبي" : "Tax Number"}
            </Label>
            <Input
              id="taxNumber"
              name="taxNumber"
              value={company.taxNumber || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subscriptionStart">
              {isArabic ? "تاريخ بداية الاشتراك" : "Subscription Start Date"}
            </Label>
            <Input
              id="subscriptionStart"
              name="subscriptionStart"
              type="date"
              value={formatDateForInput(company.subscriptionStart)}
              onChange={handleDateChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subscriptionEnd">
              {isArabic ? "تاريخ نهاية الاشتراك" : "Subscription End Date"}
            </Label>
            <Input
              id="subscriptionEnd"
              name="subscriptionEnd"
              type="date"
              value={formatDateForInput(company.subscriptionEnd)}
              onChange={handleDateChange}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={company.isActive || false}
              onCheckedChange={handleActiveChange}
            />
            <Label htmlFor="isActive" className={isArabic ? "mr-2" : "ml-2"}>
              {isArabic ? "نشط" : "Active"}
            </Label>
          </div>
          
          <DialogFooter>
            <Button type="submit">
              {isArabic ? "حفظ" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyFormDialog;
