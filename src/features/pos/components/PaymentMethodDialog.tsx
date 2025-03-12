
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentMethod, Customer } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { UserPlus, Users } from "lucide-react";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  onConfirm: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string) => void;
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  isOpen,
  onClose,
  paymentMethod,
  setPaymentMethod,
  onConfirm,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { customers } = useCustomers();
  
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

  const handleConfirm = () => {
    // If a registered customer is selected, pass the customer ID
    if (!isNewCustomer && selectedCustomerId) {
      onConfirm(customerName, customerTaxNumber, selectedCustomerId, commercialRegister, address);
    } else {
      // For a new customer, just pass the details without an ID
      onConfirm(customerName, customerTaxNumber, undefined, commercialRegister, address);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "اختر طريقة الدفع" : "Select Payment Method"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={paymentMethod === "cash" ? "default" : "outline"}
              className="h-14 text-lg"
              onClick={() => setPaymentMethod("cash")}
            >
              {isArabic ? "نقدي" : "Cash"}
            </Button>
            <Button
              variant={paymentMethod === "card" ? "default" : "outline"}
              className="h-14 text-lg"
              onClick={() => setPaymentMethod("card")}
            >
              {isArabic ? "شبكة" : "Card"}
            </Button>
          </div>

          <div className="grid gap-2 mt-4">
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

          <div className="grid gap-2 mt-1">
            <Label htmlFor="customerName">
              {isArabic ? "اسم العميل" : "Customer Name"}
            </Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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
              onChange={(e) => setCustomerTaxNumber(e.target.value)}
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
              onChange={(e) => setCommercialRegister(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
              placeholder={isArabic ? "العنوان (اختياري)" : "Address (optional)"}
              disabled={!isNewCustomer}
            />
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
