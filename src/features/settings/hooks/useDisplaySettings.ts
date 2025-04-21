
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { DisplaySettingsData, WindowSizeState } from "../types/displaySettings";

// Helper functions
const getStoredSettings = (): DisplaySettingsData => {
  const stored = localStorage.getItem("display-settings");
  return stored ? JSON.parse(stored) : { touchMode: false };
};

const saveSettings = (settings: DisplaySettingsData) => {
  localStorage.setItem("display-settings", JSON.stringify(settings));
};

export const useDisplaySettings = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<DisplaySettingsData>(getStoredSettings);
  const [windowSize, setWindowSize] = useState<WindowSizeState>({
    width: settings.width?.toString() || "",
    height: settings.height?.toString() || ""
  });

  // Apply touch mode class to body
  useEffect(() => {
    saveSettings(settings);
    
    if (settings.touchMode) {
      document.body.classList.add("touch-target-fix");
      document.documentElement.classList.add("touch-mode-active");
      console.log("Touch mode activated");
    } else {
      document.body.classList.remove("touch-target-fix");
      document.documentElement.classList.remove("touch-mode-active");
      console.log("Touch mode deactivated");
    }
  }, [settings]);

  useEffect(() => {
    if (settings.width && settings.height) {
      try {
        resizeWindow(settings.width, settings.height);
      } catch (error) {
        console.error("Error applying saved window size:", error);
      }
    }
  }, []);

  const resizeWindow = (width: number, height: number) => {
    if (typeof window.resizeTo === 'function') {
      window.resizeTo(width, height);
    } else {
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
    
    document.documentElement.style.width = `${width}px`;
    document.documentElement.style.height = `${height}px`;
    document.body.style.width = `${width}px`;
    document.body.style.minWidth = `${width}px`;
    document.body.style.maxWidth = `${width}px`;
    document.body.style.height = `${height}px`;
    document.body.style.minHeight = `${height}px`;
    document.body.style.overflow = 'auto';
  };

  const applyWindowSize = () => {
    const newWidth = parseInt(windowSize.width);
    const newHeight = parseInt(windowSize.height);
    
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

  const maximizeWindow = () => {
    try {
      if (typeof window.moveTo === 'function') {
        window.moveTo(0, 0);
      }
      
      const maxWidth = screen.availWidth;
      const maxHeight = screen.availHeight;
      
      resizeWindow(maxWidth, maxHeight);
      
      setWindowSize({
        width: maxWidth.toString(),
        height: maxHeight.toString()
      });
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

  return {
    settings,
    windowSize,
    setWindowSize,
    isArabic,
    applyWindowSize,
    maximizeWindow,
    toggleTouchMode
  };
};
