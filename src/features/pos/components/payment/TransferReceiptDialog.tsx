
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
import CustomerSelectionForm from "./CustomerSelectionForm";
import { useLanguage } from "@/context/LanguageContext";
import { Customer } from "@/types";

interface TransferReceiptDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (receiptNumber: string, customer?: Customer) => void;
  total: number;
}

const TransferReceiptDialog: React.FC<TransferReceiptDialogProps> = ({
  open,
  onClose,
  onConfirm,
  total,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [receiptNumber, setReceiptNumber] = useState("");
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);

  const handleConfirm = () => {
    if (!receiptNumber) {
      return; // Don't allow empty receipt number
    }
    onConfirm(receiptNumber, customer);
    resetForm();
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setReceiptNumber("");
    setCustomer(undefined);
  };

  // Handle customer selection
  const handleCustomerChange = (selectedCustomer?: Customer) => {
    setCustomer(selectedCustomer);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="sm:max-w-md"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isArabic ? "تفاصيل التحويل البنكي" : "Bank Transfer Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="receiptNumber" className="mb-2 block">
              {isArabic ? "رقم إيصال التحويل" : "Transfer Receipt Number"}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="receiptNumber"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              placeholder={
                isArabic
                  ? "أدخل رقم إيصال التحويل البنكي"
                  : "Enter bank transfer receipt number"
              }
              className="w-full"
              dir={isArabic ? "rtl" : "ltr"}
            />
          </div>

          <div className="my-4">
            <Label className="mb-2 block">
              {isArabic ? "إجمالي المبلغ" : "Total Amount"}
            </Label>
            <div className="font-bold text-lg">
              {total.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">
              {isArabic ? "معلومات العميل" : "Customer Information"}
            </h3>
            <CustomerSelectionForm 
              onCustomerChange={handleCustomerChange}
              isArabic={isArabic}
            />
          </div>
        </div>

        <DialogFooter className={isArabic ? "sm:justify-start" : "sm:justify-end"}>
          <Button type="button" variant="outline" onClick={handleClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button 
            type="button" 
            onClick={handleConfirm}
            disabled={!receiptNumber}
          >
            {isArabic ? "تأكيد" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferReceiptDialog;
