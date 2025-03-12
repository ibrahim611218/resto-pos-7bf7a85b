
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Banknote, Check } from "lucide-react";
import { PaymentMethod } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  onConfirm: () => void;
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isArabic ? "اختر طريقة الدفع" : "Select Payment Method"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6">
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className={`flex items-center space-x-2 ${isArabic ? 'space-x-reverse' : ''} bg-accent p-4 rounded-lg border border-accent-foreground/20 flex-1 justify-center`}>
                <RadioGroupItem value="cash" id="cash-dialog" />
                <Label htmlFor="cash-dialog" className="flex items-center cursor-pointer">
                  <Banknote className={`${isArabic ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  <span className="text-base">{isArabic ? "نقدي" : "Cash"}</span>
                </Label>
              </div>
              <div className={`flex items-center space-x-2 ${isArabic ? 'space-x-reverse' : ''} bg-accent p-4 rounded-lg border border-accent-foreground/20 flex-1 justify-center`}>
                <RadioGroupItem value="card" id="card-dialog" />
                <Label htmlFor="card-dialog" className="flex items-center cursor-pointer">
                  <CreditCard className={`${isArabic ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  <span className="text-base">{isArabic ? "شبكة" : "Card"}</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={onConfirm}>
            <Check className={`${isArabic ? 'ml-2' : 'mr-2'} h-4 w-4`} />
            {isArabic ? "تأكيد" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
