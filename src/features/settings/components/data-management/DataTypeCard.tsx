
import React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2 } from "lucide-react";

interface DataTypeCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onManage: () => void;
  onDelete: () => void;
  isArabic: boolean;
}

const DataTypeCard: React.FC<DataTypeCardProps> = ({
  title,
  icon,
  description,
  onManage,
  onDelete,
  isArabic
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
          onClick={onDelete}
        >
          <Trash2 className="mr-2" size={16} />
          {isArabic ? "حذف البيانات" : "Delete Data"}
        </Button>
        <Button 
          variant="outline"
          size="icon"
          onClick={onManage}
          title={isArabic ? "الإدارة" : "Manage"}
        >
          <ArrowRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataTypeCard;
