
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import { WindowSizeState } from "../../types/displaySettings";
import HeaderSection from "../common/HeaderSection";

interface WindowSizeSettingsProps {
  windowSize: WindowSizeState;
  setWindowSize: (size: WindowSizeState) => void;
  applyWindowSize: () => void;
  maximizeWindow: () => void;
  isArabic: boolean;
}

export const WindowSizeSettings: React.FC<WindowSizeSettingsProps> = ({
  windowSize,
  setWindowSize,
  applyWindowSize,
  maximizeWindow,
  isArabic
}) => {
  return (
    <div className="space-y-4">
      <HeaderSection 
        icon={Maximize}
        title={isArabic ? "تغيير حجم النافذة" : "Resize Window"}
        isArabic={isArabic}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="width">{isArabic ? "العرض (بالبكسل)" : "Width (px)"}</Label>
          <Input
            id="width"
            type="number"
            placeholder="1024"
            value={windowSize.width}
            onChange={(e) => setWindowSize({ ...windowSize, width: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">{isArabic ? "الارتفاع (بالبكسل)" : "Height (px)"}</Label>
          <Input
            id="height"
            type="number"
            placeholder="768"
            value={windowSize.height}
            onChange={(e) => setWindowSize({ ...windowSize, height: e.target.value })}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={applyWindowSize}>
          {isArabic ? "تطبيق الحجم" : "Apply Size"}
        </Button>
        <Button variant="outline" onClick={maximizeWindow}>
          <Maximize className="me-2 h-4 w-4" />
          {isArabic ? "تكبير للحد الأقصى" : "Maximize Window"}
        </Button>
      </div>
    </div>
  );
};
