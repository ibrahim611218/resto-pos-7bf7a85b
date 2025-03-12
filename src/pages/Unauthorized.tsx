
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface UnauthorizedProps {
  language?: string;
}

const Unauthorized: React.FC<UnauthorizedProps> = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-secondary"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="bg-card shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-destructive">
          {isArabic ? "غير مصرح بالوصول" : "Unauthorized Access"}
        </h1>
        <p className="mb-6">
          {isArabic 
            ? "عذراً، ليس لديك صلاحية للوصول إلى هذه الصفحة"
            : "Sorry, you don't have permission to access this page."
          }
        </p>
        <Button asChild>
          <Link to="/">
            {isArabic ? "العودة للرئيسية" : "Return to Dashboard"}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
