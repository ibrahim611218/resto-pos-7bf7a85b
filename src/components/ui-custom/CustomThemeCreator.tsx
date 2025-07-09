import React, { useState } from "react";
import { useAdvancedTheme } from "@/context/AdvancedThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Palette } from "lucide-react";
import { ThemeSettings, ThemeColors } from "@/context/AdvancedThemeContext";
import { toast } from "sonner";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isArabic: boolean;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange, isArabic }) => {
  const [hsl, setHsl] = useState(value);

  const handleChange = (newValue: string) => {
    setHsl(newValue);
    onChange(newValue);
  };

  const convertHexToHsl = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return value;

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const hslToHex = (hslValue: string): string => {
    const [h, s, l] = hslValue.split(' ').map((v, i) => {
      if (i === 0) return parseInt(v);
      return parseInt(v.replace('%', '')) / 100;
    });

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            value={hsl}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="360 100% 50%"
            dir={isArabic ? "rtl" : "ltr"}
          />
        </div>
        <input
          type="color"
          value={hslToHex(hsl)}
          onChange={(e) => handleChange(convertHexToHsl(e.target.value))}
          className="w-12 h-10 rounded border cursor-pointer"
        />
        <div 
          className="w-12 h-10 rounded border"
          style={{ backgroundColor: `hsl(${hsl})` }}
        />
      </div>
    </div>
  );
};

export const CustomThemeCreator: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { addCustomTheme } = useAdvancedTheme();
  
  const [open, setOpen] = useState(false);
  const [themeName, setThemeName] = useState("");
  const [themeNameAr, setThemeNameAr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [fontFamily, setFontFamily] = useState("Cairo");
  const [borderRadius, setBorderRadius] = useState(0.75);
  const [shadows, setShadows] = useState(true);
  const [animations, setAnimations] = useState(true);

  const [lightColors, setLightColors] = useState<ThemeColors>({
    primary: "167 100% 15%",
    primaryForeground: "0 0% 98%",
    secondary: "240 4.8% 95.9%",
    secondaryForeground: "167 80% 15%",
    accent: "167 100% 95%",
    accentForeground: "167 100% 15%",
    background: "0 0% 98%",
    foreground: "240 10% 3.9%",
    card: "0 0% 100%",
    cardForeground: "240 10% 3.9%",
    muted: "240 4.8% 95.9%",
    mutedForeground: "240 3.8% 46.1%",
    border: "240 5.9% 90%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "0 0% 98%",
    success: "142 76% 36%",
    successForeground: "0 0% 98%"
  });

  const [darkColors, setDarkColors] = useState<ThemeColors>({
    primary: "167 100% 20%",
    primaryForeground: "0 0% 98%",
    secondary: "167 30% 15%",
    secondaryForeground: "0 0% 98%",
    accent: "167 30% 15%",
    accentForeground: "0 0% 98%",
    background: "167 100% 6%",
    foreground: "0 0% 98%",
    card: "167 100% 8%",
    cardForeground: "0 0% 98%",
    muted: "167 30% 15%",
    mutedForeground: "240 5% 64.9%",
    border: "167 30% 15%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "0 0% 98%",
    success: "142 76% 36%",
    successForeground: "0 0% 98%"
  });

  const updateLightColor = (key: keyof ThemeColors, value: string) => {
    setLightColors(prev => ({ ...prev, [key]: value }));
  };

  const updateDarkColor = (key: keyof ThemeColors, value: string) => {
    setDarkColors(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateTheme = () => {
    if (!themeName.trim()) {
      toast.error(isArabic ? "يرجى إدخال اسم الثيم" : "Please enter theme name");
      return;
    }

    const newTheme: ThemeSettings = {
      id: `custom-${Date.now()}`,
      name: themeName,
      nameAr: themeNameAr || themeName,
      description: description || "Custom theme",
      descriptionAr: descriptionAr || "ثيم مخصص",
      colors: {
        light: lightColors,
        dark: darkColors
      },
      borderRadius,
      fontFamily,
      shadows,
      animations
    };

    addCustomTheme(newTheme);
    toast.success(isArabic ? "تم إنشاء الثيم بنجاح" : "Theme created successfully");
    setOpen(false);
    
    // Reset form
    setThemeName("");
    setThemeNameAr("");
    setDescription("");
    setDescriptionAr("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus size={16} />
          {isArabic ? "إنشاء ثيم جديد" : "Create New Theme"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette size={20} />
            {isArabic ? "إنشاء ثيم مخصص" : "Create Custom Theme"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                {isArabic ? "المعلومات الأساسية" : "Basic Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{isArabic ? "اسم الثيم" : "Theme Name"}</Label>
                  <Input
                    value={themeName}
                    onChange={(e) => setThemeName(e.target.value)}
                    placeholder={isArabic ? "أدخل اسم الثيم" : "Enter theme name"}
                    dir={isArabic ? "rtl" : "ltr"}
                  />
                </div>
                <div>
                  <Label>{isArabic ? "اسم الثيم بالعربية" : "Theme Name (Arabic)"}</Label>
                  <Input
                    value={themeNameAr}
                    onChange={(e) => setThemeNameAr(e.target.value)}
                    placeholder={isArabic ? "أدخل اسم الثيم بالعربية" : "Enter Arabic name"}
                    dir="rtl"
                  />
                </div>
              </div>
              
              <div>
                <Label>{isArabic ? "الوصف" : "Description"}</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isArabic ? "أدخل وصف الثيم" : "Enter theme description"}
                  dir={isArabic ? "rtl" : "ltr"}
                />
              </div>
              
              <div>
                <Label>{isArabic ? "الوصف بالعربية" : "Description (Arabic)"}</Label>
                <Textarea
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  placeholder={isArabic ? "أدخل وصف الثيم بالعربية" : "Enter Arabic description"}
                  dir="rtl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                {isArabic ? "إعدادات الثيم" : "Theme Settings"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{isArabic ? "نوع الخط" : "Font Family"}</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cairo">Cairo</SelectItem>
                      <SelectItem value="Tajawal">Tajawal</SelectItem>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{isArabic ? "نصف قطر الحدود" : "Border Radius"}</Label>
                  <Input
                    type="number"
                    step="0.25"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(parseFloat(e.target.value))}
                    min="0"
                    max="2"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label>{isArabic ? "الظلال" : "Shadows"}</Label>
                <Switch checked={shadows} onCheckedChange={setShadows} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>{isArabic ? "الحركات" : "Animations"}</Label>
                <Switch checked={animations} onCheckedChange={setAnimations} />
              </div>
            </CardContent>
          </Card>

          {/* Light Mode Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                {isArabic ? "ألوان الوضع الفاتح" : "Light Mode Colors"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorInput 
                  label={isArabic ? "اللون الأساسي" : "Primary"} 
                  value={lightColors.primary} 
                  onChange={(value) => updateLightColor('primary', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "نص اللون الأساسي" : "Primary Foreground"} 
                  value={lightColors.primaryForeground} 
                  onChange={(value) => updateLightColor('primaryForeground', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "اللون الثانوي" : "Secondary"} 
                  value={lightColors.secondary} 
                  onChange={(value) => updateLightColor('secondary', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "اللون المميز" : "Accent"} 
                  value={lightColors.accent} 
                  onChange={(value) => updateLightColor('accent', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "الخلفية" : "Background"} 
                  value={lightColors.background} 
                  onChange={(value) => updateLightColor('background', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "النص الأمامي" : "Foreground"} 
                  value={lightColors.foreground} 
                  onChange={(value) => updateLightColor('foreground', value)}
                  isArabic={isArabic}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dark Mode Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                {isArabic ? "ألوان الوضع الداكن" : "Dark Mode Colors"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorInput 
                  label={isArabic ? "اللون الأساسي" : "Primary"} 
                  value={darkColors.primary} 
                  onChange={(value) => updateDarkColor('primary', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "نص اللون الأساسي" : "Primary Foreground"} 
                  value={darkColors.primaryForeground} 
                  onChange={(value) => updateDarkColor('primaryForeground', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "اللون الثانوي" : "Secondary"} 
                  value={darkColors.secondary} 
                  onChange={(value) => updateDarkColor('secondary', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "اللون المميز" : "Accent"} 
                  value={darkColors.accent} 
                  onChange={(value) => updateDarkColor('accent', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "الخلفية" : "Background"} 
                  value={darkColors.background} 
                  onChange={(value) => updateDarkColor('background', value)}
                  isArabic={isArabic}
                />
                <ColorInput 
                  label={isArabic ? "النص الأمامي" : "Foreground"} 
                  value={darkColors.foreground} 
                  onChange={(value) => updateDarkColor('foreground', value)}
                  isArabic={isArabic}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleCreateTheme}>
              {isArabic ? "إنشاء الثيم" : "Create Theme"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};