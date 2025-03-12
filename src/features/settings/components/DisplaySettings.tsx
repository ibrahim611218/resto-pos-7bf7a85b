
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Monitor, Smartphone, MousePointer, Fingerprint } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface DisplaySettings {
  screenSize: "standard" | "compact" | "large";
  inputMethod: "auto" | "touch" | "mouse";
  autoDetectInputMethod: boolean;
}

const DisplaySettingsComponent: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isArabic = language === "ar";
  
  const [settings, setSettings] = useState<DisplaySettings>(() => {
    const savedSettings = localStorage.getItem("displaySettings");
    return savedSettings 
      ? JSON.parse(savedSettings) 
      : { 
          screenSize: "standard", 
          inputMethod: "auto", 
          autoDetectInputMethod: true 
        };
  });
  
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);
  
  useEffect(() => {
    const detectTouch = () => {
      return 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;
    };
    
    setIsTouchDevice(detectTouch());
    
    if (settings.autoDetectInputMethod) {
      document.body.classList.remove('touch-ui', 'mouse-ui');
      document.body.classList.add(detectTouch() ? 'touch-ui' : 'mouse-ui');
    } else {
      document.body.classList.remove('touch-ui', 'mouse-ui');
      document.body.classList.add(settings.inputMethod === 'touch' ? 'touch-ui' : 'mouse-ui');
    }
    
    document.body.classList.remove('screen-size-standard', 'screen-size-compact', 'screen-size-large');
    document.body.classList.add(`screen-size-${settings.screenSize}`);
    
    // Apply container class based on screen size
    document.body.classList.remove('container-standard', 'container-compact', 'container-large');
    document.body.classList.add(`container-${settings.screenSize}`);
    
  }, [settings.autoDetectInputMethod, settings.inputMethod, settings.screenSize]);
  
  useEffect(() => {
    localStorage.setItem("displaySettings", JSON.stringify(settings));
  }, [settings]);
  
  const handleScreenSizeChange = (value: "standard" | "compact" | "large") => {
    setSettings(prev => ({ ...prev, screenSize: value }));
  };
  
  const handleInputMethodChange = (value: "auto" | "touch" | "mouse") => {
    setSettings(prev => ({ ...prev, inputMethod: value }));
  };
  
  const handleAutoDetectChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, autoDetectInputMethod: checked }));
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor size={18} />
          {isArabic ? "إعدادات العرض" : "Display Settings"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="screenSize">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="screenSize">
              {isArabic ? "حجم الشاشة" : "Screen Size"}
            </TabsTrigger>
            <TabsTrigger value="inputMethod">
              {isArabic ? "طريقة الإدخال" : "Input Method"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="screenSize" className="space-y-4 mt-4">
            <RadioGroup 
              value={settings.screenSize} 
              onValueChange={handleScreenSizeChange as any}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex items-center gap-2">
                  <Monitor size={16} className="opacity-50" />
                  {isArabic ? "قياسي" : "Standard"}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="compact" id="compact" />
                <Label htmlFor="compact" className="flex items-center gap-2">
                  <Smartphone size={16} className="opacity-50" />
                  {isArabic ? "مضغوط" : "Compact"}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large" className="flex items-center gap-2">
                  <Monitor size={16} className="opacity-50" />
                  {isArabic ? "كبير" : "Large"}
                </Label>
              </div>
            </RadioGroup>
            
            <div className="p-4 bg-muted rounded-md mt-4">
              <p className="text-sm text-muted-foreground">
                {isArabic 
                  ? "تغيير حجم العرض يؤثر على كيفية عرض العناصر في التطبيق"
                  : "Changing screen size affects how elements are displayed in the application"
                }
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="inputMethod" className="space-y-4 mt-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Switch 
                id="autoDetect" 
                checked={settings.autoDetectInputMethod}
                onCheckedChange={handleAutoDetectChange}
              />
              <Label htmlFor="autoDetect">
                {isArabic ? "كشف تلقائي" : "Auto Detect"}
              </Label>
            </div>
            
            {isTouchDevice !== null && settings.autoDetectInputMethod && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm flex items-center gap-2">
                  {isTouchDevice ? <Fingerprint size={16} /> : <MousePointer size={16} />}
                  {isArabic 
                    ? `تم اكتشاف جهاز ${isTouchDevice ? 'باللمس' : 'بالماوس'}`
                    : `Detected ${isTouchDevice ? 'touch' : 'mouse'} device`
                  }
                </p>
              </div>
            )}
            
            <RadioGroup 
              value={settings.inputMethod} 
              onValueChange={handleInputMethodChange as any}
              className="space-y-4"
              disabled={settings.autoDetectInputMethod}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="auto" id="auto" />
                <Label htmlFor="auto" className="flex items-center gap-2">
                  <Smartphone size={16} className="opacity-50" />
                  {isArabic ? "تلقائي" : "Auto"}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="touch" id="touch" />
                <Label htmlFor="touch" className="flex items-center gap-2">
                  <Fingerprint size={16} className="opacity-50" />
                  {isArabic ? "شاشة لمس" : "Touch Screen"}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="mouse" id="mouse" />
                <Label htmlFor="mouse" className="flex items-center gap-2">
                  <MousePointer size={16} className="opacity-50" />
                  {isArabic ? "ماوس ولوحة مفاتيح" : "Mouse & Keyboard"}
                </Label>
              </div>
            </RadioGroup>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DisplaySettingsComponent;
