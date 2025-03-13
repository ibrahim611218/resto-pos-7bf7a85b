
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
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-1 flex items-center">
        <Icon className={isArabic ? "ml-2" : "mr-2"} size={18} />
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
};

export default HeaderSection;
