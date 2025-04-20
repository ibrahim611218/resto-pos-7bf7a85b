
import React, { useState, useEffect } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { login, isProcessing, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(isArabic ? 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter your email and password');
      return;
    }

    try {
      console.log("Attempting login with:", email);
      const success = await login(email, password);
      if (success) {
        toast.success(isArabic ? 'تم تسجيل الدخول بنجاح' : 'Successfully logged in');
        navigate('/pos');
      } else {
        toast.error(isArabic ? 'بيانات الاعتماد غير صالحة' : 'Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(isArabic ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4" dir={isArabic ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {isArabic ? 'تسجيل الدخول' : 'Login'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                {isArabic ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isArabic ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
                className="w-full"
                disabled={isProcessing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                {isArabic ? 'كلمة المرور' : 'Password'}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
                className="w-full"
                disabled={isProcessing}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing
                ? isArabic
                  ? 'جاري التحقق...'
                  : 'Authenticating...'
                : isArabic
                ? 'تسجيل الدخول'
                : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
