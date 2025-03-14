
import React, { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sampleProducts, sampleCategories } from "@/data/sampleData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Tag, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Size } from "@/types";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const { isMobile, isTablet, scaleFactor } = useWindowDimensions();

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  // Memoize filtered products to prevent unnecessary re-renders
  const filteredProducts = useMemo(() => {
    return categoryId 
      ? sampleProducts.filter(product => product.categoryId === categoryId)
      : sampleProducts;
  }, [categoryId]);

  const getCategoryName = (categoryId: string) => {
    const category = sampleCategories.find(cat => cat.id === categoryId);
    return category?.nameAr || category?.name || "تصنيف غير معروف";
  };

  // Determine grid columns based on screen size
  const getGridClasses = () => {
    if (isMobile) return "grid-cols-1";
    if (isTablet) return "grid-cols-2";
    if (window.innerWidth < 1280) return "grid-cols-2";
    if (window.innerWidth < 1536) return "grid-cols-3";
    return "grid-cols-3";
  };

  return (
    <div className="container mx-auto p-4 auto-scale-container">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold">الأصناف</h1>
          {categoryId && (
            <p className="text-muted-foreground">
              تصنيف: {getCategoryName(categoryId)}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setSelectedSize(null)} 
            variant={selectedSize === null ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}>
            الكل
          </Button>
          <Button onClick={() => setSelectedSize("small")} 
            variant={selectedSize === "small" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}>
            صغير
          </Button>
          <Button onClick={() => setSelectedSize("medium")} 
            variant={selectedSize === "medium" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}>
            وسط
          </Button>
          <Button onClick={() => setSelectedSize("large")} 
            variant={selectedSize === "large" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}>
            كبير
          </Button>
        </div>
        <Button onClick={() => navigate("/products/add")}
          size={isMobile ? "sm" : "default"}>
          <Plus className="ml-2" size={16} /> إضافة صنف
        </Button>
      </div>

      <div className={`grid ${getGridClasses()} gap-4`}>
        {filteredProducts.map((product) => {
          // For sized products, filter variants by selected size
          if (product.type === "sized") {
            const filteredVariants = selectedSize 
              ? product.variants.filter(v => v.size === selectedSize)
              : product.variants;
            
            if (selectedSize && filteredVariants.length === 0) return null;

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
                    loading="lazy" // Add lazy loading for images
                  />
                </CardContent>
                <CardFooter className={`pt-4 flex-col ${isMobile ? "p-3" : ""}`}>
                  <div className="w-full grid grid-cols-3 gap-2 mb-4">
                    {filteredVariants.map((variant) => (
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
            // For single products (without sizes)
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
    </div>
  );
};

export default Products;
