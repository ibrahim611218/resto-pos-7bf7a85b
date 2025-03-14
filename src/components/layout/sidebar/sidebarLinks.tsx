
import { Home, ReceiptText, Users, Box, ShoppingBag, Settings, FileText, BarChart3, DollarSign, ChefHat, KeySquare } from "lucide-react";
import { SidebarLink } from "./types";

// Function to get sidebar links with proper Arabic labels
export const getSidebarLinks = (): SidebarLink[] => {
  return [
    {
      name: "الرئيسية",
      name_en: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "نقطة البيع",
      name_en: "POS",
      path: "/pos",
      icon: DollarSign,
    },
    {
      name: "المنتجات",
      name_en: "Products",
      path: "/products",
      icon: ShoppingBag,
    },
    {
      name: "التصنيفات",
      name_en: "Categories",
      path: "/categories",
      icon: Box,
    },
    {
      name: "الفواتير",
      name_en: "Invoices",
      path: "/invoices",
      icon: ReceiptText,
      subMenuItems: [
        {
          name: "قائمة الفواتير",
          name_en: "Invoices List",
          path: "/invoices",
          icon: FileText,
        },
        {
          name: "استرجاع فاتورة",
          name_en: "Retrieve Invoice",
          path: "/retrieve-invoice",
          icon: ReceiptText,
        },
      ],
    },
    {
      name: "العملاء",
      name_en: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      name: "المخزون",
      name_en: "Inventory",
      path: "/inventory",
      icon: Box,
    },
    {
      name: "المطبخ",
      name_en: "Kitchen",
      path: "/kitchen",
      icon: ChefHat,
    },
    {
      name: "التقارير",
      name_en: "Reports",
      path: "/reports",
      icon: BarChart3,
      subMenuItems: [
        {
          name: "تقرير المبيعات",
          name_en: "Sales Report",
          path: "/sales-report",
          icon: BarChart3,
        },
        {
          name: "تقرير المخزون",
          name_en: "Inventory Report",
          path: "/inventory-report",
          icon: Box,
        },
        {
          name: "تقرير العملاء",
          name_en: "Customers Report",
          path: "/customers-report",
          icon: Users,
        },
      ],
    },
    {
      name: "المستخدمون",
      name_en: "User Management",
      path: "/user-management",
      icon: Users,
      isAdminOnly: true,
    },
    {
      name: "الإعدادات",
      name_en: "Settings",
      path: "/business-settings",
      icon: Settings,
    },
    {
      name: "مولد التراخيص",
      name_en: "License Generator",
      path: "/license-generator",
      icon: KeySquare,
      isAdminOnly: true,
      requiredEmail: "admin@example.com",
    },
  ];
};
