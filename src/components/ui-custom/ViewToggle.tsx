
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, LayoutGrid, Grid3X3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export type ViewMode = "list" | "grid-small" | "grid-large";

interface ViewToggleProps {
  value: ViewMode;
  onValueChange: (value: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ value, onValueChange }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(value) => value && onValueChange(value as ViewMode)}
      className="border rounded-md"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <ToggleGroupItem value="list" aria-label={isArabic ? "عرض قائمة" : "List view"}>
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid-small" aria-label={isArabic ? "شبكة صغيرة" : "Small grid"}>
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid-large" aria-label={isArabic ? "شبكة كبيرة" : "Large grid"}>
        <Grid3X3 className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewToggle;
