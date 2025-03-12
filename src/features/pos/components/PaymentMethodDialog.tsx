
import React, { useState } from "react";
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
import { PaymentMethod } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  onConfirm: (customerName?: string, customerTaxNumber?: string) => void;
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
  const [customerName, setCustomerName] = useState("");
  const [customerTaxNumber, setCustomerTaxNumber] = useState("");

  const handleConfirm = () => {
    onConfirm(customerName, customerTaxNumber);
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
            <Label htmlFor="customerName">
              {isArabic ? "اسم العميل" : "Customer Name"}
            </Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={isArabic ? "اسم العميل (اختياري)" : "Customer Name (optional)"}
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
