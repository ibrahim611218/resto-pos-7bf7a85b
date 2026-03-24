
import React from "react";
import { LucideIcon } from "lucide-react";

interface HeaderSectionProps {
  title: string;
  icon: LucideIcon;
  description?: string;
  isArabic?: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  icon: Icon,
  description,
  isArabic = false,
}) => {
  return (
    <div className="mb-4 min-w-0 overflow-hidden">
      <h3 className="text-base sm:text-lg font-medium mb-1 flex items-center min-w-0">
        <Icon className={`flex-shrink-0 ${isArabic ? "ml-2" : "mr-2"}`} size={18} />
        <span className="truncate">{title}</span>
      </h3>
      {description && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-words">{description}</p>
      )}
    </div>
  );
};

export default HeaderSection;
