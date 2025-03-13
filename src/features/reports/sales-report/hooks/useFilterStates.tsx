
import { useState } from "react";

export const useFilterStates = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  const [orderType, setOrderType] = useState<string | undefined>(undefined);
  const [cashier, setCashier] = useState<string | undefined>(undefined);
  const [includeRefunded, setIncludeRefunded] = useState<boolean>(true);
  
  const resetFilters = () => {
    setStartDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    setEndDate(new Date());
    setPaymentMethod(undefined);
    setOrderType(undefined);
    setCashier(undefined);
    setIncludeRefunded(true);
  };
  
  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    paymentMethod,
    setPaymentMethod,
    orderType,
    setOrderType,
    cashier,
    setCashier,
    includeRefunded,
    setIncludeRefunded,
    resetFilters
  };
};
