
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Banknote, Smartphone, X } from "lucide-react";
import { PaymentMethod, Customer } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import CustomerSelectionForm from "./CustomerSelectionForm";

interface PaymentMethodDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectPaymentMethod: (method: PaymentMethod, customer?: Customer) => void;
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  open,
  onClose,
  onSelectPaymentMethod,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const handleMethodSelect = (method: PaymentMethod) => {
    if (method === "transfer") {
      setSelectedMethod(method);
      setShowCustomerForm(true);
    } else {
      onSelectPaymentMethod(method);
    }
  };

  const handleCustomerSubmit = (customer?: Customer) => {
    if (selectedMethod) {
      onSelectPaymentMethod(selectedMethod, customer);
    }
    setShowCustomerForm(false);
    setSelectedMethod(null);
  };

  const handleClose = () => {
    // عند الضغط على X يجب الرجوع للسلة وليس حفظ الفاتورة
    setShowCustomerForm(false);
    setSelectedMethod(null);
    onClose();
  };

  if (showCustomerForm) {
    return (
      <Dialog open={open} onOpenChange={() => handleClose()}>
        <DialogContent className="sm:max-w-md" dir={isArabic ? "rtl" : "ltr"}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">
                {isArabic ? "معلومات العميل" : "Customer Information"}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <CustomerSelectionForm 
            onSubmit={handleCustomerSubmit}
            onCancel={() => setShowCustomerForm(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent className="sm:max-w-md" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {isArabic ? "اختر طريقة الدفع" : "Select Payment Method"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid gap-3 py-4">
          <Button
            variant="outline"
            className="h-16 flex items-center justify-start gap-4 px-6"
            onClick={() => handleMethodSelect("cash")}
          >
            <Banknote className="h-6 w-6" />
            <span className="text-lg">{isArabic ? "نقد" : "Cash"}</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-16 flex items-center justify-start gap-4 px-6"
            onClick={() => handleMethodSelect("card")}
          >
            <CreditCard className="h-6 w-6" />
            <span className="text-lg">{isArabic ? "بطاقة" : "Card"}</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-16 flex items-center justify-start gap-4 px-6"
            onClick={() => handleMethodSelect("transfer")}
          >
            <Smartphone className="h-6 w-6" />
            <span className="text-lg">{isArabic ? "تحويل" : "Transfer"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
