
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Language } from "@/types";

interface UnauthorizedProps {
  language: Language;
}

const Unauthorized: React.FC<UnauthorizedProps> = ({ language = "ar" }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isArabic = language === "ar";

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="text-destructive mb-4">
        <ShieldAlert size={64} />
      </div>
      <h1 className="text-3xl font-bold mb-4">
        {isArabic ? "غير مصرح بالوصول" : "Unauthorized Access"}
      </h1>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        {isArabic 
          ? "ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة." 
          : "You don't have permission to access this page."}
      </p>
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleGoBack}>
          {isArabic ? "العودة" : "Go Back"}
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          {isArabic ? "تسجيل الخروج" : "Log Out"}
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
