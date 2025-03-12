
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface CartHeaderProps {
  isMobile: boolean;
  expanded: boolean;
  isEmpty: boolean;
  toggleExpand: () => void;
  clearCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({
  isMobile,
  expanded,
  isEmpty,
  toggleExpand,
  clearCart,
}) => {
  const headerClass = isMobile ? "p-1 text-sm" : "p-2";

  return (
    <div className={`${headerClass} flex-shrink-0 flex justify-between items-center border-b`}>
      <h2 className={isMobile ? "text-base font-semibold" : "text-lg font-bold"}>
        السلة
      </h2>
      <div className="flex items-center gap-1">
        {isMobile && (
          <Button 
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={toggleExpand}
          >
            {expanded ? 
              <ChevronRight className="h-4 w-4" /> : 
              <ChevronLeft className="h-4 w-4" />
            }
          </Button>
        )}
        <Button 
          variant="destructive" 
          size={isMobile ? "sm" : "sm"}
          className="h-auto py-1" 
          onClick={clearCart}
          disabled={isEmpty}
          title="مسح السلة"
        >
          <Trash2 className={isMobile ? "h-3.5 w-3.5" : "h-4 w-4"} />
          {!isMobile && <span className="mr-1">مسح</span>}
        </Button>
      </div>
    </div>
  );
};

export default CartHeader;
