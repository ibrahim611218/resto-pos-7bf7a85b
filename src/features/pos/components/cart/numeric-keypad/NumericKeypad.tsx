
import React from "react";
import { Button } from "@/components/ui/button";

interface NumericKeypadProps {
  onNumberClick: (digit: string) => void;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ onNumberClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <Button
          key={num}
          type="button"
          variant="outline"
          onClick={() => onNumberClick(num.toString())}
          className="h-12 text-lg"
        >
          {num}
        </Button>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => onNumberClick(".")}
        className="h-12 text-lg"
      >
        .
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => onNumberClick("0")}
        className="h-12 text-lg"
      >
        0
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => onNumberClick("C")}
        className="h-12 text-lg"
      >
        C
      </Button>
    </div>
  );
};

export default NumericKeypad;
