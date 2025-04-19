
import React from "react";
import LoginComponent from "@/features/auth/Login";
import { useLanguage } from "@/context/LanguageContext";

const Login: React.FC = () => {
  const { language } = useLanguage();
  
  return <LoginComponent language={language} />;
};

export default Login;
