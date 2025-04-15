
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getSidebarLinks } from "@/components/layout/sidebar/sidebarLinks";

interface IndexProps {
  language?: string;
}

const Index: React.FC<IndexProps> = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { user } = useAuth();
  const sidebarLinks = getSidebarLinks();
  
  // Filter links based on user role and permissions
  const filteredLinks = sidebarLinks.filter(link => {
    if (link.isAdminOnly && (!user || user.role !== 'admin')) {
      return false;
    }
    if (link.requiredEmail && (!user || user.email !== link.requiredEmail)) {
      return false;
    }
    return true;
  });

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-6">
        {isArabic ? "لوحة التحكم" : "Dashboard"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.map((link) => {
          // Skip the home link since we're on the home page
          if (link.path === "/") return null;
          
          // Handle links with sub-menu items
          if (link.subMenuItems?.length) {
            return link.subMenuItems.map((subItem) => (
              <Card key={subItem.path} className="p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold mb-2">
                  {isArabic ? subItem.name : subItem.name_en}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {isArabic 
                    ? `إدارة ${subItem.name}` 
                    : `Manage ${subItem.name_en}`}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to={subItem.path}>
                    {isArabic 
                      ? `عرض ${subItem.name}` 
                      : `View ${subItem.name_en}`}
                  </Link>
                </Button>
              </Card>
            ));
          }

          // Regular links without sub-menu items
          return (
            <Card key={link.path} className="p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold mb-2">
                {isArabic ? link.name : link.name_en}
              </h2>
              <p className="text-muted-foreground mb-4">
                {isArabic 
                  ? `إدارة ${link.name}` 
                  : `Manage ${link.name_en}`}
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to={link.path}>
                  {isArabic 
                    ? `عرض ${link.name}` 
                    : `View ${link.name_en}`}
                </Link>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
