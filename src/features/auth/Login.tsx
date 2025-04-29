
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Language } from "@/types";
import LoginInfo from "./components/LoginInfo";
import LoginForm from "./components/LoginForm";

interface LoginProps {
  language: Language;
}

const Login: React.FC<LoginProps> = ({ language }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/pos");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-gradient-to-b from-background to-secondary">
      <LoginInfo language={language} />
      <LoginForm language={language} />
    </div>
  );
};

export default Login;
