
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Language } from "@/types";
import LoginFormInputs from "./form/LoginFormInputs";
import LoginFormActions from "./form/LoginFormActions";

interface LoginFormProps {
  language: Language;
}

const LoginForm: React.FC<LoginFormProps> = ({ language }) => {
  const isArabic = language === "ar";
  const { login, isProcessing } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email || !password) {
      setErrorMessage(isArabic ? "الرجاء إدخال البريد الإلكتروني وكلمة المرور" : "Please enter email and password");
      return;
    }
    
    const success = await login(email, password);
    
    if (success) {
      navigate("/pos");
      toast({
        title: isArabic ? "تم تسجيل الدخول بنجاح" : "Successfully logged in",
        description: isArabic ? "مرحبا بعودتك" : "Welcome back",
      });
    } else {
      setErrorMessage(isArabic ? "بيانات الدخول غير صحيحة" : "Invalid credentials");
      toast({
        variant: "destructive",
        title: isArabic ? "خطأ في تسجيل الدخول" : "Login Error",
        description: isArabic ? "بيانات الدخول غير صحيحة" : "Invalid credentials",
      });
    }
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="w-full md:w-1/2 p-8 flex justify-center items-center bg-card bg-opacity-50 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-lg border-0 bg-card/50 backdrop-blur">
        <form onSubmit={handleSubmit}>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h2 className={`text-2xl font-bold ${isArabic ? "font-[Tajawal]" : ""} text-center`}>
                {isArabic ? "تسجيل الدخول" : "Login"}
              </h2>
              <p className="text-center text-muted-foreground mt-1">
                {isArabic 
                  ? "أدخل بيانات تسجيل الدخول الخاصة بك"
                  : "Enter your credentials to access the dashboard"}
              </p>
            </div>

            <LoginFormInputs
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isArabic={isArabic}
              errorMessage={errorMessage}
              isProcessing={isProcessing}
              language={language}
            />
          </CardContent>

          <CardFooter>
            <LoginFormActions
              isProcessing={isProcessing}
              isArabic={isArabic}
              language={language}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
