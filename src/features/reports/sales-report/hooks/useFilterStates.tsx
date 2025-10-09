
import { useState } from "react";

export const useFilterStates = () => {
  // Set start and end date to today (from 00:00:00 to 23:59:59)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  
  const [startDate, setStartDate] = useState<Date | undefined>(today);
  const [endDate, setEndDate] = useState<Date | undefined>(endOfToday);
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  const [orderType, setOrderType] = useState<string | undefined>(undefined);
  const [cashier, setCashier] = useState<string | undefined>(undefined);
  const [includeRefunded, setIncludeRefunded] = useState<boolean>(true);
  
  const resetFilters = () => {
    const resetToday = new Date();
    resetToday.setHours(0, 0, 0, 0);
    
    const resetEndOfToday = new Date();
    resetEndOfToday.setHours(23, 59, 59, 999);
    
    setStartDate(resetToday);
    setEndDate(resetEndOfToday);
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
