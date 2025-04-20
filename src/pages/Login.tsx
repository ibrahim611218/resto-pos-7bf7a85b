
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Login from '@/features/auth/Login';

const LoginPage: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Login language={language} />
    </div>
  );
};

export default LoginPage;
