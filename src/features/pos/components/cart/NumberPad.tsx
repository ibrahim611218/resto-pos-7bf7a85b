
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X, Check, Delete } from "lucide-react";

interface NumberPadProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: number) => void;
  initialValue?: number;
}

const NumberPad: React.FC<NumberPadProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialValue = 1
}) => {
  const [value, setValue] = useState(initialValue.toString());

  const handleDigitClick = (digit: string) => {
    if (value === "0" || value === "") {
      setValue(digit);
    } else {
      setValue(prev => prev + digit);
    }
  };

  const handleClear = () => {
    setValue("");
  };

  const handleDelete = () => {
    setValue(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    const numValue = parseInt(value || "0", 10);
    onConfirm(Math.max(1, numValue)); // Ensure minimum quantity is 1
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    setValue(inputValue);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle className="text-center">أدخل الكمية</DialogTitle>
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
        </div>
        
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="button" onClick={handleConfirm}>
            <Check className="ml-2 h-4 w-4" /> تأكيد
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NumberPad;
