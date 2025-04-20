
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Language } from "@/types";
import { userService } from "@/services";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";

interface LoginFormProps {
  language: Language;
}

const LoginForm: React.FC<LoginFormProps> = ({ language }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isProcessing } = useAuth();
  const isArabic = language === "ar";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error(
        isArabic
          ? "يرجى إدخال البريد الإلكتروني وكلمة المرور"
          : "Please enter email and password"
      );
      return;
    }
    
    try {
      console.log("Attempting login with:", email);
      const success = await login(email, password);
      
      if (success) {
        try {
          const users = await userService.getUsers();
          const loggedInUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
          if (loggedInUser?.companyId) {
            localStorage.setItem('currentCompanyId', loggedInUser.companyId);
          }
          
          toast.success(isArabic ? "تم تسجيل الدخول بنجاح" : "Successfully logged in");
          navigate("/");
        } catch (error) {
          console.error("Error processing user data after login:", error);
        }
      } else {
        console.error("Login failed for:", email);
        toast.error(
          isArabic
            ? "بيانات الدخول غير صحيحة"
            : "Invalid login credentials"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        isArabic
          ? "حدث خطأ أثناء تسجيل الدخول"
          : "An error occurred during login"
      );
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
      <AnimatedTransition animation="slide-up" className="w-full max-w-md">
        <Card className="shadow-xl border-opacity-50 backdrop-blur-sm bg-background/95">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
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
                  disabled={isProcessing}
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
                  disabled={isProcessing}
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
                    disabled={isProcessing}
                  />
                  <label
                    htmlFor="remember"
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isArabic ? "mr-2" : "ml-2"}`}
                  >
                    {isArabic ? "تذكرني" : "Remember me"}
                  </label>
                </div>
                <Button variant="link" className="px-0" disabled={isProcessing}>
                  {isArabic ? "نسيت كلمة المرور؟" : "Forgot password?"}
                </Button>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12" 
                disabled={isProcessing}
              >
                {isProcessing 
                  ? (isArabic ? "جاري تسجيل الدخول..." : "Signing in...") 
                  : (isArabic ? "تسجيل الدخول" : "Sign in")
                }
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

export default LoginForm;
