
import React, { useState, useEffect } from "react";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Truck, Save } from "lucide-react";
import { toast } from "sonner";

const Settings: React.FC = () => {
  const { settings, updateSettings, loading } = useBusinessSettings();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [deliveryEnabled, setDeliveryEnabled] = useState(settings.deliveryEnabled ?? true);
  const [deliveryFee, setDeliveryFee] = useState(settings.deliveryFee ?? 10);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(settings.freeDeliveryThreshold ?? 100);

  useEffect(() => {
    setDeliveryEnabled(settings.deliveryEnabled ?? true);
    setDeliveryFee(settings.deliveryFee ?? 10);
    setFreeDeliveryThreshold(settings.freeDeliveryThreshold ?? 100);
  }, [settings]);

  const handleSaveDeliverySettings = async () => {
    const success = await updateSettings({
      deliveryEnabled,
      deliveryFee: deliveryEnabled ? deliveryFee : 0,
      freeDeliveryThreshold
    });

    if (success) {
      toast.success(isArabic ? "تم حفظ إعدادات التوصيل بنجاح" : "Delivery settings saved successfully");
    } else {
      toast.error(isArabic ? "فشل حفظ الإعدادات" : "Failed to save settings");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">{isArabic ? "الإعدادات" : "Settings"}</h1>
      
      {/* Delivery Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            {isArabic ? "إعدادات التوصيل" : "Delivery Settings"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="deliveryEnabled" className="flex flex-col gap-1">
              <span>{isArabic ? "تفعيل خدمة التوصيل" : "Enable Delivery Service"}</span>
              <span className="text-sm text-muted-foreground">
                {isArabic ? "عند التفعيل سيظهر خيار التوصيل في نقاط البيع" : "When enabled, delivery option will appear in POS"}
              </span>
            </Label>
            <Switch
              id="deliveryEnabled"
              checked={deliveryEnabled}
              onCheckedChange={setDeliveryEnabled}
            />
          </div>

          {deliveryEnabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="deliveryFee">
                  {isArabic ? "رسوم التوصيل (ر.س)" : "Delivery Fee (SAR)"}
                </Label>
                <Input
                  id="deliveryFee"
                  type="number"
                  min="0"
                  step="0.5"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value))}
                  placeholder={isArabic ? "أدخل رسوم التوصيل" : "Enter delivery fee"}
                />
                <p className="text-sm text-muted-foreground">
                  {isArabic ? "اتركه 0 للتوصيل المجاني" : "Set to 0 for free delivery"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="freeDeliveryThreshold">
                  {isArabic ? "حد التوصيل المجاني (ر.س)" : "Free Delivery Threshold (SAR)"}
                </Label>
                <Input
                  id="freeDeliveryThreshold"
                  type="number"
                  min="0"
                  step="1"
                  value={freeDeliveryThreshold}
                  onChange={(e) => setFreeDeliveryThreshold(Number(e.target.value))}
                  placeholder={isArabic ? "أدخل الحد الأدنى للتوصيل المجاني" : "Enter minimum for free delivery"}
                />
                <p className="text-sm text-muted-foreground">
                  {isArabic ? "التوصيل مجاني عند تجاوز هذا المبلغ (اتركه 0 لتعطيل)" : "Free delivery when order exceeds this amount (0 to disable)"}
                </p>
              </div>
            </>
          )}

          <Button onClick={handleSaveDeliverySettings} disabled={loading} className="w-full">
            <Save className="h-4 w-4 ml-2" />
            {isArabic ? "حفظ إعدادات التوصيل" : "Save Delivery Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Export the component for direct use
export { Settings };

// Export a default component for backward compatibility
const SettingsPage: React.FC = () => (
  <Settings />
);

export default SettingsPage;
