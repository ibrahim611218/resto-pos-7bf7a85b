
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Users } from 'lucide-react';
import { Customer } from '@/types';

interface CustomerTypeSelectorProps {
  customers: Customer[];
  isArabic: boolean;
  selectedCustomerId: string;
  onCustomerSelect: (value: string) => void;
}

const CustomerTypeSelector: React.FC<CustomerTypeSelectorProps> = ({
  customers,
  isArabic,
  selectedCustomerId,
  onCustomerSelect
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="customerSelect">
        {isArabic ? "العميل" : "Customer"}
      </Label>
      <Select 
        onValueChange={onCustomerSelect}
        value={selectedCustomerId || "new"}
      >
        <SelectTrigger id="customerSelect">
          <SelectValue placeholder={isArabic ? "اختر عميل" : "Select customer"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">
            <div className="flex items-center">
              <UserPlus className="mr-2 h-4 w-4" />
              {isArabic ? "عميل جديد" : "New Customer"}
            </div>
          </SelectItem>
          {customers.map(customer => (
            <SelectItem key={customer.id} value={customer.id || ""}>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                {customer.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomerTypeSelector;
