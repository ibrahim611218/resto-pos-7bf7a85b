
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import CustomerSelectionForm from "./CustomerSelectionForm";
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
    onConfirm(receiptNumber, customer);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isArabic ? "بيانات التحويل والعميل" : "Transfer Receipt & Customer Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="receiptNumber">
              {isArabic ? "رقم إيصال التحويل" : "Transfer Receipt Number"}
            </Label>
            <Input
              id="receiptNumber"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              placeholder={isArabic ? "أدخل رقم الإيصال" : "Enter receipt number"}
            />
          </div>
          
          <div className="mt-4">
            <CustomerSelectionForm 
              onCustomerChange={(selectedCustomer) => setCustomer(selectedCustomer)}
              isArabic={isArabic}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleConfirm} disabled={!receiptNumber}>
            {isArabic ? "تأكيد" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferReceiptDialog;
