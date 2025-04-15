
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Customer } from '@/types';

interface CustomerInfoFieldsProps {
  isArabic: boolean;
  isNewCustomer: boolean;
  customerData: Customer;
  onUpdateField: (field: keyof Customer, value: string) => void;
}

const CustomerInfoFields: React.FC<CustomerInfoFieldsProps> = ({
  isArabic,
  isNewCustomer,
  customerData,
  onUpdateField
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="customerName">
          {isArabic ? "اسم العميل" : "Customer Name"}
        </Label>
        <Input
          id="customerName"
          value={customerData.name}
          onChange={(e) => onUpdateField("name", e.target.value)}
          placeholder={isArabic ? "اسم العميل" : "Customer Name"}
          disabled={!isNewCustomer}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">
          {isArabic ? "رقم الهاتف" : "Phone Number"}
        </Label>
        <Input
          id="phone"
          value={customerData.phone}
          onChange={(e) => onUpdateField("phone", e.target.value)}
          placeholder={isArabic ? "رقم الهاتف" : "Phone Number"}
          disabled={!isNewCustomer}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="taxNumber">
          {isArabic ? "الرقم الضريبي" : "Tax Number"}
        </Label>
        <Input
          id="taxNumber"
          value={customerData.taxNumber}
          onChange={(e) => onUpdateField("taxNumber", e.target.value)}
          placeholder={isArabic ? "الرقم الضريبي" : "Tax Number"}
          disabled={!isNewCustomer}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="commercialRegister">
          {isArabic ? "السجل التجاري" : "Commercial Register"}
        </Label>
        <Input
          id="commercialRegister"
          value={customerData.commercialRegister}
          onChange={(e) => onUpdateField("commercialRegister", e.target.value)}
          placeholder={isArabic ? "السجل التجاري" : "Commercial Register"}
          disabled={!isNewCustomer}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="address">
          {isArabic ? "العنوان" : "Address"}
        </Label>
        <Input
          id="address"
          value={customerData.address}
          onChange={(e) => onUpdateField("address", e.target.value)}
          placeholder={isArabic ? "العنوان" : "Address"}
          disabled={!isNewCustomer}
        />
      </div>
    </>
  );
};

export default CustomerInfoFields;
