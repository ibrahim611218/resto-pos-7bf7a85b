
import { useState, useEffect } from "react";
import { PaymentMethod } from "@/types";

interface UsePaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string) => void;
}

export const usePaymentMethodDialog = ({ isOpen, onConfirm }: UsePaymentMethodDialogProps) => {
  const [customerName, setCustomerName] = useState("");
  const [customerTaxNumber, setCustomerTaxNumber] = useState("");
  const [commercialRegister, setCommercialRegister] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [isNewCustomer, setIsNewCustomer] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Reset form when dialog opens
      setCustomerName("");
      setCustomerTaxNumber("");
      setCommercialRegister("");
      setAddress("");
      setSelectedCustomerId("");
      setIsNewCustomer(true);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (!isNewCustomer && selectedCustomerId) {
      onConfirm(customerName, customerTaxNumber, selectedCustomerId, commercialRegister, address);
    } else {
      onConfirm(customerName, customerTaxNumber, undefined, commercialRegister, address);
    }
  };

  return {
    customerName,
    setCustomerName,
    customerTaxNumber,
    setCustomerTaxNumber,
    commercialRegister,
    setCommercialRegister,
    address,
    setAddress,
    selectedCustomerId,
    setSelectedCustomerId,
    isNewCustomer,
    setIsNewCustomer,
    handleConfirm
  };
};

