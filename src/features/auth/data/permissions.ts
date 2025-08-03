
import { UserPermission } from '../types/authState';

// Define all permissions
export const allPermissions: UserPermission[] = [
  { id: "p1", name: "إدارة المستخدمين", value: "manage_users", description: "إضافة وتعديل وحذف المستخدمين", category: "إدارة المستخدمين", adminOnly: true },
  { id: "p2", name: "إدارة المنتجات", value: "manage_products", description: "إضافة وتعديل وحذف المنتجات", category: "إدارة المنتجات", adminOnly: false, cashierAllowed: false },
  { id: "p3", name: "إدارة المخزون", value: "manage_inventory", description: "إدارة المخزون وحركة البضائع", category: "إدارة المخزون", adminOnly: false, cashierAllowed: false },
  { id: "p4", name: "إصدار فواتير", value: "create_invoices", description: "إنشاء فواتير جديدة", category: "إدارة المبيعات", adminOnly: false, cashierAllowed: true },
  { id: "p5", name: "إلغاء الفواتير", value: "cancel_invoices", description: "إلغاء الفواتير الصادرة", category: "إدارة المبيعات", adminOnly: false, cashierAllowed: false },
  { id: "p6", name: "إرجاع الفواتير", value: "refund_invoices", description: "إرجاع الفواتير واسترداد المبالغ", category: "إدارة المبيعات", adminOnly: false, cashierAllowed: false },
  { id: "p7", name: "عرض التقارير", value: "view_reports", description: "عرض تقارير المبيعات والمخزون", category: "التقارير", adminOnly: false, cashierAllowed: true },
  { id: "p8", name: "إدارة الإعدادات", value: "manage_settings", description: "تعديل إعدادات النظام", category: "إدارة النظام", adminOnly: true, cashierAllowed: false },
  { id: "p9", name: "إدارة المطبخ", value: "manage_kitchen", description: "إدارة طلبات المطبخ", category: "إدارة المطبخ", adminOnly: false, cashierAllowed: false, kitchenAllowed: true },
  { id: "p10", name: "إدارة الطاولات", value: "manage_tables", description: "إدارة الطاولات والحجوزات", category: "إدارة المطعم", adminOnly: false, cashierAllowed: false },
  { id: "p11", name: "إدارة الخصومات", value: "manage_discounts", description: "تطبيق وإلغاء الخصومات", category: "إدارة المبيعات", adminOnly: false, cashierAllowed: false },
  { id: "p12", name: "إدارة العملاء", value: "manage_customers", description: "إدارة بيانات العملاء", category: "إدارة العملاء", adminOnly: false, cashierAllowed: true },
  { id: "p13", name: "إدارة التوصيل", value: "manage_delivery", description: "إدارة طلبات التوصيل", category: "إدارة التوصيل", adminOnly: false, cashierAllowed: false },
  { id: "p14", name: "تصدير البيانات", value: "export_data", description: "تصدير البيانات والتقارير", category: "التقارير", adminOnly: false, cashierAllowed: false },
  { id: "p15", name: "النسخ الاحتياطي", value: "backup_data", description: "إنشاء نسخ احتياطية من البيانات", category: "إدارة النظام", adminOnly: true, cashierAllowed: false },
];

// Convert to string array for easier comparison
export const allPermissionValues = allPermissions.map(p => p.value);

// Default empty permissions map
export const initialPermissionsMap: Record<string, string[]> = {};
