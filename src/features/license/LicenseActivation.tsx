
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLicense } from "@/hooks/useLicense";
import { AlertTriangle, CheckCircle2, Clock, Key } from "lucide-react";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { useLanguage } from "@/context/LanguageContext";

const formSchema = z.object({
  licenseKey: z.string().min(16, {
    message: "مفتاح الترخيص يجب أن يكون 16 حرفًا على الأقل"
  })
});

const LicenseActivation: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const navigate = useNavigate();
  const { licenseState, loading, activateLicense } = useLicense();
  const [isActivating, setIsActivating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseKey: ""
    }
  });

  useEffect(() => {
    // If already licensed, redirect to dashboard
    if (licenseState.isLicensed) {
      navigate("/");
    }
  }, [licenseState.isLicensed, navigate]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsActivating(true);
    try {
      const success = await activateLicense(values.licenseKey);
      if (success) {
        navigate("/");
      }
    } finally {
      setIsActivating(false);
    }
  };

  const formatLicenseKey = (value: string) => {
    // Format as XXXX-XXXX-XXXX-XXXX
    return value
      .replace(/[^A-Za-z0-9]/g, '')
      .toUpperCase()
      .slice(0, 16)
      .replace(/(.{4})/g, '$1-')
      .slice(0, 19);
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary ${
        isArabic ? "font-[system-ui]" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <AnimatedTransition animation="slide-up" className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">
              تفعيل البرنامج
            </CardTitle>
            <CardDescription>
              {licenseState.isExpired 
                ? "انتهت صلاحية الترخيص الخاص بك. يرجى إعادة التفعيل" 
                : "أدخل مفتاح الترخيص لتفعيل البرنامج"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="licenseKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مفتاح الترخيص</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Key className="w-4 h-4 ml-2 text-muted-foreground" />
                          <Input 
                            {...field}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            className="h-12"
                            onChange={(e) => {
                              const formatted = formatLicenseKey(e.target.value);
                              form.setValue('licenseKey', formatted);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isActivating || loading}>
                  {isActivating ? "جاري التفعيل..." : "تفعيل"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 pt-4 border-t space-y-4">
              <div className="flex items-start space-x-2 space-x-reverse">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">ملاحظة هامة</h3>
                  <p className="text-sm text-muted-foreground">
                    هذا البرنامج مرخص وليس مجانيًا. يمكنك تفعيل نسخة تجريبية مجانية لمدة 14 يومًا، أو شراء اشتراك شهري أو سنوي.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 space-x-reverse">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">أنواع التراخيص</h3>
                  <ul className="text-sm text-muted-foreground list-disc pr-4 mt-1">
                    <li>نسخة تجريبية (14 يوم)</li>
                    <li>اشتراك شهري</li>
                    <li>اشتراك سنوي</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 space-x-reverse">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">للحصول على مفتاح ترخيص</h3>
                  <p className="text-sm text-muted-foreground">
                    يرجى التواصل مع فريق المبيعات للحصول على مفتاح ترخيص.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default LicenseActivation;
