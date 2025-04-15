
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import { Customer } from "@/types";
import CustomerSelectionForm from "./CustomerSelectionForm";

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
  total
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [receiptNumber, setReceiptNumber] = useState("");
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  
  const handleConfirm = () => {
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

  const handleCustomerChange = (selectedCustomer?: Customer) => {
    setCustomer(selectedCustomer);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent
        className="sm:max-w-md"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isArabic ? "تفاصيل التحويل المصرفي" : "Bank Transfer Details"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="total-amount">
              {isArabic ? "المبلغ الإجمالي" : "Total Amount"}
            </Label>
            <Input
              id="total-amount"
              value={total.toFixed(2)}
              disabled
              className="text-left"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="receipt-number">
              {isArabic ? "رقم إيصال التحويل" : "Transfer Receipt Number"}
            </Label>
            <Input
              id="receipt-number"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              placeholder={isArabic ? "أدخل رقم الإيصال" : "Enter receipt number"}
            />
          </div>
          
          <CustomerSelectionForm 
            onCustomerChange={handleCustomerChange}
            isArabic={isArabic}
          />
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
