
import React from "react";
import { Customer } from "@/types";
import CustomerTypeSelector from "./CustomerTypeSelector";
import CustomerInfoFields from "./CustomerInfoFields";
import { useCustomerSelection } from "../../hooks/useCustomerSelection";

interface CustomerSelectionFormProps {
  onCustomerChange: (customer?: Customer) => void;
  isArabic: boolean;
}

const CustomerSelectionForm: React.FC<CustomerSelectionFormProps> = ({
  onCustomerChange,
  isArabic
}) => {
  const {
    customers,
    isNewCustomer,
    selectedCustomerId,
    customerData,
    handleCustomerSelect,
    updateCustomerField
  } = useCustomerSelection(onCustomerChange);

  return (
    <div className="space-y-4">
      <CustomerTypeSelector
        customers={customers}
        isArabic={isArabic}
        selectedCustomerId={selectedCustomerId}
        onCustomerSelect={handleCustomerSelect}
      />
      
      {isNewCustomer && (
        <CustomerInfoFields
          isArabic={isArabic}
          isNewCustomer={isNewCustomer}
          customerData={customerData}
          onUpdateField={updateCustomerField}
        />
      )}
    </div>
  );
};

export default CustomerSelectionForm;
