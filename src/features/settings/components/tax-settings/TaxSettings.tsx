
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash, Percent } from "lucide-react";
import { BusinessSettings } from "@/types";
import TaxInclusionToggle from "../TaxInclusionToggle";

interface TaxSettingsProps {
  settings: BusinessSettings;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange?: (name: string, checked: boolean) => void;
}

const TaxSettings: React.FC<TaxSettingsProps> = ({ 
  settings, 
  isArabic, 
  onChange,
  onSwitchChange 
}) => {
  const handleTaxInclusionChange = (checked: boolean) => {
    if (onSwitchChange) {
      onSwitchChange('taxIncluded', checked);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="taxNumber">
            <Hash className="inline ml-1" size={16} />
            {isArabic ? "الرقم الضريبي" : "Tax Number"}
          </Label>
          <Input 
            id="taxNumber"
            name="taxNumber"
            value={settings.taxNumber}
            onChange={onChange}
            placeholder={isArabic ? "أدخل الرقم الضريبي" : "Enter tax number"}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taxRate">
            <Percent className="inline ml-1" size={16} />
            {isArabic ? "نسبة الضريبة (%)" : "Tax Rate (%)"}
          </Label>
          <Input 
            id="taxRate"
            name="taxRate"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={settings.taxRate}
            onChange={onChange}
            placeholder={isArabic ? "أدخل نسبة الضريبة" : "Enter tax rate"}
          />
        </div>
      </div>
      
      <TaxInclusionToggle 
        taxIncluded={settings.taxIncluded}
        isArabic={isArabic}
        onChange={handleTaxInclusionChange}
      />
    </>
  );
};

export default TaxSettings;
