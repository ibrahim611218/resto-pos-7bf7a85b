
import { useState, useEffect } from "react";
import { PaymentMethod } from "@/types";

interface UsePaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => void;
}

export const usePaymentMethodDialog = ({ isOpen, onConfirm }: UsePaymentMethodDialogProps) => {
  const [customerName, setCustomerName] = useState("");
  const [customerTaxNumber, setCustomerTaxNumber] = useState("");
  const [commercialRegister, setCommercialRegister] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [paidAmount, setPaidAmount] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      // Reset form when dialog opens
      setCustomerName("");
      setCustomerTaxNumber("");
      setCommercialRegister("");
      setAddress("");
      setSelectedCustomerId("");
      setIsNewCustomer(true);
      setPaidAmount(0);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (!isNewCustomer && selectedCustomerId) {
      onConfirm(customerName, customerTaxNumber, selectedCustomerId, commercialRegister, address, paidAmount);
    } else {
      onConfirm(customerName, customerTaxNumber, undefined, commercialRegister, address, paidAmount);
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
    paidAmount,
    setPaidAmount,
    handleConfirm
  };
};
