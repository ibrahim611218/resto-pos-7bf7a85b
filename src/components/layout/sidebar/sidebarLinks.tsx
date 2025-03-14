
import {
  Package2,
  Utensils,
  ListOrdered,
  Receipt,
  BarChart3,
  Settings,
  Users,
  FileText,
  ShoppingCart,
  ChefHat,
  Store,
  FileSearch,
  Home,
  Download,
  Key
} from "lucide-react";
import { SidebarLink } from "./types";

export const getSidebarLinks = (): SidebarLink[] => {
  return [
    {
      name: "لوحة التحكم",
      name_en: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      name: "نقاط البيع",
      name_en: "POS",
      path: "/pos",
      icon: ShoppingCart,
      subMenuItems: [
        {
          name: "نقطة البيع",
          name_en: "Point of Sale",
          path: "/pos",
          icon: ShoppingCart,
        },
        {
          name: "استرجاع الفاتورة",
          name_en: "Retrieve Invoice",
          path: "/retrieve-invoice",
          icon: FileSearch,
        },
        {
          name: "الفواتير",
          name_en: "Invoices",
          path: "/invoices",
          icon: Receipt,
        },
        {
          name: "العملاء",
          name_en: "Customers",
          path: "/customers",
          icon: Users,
        },
      ],
    },
    {
      name: "المطبخ",
      name_en: "Kitchen",
      path: "/kitchen",
      icon: ChefHat,
    },
    {
      name: "الأصناف",
      name_en: "Products",
      path: "/products",
      icon: Package2,
      subMenuItems: [
        {
          name: "الأصناف",
          name_en: "Products",
          path: "/products",
          icon: Package2,
        },
        {
          name: "الفئات",
          name_en: "Categories",
          path: "/categories",
          icon: ListOrdered,
        },
      ],
    },
    {
      name: "المخزون",
      name_en: "Inventory",
      path: "/inventory",
      icon: Store,
      subMenuItems: [
        {
          name: "المخزون",
          name_en: "Inventory",
          path: "/inventory",
          icon: Store,
        },
      ],
    },
    {
      name: "التقارير",
      name_en: "Reports",
      path: "/reports/sales",
      icon: BarChart3,
      subMenuItems: [
        {
          name: "تقارير المبيعات",
          name_en: "Sales Reports",
          path: "/reports/sales",
          icon: BarChart3,
        },
        {
          name: "تقارير المخزون",
          name_en: "Inventory Reports",
          path: "/reports/inventory",
          icon: FileText,
        },
        {
          name: "تقارير العملاء",
          name_en: "Customer Reports",
          path: "/reports/customers",
          icon: Users,
        },
      ],
    },
    {
      name: "المستخدمين",
      name_en: "Users",
      path: "/users",
      icon: Users,
    },
    {
      name: "نسخة الويندوز",
      name_en: "Windows Version",
      path: "#",
      icon: Download,
      isAction: true,
      action: "desktop-export",
    },
    {
      name: "الإعدادات",
      name_en: "Settings",
      path: "/settings",
      icon: Settings,
    },
    {
      name: "إدارة التراخيص",
      name_en: "License Manager",
      path: "/license-generator",
      icon: Key,
      isAdminOnly: true,
      requiredEmail: "eng.ibrahimabdalfatah@gmail.com"
    },
  ];
};
