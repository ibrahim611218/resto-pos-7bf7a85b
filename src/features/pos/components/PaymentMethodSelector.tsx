
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
    <div className="mb-4">
      <Label className="block mb-2">{isArabic ? "طريقة الدفع" : "Payment Method"}</Label>
      <RadioGroup 
        value={value} 
        onValueChange={(value: PaymentMethod) => onChange(value)}
        className="flex space-x-4 space-x-reverse"
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash" className="flex items-center">
            <Banknote className="ml-1 h-4 w-4" />
            {isArabic ? "نقدي" : "Cash"}
          </Label>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center">
            <CreditCard className="ml-1 h-4 w-4" />
            {isArabic ? "شبكة" : "Card"}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
