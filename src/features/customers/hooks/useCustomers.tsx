
import { useState, useCallback } from "react";
import { Customer } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

// Mock customers data
export const mockCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "محمد عبدالله",
    phone: "0555123456",
    email: "mohammed@example.com",
    commercialRegister: "1234567890",
    address: "الرياض، حي الملز"
  },
  {
    id: "cust-2",
    name: "أحمد محمد",
    phone: "0555987654",
    email: "ahmed@example.com",
    taxNumber: "300123456700003",
    commercialRegister: "9876543210",
    address: "جدة، حي الروضة"
  },
  {
    id: "cust-3",
    name: "سارة خالد",
    phone: "0555111222",
    email: "sarah@example.com",
    address: "الدمام، حي الشاطئ"
  }
];

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const filteredCustomers = searchTerm
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (customer.phone && customer.phone.includes(searchTerm)) ||
          (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (customer.taxNumber && customer.taxNumber.includes(searchTerm)) ||
          (customer.commercialRegister && customer.commercialRegister.includes(searchTerm)) ||
          (customer.address && customer.address.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : customers;

  const addCustomer = useCallback((customer: Customer) => {
    const newCustomer = {
      ...customer,
      id: `cust-${Date.now()}`
    };
    
    setCustomers((prev) => [...prev, newCustomer]);
    toast.success(isArabic ? "تم إضافة العميل بنجاح" : "Customer added successfully");
  }, [isArabic]);

  const updateCustomer = useCallback((customer: Customer) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customer.id ? customer : c))
    );
    toast.success(isArabic ? "تم تحديث بيانات العميل بنجاح" : "Customer updated successfully");
  }, [isArabic]);

  const deleteCustomer = useCallback((id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast.success(isArabic ? "تم حذف العميل بنجاح" : "Customer deleted successfully");
  }, [isArabic]);

  return {
    customers,
    searchTerm,
    setSearchTerm,
    filteredCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
  };
};
