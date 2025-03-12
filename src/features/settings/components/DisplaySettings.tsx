
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useScreenSize } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Maximize, Minimize, Mouse, TouchpadIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// لتخزين إعدادات العرض
interface DisplaySettingsData {
  touchMode: boolean;
  width?: number;
  height?: number;
}

// استرجاع الإعدادات من التخزين المحلي
const getStoredSettings = (): DisplaySettingsData => {
  const stored = localStorage.getItem("display-settings");
  return stored ? JSON.parse(stored) : { touchMode: false };
};

// حفظ الإعدادات في التخزين المحلي
const saveSettings = (settings: DisplaySettingsData) => {
  localStorage.setItem("display-settings", JSON.stringify(settings));
};

const DisplaySettings = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { toast } = useToast();
  const screenSize = useScreenSize();
  
  // حالة إعدادات العرض
  const [settings, setSettings] = useState<DisplaySettingsData>(getStoredSettings);
  const [width, setWidth] = useState<string>(settings.width?.toString() || "");
  const [height, setHeight] = useState<string>(settings.height?.toString() || "");

  // تحديث الإعدادات المحفوظة عند تغييرها
  useEffect(() => {
    saveSettings(settings);
    
    // تطبيق وضع اللمس على العناصر التفاعلية
    if (settings.touchMode) {
      document.body.classList.add("touch-target-fix");
    } else {
      document.body.classList.remove("touch-target-fix");
    }
  }, [settings]);

  // تطبيق حجم النافذة المحفوظ عند تحميل المكون
  useEffect(() => {
    if (settings.width && settings.height) {
      try {
        resizeWindow(settings.width, settings.height);
      } catch (error) {
        console.error("Error applying saved window size:", error);
      }
    }
  }, []);

  // تغيير حجم النافذة
  const applyWindowSize = () => {
    const newWidth = parseInt(width);
    const newHeight = parseInt(height);
    
    if (!isNaN(newWidth) && !isNaN(newHeight)) {
      try {
        resizeWindow(newWidth, newHeight);
        setSettings({ ...settings, width: newWidth, height: newHeight });
        toast({
          title: isArabic ? "تم تغيير الحجم" : "Size Changed",
          description: isArabic 
            ? `تم تغيير حجم النافذة إلى ${newWidth}×${newHeight}`
            : `Window resized to ${newWidth}×${newHeight}`,
        });
      } catch (error) {
        console.error("Error resizing window:", error);
        toast({
          variant: "destructive",
          title: isArabic ? "خطأ" : "Error",
          description: isArabic 
            ? "فشل في تغيير حجم النافذة. قد تكون المتصفح يمنع هذه العملية."
            : "Failed to resize window. The browser may be blocking this operation.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: isArabic ? "خطأ" : "Error",
        description: isArabic 
          ? "الرجاء إدخال أرقام صحيحة للعرض والارتفاع"
          : "Please enter valid numbers for width and height",
      });
    }
  };

  // طريقة آمنة لتغيير حجم النافذة
  const resizeWindow = (width: number, height: number) => {
    if (typeof window.resizeTo === 'function') {
      window.resizeTo(width, height);
    } else {
      // بديل في حالة عدم دعم resizeTo
      const resizeScript = document.createElement('script');
      resizeScript.innerHTML = `
        try {
          window.open('', '_self');
          window.resizeTo(${width}, ${height});
        } catch(e) {
          console.error('Resize failed:', e);
        }
      `;
      document.body.appendChild(resizeScript);
      document.body.removeChild(resizeScript);
    }
    
    // تطبيق CSS على عناصر الصفحة للتحكم بالحجم
    document.documentElement.style.width = `${width}px`;
    document.documentElement.style.height = `${height}px`;
    document.body.style.width = `${width}px`;
    document.body.style.minWidth = `${width}px`;
    document.body.style.maxWidth = `${width}px`;
    document.body.style.height = `${height}px`;
    document.body.style.minHeight = `${height}px`;
    document.body.style.overflow = 'auto';
  };

  // تكبير النافذة للشاشة الكاملة
  const maximizeWindow = () => {
    try {
      if (typeof window.moveTo === 'function') {
        window.moveTo(0, 0);
      }
      
      const maxWidth = screen.availWidth;
      const maxHeight = screen.availHeight;
      
      resizeWindow(maxWidth, maxHeight);
      
      setWidth(maxWidth.toString());
      setHeight(maxHeight.toString());
      setSettings({
        ...settings,
        width: maxWidth,
        height: maxHeight
      });
      
      toast({
        title: isArabic ? "تم التكبير" : "Maximized",
        description: isArabic 
          ? "تم تكبير النافذة إلى الحجم الأقصى"
          : "Window maximized to full available size",
      });
    } catch (error) {
      console.error("Error maximizing window:", error);
      toast({
        variant: "destructive",
        title: isArabic ? "خطأ" : "Error",
        description: isArabic 
          ? "فشل في تكبير النافذة"
          : "Failed to maximize window",
      });
    }
  };

  // تحديث وضع اللمس
  const toggleTouchMode = (enabled: boolean) => {
    setSettings({ ...settings, touchMode: enabled });
    toast({
      title: enabled 
        ? (isArabic ? "تم تفعيل وضع اللمس" : "Touch Mode Enabled") 
        : (isArabic ? "تم تعطيل وضع اللمس" : "Touch Mode Disabled"),
      description: enabled
        ? (isArabic ? "تم تكبير عناصر الواجهة لسهولة اللمس" : "UI elements enlarged for touch input")
        : (isArabic ? "تم إعادة حجم عناصر الواجهة إلى الوضع العادي" : "UI elements returned to normal size"),
    });
  };

  return (
    <div className="space-y-6">
      {/* معلومات عن حجم الشاشة الحالي */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">
            {isArabic ? "معلومات الشاشة الحالية" : "Current Screen Information"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{isArabic ? "عرض النافذة الحالي" : "Current Window Width"}</Label>
              <div className="font-medium">{window.innerWidth}px</div>
            </div>
            <div>
              <Label>{isArabic ? "ارتفاع النافذة الحالي" : "Current Window Height"}</Label>
              <div className="font-medium">{window.innerHeight}px</div>
            </div>
            <div>
              <Label>{isArabic ? "عرض الشاشة المتاح" : "Available Screen Width"}</Label>
              <div className="font-medium">{screen.availWidth}px</div>
            </div>
            <div>
              <Label>{isArabic ? "ارتفاع الشاشة المتاح" : "Available Screen Height"}</Label>
              <div className="font-medium">{screen.availHeight}px</div>
            </div>
            <div>
              <Label>{isArabic ? "نوع الجهاز" : "Device Type"}</Label>
              <div className="font-medium">
                {screenSize.isMobile 
                  ? (isArabic ? "جوال" : "Mobile") 
                  : screenSize.isTablet 
                    ? (isArabic ? "جهاز لوحي" : "Tablet")
                    : (isArabic ? "حاسوب" : "Desktop")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إعدادات حجم النافذة */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {isArabic ? "تغيير حجم النافذة" : "Resize Window"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">{isArabic ? "العرض (بالبكسل)" : "Width (px)"}</Label>
            <Input
              id="width"
              type="number"
              placeholder="1024"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">{isArabic ? "الارتفاع (بالبكسل)" : "Height (px)"}</Label>
            <Input
              id="height"
              type="number"
              placeholder="768"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
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

      {/* إعدادات وضع اللمس */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {isArabic ? "وضع الإدخال" : "Input Mode"}
        </h3>
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
    </div>
  );
};

export default DisplaySettings;
