
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Flag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const SaudiThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <Button 
      variant="outline"
      size="icon"
      className={theme === "saudi" ? "bg-green-600 text-white" : ""}
      onClick={() => setTheme("saudi")}
      title={isArabic ? "ثيم اليوم الوطني السعودي" : "Saudi National Day Theme"}
    >
      <Flag className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default SaudiThemeToggle;
