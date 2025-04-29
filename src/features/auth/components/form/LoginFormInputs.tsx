
import React from 'react';
import { Input } from "@/components/ui/input";
import { Language } from "@/types";

interface LoginFormInputsProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  isProcessing: boolean;
  language: Language;
  errorMessage?: string;
  isArabic: boolean;
}

const LoginFormInputs: React.FC<LoginFormInputsProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  isProcessing,
  language,
  errorMessage,
  isArabic
}) => {
  return (
    <div className="space-y-4">
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
      {errorMessage && (
        <div className="text-sm font-medium text-destructive mt-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default LoginFormInputs;
