import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { User } from "@/types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      const success = login(email, password);
      if (success) {
        toast.success(isArabic ? "تم تسجيل الدخول بنجاح" : "Successfully logged in");
        navigate("/");
      } else {
        toast.error(
          isArabic
            ? "بيانات الدخول غير صحيحة"
            : "Invalid login credentials"
        );
      }
    } else {
      toast.error(
        isArabic
          ? "يرجى إدخال البريد الإلكتروني وكلمة المرور"
          : "Please enter email and password"
      );
    }
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary ${
        isArabic ? "font-[system-ui]" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <AnimatedTransition animation="slide-up" className="w-full max-w-md">
        <Card className="glass">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">
              {isArabic ? "تسجيل الدخول" : "Sign in"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  placeholder={isArabic ? "البريد الإلكتروني" : "Email"}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  placeholder={isArabic ? "كلمة المرور" : "Password"}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => 
                      setRememberMe(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {isArabic ? "تذكرني" : "Remember me"}
                  </label>
                </div>
                <Button variant="link" className="px-0">
                  {isArabic ? "نسيت كلمة المرور؟" : "Forgot password?"}
                </Button>
              </div>
              <Button type="submit" className="w-full h-12">
                {isArabic ? "تسجيل الدخول" : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-center text-muted-foreground w-full">
              {isArabic
                ? "© 2024 نظام المطاعم. جميع الحقوق محفوظة"
                : "© 2024 Restaurant System. All rights reserved"}
            </p>
          </CardFooter>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default Login;
