
import React from "react";
import DataTypeCard from "./DataTypeCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  ShoppingCart,
  Package2,
  FolderTree,
  FileText,
  Receipt,
  ChefHat,
  Calculator
} from "lucide-react";

interface DataManagementGridProps {
  isArabic: boolean;
  onDeleteAction: (type: "products" | "categories" | "inventory" | "invoices" | "customers" | "all" | "kitchen" | "vat-reports" | "users") => void;
  navigate: (path: string) => void;
}

const DataManagementGrid: React.FC<DataManagementGridProps> = ({
  isArabic,
  onDeleteAction,
  navigate
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <DataTypeCard
            title={isArabic ? "المنتجات" : "Products"}
            description={isArabic ? "حذف جميع المنتجات" : "Delete all products"}
            icon={<Package2 size={20} />}
            onDelete={() => onDeleteAction("products")}
            onManage={() => navigate("/products")}
            isArabic={isArabic}
          />
          <DataTypeCard
            title={isArabic ? "التصنيفات" : "Categories"}
            description={isArabic ? "حذف جميع التصنيفات" : "Delete all categories"}
            icon={<FolderTree size={20} />}
            onDelete={() => onDeleteAction("categories")}
            onManage={() => navigate("/categories")}
            isArabic={isArabic}
          />
          <DataTypeCard
            title={isArabic ? "المخزون" : "Inventory"}
            description={isArabic ? "حذف جميع بيانات المخزون" : "Delete all inventory data"}
            icon={<ShoppingCart size={20} />}
            onDelete={() => onDeleteAction("inventory")}
            onManage={() => navigate("/inventory")}
            isArabic={isArabic}
          />
          <DataTypeCard
            title={isArabic ? "الفواتير" : "Invoices"}
            description={isArabic ? "حذف جميع الفواتير" : "Delete all invoices"}
            icon={<Receipt size={20} />}
            onDelete={() => onDeleteAction("invoices")}
            onManage={() => navigate("/invoices")}
            isArabic={isArabic}
          />
          <DataTypeCard
            title={isArabic ? "العملاء" : "Customers"}
            description={isArabic ? "حذف جميع العملاء" : "Delete all customers"}
            icon={<Users size={20} />}
            onDelete={() => onDeleteAction("customers")}
            onManage={() => navigate("/customers")}
            isArabic={isArabic}
          />
          <DataTypeCard
            title={isArabic ? "المستخدمين" : "Users"}
            description={isArabic ? "حذف جميع المستخدمين" : "Delete all users"}
            icon={<Users size={20} />}
            onDelete={() => onDeleteAction("users")}
            onManage={() => navigate("/user-management")}
            isArabic={isArabic}
          />
          <DataTypeCard
            title={isArabic ? "المطبخ" : "Kitchen"}
            description={isArabic ? "حذف جميع بيانات المطبخ" : "Delete all kitchen data"}
            icon={<ChefHat size={20} />}
            onDelete={() => onDeleteAction("kitchen")}
            onManage={() => navigate("/kitchen")}
            isArabic={isArabic}
          />
          <DataTypeCard
            title={isArabic ? "تقارير ضريبة القيمة المضافة" : "VAT Reports"}
            description={isArabic ? "حذف جميع تقارير الضريبة" : "Delete all VAT reports"}
            icon={<Calculator size={20} />}
            onDelete={() => onDeleteAction("vat-reports")}
            onManage={() => navigate("/vat-report")}
            isArabic={isArabic}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagementGrid;
