
import React from "react";
import { Package, Tag, ShoppingCart, Users } from "lucide-react";
import DataTypeCard from "./DataTypeCard";

interface DataManagementGridProps {
  isArabic: boolean;
  handleDeleteAction: (type: "products" | "categories" | "inventory" | "invoices" | "customers" | "all") => void;
  navigate: (path: string) => void;
}

const DataManagementGrid: React.FC<DataManagementGridProps> = ({ 
  isArabic, 
  handleDeleteAction, 
  navigate 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DataTypeCard
        title={isArabic ? "المنتجات" : "Products"}
        icon={Package}
        deleteButtonText={isArabic ? "حذف جميع المنتجات" : "Delete All Products"}
        onDeleteAction={() => handleDeleteAction("products")}
        onNavigate={() => navigate("/products")}
        navigateTitle={isArabic ? "الذهاب إلى المنتجات" : "Go to Products"}
      />
      
      <DataTypeCard
        title={isArabic ? "التصنيفات" : "Categories"}
        icon={Tag}
        deleteButtonText={isArabic ? "حذف جميع التصنيفات" : "Delete All Categories"}
        onDeleteAction={() => handleDeleteAction("categories")}
        onNavigate={() => navigate("/categories")}
        navigateTitle={isArabic ? "الذهاب إلى التصنيفات" : "Go to Categories"}
      />
      
      <DataTypeCard
        title={isArabic ? "الفواتير" : "Invoices"}
        icon={ShoppingCart}
        deleteButtonText={isArabic ? "حذف جميع الفواتير" : "Delete All Invoices"}
        onDeleteAction={() => handleDeleteAction("invoices")}
        onNavigate={() => navigate("/invoices")}
        navigateTitle={isArabic ? "الذهاب إلى الفواتير" : "Go to Invoices"}
      />
      
      <DataTypeCard
        title={isArabic ? "العملاء" : "Customers"}
        icon={Users}
        deleteButtonText={isArabic ? "حذف جميع العملاء" : "Delete All Customers"}
        onDeleteAction={() => handleDeleteAction("customers")}
        onNavigate={() => navigate("/customers")}
        navigateTitle={isArabic ? "الذهاب إلى العملاء" : "Go to Customers"}
      />
    </div>
  );
};

export default DataManagementGrid;
