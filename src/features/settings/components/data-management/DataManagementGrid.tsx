
import React from "react";
import DataTypeCard from "./DataTypeCard";
import { 
  Receipt, Package2, BarChart4, ShoppingBag, 
  Users, Trash2, CalculatorIcon, ChefHat
} from "lucide-react";

interface DataManagementGridProps {
  isArabic: boolean;
  onDeleteAction: (type: string) => void;
  navigate: (path: string) => void;
}

const DataManagementGrid: React.FC<DataManagementGridProps> = ({ 
  isArabic, 
  onDeleteAction,
  navigate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DataTypeCard
        icon={<ShoppingBag className="h-6 w-6" />}
        title={isArabic ? "المنتجات" : "Products"}
        description={isArabic ? "إدارة وحذف بيانات المنتجات" : "Manage and delete product data"}
        onManage={() => navigate("/products")}
        onDelete={() => onDeleteAction("products")}
        isArabic={isArabic}
      />
      
      <DataTypeCard
        icon={<Package2 className="h-6 w-6" />}
        title={isArabic ? "التصنيفات" : "Categories"}
        description={isArabic ? "إدارة وحذف بيانات التصنيفات" : "Manage and delete category data"}
        onManage={() => navigate("/categories")}
        onDelete={() => onDeleteAction("categories")}
        isArabic={isArabic}
      />
      
      <DataTypeCard
        icon={<BarChart4 className="h-6 w-6" />}
        title={isArabic ? "المخزون" : "Inventory"}
        description={isArabic ? "إدارة وحذف بيانات المخزون" : "Manage and delete inventory data"}
        onManage={() => navigate("/inventory")}
        onDelete={() => onDeleteAction("inventory")}
        isArabic={isArabic}
      />
      
      <DataTypeCard
        icon={<Receipt className="h-6 w-6" />}
        title={isArabic ? "الفواتير" : "Invoices"}
        description={isArabic ? "إدارة وحذف بيانات الفواتير" : "Manage and delete invoice data"}
        onManage={() => navigate("/invoices")}
        onDelete={() => onDeleteAction("invoices")}
        isArabic={isArabic}
      />
      
      <DataTypeCard
        icon={<Users className="h-6 w-6" />}
        title={isArabic ? "العملاء" : "Customers"}
        description={isArabic ? "إدارة وحذف بيانات العملاء" : "Manage and delete customer data"}
        onManage={() => navigate("/customers")}
        onDelete={() => onDeleteAction("customers")}
        isArabic={isArabic}
      />
      
      <DataTypeCard
        icon={<ChefHat className="h-6 w-6" />}
        title={isArabic ? "المطبخ" : "Kitchen"}
        description={isArabic ? "إدارة وحذف بيانات المطبخ" : "Manage and delete kitchen data"}
        onManage={() => navigate("/kitchen")}
        onDelete={() => onDeleteAction("kitchen")}
        isArabic={isArabic}
      />
      
      <DataTypeCard
        icon={<CalculatorIcon className="h-6 w-6" />}
        title={isArabic ? "تقارير الضريبة" : "VAT Reports"}
        description={isArabic ? "إدارة وحذف تقارير ضريبة القيمة المضافة" : "Manage and delete VAT report data"}
        onManage={() => navigate("/vat-report")}
        onDelete={() => onDeleteAction("vat-reports")}
        isArabic={isArabic}
      />
    </div>
  );
};

export default DataManagementGrid;
