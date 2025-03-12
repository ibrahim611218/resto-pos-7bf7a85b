
import React from "react";
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Trash2 } from "lucide-react";

interface DeleteAllDataCardProps {
  isArabic: boolean;
  onDeleteAction: (type: "products" | "categories" | "inventory" | "invoices" | "customers" | "all") => void;
}

const DeleteAllDataCard: React.FC<DeleteAllDataCardProps> = ({ isArabic, onDeleteAction }) => {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-800 flex items-center gap-2">
          <Database size={20} />
          {isArabic ? "حذف جميع البيانات" : "Delete All Data"}
        </CardTitle>
        <CardDescription className="text-red-700">
          {isArabic 
            ? "سيؤدي هذا الإجراء إلى حذف جميع البيانات في النظام. لا يمكن التراجع عن هذا الإجراء."
            : "This action will delete all data in the system. This action cannot be undone."}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => onDeleteAction("all")}
        >
          <Trash2 className="mr-2" size={16} />
          {isArabic ? "حذف جميع البيانات" : "Delete All Data"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeleteAllDataCard;
