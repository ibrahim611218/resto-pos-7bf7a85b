
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Percent } from 'lucide-react';

interface TaxInclusionToggleProps {
  taxIncluded: boolean;
  isArabic: boolean;
  onChange: (checked: boolean) => void;
}

const TaxInclusionToggle: React.FC<TaxInclusionToggleProps> = ({
  taxIncluded,
  isArabic,
  onChange
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label className="text-base font-medium flex items-center">
        <Percent className="mr-1" size={16} />
        {isArabic ? 'طريقة احتساب الضريبة' : 'Tax Calculation Method'}
      </Label>
      
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="tax-inclusion" className="text-base">
            {isArabic ? 'تضمين الضريبة في السعر' : 'Include Tax in Price'}
          </Label>
          <p className="text-sm text-muted-foreground">
            {isArabic 
              ? taxIncluded 
                ? 'السعر المعروض شامل للضريبة' 
                : 'السعر المعروض غير شامل للضريبة'
              : taxIncluded 
                ? 'Displayed price includes tax' 
                : 'Tax will be added to the displayed price'
            }
          </p>
        </div>
        <Switch
          id="tax-inclusion"
          checked={taxIncluded}
          onCheckedChange={onChange}
        />
      </div>
    </div>
  );
};

export default TaxInclusionToggle;
