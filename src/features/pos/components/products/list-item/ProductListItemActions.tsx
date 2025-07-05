
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface ProductListItemActionsProps {
  isProductsPage: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  productId: string;
}

const ProductListItemActions: React.FC<ProductListItemActionsProps> = ({
  isProductsPage,
  onEdit,
  onDelete,
  productId
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
    <div className="action-buttons flex gap-1 ml-2">
      {onEdit && (
        <Button
          variant="outline"
          size="xs"
          onClick={handleEdit}
          className="h-8 w-8 p-0"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="destructive"
          size="xs"
          onClick={handleDelete}
          className="h-8 w-8 p-0"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default ProductListItemActions;
