
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLicense } from "@/hooks/useLicense";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const LicenseActivation: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { toast } = useToast();
  const { activateLicense, loading } = useLicense();
  const navigate = useNavigate();
  
  const [licenseKey, setLicenseKey] = useState("");
  
  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!licenseKey.trim()) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "الرجاء إدخال مفتاح الترخيص" : "Please enter a license key",
        variant: "destructive",
      });
      return;
    }
    
    const success = await activateLicense(licenseKey.trim());
    
    if (success) {
      toast({
        title: isArabic ? "تم التفعيل بنجاح" : "Activation Successful",
        description: isArabic 
          ? "تم تفعيل البرنامج بنجاح" 
          : "The application has been activated successfully",
      });
      navigate("/");
    } else {
      toast({
        title: isArabic ? "فشل التفعيل" : "Activation Failed",
        description: isArabic ? "مفتاح الترخيص غير صالح" : "Invalid license key",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40" dir={isArabic ? "rtl" : "ltr"}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {isArabic ? "تفعيل البرنامج" : "Activate Software"}
          </CardTitle>
          <CardDescription className="text-center">
            {isArabic 
              ? "أدخل مفتاح الترخيص الخاص بك لتفعيل البرنامج" 
              : "Enter your license key to activate the software"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleActivate}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="license">
                  {isArabic ? "مفتاح الترخيص" : "License Key"}
                </Label>
                <Input
                  id="license"
                  placeholder={isArabic ? "أدخل مفتاح الترخيص" : "Enter license key"}
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="text-center tracking-wider"
                  autoComplete="off"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isArabic ? "جاري التفعيل..." : "Activating..."}
                  </>
                ) : (
                  isArabic ? "تفعيل" : "Activate"
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/")}
              >
                {isArabic ? "العودة للرئيسية" : "Back to Home"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicenseActivation;
