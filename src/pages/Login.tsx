
import React, { useState } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Login: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { login, isProcessing } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(isArabic ? 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter your email and password');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/pos');
      } else {
        setError(isArabic ? 'بيانات الاعتماد غير صالحة' : 'Invalid credentials');
      }
    } catch (error) {
      setError(isArabic ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4" dir={isArabic ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {isArabic ? 'تسجيل الدخول' : 'Login'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-destructive text-sm">{error}</p>}
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
