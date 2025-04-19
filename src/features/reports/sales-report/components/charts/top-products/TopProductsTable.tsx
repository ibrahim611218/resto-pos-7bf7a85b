
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TopSellingProduct } from "@/types";

interface TopProductsTableProps {
  topSellingProducts: TopSellingProduct[];
  isArabic: boolean;
}

const TopProductsTable: React.FC<TopProductsTableProps> = ({ 
  topSellingProducts, 
  isArabic 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isArabic ? "المنتج" : "Product"}</TableHead>
          <TableHead className="text-right">{isArabic ? "الكمية" : "Quantity"}</TableHead>
          <TableHead className="text-right">{isArabic ? "الإيرادات" : "Revenue"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topSellingProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell className="text-right">{product.quantity}</TableCell>
            <TableCell className="text-right">{product.revenue.toFixed(2)} {isArabic ? "ريال" : "SAR"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopProductsTable;
