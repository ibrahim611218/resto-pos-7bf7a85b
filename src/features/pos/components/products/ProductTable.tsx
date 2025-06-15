
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";
import { Product } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "react-router-dom";

interface ProductTableProps {
  products: Product[];
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEditProduct,
  onDeleteProduct
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const location = useLocation();
  const isProductsPage = location.pathname === "/products";

  console.log("[ProductTable] Rendering with products:", products?.length || 0);

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-lg text-muted-foreground">
          لا توجد منتجات
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isArabic ? "الصورة" : "Image"}</TableHead>
            <TableHead>{isArabic ? "الاسم" : "Name"}</TableHead>
            <TableHead>{isArabic ? "النوع" : "Type"}</TableHead>
            <TableHead>{isArabic ? "السعر" : "Price"}</TableHead>
            {isProductsPage && <TableHead>{isArabic ? "الإجراءات" : "Actions"}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => {
            const displayName = product.nameAr || product.name || `منتج ${index + 1}`;
            
            return (
              <TableRow key={`product-${product.id}-${index}`}>
                <TableCell>
                  <div className="h-12 w-12 bg-gray-100 rounded-md">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={displayName}
                        className="w-full h-full object-cover rounded-md" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {displayName}
                </TableCell>
                <TableCell>
                  {product.type === "single" ? "منتج فردي" : "منتج بأحجام"}
                </TableCell>
                <TableCell>
                  {product.type === "single" ? (
                    `${product.price || 0} ر.س`
                  ) : product.variants && product.variants.length > 0 ? (
                    `${product.variants[0].price} - ${product.variants[product.variants.length - 1].price} ر.س`
                  ) : (
                    "غير محدد"
                  )}
                </TableCell>
                {isProductsPage && (
                  <TableCell>
                    <div className="flex gap-2">
                      {onEditProduct && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditProduct(product.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                      {onDeleteProduct && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
