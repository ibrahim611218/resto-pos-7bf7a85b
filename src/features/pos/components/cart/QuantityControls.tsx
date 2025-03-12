
import React from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  return (
    <div className={`flex items-center space-x-2 ${isLightTheme ? 'bg-primary/5' : 'bg-secondary/50'} rounded-full p-1.5`}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-primary hover:text-white"
        onClick={onDecrease}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-6 text-center font-medium text-base">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-primary hover:text-white"
        onClick={onIncrease}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantityControls;
