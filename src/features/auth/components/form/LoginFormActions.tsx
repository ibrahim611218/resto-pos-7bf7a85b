
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Language } from "@/types";

interface LoginFormActionsProps {
  rememberMe?: boolean;
  setRememberMe?: (checked: boolean) => void;
  isProcessing: boolean;
  language: Language;
  onSubmit?: (e: React.FormEvent) => Promise<void>;
  isArabic: boolean;
}

const LoginFormActions: React.FC<LoginFormActionsProps> = ({
  rememberMe = false,
  setRememberMe = () => {},
  isProcessing,
  language,
  onSubmit,
  isArabic
}) => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
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
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
    </div>
  );
};

export default LoginFormActions;
