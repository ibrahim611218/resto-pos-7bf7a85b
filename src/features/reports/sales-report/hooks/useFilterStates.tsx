
import { useState } from "react";

export const useFilterStates = () => {
  // Get current date at midnight (start of day)
  const getTodayStart = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };
  
  // Get current date at end of day
  const getTodayEnd = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return today;
  };
  
  const [startDate, setStartDate] = useState<Date | undefined>(getTodayStart());
  const [endDate, setEndDate] = useState<Date | undefined>(getTodayEnd());
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  const [orderType, setOrderType] = useState<string | undefined>(undefined);
  const [cashier, setCashier] = useState<string | undefined>(undefined);
  const [includeRefunded, setIncludeRefunded] = useState<boolean>(true);
  
  const resetFilters = () => {
    setStartDate(getTodayStart());
    setEndDate(getTodayEnd());
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
