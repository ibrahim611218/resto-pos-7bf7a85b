
import { UserPermission } from '../types/auth';

// Define all permissions
export const allPermissions: UserPermission[] = [
  { id: "p1", name: "إدارة المستخدمين", value: "manage_users", description: "إضافة وتعديل وحذف المستخدمين", adminOnly: true },
  { id: "p2", name: "إدارة المنتجات", value: "manage_products", description: "إضافة وتعديل وحذف المنتجات", adminOnly: false, cashierAllowed: false },
  { id: "p3", name: "إدارة المخزون", value: "manage_inventory", description: "إدارة المخزون وحركة البضائع", adminOnly: false, cashierAllowed: false },
  { id: "p4", name: "إصدار فواتير", value: "create_invoices", description: "إنشاء فواتير جديدة", adminOnly: false, cashierAllowed: true },
  { id: "p5", name: "إلغاء الفواتير", value: "cancel_invoices", description: "إلغاء الفواتير الصادرة", adminOnly: false, cashierAllowed: false },
  { id: "p6", name: "إرجاع الفواتير", value: "refund_invoices", description: "إرجاع الفواتير واسترداد المبالغ", adminOnly: false, cashierAllowed: false },
  { id: "p7", name: "عرض التقارير", value: "view_reports", description: "عرض تقارير المبيعات والمخزون", adminOnly: false, cashierAllowed: true },
  { id: "p8", name: "إدارة الإعدادات", value: "manage_settings", description: "تعديل إعدادات النظام", adminOnly: true, cashierAllowed: false },
  { id: "p9", name: "إدارة المطبخ", value: "manage_kitchen", description: "إدارة طلبات المطبخ", adminOnly: false, cashierAllowed: false, kitchenAllowed: true },
];

// Convert to string array for easier comparison
export const allPermissionValues = allPermissions.map(p => p.value);

// Default empty permissions map
export const initialPermissionsMap: Record<string, string[]> = {};
