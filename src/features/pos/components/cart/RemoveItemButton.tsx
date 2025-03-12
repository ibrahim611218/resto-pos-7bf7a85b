
import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RemoveItemButtonProps {
  onRemove: () => void;
}

const RemoveItemButton: React.FC<RemoveItemButtonProps> = ({ onRemove }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 rounded-full hover:bg-destructive hover:text-white text-destructive/70 transition-colors"
      onClick={onRemove}
    >
      <Trash2 className="h-3 w-3" />
    </Button>
  );
};

export default RemoveItemButton;
