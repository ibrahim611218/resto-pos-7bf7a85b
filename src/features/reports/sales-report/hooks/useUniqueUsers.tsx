
import { useState, useEffect } from "react";
import { Invoice } from "@/types";

interface UniqueUsersProps {
  allInvoices: Invoice[];
}

export const useUniqueUsers = ({ allInvoices }: UniqueUsersProps) => {
  const [uniqueUsers, setUniqueUsers] = useState<{id: string, name: string}[]>([]);
  
  useEffect(() => {
    const users = new Map<string, {id: string, name: string}>();
    
    allInvoices.forEach(invoice => {
      if (invoice.cashierId && invoice.cashierName) {
        users.set(invoice.cashierId, {
          id: invoice.cashierId,
          name: invoice.cashierName
        });
      }
    });
    
    setUniqueUsers(Array.from(users.values()));
  }, [allInvoices]);
  
  return uniqueUsers;
};
