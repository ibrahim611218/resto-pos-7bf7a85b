
import SalesReport from "./sales-report/SalesReport";
import { useEffect } from "react";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";

const SalesReportWrapper = () => {
  const { loadInvoicesFromStorage } = useInvoices();
  
  useEffect(() => {
    // Load invoices when the component mounts
    loadInvoicesFromStorage();
  }, [loadInvoicesFromStorage]);
  
  return <SalesReport />;
};

export default SalesReportWrapper;
