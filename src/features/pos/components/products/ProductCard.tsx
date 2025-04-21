
import React, { useState } from "react";
import { Product } from "@/types";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Package } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

interface ProductCardProps {
  product: Product;
  viewMode: ViewMode;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  viewMode,
  onEdit,
  onDelete
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false);
    if (onDelete) onDelete();
  };

  return (
    <>
      <Card className={`overflow-hidden h-full ${viewMode === "list" ? "flex flex-row" : ""}`}>
        <div className={viewMode === "list" ? "w-24 h-24 flex-shrink-0" : ""}>
          {product.image && (
            <img
              src={product.image}
              alt={product.nameAr || product.name}
              className={`
                ${viewMode === "list" ? "w-full h-full object-cover" : "w-full h-40 object-cover"}
              `}
            />
          )}
        </div>
        
        <div className="flex flex-col flex-grow">
          <CardHeader className="p-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <Package size={18} />
                <span>{isArabic && product.nameAr ? product.nameAr : product.name}</span>
              </div>
              {product.categoryId && <Badge>{product.categoryId}</Badge>}
            </div>
            {(product.description || product.descriptionAr) && (
              <p className="text-sm text-muted-foreground">
                {isArabic && product.descriptionAr ? product.descriptionAr : product.description}
              </p>
            )}
          </CardHeader>
          
          <CardContent className="p-3 pt-0">
            {product.type === "sized" ? (
              <div className="grid grid-cols-3 gap-2">
                {product.variants && product.variants.map(variant => (
                  <div key={variant.id} className="text-center p-2 border rounded">
                    <div className="text-xs">{variant.size}</div>
                    <div className="font-bold">{variant.price} SAR</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center font-bold">
                {product.price} SAR
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-3 pt-0 flex justify-between gap-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit size={16} className={isArabic ? "ml-2" : "mr-2"} />
                {isArabic ? "تعديل" : "Edit"}
              </Button>
            )}
            
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={handleDeleteClick}>
                <Trash size={16} className={isArabic ? "ml-2" : "mr-2"} />
                {isArabic ? "حذف" : "Delete"}
              </Button>
            )}
          </CardFooter>
        </div>
      </Card>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isArabic ? "تأكيد حذف المنتج" : "Confirm Product Deletion"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isArabic 
                ? "هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء." 
                : "Are you sure you want to delete this product? This action cannot be undone."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {isArabic ? "إلغاء" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isArabic ? "حذف" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
