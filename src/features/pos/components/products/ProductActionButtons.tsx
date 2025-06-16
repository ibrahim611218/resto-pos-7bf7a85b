
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface ProductActionButtonsProps {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  productId: string;
  isProductsPage: boolean;
}

const ProductActionButtons: React.FC<ProductActionButtonsProps> = ({ 
  onEdit, 
  onDelete, 
  productId,
  isProductsPage 
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(productId);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(productId);
    }
  };

  if (!isProductsPage || (!onEdit && !onDelete)) {
    return null;
  }

  return (
    <div className="action-buttons absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 z-10">
      {onEdit && (
        <Button
          variant="secondary"
          size="xs"
          onClick={handleEdit}
          className="h-6 w-6 p-0 bg-white/90 hover:bg-white shadow-sm"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="destructive"
          size="xs"
          onClick={handleDelete}
          className="h-6 w-6 p-0 bg-red-500/90 hover:bg-red-600 text-white shadow-sm"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default ProductActionButtons;
