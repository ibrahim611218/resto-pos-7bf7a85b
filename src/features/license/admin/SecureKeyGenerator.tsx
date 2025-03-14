
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Copy, Lock, ShieldCheck, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLicense } from "@/hooks/useLicense";
import { generateSecureLicenseKey } from "@/utils/license/licenseUtils";

const SecureKeyGenerator: React.FC = () => {
  const { toast } = useToast();
  const { isAdminMode, enterAdminMode } = useLicense();
  
  const [adminPassword, setAdminPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [licenseType, setLicenseType] = useState("trial");
  const [validityDays, setValidityDays] = useState(1);
  const [generatedKey, setGeneratedKey] = useState("");
  
  // Check if already in admin mode
  useEffect(() => {
    if (isAdminMode) {
      setAuthenticated(true);
    }
  }, [isAdminMode]);
  
  const handleAuthentication = () => {
    if (enterAdminMode(adminPassword)) {
      setAuthenticated(true);
      toast({
        title: "تم الدخول بنجاح",
        description: "تم تفعيل وضع المسؤول",
      });
    } else {
      toast({
        title: "خطأ في المصادقة",
        description: "كلمة المرور غير صحيحة",
        variant: "destructive",
      });
    }
  };
  
  const handleGenerateKey = () => {
    if (!authenticated) return;
    
    const key = generateSecureLicenseKey(licenseType, validityDays);
    setGeneratedKey(key);
    
    toast({
      title: "تم إنشاء المفتاح",
      description: "تم إنشاء مفتاح الترخيص الآمن بنجاح",
    });
  };
  
  const handleCopyKey = () => {
    if (!generatedKey) return;
    
    navigator.clipboard.writeText(generatedKey);
    toast({
      title: "تم النسخ",
      description: "تم نسخ المفتاح إلى الحافظة",
    });
  };
  
  if (!authenticated) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">وضع المسؤول الآمن</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  هذه المنطقة مخصصة للمسؤول فقط. يرجى إدخال كلمة المرور الصحيحة للوصول.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminPassword">كلمة مرور المسؤول</Label>
              <Input
                id="adminPassword"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="أدخل كلمة مرور المسؤول"
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleAuthentication}
            >
              <Lock className="ml-2 h-4 w-4" />
              تسجيل الدخول
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <ShieldCheck className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-center">منشئ مفاتيح الترخيص الآمن</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                أنت الآن في وضع المسؤول. يمكنك إنشاء مفاتيح ترخيص آمنة باستخدام الخوارزمية الخاصة بك.
              </p>
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="licenseType">نوع الترخيص</Label>
              <Select 
                value={licenseType} 
                onValueChange={setLicenseType}
              >
                <SelectTrigger id="licenseType">
                  <SelectValue placeholder="اختر نوع الترخيص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trial">نسخة تجريبية</SelectItem>
                  <SelectItem value="monthly">اشتراك شهري</SelectItem>
                  <SelectItem value="yearly">اشتراك سنوي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="validityDays">مدة الصلاحية (بالأيام)</Label>
              <Input
                id="validityDays"
                type="number"
                min="1"
                max="3650"
                value={validityDays}
                onChange={(e) => setValidityDays(parseInt(e.target.value))}
              />
            </div>
            
            <Button 
              className="w-full"
              onClick={handleGenerateKey}
            >
              إنشاء مفتاح آمن
            </Button>
          </div>
          
          {generatedKey && (
            <div className="space-y-3 pt-4 border-t">
              <Label>مفتاح الترخيص المُنشأ</Label>
              <div className="flex">
                <Input
                  value={generatedKey}
                  readOnly
                  className="font-mono text-center"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={handleCopyKey}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                هذا المفتاح آمن ولا يمكن إنشاؤه إلا من خلال هذه الصفحة الخاصة بالمسؤول.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground w-full text-center">
          المفاتيح المنشأة من هذه الصفحة تستخدم خوارزمية التشفير الخاصة بك ولا يمكن تكرارها
        </p>
      </CardFooter>
    </Card>
  );
};

export default SecureKeyGenerator;
