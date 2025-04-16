
import React from "react";
import { Grid } from "@/components/ui/grid";
import DataTypeCard from "./DataTypeCard";
import DeleteAllDataCard from "./DeleteAllDataCard";
import { 
  PackageOpen, 
  Layers, 
  Files, 
  Users, 
  Database,
  ChefHat
} from "lucide-react";

interface DataManagementGridProps {
  isArabic: boolean;
  onDeleteAction: (type: "products" | "categories" | "inventory" | "invoices" | "customers" | "kitchen" | "all") => void;
}

const DataManagementGrid: React.FC<DataManagementGridProps> = ({
  isArabic,
  onDeleteAction,
}) => {
  return (
    <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <DataTypeCard
        icon={<PackageOpen size={20} />}
        title={isArabic ? "المنتجات" : "Products"}
        description={
          isArabic
            ? "حذف جميع بيانات المنتجات والمخزون المرتبط بها."
            : "Delete all product data and related inventory."
        }
        buttonText={isArabic ? "حذف المنتجات" : "Delete Products"}
        onClick={() => onDeleteAction("products")}
        isArabic={isArabic}
      />

      <DataTypeCard
        icon={<Layers size={20} />}
        title={isArabic ? "التصنيفات" : "Categories"}
        description={
          isArabic
            ? "حذف جميع التصنيفات المخزنة في النظام."
            : "Delete all categories stored in the system."
        }
        buttonText={isArabic ? "حذف التصنيفات" : "Delete Categories"}
        onClick={() => onDeleteAction("categories")}
        isArabic={isArabic}
      />

      <DataTypeCard
        icon={<Database size={20} />}
        title={isArabic ? "المخزون" : "Inventory"}
        description={
          isArabic
            ? "حذف جميع بيانات المخزون المخزنة في النظام."
            : "Delete all inventory data stored in the system."
        }
        buttonText={isArabic ? "حذف بيانات المخزون" : "Delete Inventory"}
        onClick={() => onDeleteAction("inventory")}
        isArabic={isArabic}
      />

      <DataTypeCard
        icon={<Files size={20} />}
        title={isArabic ? "الفواتير" : "Invoices"}
        description={
          isArabic
            ? "حذف جميع الفواتير وإعادة تعيين أرقام الفواتير."
            : "Delete all invoices and reset invoice numbering."
        }
        buttonText={isArabic ? "حذف الفواتير" : "Delete Invoices"}
        onClick={() => onDeleteAction("invoices")}
        isArabic={isArabic}
      />

      <DataTypeCard
        icon={<Users size={20} />}
        title={isArabic ? "العملاء" : "Customers"}
        description={
          isArabic
            ? "حذف جميع بيانات العملاء المخزنة في النظام."
            : "Delete all customer data stored in the system."
        }
        buttonText={isArabic ? "حذف بيانات العملاء" : "Delete Customers"}
        onClick={() => onDeleteAction("customers")}
        isArabic={isArabic}
      />
      
      <DataTypeCard
        icon={<ChefHat size={20} />}
        title={isArabic ? "بيانات المطبخ" : "Kitchen Data"}
        description={
          isArabic
            ? "حذف جميع بيانات المطبخ والطلبات المكتملة."
            : "Delete all kitchen data and completed orders."
        }
        buttonText={isArabic ? "حذف بيانات المطبخ" : "Delete Kitchen Data"}
        onClick={() => onDeleteAction("kitchen")}
        isArabic={isArabic}
      />

      <DeleteAllDataCard isArabic={isArabic} onDeleteAction={onDeleteAction} />
    </Grid>
  );
};

export default DataManagementGrid;
