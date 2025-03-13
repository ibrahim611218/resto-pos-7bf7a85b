
import React from "react";
import { Button } from "@/components/ui/button";

interface QuickAmountButtonsProps {
  quickAmounts: number[];
  total: number;
  isArabic: boolean;
  onAmountSelect: (amount: string) => void;
}

const QuickAmountButtons: React.FC<QuickAmountButtonsProps> = ({
  quickAmounts,
  total,
  isArabic,
  onAmountSelect
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {quickAmounts.map(amount => (
        <Button 
          key={amount} 
          type="button" 
          variant="outline" 
          className="flex-1 min-w-[70px]"
          onClick={() => onAmountSelect(amount.toString())}
        >
          {amount}
        </Button>
      ))}
      <Button 
        type="button" 
        variant="outline" 
        className="flex-1 min-w-[70px]"
        onClick={() => onAmountSelect(total.toString())}
      >
        {isArabic ? "الضبط" : "Exact"}
      </Button>
    </div>
  );
};

export default QuickAmountButtons;
