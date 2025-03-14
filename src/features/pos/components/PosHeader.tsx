
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/utils/formatters";
import FullscreenToggle from "@/components/ui-custom/FullscreenToggle";

interface PosHeaderProps {
  onToggleSidebar?: () => void;
}

const PosHeader: React.FC<PosHeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 flex justify-between items-center flex-shrink-0">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-primary-foreground hover:bg-primary/80"
          title={isArabic ? "العودة للصفحة الرئيسية" : "Return to home"}
        >
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">{isArabic ? "نقطة البيع" : "Point of Sale"}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">
            {formatDate(currentTime, language === "ar" ? "ar-SA" : "en-US")}
          </span>
        </div>
        
        <FullscreenToggle className="ml-2" />
      </div>
    </div>
  );
};

export default PosHeader;
