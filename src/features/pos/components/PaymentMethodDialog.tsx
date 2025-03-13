
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentMethod } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { usePaymentMethodDialog } from "../hooks/usePaymentMethodDialog";
import PaymentMethodSelector from "./payment/PaymentMethodSelector";
import CustomerFormFields from "./payment/CustomerFormFields";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  onConfirm: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => void;
  total?: number;
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  isOpen,
  onClose,
  paymentMethod,
  setPaymentMethod,
  onConfirm,
  total = 0,
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
    paidAmount,
    setPaidAmount,
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

  const remainingAmount = Math.max(0, total - paidAmount);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "اختر طريقة الدفع" : "Select Payment Method"}
          </DialogTitle>
        </DialogHeader>

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

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="totalAmount" className="text-sm font-medium mb-2 block">
                  {isArabic ? "المبلغ الإجمالي" : "Total Amount"}
                </label>
                <Input
                  id="totalAmount"
                  type="text"
                  value={total.toFixed(2)}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <label htmlFor="paidAmount" className="text-sm font-medium mb-2 block">
                  {isArabic ? "المبلغ المدفوع" : "Paid Amount"}
                </label>
                <Input
                  id="paidAmount"
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="bg-background"
                />
              </div>
            </div>
            <div>
              <label htmlFor="remainingAmount" className="text-sm font-medium mb-2 block">
                {isArabic ? "المبلغ المتبقي" : "Remaining Amount"}
              </label>
              <Input
                id="remainingAmount"
                type="text"
                value={remainingAmount.toFixed(2)}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
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
