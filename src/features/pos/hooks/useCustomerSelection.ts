
import { useState } from 'react';
import { Customer } from '@/types';
import { mockCustomers } from '../data/mockData';

export const useCustomerSelection = (onCustomerChange: (customer?: Customer) => void) => {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerData, setCustomerData] = useState<Customer>({
    name: "",
    phone: "",
    taxNumber: "",
    commercialRegister: "",
    address: ""
  });

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
      onCustomerChange(undefined);
    } else {
      setIsNewCustomer(false);
      setSelectedCustomerId(value);
      const selectedCustomer = customers.find(c => c.id === value);
      if (selectedCustomer) {
        onCustomerChange(selectedCustomer);
      }
    }
  };

  const updateCustomerField = (field: keyof Customer, value: string) => {
    const updatedData = {
      ...customerData,
      [field]: value
    };
    setCustomerData(updatedData);
    if (isNewCustomer) {
      onCustomerChange(updatedData);
    }
  };

  return {
    customers,
    isNewCustomer,
    selectedCustomerId,
    customerData,
    handleCustomerSelect,
    updateCustomerField
  };
};
