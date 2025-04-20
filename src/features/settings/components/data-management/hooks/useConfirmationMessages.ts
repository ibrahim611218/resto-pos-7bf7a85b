
type DataType = "products" | "categories" | "inventory" | "invoices" | "customers" | "all" | "kitchen" | "vat-reports" | "users";

export const useConfirmationMessages = (isArabic: boolean) => {
  const getConfirmationMessage = (actionType: DataType) => {
    switch(actionType) {
      case "products":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع المنتجات؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all products? This action cannot be undone.";
      case "categories":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع التصنيفات؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all categories? This action cannot be undone.";
      case "inventory":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع بيانات المخزون؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all inventory data? This action cannot be undone.";
      case "invoices":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع الفواتير؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all invoices? This action cannot be undone.";
      case "customers":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع العملاء؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all customers? This action cannot be undone.";
      case "kitchen":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع بيانات المطبخ؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all kitchen data? This action cannot be undone.";
      case "vat-reports":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع تقارير ضريبة القيمة المضافة؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all VAT reports? This action cannot be undone.";
      case "users":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع المستخدمين؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all users? This action cannot be undone.";
      case "all":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all data? This action cannot be undone.";
      default:
        return "";
    }
  };

  return { getConfirmationMessage };
};
