
import { UserPermission } from '../types/auth';

// Define all permissions
export const allPermissions: UserPermission[] = [
  { id: "p1", name: "إدارة المستخدمين", value: "manage_users", description: "إضافة وتعديل وحذف المستخدمين" },
  { id: "p2", name: "إدارة المنتجات", value: "manage_products", description: "إضافة وتعديل وحذف المنتجات" },
  { id: "p3", name: "إدارة المخزون", value: "manage_inventory", description: "إدارة المخزون وحركة البضائع" },
  { id: "p4", name: "إصدار فواتير", value: "create_invoices", description: "إنشاء فواتير جديدة" },
  { id: "p5", name: "إلغاء الفواتير", value: "cancel_invoices", description: "إلغاء الفواتير الصادرة" },
  { id: "p6", name: "إرجاع الفواتير", value: "refund_invoices", description: "إرجاع الفواتير واسترداد المبالغ" },
  { id: "p7", name: "عرض التقارير", value: "view_reports", description: "عرض تقارير المبيعات والمخزون" },
  { id: "p8", name: "إدارة الإعدادات", value: "manage_settings", description: "تعديل إعدادات النظام" },
  { id: "p9", name: "إدارة المطبخ", value: "manage_kitchen", description: "إدارة طلبات المطبخ" },
];

// Default empty permissions map
export const initialPermissionsMap: Record<string, string[]> = {};
