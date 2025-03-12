
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
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={onDecrease}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-6 text-center">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={onIncrease}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default QuantityControls;
