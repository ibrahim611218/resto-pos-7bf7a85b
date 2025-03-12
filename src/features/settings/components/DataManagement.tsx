
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Trash2, Package, Tag, ShoppingCart, Users, Database, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DataManagement: React.FC = () => {
  const { language } = useLanguage();
  const { user, hasPermission } = useAuth();
  const isArabic = language === "ar";
  const navigate = useNavigate();
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<"products" | "categories" | "inventory" | "invoices" | "customers" | "all">("all");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isAdmin = user?.role === "admin" || user?.role === "manager";
  
  if (!isAdmin) {
    return (
      <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200 text-yellow-800">
        {isArabic ? "غير مصرح لك بالوصول إلى هذه الصفحة" : "You are not authorized to access this page"}
      </div>
    );
  }
  
  const handleDeleteAction = (type: "products" | "categories" | "inventory" | "invoices" | "customers" | "all") => {
    setActionType(type);
    setShowConfirmDialog(true);
  };
  
  const confirmDelete = async () => {
    setIsDeleting(true);
    
    try {
      // Simulate API calls with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let successMessage = "";
      let redirectPath = null;
      
      switch(actionType) {
        case "products":
          // Logic to delete all products would go here
          // Example: await deleteAllProducts();
          successMessage = isArabic ? "تم حذف جميع المنتجات بنجاح" : "All products have been deleted successfully";
          redirectPath = "/products";
          break;
        case "categories":
          // Logic to delete all categories would go here
          // Example: await deleteAllCategories();
          successMessage = isArabic ? "تم حذف جميع التصنيفات بنجاح" : "All categories have been deleted successfully";
          redirectPath = "/categories";
          break;
        case "inventory":
          // Logic to delete all inventory data would go here
          // Example: await deleteAllInventory();
          successMessage = isArabic ? "تم حذف جميع بيانات المخزون بنجاح" : "All inventory data has been deleted successfully";
          redirectPath = "/inventory";
          break;
        case "invoices":
          // Logic to delete all invoices would go here
          // Example: await deleteAllInvoices();
          successMessage = isArabic ? "تم حذف جميع الفواتير بنجاح" : "All invoices have been deleted successfully";
          redirectPath = "/invoices";
          break;
        case "customers":
          // Logic to delete all customers would go here
          // Example: await deleteAllCustomers();
          successMessage = isArabic ? "تم حذف جميع العملاء بنجاح" : "All customers have been deleted successfully";
          redirectPath = "/customers";
          break;
        case "all":
          // Logic to delete all data would go here
          // Example: await deleteAllData();
          successMessage = isArabic ? "تم حذف جميع البيانات بنجاح" : "All data has been deleted successfully";
          break;
      }
      
      toast({
        title: isArabic ? "تم الحذف بنجاح" : "Deleted Successfully",
        description: successMessage,
      });
      
      // Redirect to relevant page if specified
      if (redirectPath) {
        setTimeout(() => {
          navigate(redirectPath);
        }, 1500);
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
      toast({
        variant: "destructive",
        title: isArabic ? "فشل في الحذف" : "Delete Failed",
        description: isArabic ? "حدث خطأ أثناء عملية الحذف" : "An error occurred during deletion",
      });
    } finally {
      setIsDeleting(false);
      setShowConfirmDialog(false);
    }
  };
  
  const getConfirmationMessage = () => {
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
      case "all":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all data? This action cannot be undone.";
      default:
        return "";
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <Database size={20} />
            {isArabic ? "حذف جميع البيانات" : "Delete All Data"}
          </CardTitle>
          <CardDescription className="text-red-700">
            {isArabic 
              ? "سيؤدي هذا الإجراء إلى حذف جميع البيانات في النظام. لا يمكن التراجع عن هذا الإجراء."
              : "This action will delete all data in the system. This action cannot be undone."}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => handleDeleteAction("all")}
          >
            <Trash2 className="mr-2" size={16} />
            {isArabic ? "حذف جميع البيانات" : "Delete All Data"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package size={20} />
              {isArabic ? "المنتجات" : "Products"}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex gap-2">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => handleDeleteAction("products")}
            >
              <Trash2 className="mr-2" size={16} />
              {isArabic ? "حذف جميع المنتجات" : "Delete All Products"}
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => navigate("/products")}
              title={isArabic ? "الذهاب إلى المنتجات" : "Go to Products"}
            >
              <ArrowRight size={16} />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag size={20} />
              {isArabic ? "التصنيفات" : "Categories"}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex gap-2">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => handleDeleteAction("categories")}
            >
              <Trash2 className="mr-2" size={16} />
              {isArabic ? "حذف جميع التصنيفات" : "Delete All Categories"}
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => navigate("/categories")}
              title={isArabic ? "الذهاب إلى التصنيفات" : "Go to Categories"}
            >
              <ArrowRight size={16} />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart size={20} />
              {isArabic ? "الفواتير" : "Invoices"}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex gap-2">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => handleDeleteAction("invoices")}
            >
              <Trash2 className="mr-2" size={16} />
              {isArabic ? "حذف جميع الفواتير" : "Delete All Invoices"}
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => navigate("/invoices")}
              title={isArabic ? "الذهاب إلى الفواتير" : "Go to Invoices"}
            >
              <ArrowRight size={16} />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              {isArabic ? "العملاء" : "Customers"}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex gap-2">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => handleDeleteAction("customers")}
            >
              <Trash2 className="mr-2" size={16} />
              {isArabic ? "حذف جميع العملاء" : "Delete All Customers"}
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => navigate("/customers")}
              title={isArabic ? "الذهاب إلى العملاء" : "Go to Customers"}
            >
              <ArrowRight size={16} />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isArabic ? "تأكيد الحذف" : "Confirm Deletion"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {getConfirmationMessage()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {isArabic ? "إلغاء" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-destructive text-destructive-foreground"
              disabled={isDeleting}
            >
              {isDeleting ? 
                (isArabic ? "جاري الحذف..." : "Deleting...") : 
                (isArabic ? "نعم، قم بالحذف" : "Yes, Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataManagement;
