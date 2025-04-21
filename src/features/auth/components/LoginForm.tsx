
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Language } from "@/types";
import { userService, companyService } from "@/services";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import LoginFormInputs from './form/LoginFormInputs';
import LoginFormActions from './form/LoginFormActions';

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
  
  // تحميل البيانات المحفوظة إذا تم تحديد "تذكرني" سابقًا
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error(
        isArabic
          ? "يرجى إدخال البريد الإلكتروني/اسم المستخدم وكلمة المرور"
          : "Please enter email/username and password"
      );
      return;
    }
    
    try {
      console.log("محاولة تسجيل الدخول باستخدام:", email);
      
      // إذا تم اختيار "تذكرني"، قم بحفظ البريد الإلكتروني
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      const success = await login(email, password);
      
      if (success) {
        try {
          // تحقق مما إذا كان تسجيل الدخول كشركة
          const isCompanyLogin = localStorage.getItem('isCompanyLogin') === 'true';
          
          if (isCompanyLogin) {
            const companies = await companyService.getCompanies();
            const companyEmail = email.toLowerCase().trim();
            const foundCompany = companies.find(c => 
              c.email && c.email.toLowerCase() === companyEmail
            );
            
            if (foundCompany) {
              localStorage.setItem('currentCompanyId', foundCompany.id);
            }
          } else {
            const users = await userService.getUsers();
            const loggedInUser = users.find(u => 
              (u.email && u.email.toLowerCase() === email.toLowerCase()) || 
              (u.username && u.username.toLowerCase() === email.toLowerCase())
            );
            
            if (loggedInUser?.companyId) {
              localStorage.setItem('currentCompanyId', loggedInUser.companyId);
            }
          }
          
          toast.success(isArabic ? "تم تسجيل الدخول بنجاح" : "Successfully logged in");
          navigate("/");
        } catch (error) {
          console.error("خطأ في معالجة بيانات المستخدم بعد تسجيل الدخول:", error);
        }
      } else {
        console.error("فشل تسجيل الدخول لـ:", email);
        toast.error(
          isArabic
            ? "بيانات الدخول غير صحيحة"
            : "Invalid login credentials"
        );
      }
    } catch (error) {
      console.error("خطأ تسجيل الدخول:", error);
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
              <LoginFormInputs
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                isProcessing={isProcessing}
                language={language}
              />
              <LoginFormActions
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
                isProcessing={isProcessing}
                language={language}
                onSubmit={handleLogin}
              />
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
