
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mouse, TouchpadIcon } from "lucide-react";
import { DisplaySettingsData } from "../../types/displaySettings";
import HeaderSection from "../common/HeaderSection";

interface TouchModeSettingsProps {
  settings: DisplaySettingsData;
  toggleTouchMode: (enabled: boolean) => void;
  isArabic: boolean;
}

export const TouchModeSettings: React.FC<TouchModeSettingsProps> = ({
  settings,
  toggleTouchMode,
  isArabic
}) => {
  return (
    <div className="space-y-4">
      <HeaderSection 
        icon={settings.touchMode ? TouchpadIcon : Mouse}
        title={isArabic ? "وضع الإدخال" : "Input Mode"}
        isArabic={isArabic}
      />
      <div className="flex items-center justify-between border p-4 rounded-lg">
        <div className="flex items-center gap-3">
          {settings.touchMode ? (
            <TouchpadIcon className="h-5 w-5 text-primary" />
          ) : (
            <Mouse className="h-5 w-5" />
          )}
          <div>
            <Label htmlFor="touch-mode" className="cursor-pointer">
              {isArabic ? "وضع اللمس" : "Touch Mode"}
            </Label>
            <p className="text-sm text-muted-foreground">
              {isArabic 
                ? "تكبير عناصر الواجهة لسهولة الاستخدام باللمس" 
                : "Enlarge UI elements for easier touch interaction"}
            </p>
          </div>
        </div>
        <Switch
          id="touch-mode"
          checked={settings.touchMode}
          onCheckedChange={toggleTouchMode}
        />
      </div>
    </div>
  );
};
