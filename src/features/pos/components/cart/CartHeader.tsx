
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartHeaderProps {
  isMobile: boolean;
  expanded: boolean;
  isEmpty: boolean;
  toggleExpand: () => void;
  clearCart: () => void;
  isArabic: boolean;
  className?: string;
}

const CartHeader: React.FC<CartHeaderProps> = ({
  isMobile,
  expanded,
  isEmpty,
  toggleExpand,
  clearCart,
  isArabic,
  className,
}) => {
  const headerClass = isMobile ? "p-1 text-sm" : "p-2";

  return (
    <div className={cn(`${headerClass} flex-shrink-0 flex justify-between items-center border-b`, className)}>
      <h2 className={isMobile ? "text-base font-semibold" : "text-lg font-bold"}>
        {isArabic ? "السلة" : "Cart"}
      </h2>
      <div className="flex items-center gap-1">
        {isMobile && (
          <Button 
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={toggleExpand}
          >
            {isArabic ? 
              (expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />) : 
              (expanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />)
            }
          </Button>
        )}
        <Button 
          variant="destructive" 
          size={isMobile ? "sm" : "sm"}
          className="h-auto py-1" 
          onClick={clearCart}
          disabled={isEmpty}
          title={isArabic ? "مسح السلة" : "Clear cart"}
        >
          <Trash2 className={isMobile ? "h-3.5 w-3.5" : "h-4 w-4"} />
          {!isMobile && <span className={isArabic ? "mr-1" : "ml-1"}>{isArabic ? "مسح" : "Clear"}</span>}
        </Button>
      </div>
    </div>
  );
};

export default CartHeader;
