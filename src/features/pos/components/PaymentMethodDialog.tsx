
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { usePaymentMethodDialog } from "../hooks/usePaymentMethodDialog";
import PaymentMethodSelector from "./payment/PaymentMethodSelector";
import CustomerFormFields from "./payment/CustomerFormFields";
import { formatCurrency } from "@/utils/invoice";
import { DollarSign } from "lucide-react";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  onConfirm: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string) => void;
  total?: number;
  paidAmount?: number;
  remainingAmount?: number;
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  isOpen,
  onClose,
  paymentMethod,
  setPaymentMethod,
  onConfirm,
  total = 0,
  paidAmount = 0,
  remainingAmount = 0
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { customers } = useCustomers();
  
  const {
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
  } = usePaymentMethodDialog({ isOpen, onClose, onConfirm });

  const handleCustomerSelect = (customerId: string) => {
    if (customerId === "new") {
      setIsNewCustomer(true);
      setCustomerName("");
      setCustomerTaxNumber("");
      setCommercialRegister("");
      setAddress("");
      setSelectedCustomerId("");
    } else {
      setIsNewCustomer(false);
      setSelectedCustomerId(customerId);
      
      const selectedCustomer = customers.find(c => c.id === customerId);
      if (selectedCustomer) {
        setCustomerName(selectedCustomer.name);
        setCustomerTaxNumber(selectedCustomer.taxNumber || "");
        setCommercialRegister(selectedCustomer.commercialRegister || "");
        setAddress(selectedCustomer.address || "");
      }
    }
  };

  // Always show remaining amount
  const showRemainingAmount = true;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "اختر طريقة الدفع" : "Select Payment Method"}
          </DialogTitle>
        </DialogHeader>

        {showRemainingAmount && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-2">
            <div className="flex items-center justify-between font-bold text-red-600 text-lg">
              <span className="flex items-center">
                <DollarSign className={isArabic ? "ml-1" : "mr-1"} size={18} />
                {isArabic ? "المتبقي" : "Remaining"}
              </span>
              <span>
                {formatCurrency(remainingAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
              </span>
            </div>
          </div>
        )}

        <div className="grid gap-4 py-4">
          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            isArabic={isArabic}
          />

          <CustomerFormFields
            customers={customers}
            isArabic={isArabic}
            isNewCustomer={isNewCustomer}
            customerName={customerName}
            customerTaxNumber={customerTaxNumber}
            commercialRegister={commercialRegister}
            address={address}
            selectedCustomerId={selectedCustomerId}
            onCustomerSelect={handleCustomerSelect}
            onCustomerNameChange={setCustomerName}
            onTaxNumberChange={setCustomerTaxNumber}
            onCommercialRegisterChange={setCommercialRegister}
            onAddressChange={setAddress}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleConfirm}>
            {isArabic ? "تأكيد" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
