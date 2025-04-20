import { 
  ReceiptText, 
  Users, 
  Box, 
  ShoppingBag, 
  Settings, 
  FileText, 
  BarChart3, 
  ChefHat, 
  ShoppingCart, 
  FileSpreadsheet, 
  Receipt,
  Building
} from "lucide-react";
import { SidebarLink } from "./types";
import { UserRole } from "@/types";

// Function to get sidebar links with proper Arabic labels
export const getSidebarLinks = (): SidebarLink[] => {
  return [
    {
      name: "نقاط البيع",
      name_en: "POS",
      path: "/pos",
      icon: ShoppingCart,
      roles: ["cashier", "supervisor", "admin", "owner"]
    },
    {
      name: "المنتجات",
      name_en: "Products",
      path: "/products",
      icon: ShoppingBag,
      roles: ["supervisor", "admin", "owner"]
    },
    {
      name: "التصنيفات",
      name_en: "Categories",
      path: "/categories",
      icon: Box,
      roles: ["supervisor", "admin", "owner"]
    },
    {
      name: "الفواتير",
      name_en: "Invoices",
      path: "/invoices",
      icon: ReceiptText,
      roles: ["cashier", "supervisor", "admin", "owner"]
    },
    {
      name: "المشتريات",
      name_en: "Purchases",
      path: "/purchases",
      icon: Receipt,
      roles: ["supervisor", "admin", "owner"]
    },
    {
      name: "العملاء",
      name_en: "Customers",
      path: "/customers",
      icon: Users,
      roles: ["cashier", "supervisor", "admin", "owner"]
    },
    {
      name: "المخزون",
      name_en: "Inventory",
      path: "/inventory",
      icon: Box,
      roles: ["supervisor", "admin", "owner"]
    },
    {
      name: "المطبخ",
      name_en: "Kitchen",
      path: "/kitchen",
      icon: ChefHat,
      roles: ["kitchen", "supervisor", "admin", "owner"]
    },
    {
      name: "التقارير",
      name_en: "Reports",
      path: "/reports",
      icon: BarChart3,
      roles: ["supervisor", "admin", "owner"],
      subMenuItems: [
        {
          name: "تقرير المبيعات",
          name_en: "Sales Report",
          path: "/sales-report",
          icon: BarChart3,
          roles: ["supervisor", "admin", "owner"]
        },
        {
          name: "تقرير المخزون",
          name_en: "Inventory Report",
          path: "/inventory-report",
          icon: Box,
          roles: ["supervisor", "admin", "owner"]
        },
        {
          name: "تقرير العملاء",
          name_en: "Customers Report",
          path: "/customers-report",
          icon: Users,
          roles: ["supervisor", "admin", "owner"]
        },
        {
          name: "تقرير ضريبة القيمة المضافة",
          name_en: "VAT Report",
          path: "/vat-report",
          icon: FileSpreadsheet,
          roles: ["supervisor", "admin", "owner"]
        },
      ],
    },
    {
      name: "إدارة الشركات",
      name_en: "Company Management",
      path: "/company-management",
      icon: Building,
      requiredEmail: "eng.ibrahimabdalfatah@gmail.com",
      roles: ["admin", "owner"]
    },
    {
      name: "المستخدمين",
      name_en: "User Management",
      path: "/user-management",
      icon: Users,
      roles: ["admin", "owner"]
    },
    {
      name: "الإعدادات",
      name_en: "Settings",
      path: "/business-settings",
      icon: Settings,
      roles: ["admin", "owner"]
    },
  ];
};
