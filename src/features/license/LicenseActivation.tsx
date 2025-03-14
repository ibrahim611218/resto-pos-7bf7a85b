
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLicense } from "@/hooks/useLicense";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Loader2, Key } from "lucide-react";

const LicenseActivation: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { toast } = useToast();
  const { activateLicense, loading, generateOneDayTrialKey } = useLicense();
  const navigate = useNavigate();
  
  const [licenseKey, setLicenseKey] = useState("");
  const [oneDayTrialKey, setOneDayTrialKey] = useState("");
  
  useEffect(() => {
    // Generate a one-day trial key when component mounts
    setOneDayTrialKey(generateOneDayTrialKey());
  }, [generateOneDayTrialKey]);
  
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
    
    const activated = await activateLicense(licenseKey.trim());
    
    if (activated) {
      toast({
        title: isArabic ? "تم التفعيل بنجاح" : "Activation Successful",
        description: isArabic 
          ? "تم تفعيل البرنامج بنجاح" 
          : "The application has been activated successfully",
      });
      navigate("/");
    }
  };
  
  const activateOneDayTrial = async () => {
    const activated = await activateLicense(oneDayTrialKey);
    
    if (activated) {
      toast({
        title: "تم التفعيل بنجاح",
        description: "تم تفعيل الإصدار التجريبي ليوم واحد بنجاح",
      });
      navigate("/");
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <div className="w-full border-t pt-4">
            <h3 className="text-sm font-medium mb-2">
              {isArabic ? "تفعيل سريع ليوم واحد" : "Quick One-Day Activation"}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="text-center bg-muted p-2 rounded-md font-mono text-xs">
                {oneDayTrialKey}
              </div>
              <Button 
                variant="secondary"
                onClick={activateOneDayTrial}
                className="w-full"
                disabled={loading}
              >
                <Key className="ml-2 h-4 w-4" />
                {isArabic ? "تفعيل لمدة يوم واحد للطباعة" : "Activate for One Day"}
              </Button>
            </div>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/")}
          >
            {isArabic ? "العودة للرئيسية" : "Back to Home"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LicenseActivation;
