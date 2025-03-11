
import React from "react";
import { InventoryItem, Language } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Search, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { sampleCategories } from "@/data/sampleData";

interface InventoryListProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  language: Language;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({
  items,
  onEdit,
  onDelete,
  language,
  searchTerm,
  setSearchTerm,
}) => {
  const isArabic = language === "ar";

  const getCategoryName = (categoryId: string) => {
    const category = sampleCategories.find((c) => c.id === categoryId);
    return isArabic ? category?.nameAr || category?.name : category?.name;
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity <= 0) {
      return {
        label: isArabic ? "نفذ من المخزون" : "Out of Stock",
        color: "destructive",
      };
    } else if (item.quantity <= item.lowStockThreshold) {
      return {
        label: isArabic ? "المخزون منخفض" : "Low Stock",
        color: "warning",
      };
    } else {
      return {
        label: isArabic ? "متوفر" : "In Stock",
        color: "success",
      };
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
        <Input
          placeholder={isArabic ? "البحث في المخزون..." : "Search inventory..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${isArabic ? 'pr-10' : 'pl-10'}`}
        />
      </div>

      {items.length === 0 ? (
        <div className="text-center p-6 border rounded-md">
          {searchTerm 
            ? (isArabic ? "لا توجد نتائج للبحث" : "No results found") 
            : (isArabic ? "لا توجد منتجات في المخزون" : "No inventory items found")}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isArabic ? "اسم المنتج" : "Product Name"}</TableHead>
              <TableHead>{isArabic ? "التصنيف" : "Category"}</TableHead>
              <TableHead className="text-center">{isArabic ? "الكمية" : "Quantity"}</TableHead>
              <TableHead className="text-center">{isArabic ? "حد التنبيه" : "Alert Threshold"}</TableHead>
              <TableHead className="text-center">{isArabic ? "الحالة" : "Status"}</TableHead>
              <TableHead className="text-end">{isArabic ? "الإجراءات" : "Actions"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const status = getStockStatus(item);
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {isArabic ? item.productNameAr || item.productName : item.productName}
                  </TableCell>
                  <TableCell>{getCategoryName(item.categoryId)}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-center">{item.lowStockThreshold}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={status.color as any}>{status.label}</Badge>
                    {status.color === "warning" && <AlertTriangle className="inline ml-2 h-4 w-4 text-yellow-500" />}
                  </TableCell>
                  <TableCell className="text-end">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default InventoryList;
