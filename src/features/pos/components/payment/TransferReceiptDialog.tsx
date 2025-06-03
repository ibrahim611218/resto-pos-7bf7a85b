
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types";
import { Input } from "@/components/ui/input";
import CustomerSelectionForm from "./CustomerSelectionForm";
import { useLanguage } from "@/context/LanguageContext";

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
  };

  const handleCustomerSubmit = (selectedCustomer?: Customer) => {
    setCustomer(selectedCustomer);
  };

  const handleCustomerCancel = () => {
    // Reset customer selection
    setCustomer(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="text-center">
            {isArabic ? "رقم إيصال التحويل" : "Transfer Receipt Number"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Input
              placeholder={isArabic ? "أدخل رقم إيصال التحويل" : "Enter receipt number"}
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              className={isArabic ? "text-right" : ""}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">
              {isArabic ? "بيانات العميل (اختياري)" : "Customer Information (Optional)"}
            </h3>
            <CustomerSelectionForm 
              onSubmit={handleCustomerSubmit}
              onCancel={handleCustomerCancel}
            />
          </div>
        </div>
        
        <DialogFooter className={isArabic ? "justify-start" : ""}>
          <Button onClick={handleConfirm} disabled={!receiptNumber}>
            {isArabic ? "تأكيد" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferReceiptDialog;
