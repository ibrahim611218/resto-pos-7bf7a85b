
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/invoice";

interface AmountFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  disabled?: boolean;
  formatAsCurrency?: boolean;
  className?: string;
  isArabic: boolean;
}

const AmountField: React.FC<AmountFieldProps> = ({
  id,
  label,
  value,
  onChange,
  onClick,
  disabled = false,
  formatAsCurrency = false,
  className = "",
  isArabic
}) => {
  // Format value as currency if requested
  const displayValue = formatAsCurrency 
    ? formatCurrency(typeof value === 'string' ? parseFloat(value) : value, isArabic ? "ar-SA" : "en-US", "SAR")
    : value;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-md">
        {label}
      </Label>
      <Input
        id={id}
        value={displayValue}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        className={`text-lg font-bold ${className}`}
        type={formatAsCurrency ? "text" : onChange ? "text" : "text"}
        inputMode={onChange ? "numeric" : undefined}
      />
    </div>
  );
};

export default AmountField;
