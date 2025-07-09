
import React, { useState } from "react";
import { useAdvancedTheme } from "@/context/AdvancedThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Palette, Moon, Sun, Settings, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomThemeCreator } from "./CustomThemeCreator";
import { toast } from "sonner";

interface AdvancedThemeSelectorProps {
  className?: string;
}

const AdvancedThemeSelector = ({ className }: AdvancedThemeSelectorProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { 
    currentTheme, 
    mode, 
    availableThemes, 
    setTheme, 
    toggleMode,
    removeCustomTheme 
  } = useAdvancedTheme();
  
  const [open, setOpen] = useState(false);

  const renderColorPreview = (colors: any, label: string) => (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-1">
        <div 
          className="w-4 h-4 rounded-full border"
          style={{ backgroundColor: `hsl(${colors.primary})` }}
        />
        <div 
          className="w-4 h-4 rounded-full border"
          style={{ backgroundColor: `hsl(${colors.secondary})` }}
        />
        <div 
          className="w-4 h-4 rounded-full border"
          style={{ backgroundColor: `hsl(${colors.accent})` }}
        />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={className}
          title={isArabic ? "إعدادات الثيمات" : "Theme Settings"}
        >
          <Palette size={18} />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh]" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette size={20} />
            {isArabic ? "إعدادات الثيمات المتطورة" : "Advanced Theme Settings"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          {/* Mode Toggle */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                {mode === "light" ? <Sun size={16} /> : <Moon size={16} />}
                {isArabic ? "وضع العرض" : "Display Mode"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={toggleMode}
                variant="outline"
                className="w-full"
              >
                {mode === "light" ? (
                  <>
                    <Moon size={16} className="mr-2" />
                    {isArabic ? "التبديل للوضع الداكن" : "Switch to Dark Mode"}
                  </>
                ) : (
                  <>
                    <Sun size={16} className="mr-2" />
                    {isArabic ? "التبديل للوضع الفاتح" : "Switch to Light Mode"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Settings size={16} />
                  {isArabic ? "اختيار الثيم" : "Select Theme"}
                </CardTitle>
                <CustomThemeCreator />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableThemes.map((theme) => (
                    <Card 
                      key={theme.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        currentTheme.id === theme.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setTheme(theme.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">
                            {isArabic ? theme.nameAr : theme.name}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            {currentTheme.id === theme.id && (
                              <Badge variant="default" className="text-xs">
                                {isArabic ? "مُحدد" : "Active"}
                              </Badge>
                            )}
                            {theme.id.startsWith('custom-') && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeCustomTheme(theme.id);
                                  toast.success(isArabic ? "تم حذف الثيم" : "Theme deleted");
                                }}
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 size={12} />
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {isArabic ? theme.descriptionAr : theme.description}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between items-center">
                          {renderColorPreview(theme.colors.light, isArabic ? "فاتح" : "Light")}
                          {renderColorPreview(theme.colors.dark, isArabic ? "داكن" : "Dark")}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {theme.fontFamily}
                          </Badge>
                          {theme.shadows && (
                            <Badge variant="outline" className="text-xs">
                              {isArabic ? "ظلال" : "Shadows"}
                            </Badge>
                          )}
                          {theme.animations && (
                            <Badge variant="outline" className="text-xs">
                              {isArabic ? "حركات" : "Animations"}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedThemeSelector;
