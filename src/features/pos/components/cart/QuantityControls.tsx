
import React, { useState } from "react";
import { Plus, Minus, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NumberPad from "./NumberPad";

interface QuantityControlsProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onSetQuantity?: (quantity: number) => void;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  onSetQuantity
}) => {
  const [showNumberPad, setShowNumberPad] = useState(false);

  const handleQuantityClick = () => {
    setShowNumberPad(true);
  };

  const handleSetQuantity = (newQuantity: number) => {
    if (onSetQuantity) {
      onSetQuantity(newQuantity);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onDecrease}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 px-2"
          onClick={handleQuantityClick}
        >
          <span className="w-6 text-center">{quantity}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onIncrease}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <NumberPad
        isOpen={showNumberPad}
        onClose={() => setShowNumberPad(false)}
        onConfirm={handleSetQuantity}
        initialValue={quantity}
      />
    </>
  );
};

export default QuantityControls;
