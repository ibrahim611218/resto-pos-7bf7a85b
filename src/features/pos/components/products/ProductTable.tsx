
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

  // 🔥 DIAGNOSTIC INFO - ALWAYS VISIBLE
  console.log("🔥 [ProductTable] DIAGNOSTIC START");
  console.log("🔥 [ProductTable] Products received:", products);
  console.log("🔥 [ProductTable] Products length:", products?.length);
  console.log("🔥 [ProductTable] Products type:", typeof products);
  console.log("🔥 [ProductTable] Products is array:", Array.isArray(products));
  console.log("🔥 [ProductTable] Location pathname:", location.pathname);
  console.log("🔥 [ProductTable] Is products page:", isProductsPage);

  // Force render regardless of conditions - ALWAYS show the table structure
  return (
    <div className="w-full h-full overflow-auto">
      {/* DIAGNOSTIC BANNER - ALWAYS VISIBLE */}
      <div className="bg-red-100 border-2 border-red-500 p-4 mb-4 text-red-800 font-bold">
        <h3>🔥 DIAGNOSTIC INFO:</h3>
        <p>Products count: {products?.length || 0}</p>
        <p>Products type: {typeof products}</p>
        <p>Is array: {Array.isArray(products) ? "YES" : "NO"}</p>
        <p>Location: {location.pathname}</p>
        <p>Raw products data: {JSON.stringify(products, null, 2)}</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isArabic ? "الصورة" : "Image"}</TableHead>
            <TableHead>{isArabic ? "الاسم" : "Name"}</TableHead>
            <TableHead>{isArabic ? "النوع" : "Type"}</TableHead>
            <TableHead>{isArabic ? "السعر" : "Price"}</TableHead>
            <TableHead>{isArabic ? "البيانات الخام" : "Raw Data"}</TableHead>
            {isProductsPage && <TableHead>{isArabic ? "الإجراءات" : "Actions"}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* ALWAYS show this diagnostic row */}
          <TableRow className="bg-yellow-50">
            <TableCell colSpan={isProductsPage ? 6 : 5} className="text-center py-8">
              <div className="space-y-2">
                <p className="font-bold text-lg">🔥 FORCE RENDER TEST ROW</p>
                <p>This row should ALWAYS be visible</p>
                <p>Products received: {products?.length || 0}</p>
              </div>
            </TableCell>
          </TableRow>

          {/* Try to render products with maximum error handling */}
          {products && Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => {
              console.log(`🔥 [ProductTable] Rendering product ${index}:`, product);
              
              // Force a display name with fallbacks
              const displayName = product?.nameAr || product?.name || `منتج ${index + 1}` || `Product ${index + 1}` || "UNNAMED PRODUCT";
              
              return (
                <TableRow key={`product-force-${index}-${product?.id || 'no-id'}`} className="bg-green-50">
                  <TableCell>
                    <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                      {product?.image ? (
                        <img 
                          src={product.image} 
                          alt={displayName}
                          className="w-full h-full object-cover rounded-md" 
                        />
                      ) : (
                        <span className="text-xs text-gray-500">No Image</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {displayName}
                  </TableCell>
                  <TableCell>
                    {product?.type === "single" ? "منتج فردي" : product?.type === "sized" ? "منتج بأحجام" : "غير محدد"}
                  </TableCell>
                  <TableCell>
                    {product?.type === "single" ? (
                      `${product?.price || 0} ر.س`
                    ) : product?.variants && product.variants.length > 0 ? (
                      `${product.variants[0]?.price || 0} - ${product.variants[product.variants.length - 1]?.price || 0} ر.س`
                    ) : (
                      "غير محدد"
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    <pre className="bg-gray-100 p-1 rounded text-xs max-w-32 overflow-hidden">
                      {JSON.stringify({
                        id: product?.id,
                        name: product?.name,
                        nameAr: product?.nameAr,
                        type: product?.type,
                        price: product?.price
                      }, null, 1)}
                    </pre>
                  </TableCell>
                  {isProductsPage && (
                    <TableCell>
                      <div className="flex gap-2">
                        {onEditProduct && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEditProduct(product?.id || '')}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                        {onDeleteProduct && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDeleteProduct(product?.id || '')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          ) : (
            <TableRow className="bg-orange-50">
              <TableCell colSpan={isProductsPage ? 6 : 5} className="text-center py-8">
                <div className="space-y-2">
                  <p className="font-bold text-lg">⚠️ NO PRODUCTS TO DISPLAY</p>
                  <p>Products: {JSON.stringify(products)}</p>
                  <p>Length: {products?.length}</p>
                  <p>Type: {typeof products}</p>
                  <p>Is Array: {Array.isArray(products) ? "YES" : "NO"}</p>
                </div>
              </TableCell>
            </TableRow>
          )}

          {/* ALWAYS show this final diagnostic row */}
          <TableRow className="bg-blue-50">
            <TableCell colSpan={isProductsPage ? 6 : 5} className="text-center py-4">
              <p className="font-bold">🔥 END OF TABLE - This row should ALWAYS be visible</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
