
import React from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantityControlsProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center space-x-1 bg-secondary/50 rounded-full p-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full hover:bg-primary hover:text-white"
        onClick={onDecrease}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-6 text-center font-medium">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full hover:bg-primary hover:text-white"
        onClick={onIncrease}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default QuantityControls;
