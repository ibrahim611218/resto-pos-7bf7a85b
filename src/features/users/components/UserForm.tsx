
import React from "react";
import { UserRole, UserWithPassword } from "../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface UserFormProps {
  user: UserWithPassword;
  onUserChange: (user: UserWithPassword) => void;
  isArabic: boolean;
  canManageAdmins: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ 
  user, 
  onUserChange,
  isArabic,
  canManageAdmins
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUserChange({ ...user, [name]: value });
  };

  const handleRoleChange = (value: string) => {
    // Ensure value is always cast to UserRole type
    onUserChange({ ...user, role: value as UserRole });
  };
  
  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <Label htmlFor="name">{isArabic ? "الاسم" : "Name"}</Label>
        <Input
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder={isArabic ? "أدخل اسم المستخدم" : "Enter user name"}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">{isArabic ? "البريد الإلكتروني" : "Email"}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder={isArabic ? "أدخل البريد الإلكتروني" : "Enter email address"}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">{isArabic ? "الدور" : "Role"}</Label>
        <Select
          value={user.role}
          onValueChange={handleRoleChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={isArabic ? "اختر الدور" : "Select role"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cashier">{isArabic ? "كاشير" : "Cashier"}</SelectItem>
            <SelectItem value="waiter">{isArabic ? "نادل" : "Waiter"}</SelectItem>
            <SelectItem value="kitchen">{isArabic ? "مطبخ" : "Kitchen"}</SelectItem>
            <SelectItem value="delivery">{isArabic ? "توصيل" : "Delivery"}</SelectItem>
            <SelectItem value="supervisor">{isArabic ? "مشرف" : "Supervisor"}</SelectItem>
            <SelectItem value="manager">{isArabic ? "مدير فرع" : "Branch Manager"}</SelectItem>
            <SelectItem value="accountant">{isArabic ? "محاسب" : "Accountant"}</SelectItem>
            {canManageAdmins && (
              <>
                <SelectItem value="admin">{isArabic ? "مدير عام" : "Admin"}</SelectItem>
                <SelectItem value="owner">{isArabic ? "مالك" : "Owner"}</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserForm;
