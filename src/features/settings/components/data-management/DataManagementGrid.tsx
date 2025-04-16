
import React from "react";
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
  navigate: (path: string) => void;
}

const DataManagementGrid: React.FC<DataManagementGridProps> = ({
  isArabic,
  onDeleteAction,
  navigate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <DataTypeCard
        icon={<PackageOpen size={20} />}
        title={isArabic ? "المنتجات" : "Products"}
        description={
          isArabic
            ? "حذف جميع بيانات المنتجات والمخزون المرتبط بها."
            : "Delete all product data and related inventory."
        }
        deleteButtonText={isArabic ? "حذف المنتجات" : "Delete Products"}
        onDeleteAction={() => onDeleteAction("products")}
        onNavigate={() => navigate("/products")}
        navigateTitle={isArabic ? "عرض المنتجات" : "View Products"}
      />

      <DataTypeCard
        icon={<Layers size={20} />}
        title={isArabic ? "التصنيفات" : "Categories"}
        description={
          isArabic
            ? "حذف جميع التصنيفات المخزنة في النظام."
            : "Delete all categories stored in the system."
        }
        deleteButtonText={isArabic ? "حذف التصنيفات" : "Delete Categories"}
        onDeleteAction={() => onDeleteAction("categories")}
        onNavigate={() => navigate("/categories")}
        navigateTitle={isArabic ? "عرض التصنيفات" : "View Categories"}
      />

      <DataTypeCard
        icon={<Database size={20} />}
        title={isArabic ? "المخزون" : "Inventory"}
        description={
          isArabic
            ? "حذف جميع بيانات المخزون المخزنة في النظام."
            : "Delete all inventory data stored in the system."
        }
        deleteButtonText={isArabic ? "حذف بيانات المخزون" : "Delete Inventory"}
        onDeleteAction={() => onDeleteAction("inventory")}
        onNavigate={() => navigate("/inventory")}
        navigateTitle={isArabic ? "عرض المخزون" : "View Inventory"}
      />

      <DataTypeCard
        icon={<Files size={20} />}
        title={isArabic ? "الفواتير" : "Invoices"}
        description={
          isArabic
            ? "حذف جميع الفواتير وإعادة تعيين أرقام الفواتير."
            : "Delete all invoices and reset invoice numbering."
        }
        deleteButtonText={isArabic ? "حذف الفواتير" : "Delete Invoices"}
        onDeleteAction={() => onDeleteAction("invoices")}
        onNavigate={() => navigate("/invoices")}
        navigateTitle={isArabic ? "عرض الفواتير" : "View Invoices"}
      />

      <DataTypeCard
        icon={<Users size={20} />}
        title={isArabic ? "العملاء" : "Customers"}
        description={
          isArabic
            ? "حذف جميع بيانات العملاء المخزنة في النظام."
            : "Delete all customer data stored in the system."
        }
        deleteButtonText={isArabic ? "حذف بيانات العملاء" : "Delete Customers"}
        onDeleteAction={() => onDeleteAction("customers")}
        onNavigate={() => navigate("/customers")}
        navigateTitle={isArabic ? "عرض العملاء" : "View Customers"}
      />
      
      <DataTypeCard
        icon={<ChefHat size={20} />}
        title={isArabic ? "بيانات المطبخ" : "Kitchen Data"}
        description={
          isArabic
            ? "حذف جميع بيانات المطبخ والطلبات المكتملة."
            : "Delete all kitchen data and completed orders."
        }
        deleteButtonText={isArabic ? "حذف بيانات المطبخ" : "Delete Kitchen Data"}
        onDeleteAction={() => onDeleteAction("kitchen")}
        onNavigate={() => navigate("/kitchen")}
        navigateTitle={isArabic ? "عرض المطبخ" : "View Kitchen"}
      />

      <DeleteAllDataCard isArabic={isArabic} onDeleteAction={onDeleteAction} />
    </div>
  );
};

export default DataManagementGrid;
