import { useState, useCallback } from "react";
import { Customer } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

// Empty mock customers data
export const mockCustomers: Customer[] = [];

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
