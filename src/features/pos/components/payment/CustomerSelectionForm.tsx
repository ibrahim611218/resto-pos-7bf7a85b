
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Users, Phone, Mail, FileText, User } from "lucide-react";
import { Customer } from "@/types";

// Mock customers data - in a real app, this would come from a database or API
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "أحمد محمد",
    phone: "0550000000",
    taxNumber: "123456789",
    commercialRegister: "CR12345",
    address: "الرياض، السعودية"
  },
  {
    id: "2",
    name: "شركة المستقبل",
    phone: "0551111111",
    taxNumber: "987654321",
    commercialRegister: "CR67890",
    address: "جدة، السعودية"
  }
];

interface CustomerSelectionFormProps {
  onCustomerChange: (customer?: Customer) => void;
  isArabic: boolean;
}

const CustomerSelectionForm: React.FC<CustomerSelectionFormProps> = ({
  onCustomerChange,
  isArabic
}) => {
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerData, setCustomerData] = useState<Customer>({
    name: "",
    phone: "",
    taxNumber: "",
    commercialRegister: "",
    address: ""
  });

  useEffect(() => {
    if (!isNewCustomer && selectedCustomerId) {
      const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
      if (selectedCustomer) {
        onCustomerChange(selectedCustomer);
      }
    } else if (isNewCustomer && (customerData.name || customerData.phone)) {
      onCustomerChange(customerData);
    } else {
      onCustomerChange(undefined);
    }
  }, [isNewCustomer, selectedCustomerId, customerData, customers, onCustomerChange]);

  const handleCustomerSelect = (value: string) => {
    if (value === "new") {
      setIsNewCustomer(true);
      setSelectedCustomerId("");
      setCustomerData({
        name: "",
        phone: "",
        taxNumber: "",
        commercialRegister: "",
        address: ""
      });
    } else {
      setIsNewCustomer(false);
      setSelectedCustomerId(value);
    }
  };

  const updateCustomerField = (field: keyof Customer, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="customerSelect">
          {isArabic ? "العميل" : "Customer"}
        </Label>
        <Select 
          onValueChange={handleCustomerSelect}
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

      {isNewCustomer && (
        <>
          <div className="grid gap-2">
            <Label htmlFor="customerName" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {isArabic ? "اسم العميل" : "Customer Name"}
            </Label>
            <Input
              id="customerName"
              value={customerData.name}
              onChange={(e) => updateCustomerField("name", e.target.value)}
              placeholder={isArabic ? "اسم العميل" : "Customer name"}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone" className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              {isArabic ? "رقم الهاتف" : "Phone Number"}
            </Label>
            <Input
              id="phone"
              value={customerData.phone}
              onChange={(e) => updateCustomerField("phone", e.target.value)}
              placeholder={isArabic ? "رقم الهاتف" : "Phone number"}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              {isArabic ? "البريد الإلكتروني" : "Email"}
            </Label>
            <Input
              id="email"
              value={customerData.email || ""}
              onChange={(e) => updateCustomerField("email", e.target.value)}
              placeholder={isArabic ? "البريد الإلكتروني" : "Email"}
              type="email"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="taxNumber" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              {isArabic ? "الرقم الضريبي" : "Tax Number"}
            </Label>
            <Input
              id="taxNumber"
              value={customerData.taxNumber}
              onChange={(e) => updateCustomerField("taxNumber", e.target.value)}
              placeholder={isArabic ? "الرقم الضريبي" : "Tax number"}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="commercialRegister">
              {isArabic ? "السجل التجاري" : "Commercial Register"}
            </Label>
            <Input
              id="commercialRegister"
              value={customerData.commercialRegister}
              onChange={(e) => updateCustomerField("commercialRegister", e.target.value)}
              placeholder={isArabic ? "السجل التجاري" : "Commercial register"}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">
              {isArabic ? "العنوان" : "Address"}
            </Label>
            <Input
              id="address"
              value={customerData.address}
              onChange={(e) => updateCustomerField("address", e.target.value)}
              placeholder={isArabic ? "العنوان" : "Address"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerSelectionForm;
