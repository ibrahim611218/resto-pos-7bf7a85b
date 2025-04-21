
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter as DialogFooterUI,
} from "@/components/ui/dialog";

interface ProductsGridProps {
  products: Product[];
  getCategoryName: (categoryId: string) => string;
  isMobile: boolean;
  isArabic: boolean;
  onDeleteProduct?: (id: string) => void;
  onEditProduct?: (id: string) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  getCategoryName, 
  isMobile,
  isArabic,
  onDeleteProduct,
  onEditProduct,
}) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeleteDialogOpen(id);
  };

  const handleConfirmDelete = (id: string) => {
    setDeleteDialogOpen(null);
    if (onDeleteProduct) {
      onDeleteProduct(id);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {products.map((product) => {
        const productCard = (
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
              {/* سعر المنتج */}
              {product.type === "sized" ? (
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
              ) : (
                <div className="w-full text-center p-4 mb-4">
                  <div className={`font-bold ${isMobile ? "text-lg" : "text-xl"}`}>{product.price} ريال</div>
                  <div className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>منتج فردي (بالحبة)</div>
                </div>
              )}
              <div className="w-full flex justify-between gap-2">
                <Button 
                  variant="outline"
                  onClick={onEditProduct ? () => onEditProduct(product.id) : () => navigate(`/products/edit/${product.id}`)}
                  size={isMobile ? "sm" : "default"}
                >
                  <Pencil size={16} className="ml-2" />
                  تعديل
                </Button>
                <Button 
                  variant="destructive"
                  size={isMobile ? "sm" : "default"}
                  onClick={(e) => handleDeleteClick(e, product.id)}
                >
                  <Trash size={16} className="ml-2" />
                  حذف
                </Button>
                <Dialog open={deleteDialogOpen === product.id} onOpenChange={() => setDeleteDialogOpen(null)}>
                  <DialogContent>
                    <DialogTitle>
                      {isArabic ? "تأكيد حذف المنتج" : "Confirm Product Deletion"}
                    </DialogTitle>
                    <div>
                      {isArabic
                        ? "هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن الحذف."
                        : "Are you sure you want to delete this product? This action cannot be undone."}
                    </div>
                    <DialogFooterUI>
                      <Button variant="outline" onClick={() => setDeleteDialogOpen(null)}>
                        {isArabic ? "إلغاء" : "Cancel"}
                      </Button>
                      <Button variant="destructive" onClick={() => handleConfirmDelete(product.id)}>
                        <Trash size={16} className="ml-2" />
                        {isArabic ? "حذف" : "Delete"}
                      </Button>
                    </DialogFooterUI>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
        );
        return productCard;
      })}
    </div>
  );
};

export default ProductsGrid;
