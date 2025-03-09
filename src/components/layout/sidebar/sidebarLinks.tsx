
import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  BarChart3,
  Settings,
  Plus,
  Clipboard,
  Tags,
  Users,
  FileText,
} from "lucide-react";
import { SidebarLink } from "./types";

export const getSidebarLinks = (): SidebarLink[] => [
  { 
    name: "لوحة التحكم", 
    path: "/", 
    icon: <LayoutDashboard size={20} /> 
  },
  { 
    name: "نقاط البيع", 
    path: "#", 
    icon: <ShoppingCart size={20} />,
    children: [
      { name: "عملية بيع جديدة", path: "/pos", icon: <Plus size={16} /> },
      { name: "الفواتير", path: "/invoices", icon: <FileText size={16} /> },
    ]
  },
  { 
    name: "الأصناف", 
    path: "#", 
    icon: <Package size={20} />,
    children: [
      { name: "قائمة الأصناف", path: "/products", icon: <Clipboard size={16} /> },
      { name: "إضافة صنف", path: "/products/add", icon: <Plus size={16} /> },
      { name: "التصنيفات", path: "/categories", icon: <Tags size={16} /> },
    ]
  },
  { 
    name: "المخزون", 
    path: "#", 
    icon: <Boxes size={20} />,
    children: [
      { name: "حركة المخزون", path: "/inventory", icon: <Package size={16} /> },
      { name: "إضافة مخزون", path: "/inventory/add", icon: <Plus size={16} /> },
    ]
  },
  { 
    name: "التقارير", 
    path: "#", 
    icon: <BarChart3 size={20} />,
    children: [
      { name: "المبيعات", path: "/reports/sales", icon: <BarChart3 size={16} /> },
      { name: "المخزون", path: "/reports/inventory", icon: <Package size={16} /> },
      { name: "العملاء", path: "/reports/customers", icon: <Users size={16} /> },
    ]
  },
  { 
    name: "الإعدادات", 
    path: "/settings", 
    icon: <Settings size={20} /> 
  },
];
