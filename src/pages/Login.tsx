
import React, { useState, useEffect } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { login, isProcessing, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1b4332] to-[#081c15]" 
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <Card className="w-full max-w-md mx-4 bg-[#2d6a4f]/90 border-none">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            {isArabic ? 'تسجيل الدخول' : 'Login'}
          </h1>
          
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'}
                className="w-full pl-10 bg-[#40916c] border-none text-white placeholder-white/60"
                disabled={isProcessing}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                className="w-full pl-10 bg-[#40916c] border-none text-white placeholder-white/60"
                disabled={isProcessing}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-white text-[#2d6a4f] hover:bg-gray-100" 
            disabled={isProcessing}
          >
            {isProcessing
              ? (isArabic ? 'جاري التحقق...' : 'Authenticating...')
              : (isArabic ? 'تسجيل الدخول' : 'Login')}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
