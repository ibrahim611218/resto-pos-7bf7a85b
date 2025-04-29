
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Language } from "@/types";
import LoginInfo from "./components/LoginInfo";
import LoginForm from "./components/LoginForm";

interface LoginProps {
  language: Language;
}

const Login: React.FC<LoginProps> = ({ language }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isInitialized } = useAuth();
  const from = location.state?.from?.pathname || "/pos";
  
  // Check if user is already authenticated and redirect appropriately
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from, isInitialized]);

  // If still checking authentication, show loading
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, show login form
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-gradient-to-b from-background to-secondary">
      <LoginInfo language={language} />
      <LoginForm language={language} />
    </div>
  );
};

export default Login;
