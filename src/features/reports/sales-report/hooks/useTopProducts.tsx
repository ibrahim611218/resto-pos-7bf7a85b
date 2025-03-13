
import { useMemo } from "react";
import { Invoice, TopSellingProduct } from "@/types";

interface TopProductsProps {
  filteredInvoices: Invoice[];
  isArabic: boolean;
}

export const useTopProducts = ({ filteredInvoices, isArabic }: TopProductsProps) => {
  return useMemo(() => {
    const productsMap: Map<string, { name: string, quantity: number, revenue: number }> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      // Calculate multiplier based on invoice status
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      
      invoice.items.forEach((item) => {
        const currentProduct = productsMap.get(item.productId) || { 
          name: item.name, 
          quantity: 0, 
          revenue: 0 
        };
        
        productsMap.set(item.productId, {
          name: item.nameAr && isArabic ? item.nameAr : item.name,
          quantity: currentProduct.quantity + (item.quantity * multiplier),
          revenue: currentProduct.revenue + (item.price * item.quantity * multiplier)
        });
      });
    });
    
    const productsArray: TopSellingProduct[] = [];
    productsMap.forEach((product, productId) => {
      if (product.quantity > 0) { // Only add products with positive quantities
        productsArray.push({
          productId,
          productName: product.name,
          quantity: product.quantity,
          revenue: product.revenue
        });
      }
    });
    
    return productsArray
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredInvoices, isArabic]);
};
