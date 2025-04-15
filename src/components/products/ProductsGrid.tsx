
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types";

interface ProductsGridProps {
  products: Product[];
  getCategoryName: (categoryId: string) => string;
  isMobile: boolean;
  isArabic: boolean;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  getCategoryName, 
  isMobile,
  isArabic 
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {products.map((product) => {
        if (product.type === "sized") {
          return (
            <Card key={product.id} className="overflow-hidden h-auto">
              <CardHeader className={`${isMobile ? "p-3" : "pb-2"}`}>
                <div className="flex justify-between items-start">
                  <CardTitle className={`flex items-center ${isMobile ? "text-base" : ""}`}>
                    <Package className="ml-2" size={18} />
                    {product.nameAr || product.name}
                  </CardTitle>
                  <Badge>{getCategoryName(product.categoryId)}</Badge>
                </div>
                {product.description && (
                  <CardDescription className={isMobile ? "text-xs" : ""}>
                    {product.descriptionAr || product.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="p-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.nameAr || product.name}
                  className={`w-full ${isMobile ? "h-32" : "h-40"} object-cover`}
                  loading="lazy"
                />
              </CardContent>
              <CardFooter className={`pt-4 flex-col ${isMobile ? "p-3" : ""}`}>
                <div className="w-full grid grid-cols-3 gap-2 mb-4">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="border rounded p-2 text-center">
                      <div className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>
                        {variant.size === "small" && "صغير"}
                        {variant.size === "medium" && "وسط"}
                        {variant.size === "large" && "كبير"}
                      </div>
                      <div className={`font-bold ${isMobile ? "text-sm" : ""}`}>{variant.price} ريال</div>
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/products/edit/${product.id}`)}
                    size={isMobile ? "sm" : "default"}
                  >
                    <Pencil size={16} className="ml-2" />
                    تعديل
                  </Button>
                  <Button 
                    variant="default"
                    size={isMobile ? "sm" : "default"}
                  >
                    إضافة للسلة
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        } else {
          return (
            <Card key={product.id} className="overflow-hidden h-auto">
              <CardHeader className={`${isMobile ? "p-3" : "pb-2"}`}>
                <div className="flex justify-between items-start">
                  <CardTitle className={`flex items-center ${isMobile ? "text-base" : ""}`}>
                    <Package className="ml-2" size={18} />
                    {product.nameAr || product.name}
                  </CardTitle>
                  <Badge>{getCategoryName(product.categoryId)}</Badge>
                </div>
                {product.description && (
                  <CardDescription className={isMobile ? "text-xs" : ""}>
                    {product.descriptionAr || product.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="p-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.nameAr || product.name}
                  className={`w-full ${isMobile ? "h-32" : "h-40"} object-cover`}
                  loading="lazy"
                />
              </CardContent>
              <CardFooter className={`pt-4 flex-col ${isMobile ? "p-3" : ""}`}>
                <div className="w-full text-center p-4 mb-4">
                  <div className={`font-bold ${isMobile ? "text-lg" : "text-xl"}`}>{product.price} ريال</div>
                  <div className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>منتج فردي (بالحبة)</div>
                </div>
                <div className="w-full flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/products/edit/${product.id}`)}
                    size={isMobile ? "sm" : "default"}
                  >
                    <Pencil size={16} className="ml-2" />
                    تعديل
                  </Button>
                  <Button 
                    variant="default"
                    size={isMobile ? "sm" : "default"}
                  >
                    إضافة للسلة
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        }
      })}
    </div>
  );
};

export default ProductsGrid;
