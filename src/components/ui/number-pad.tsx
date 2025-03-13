
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X, Check, Delete, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NumberPadProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: number) => void;
  initialValue?: number;
  title?: string;
  decimalAllowed?: boolean;
  isArabic?: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialValue = 0,
  title,
  decimalAllowed = false,
  isArabic: propIsArabic,
}) => {
  const { language } = useLanguage();
  const isArabic = propIsArabic !== undefined ? propIsArabic : language === "ar";
  
  const [value, setValue] = useState(initialValue.toString());
  
  // Reset value when dialog opens
  useEffect(() => {
    if (isOpen) {
      setValue(initialValue.toString());
    }
  }, [isOpen, initialValue]);

  const handleDigitClick = (digit: string) => {
    if (digit === "." && value.includes(".")) {
      return; // Prevent multiple decimal points
    }
    
    if (value === "0" && digit !== ".") {
      setValue(digit);
    } else {
      setValue(prev => prev + digit);
    }
  };

  const handleClear = () => {
    setValue("0");
  };

  const handleDelete = () => {
    setValue(prev => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const handleConfirm = () => {
    const numValue = parseFloat(value || "0");
    onConfirm(numValue);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Validate input - only allow numbers and at most one decimal point
    if (decimalAllowed) {
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (regex.test(inputValue) || inputValue === "") {
        setValue(inputValue === "" ? "0" : inputValue);
      }
    } else {
      const regex = /^[0-9]*$/;
      if (regex.test(inputValue) || inputValue === "") {
        setValue(inputValue === "" ? "0" : inputValue);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[320px]" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="text-center">
            {title || (isArabic ? "أدخل الرقم" : "Enter Number")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            type="text"
            value={value}
            onChange={handleInputChange}
            className="text-2xl text-center mb-4"
            autoFocus
          />
          
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <Button
                key={num}
                type="button"
                variant="outline"
                onClick={() => handleDigitClick(num.toString())}
                className="h-12 text-lg"
              >
                {num}
              </Button>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="h-12"
            >
              <X className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDigitClick("0")}
              className="h-12 text-lg"
            >
              0
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              className="h-12"
            >
              <Delete className="h-5 w-5" />
            </Button>
          </div>
          
          {decimalAllowed && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDigitClick(".")}
                className="h-12 text-lg"
                disabled={value.includes(".")}
              >
                .
              </Button>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
        
        <DialogFooter className={isArabic ? "justify-start" : "justify-end"}>
          <Button type="button" variant="ghost" onClick={onClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button type="button" onClick={handleConfirm}>
            <Check className={isArabic ? "ml-2" : "mr-2"} size={16} />
            {isArabic ? "تأكيد" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NumberPad;
