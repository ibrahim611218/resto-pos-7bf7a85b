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
} from "lucide-react";
import { SidebarLink } from "./types";

export const getSidebarLinks = (): SidebarLink[] => {
  return [
    {
      name: "لوحة التحكم",
      name_en: "",
      path: "/",
      icon: <Home size={20} />,
    },
    {
      name: "نقاط البيع",
      name_en: "",
      path: "/pos",
      icon: <ShoppingCart size={20} />,
      subMenuItems: [
        {
          name: "نقطة البيع",
          name_en: "",
          path: "/pos",
          icon: <ShoppingCart size={18} />,
        },
        {
          name: "استرجاع الفاتورة",
          name_en: "",
          path: "/retrieve-invoice",
          icon: <FileSearch size={18} />,
        },
        {
          name: "الفواتير",
          name_en: "",
          path: "/invoices",
          icon: <Receipt size={18} />,
        },
        {
          name: "العملاء",
          name_en: "",
          path: "/customers",
          icon: <Users size={18} />,
        },
      ],
    },
    {
      name: "المطبخ",
      name_en: "",
      path: "/kitchen",
      icon: <ChefHat size={20} />,
    },
    {
      name: "الأصناف",
      name_en: "",
      path: "/products",
      icon: <Package2 size={20} />,
      subMenuItems: [
        {
          name: "الأصناف",
          name_en: "",
          path: "/products",
          icon: <Package2 size={18} />,
        },
        {
          name: "الفئات",
          name_en: "",
          path: "/categories",
          icon: <ListOrdered size={18} />,
        },
      ],
    },
    {
      name: "المخزون",
      name_en: "",
      path: "/inventory",
      icon: <Store size={20} />,
      subMenuItems: [
        {
          name: "المخزون",
          name_en: "",
          path: "/inventory",
          icon: <Store size={18} />,
        },
      ],
    },
    {
      name: "التقارير",
      name_en: "",
      path: "/reports/sales",
      icon: <BarChart3 size={20} />,
      subMenuItems: [
        {
          name: "تقارير المبيعات",
          name_en: "",
          path: "/reports/sales",
          icon: <BarChart3 size={18} />,
        },
        {
          name: "تقارير المخزون",
          name_en: "",
          path: "/reports/inventory",
          icon: <FileText size={18} />,
        },
        {
          name: "تقارير العملاء",
          name_en: "",
          path: "/reports/customers",
          icon: <Users size={18} />,
        },
      ],
    },
    {
      name: "المستخدمين",
      name_en: "",
      path: "/users",
      icon: <Users size={20} />,
    },
    {
      name: "نسخة الويندوز",
      name_en: "Windows Version",
      path: "#desktop-export",
      icon: <Download size={20} />,
      isAction: true,
      action: "desktop-export",
    },
    {
      name: "الإعدادات",
      name_en: "",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];
};
