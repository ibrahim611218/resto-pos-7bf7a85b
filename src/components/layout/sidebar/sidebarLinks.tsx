
import { Home, ReceiptText, Users, Box, ShoppingBag, Settings, FileText, BarChart3, DollarSign, ChefHat, KeySquare } from "lucide-react";
import { SidebarLink } from "./types";

// Function to get sidebar links with proper Arabic labels
export const getSidebarLinks = (): SidebarLink[] => {
  return [
    {
      name: "الرئيسية",
      path: "/",
      icon: Home,
    },
    {
      name: "نقطة البيع",
      path: "/pos",
      icon: DollarSign,
    },
    {
      name: "المنتجات",
      path: "/products",
      icon: ShoppingBag,
    },
    {
      name: "التصنيفات",
      path: "/categories",
      icon: Box,
    },
    {
      name: "الفواتير",
      path: "/invoices",
      icon: ReceiptText,
      subMenuItems: [
        {
          name: "قائمة الفواتير",
          path: "/invoices",
          icon: FileText,
        },
        {
          name: "استرجاع فاتورة",
          path: "/retrieve-invoice",
          icon: ReceiptText,
        },
      ],
    },
    {
      name: "العملاء",
      path: "/customers",
      icon: Users,
    },
    {
      name: "المخزون",
      path: "/inventory",
      icon: Box,
    },
    {
      name: "المطبخ",
      path: "/kitchen",
      icon: ChefHat,
    },
    {
      name: "التقارير",
      path: "/reports",
      icon: BarChart3,
      subMenuItems: [
        {
          name: "تقرير المبيعات",
          path: "/sales-report",
          icon: BarChart3,
        },
        {
          name: "تقرير المخزون",
          path: "/inventory-report",
          icon: Box,
        },
        {
          name: "تقرير العملاء",
          path: "/customers-report",
          icon: Users,
        },
      ],
    },
    {
      name: "المستخدمون",
      path: "/user-management",
      icon: Users,
      isAdminOnly: true,
    },
    {
      name: "الإعدادات",
      path: "/business-settings",
      icon: Settings,
    },
    {
      name: "مولد التراخيص",
      path: "/license-generator",
      icon: KeySquare,
      isAdminOnly: true,
      requiredEmail: "admin@example.com",
    },
  ];
};
