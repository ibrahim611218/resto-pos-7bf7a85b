
import React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2 } from "lucide-react";

interface DataTypeCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  deleteButtonText: string;
  onDeleteAction: () => void;
  onNavigate: () => void;
  navigateTitle: string;
}

const DataTypeCard: React.FC<DataTypeCardProps> = ({
  title,
  icon,
  description,
  deleteButtonText,
  onDeleteAction,
  onNavigate,
  navigateTitle
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
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
