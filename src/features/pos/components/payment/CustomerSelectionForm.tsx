
import React from "react";
import { Customer } from "@/types";
import CustomerTypeSelector from "./CustomerTypeSelector";
import CustomerInfoFields from "./CustomerInfoFields";
import { useCustomerSelection } from "../../hooks/useCustomerSelection";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface CustomerSelectionFormProps {
  onSubmit: (customer?: Customer) => void;
  onCancel: () => void;
}

const CustomerSelectionForm: React.FC<CustomerSelectionFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const {
    customers,
    isNewCustomer,
    selectedCustomerId,
    customerData,
    handleCustomerSelect,
    updateCustomerField
  } = useCustomerSelection((customer) => {
    // Handle customer change
  });

  const handleSubmit = () => {
    if (isNewCustomer) {
      // For new customer, pass the customer data
      onSubmit(customerData);
    } else {
      // For existing customer, find the selected one
      const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
      onSubmit(selectedCustomer);
    }
  };

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

      <div className="flex justify-end space-x-2 space-x-reverse pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          {isArabic ? "إلغاء" : "Cancel"}
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
        >
          {isArabic ? "تأكيد" : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default CustomerSelectionForm;
