
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Banknote } from "lucide-react";
import { PaymentMethod } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="mb-5">
      <Label className="block mb-3 text-lg">{isArabic ? "طريقة الدفع" : "Payment Method"}</Label>
      <RadioGroup 
        value={value} 
        onValueChange={(value: PaymentMethod) => onChange(value)}
        className="flex space-x-4 space-x-reverse"
      >
        <div className="flex items-center space-x-2 space-x-reverse bg-accent p-3 rounded-lg border border-accent-foreground/20 flex-1 justify-center">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash" className="flex items-center cursor-pointer">
            <Banknote className="ml-2 h-5 w-5" />
            <span className="text-base">{isArabic ? "نقدي" : "Cash"}</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse bg-accent p-3 rounded-lg border border-accent-foreground/20 flex-1 justify-center">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center cursor-pointer">
            <CreditCard className="ml-2 h-5 w-5" />
            <span className="text-base">{isArabic ? "شبكة" : "Card"}</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
