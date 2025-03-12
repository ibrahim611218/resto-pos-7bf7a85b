
import React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2 } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DataTypeCardProps {
  title: string;
  icon: LucideIcon;
  deleteButtonText: string;
  onDeleteAction: () => void;
  onNavigate: () => void;
  navigateTitle: string;
}

const DataTypeCard: React.FC<DataTypeCardProps> = ({
  title,
  icon: Icon,
  deleteButtonText,
  onDeleteAction,
  onNavigate,
  navigateTitle
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon size={20} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={onDeleteAction}
        >
          <Trash2 className="mr-2" size={16} />
          {deleteButtonText}
        </Button>
        <Button 
          variant="outline"
          size="icon"
          onClick={onNavigate}
          title={navigateTitle}
        >
          <ArrowRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataTypeCard;
