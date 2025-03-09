
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sampleProducts, sampleCategories } from "@/data/sampleData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Tag, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Size } from "@/types";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const filteredProducts = categoryId 
    ? sampleProducts.filter(product => product.categoryId === categoryId)
    : sampleProducts;

  const getCategoryName = (categoryId: string) => {
    const category = sampleCategories.find(cat => cat.id === categoryId);
    return category?.nameAr || category?.name || "تصنيف غير معروف";
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">الأصناف</h1>
          {categoryId && (
            <p className="text-muted-foreground">
              تصنيف: {getCategoryName(categoryId)}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setSelectedSize(null)} 
            variant={selectedSize === null ? "default" : "outline"}>
            الكل
          </Button>
          <Button onClick={() => setSelectedSize("small")} 
            variant={selectedSize === "small" ? "default" : "outline"}>
            صغير
          </Button>
          <Button onClick={() => setSelectedSize("medium")} 
            variant={selectedSize === "medium" ? "default" : "outline"}>
            وسط
          </Button>
          <Button onClick={() => setSelectedSize("large")} 
            variant={selectedSize === "large" ? "default" : "outline"}>
            كبير
          </Button>
        </div>
        <Button onClick={() => navigate("/products/add")}>
          <Plus className="ml-2" size={16} /> إضافة صنف
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          // For sized products, filter variants by selected size
          if (product.type === "sized") {
            const filteredVariants = selectedSize 
              ? product.variants.filter(v => v.size === selectedSize)
              : product.variants;
            
            if (selectedSize && filteredVariants.length === 0) return null;

            return (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center">
                      <Package className="ml-2" size={18} />
                      {product.nameAr || product.name}
                    </CardTitle>
                    <Badge>{getCategoryName(product.categoryId)}</Badge>
                  </div>
                  {product.description && (
                    <CardDescription>
                      {product.descriptionAr || product.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.nameAr || product.name}
                    className="w-full h-40 object-cover"
                  />
                </CardContent>
                <CardFooter className="pt-4 flex-col">
                  <div className="w-full grid grid-cols-3 gap-2 mb-4">
                    {filteredVariants.map((variant) => (
                      <div key={variant.id} className="border rounded p-2 text-center">
                        <div className="text-sm font-medium">
                          {variant.size === "small" && "صغير"}
                          {variant.size === "medium" && "وسط"}
                          {variant.size === "large" && "كبير"}
                        </div>
                        <div className="font-bold">{variant.price} ريال</div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                    >
                      <Pencil size={16} className="ml-2" />
                      تعديل
                    </Button>
                    <Button variant="default">إضافة للسلة</Button>
                  </div>
                </CardFooter>
              </Card>
            );
          } else {
            // For single products (without sizes)
            return (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center">
                      <Package className="ml-2" size={18} />
                      {product.nameAr || product.name}
                    </CardTitle>
                    <Badge>{getCategoryName(product.categoryId)}</Badge>
                  </div>
                  {product.description && (
                    <CardDescription>
                      {product.descriptionAr || product.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.nameAr || product.name}
                    className="w-full h-40 object-cover"
                  />
                </CardContent>
                <CardFooter className="pt-4 flex-col">
                  <div className="w-full text-center p-4 mb-4">
                    <div className="font-bold text-xl">{product.price} ريال</div>
                    <div className="text-sm text-muted-foreground">منتج فردي (بالحبة)</div>
                  </div>
                  <div className="w-full flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                    >
                      <Pencil size={16} className="ml-2" />
                      تعديل
                    </Button>
                    <Button variant="default">إضافة للسلة</Button>
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
