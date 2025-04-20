
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Phone, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Language } from "@/types";

interface LoginProps {
  language: Language;
}

const Login: React.FC<LoginProps> = ({ language }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isProcessing, isAuthenticated } = useAuth();
  const isArabic = language === "ar";
  
  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Load companies data
  useEffect(() => {
    const checkCompanies = async () => {
      try {
        const companies = await userService.getCompanies();
        console.log("Available companies for login:", companies);
      } catch (error) {
        console.error("Error loading companies:", error);
      }
    };
    
    checkCompanies();
  }, []);

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
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-gradient-to-b from-background to-secondary">
      {/* Info Section */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center space-y-6">
        <div className="max-w-xl space-y-6">
          <h1 className={`text-4xl font-bold ${isArabic ? "font-[Tajawal]" : ""}`}>
            {isArabic ? "نظام نقاط البيع للمطاعم" : "Restaurant POS System"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isArabic 
              ? "نظام متكامل لإدارة المطاعم والمقاهي يشمل إدارة المبيعات، المخزون، التقارير، والمزيد"
              : "Complete system for managing restaurants and cafes including sales, inventory, reports, and more"}
          </p>
          
          {/* Contact Info */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-lg">0581283398</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">
                {isArabic ? "للدعم الفني والاستفسارات" : "For technical support and inquiries"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
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
    </div>
  );
};

export default Login;
