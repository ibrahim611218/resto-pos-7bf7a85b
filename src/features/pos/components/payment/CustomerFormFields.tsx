
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Users } from "lucide-react";
import { Customer } from "@/types";

interface CustomerFormFieldsProps {
  customers: Customer[];
  isArabic: boolean;
  isNewCustomer: boolean;
  customerName: string;
  customerTaxNumber: string;
  commercialRegister: string;
  address: string;
  selectedCustomerId: string;
  onCustomerSelect: (customerId: string) => void;
  onCustomerNameChange: (value: string) => void;
  onTaxNumberChange: (value: string) => void;
  onCommercialRegisterChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

const CustomerFormFields: React.FC<CustomerFormFieldsProps> = ({
  customers,
  isArabic,
  isNewCustomer,
  customerName,
  customerTaxNumber,
  commercialRegister,
  address,
  selectedCustomerId,
  onCustomerSelect,
  onCustomerNameChange,
  onTaxNumberChange,
  onCommercialRegisterChange,
  onAddressChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="customerSelect">
          {isArabic ? "العميل" : "Customer"}
        </Label>
        <Select 
          onValueChange={onCustomerSelect}
          value={isNewCustomer ? "new" : selectedCustomerId}
        >
          <SelectTrigger id="customerSelect">
            <SelectValue placeholder={isArabic ? "اختر عميل" : "Select customer"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">
              <div className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                {isArabic ? "عميل جديد" : "New Customer"}
              </div>
            </SelectItem>
            {customers.map(customer => (
              <SelectItem key={customer.id} value={customer.id || ""}>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  {customer.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="customerName">
          {isArabic ? "اسم العميل" : "Customer Name"}
        </Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder={isArabic ? "اسم العميل (اختياري)" : "Customer Name (optional)"}
          disabled={!isNewCustomer}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="taxNumber">
          {isArabic ? "الرقم الضريبي" : "Tax Number"}
        </Label>
        <Input
          id="taxNumber"
          value={customerTaxNumber}
          onChange={(e) => onTaxNumberChange(e.target.value)}
          placeholder={isArabic ? "الرقم الضريبي (اختياري)" : "Tax Number (optional)"}
          disabled={!isNewCustomer}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="commercialRegister">
          {isArabic ? "السجل التجاري" : "Commercial Register"}
        </Label>
        <Input
          id="commercialRegister"
          value={commercialRegister}
          onChange={(e) => onCommercialRegisterChange(e.target.value)}
          placeholder={isArabic ? "السجل التجاري (اختياري)" : "Commercial Register (optional)"}
          disabled={!isNewCustomer}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="address">
          {isArabic ? "العنوان" : "Address"}
        </Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder={isArabic ? "العنوان (اختياري)" : "Address (optional)"}
          disabled={!isNewCustomer}
        />
      </div>
    </div>
  );
};

export default CustomerFormFields;

