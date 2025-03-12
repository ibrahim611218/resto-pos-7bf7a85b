
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
} from "lucide-react";
import { SidebarLink } from "./types";

export const getSidebarLinks = (): SidebarLink[] => {
  return [
    {
      name: "نقاط البيع",
      name_en: "POS",
      path: "/pos",
      icon: <ShoppingCart size={20} />,
      subMenuItems: [
        {
          name: "نقطة البيع",
          name_en: "Point of Sale",
          path: "/pos",
          icon: <ShoppingCart size={18} />,
        },
        {
          name: "الفواتير",
          name_en: "Invoices",
          path: "/invoices",
          icon: <Receipt size={18} />,
        },
        {
          name: "العملاء",
          name_en: "Customers",
          path: "/customers",
          icon: <Users size={18} />,
        },
      ],
    },
    {
      name: "المطبخ",
      name_en: "Kitchen",
      path: "/kitchen",
      icon: <ChefHat size={20} />,
    },
    {
      name: "الأصناف",
      name_en: "Products",
      path: "/products",
      icon: <Package2 size={20} />,
      subMenuItems: [
        {
          name: "الأصناف",
          name_en: "Products",
          path: "/products",
          icon: <Package2 size={18} />,
        },
        {
          name: "الفئات",
          name_en: "Categories",
          path: "/categories",
          icon: <ListOrdered size={18} />,
        },
      ],
    },
    {
      name: "المخزون",
      name_en: "Inventory",
      path: "/inventory",
      icon: <Store size={20} />,
      subMenuItems: [
        {
          name: "المخزون",
          name_en: "Inventory",
          path: "/inventory",
          icon: <Store size={18} />,
        },
      ],
    },
    {
      name: "التقارير",
      name_en: "Reports",
      path: "/reports/sales",
      icon: <BarChart3 size={20} />,
      subMenuItems: [
        {
          name: "تقارير المبيعات",
          name_en: "Sales Reports",
          path: "/reports/sales",
          icon: <BarChart3 size={18} />,
        },
        {
          name: "تقارير المخزون",
          name_en: "Inventory Reports",
          path: "/reports/inventory",
          icon: <FileText size={18} />,
        },
        {
          name: "تقارير العملاء",
          name_en: "Customer Reports",
          path: "/reports/customers",
          icon: <Users size={18} />,
        },
      ],
    },
    {
      name: "المستخدمين",
      name_en: "Users",
      path: "/users",
      icon: <Users size={20} />,
    },
    {
      name: "الإعدادات",
      name_en: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];
};
