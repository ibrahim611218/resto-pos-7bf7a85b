
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface IndexProps {
  language?: string;
}

const Index: React.FC<IndexProps> = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { user } = useAuth();

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-6">{isArabic ? "لوحة التحكم" : "Dashboard"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* POS Card */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">{isArabic ? "نقطة البيع" : "Point of Sale"}</h2>
          <p className="text-muted-foreground mb-4">
            {isArabic ? "إدارة المبيعات وإنشاء الفواتير" : "Manage sales and create invoices"}
          </p>
          <Button asChild className="w-full">
            <Link to="/pos">{isArabic ? "فتح نقطة البيع" : "Open POS"}</Link>
          </Button>
        </Card>

        {/* Invoices Card */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">{isArabic ? "الفواتير" : "Invoices"}</h2>
          <p className="text-muted-foreground mb-4">
            {isArabic ? "عرض وإدارة الفواتير" : "View and manage invoices"}
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link to="/invoices">{isArabic ? "عرض الفواتير" : "View Invoices"}</Link>
          </Button>
        </Card>

        {/* Kitchen Card */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">{isArabic ? "المطبخ" : "Kitchen"}</h2>
          <p className="text-muted-foreground mb-4">
            {isArabic ? "إدارة طلبات المطبخ" : "Manage kitchen orders"}
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link to="/kitchen">{isArabic ? "عرض طلبات المطبخ" : "View Kitchen Orders"}</Link>
          </Button>
        </Card>

        {/* Products Card - Admin Only */}
        {user?.role === "admin" && (
          <Card className="p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold mb-2">{isArabic ? "المنتجات" : "Products"}</h2>
            <p className="text-muted-foreground mb-4">
              {isArabic ? "إدارة المنتجات والأصناف" : "Manage products and categories"}
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/products">{isArabic ? "إدارة المنتجات" : "Manage Products"}</Link>
            </Button>
          </Card>
        )}

        {/* Inventory Card - Admin Only */}
        {user?.role === "admin" && (
          <Card className="p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold mb-2">{isArabic ? "المخزون" : "Inventory"}</h2>
            <p className="text-muted-foreground mb-4">
              {isArabic ? "إدارة المخزون والمشتريات" : "Manage inventory and purchases"}
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/inventory">{isArabic ? "إدارة المخزون" : "Manage Inventory"}</Link>
            </Button>
          </Card>
        )}

        {/* Reports Card - Admin Only */}
        {user?.role === "admin" && (
          <Card className="p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold mb-2">{isArabic ? "التقارير" : "Reports"}</h2>
            <p className="text-muted-foreground mb-4">
              {isArabic ? "عرض تقارير المبيعات والأداء" : "View sales and performance reports"}
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/reports/sales">{isArabic ? "عرض التقارير" : "View Reports"}</Link>
            </Button>
          </Card>
        )}

        {/* Settings Card - Admin Only */}
        {user?.role === "admin" && (
          <Card className="p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold mb-2">{isArabic ? "الإعدادات" : "Settings"}</h2>
            <p className="text-muted-foreground mb-4">
              {isArabic ? "إدارة إعدادات النظام" : "Manage system settings"}
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/settings">{isArabic ? "فتح الإعدادات" : "Open Settings"}</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
