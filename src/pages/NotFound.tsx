
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" dir={isArabic ? "rtl" : "ltr"}>
      <div className="text-center max-w-lg">
        <img 
          src="/lovable-uploads/4f749ffa-9c3a-4317-b0ad-df551af31daa.png" 
          alt="404 Error - Page Not Found" 
          className="w-full max-w-md mx-auto mb-4"
        />
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          {isArabic 
            ? "عذراً، الصفحة التي تبحث عنها غير موجودة" 
            : "Oops! The page you're looking for doesn't exist"}
        </p>
        
        <Button 
          onClick={() => window.location.href = "/"}
          variant="default"
          className="flex items-center gap-2"
        >
          <Home size={18} />
          {isArabic ? "العودة للصفحة الرئيسية" : "Return to Home"}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
