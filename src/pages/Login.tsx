
import React, { useState, useEffect } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ShoppingCart, BookOpen, Shield } from 'lucide-react';

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
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1b4332] to-[#081c15] p-4" 
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-center text-4xl font-bold text-white mb-8">
          {isArabic ? 'نظام نقاط البيع للمطاعم' : 'Restaurant POS System'}
        </h1>
        <p className="text-center text-lg text-gray-300 mb-12">
          {isArabic 
            ? 'نظام متكامل لإدارة المطاعم والمقاهي بكل سهولة وكفاءة'
            : 'Complete system for managing restaurants and cafes with ease and efficiency'}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-[#1b4332] border-[#2d6a4f] p-8 text-center hover:bg-[#2d6a4f] transition-colors">
            <ShoppingCart className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              {isArabic ? 'نقاط البيع' : 'Point of Sale'}
            </h2>
            <p className="text-gray-300">
              {isArabic 
                ? 'نظام سهل الاستخدام لإدارة المبيعات وإصدار الفواتير'
                : 'Easy-to-use system for managing sales and issuing invoices'}
            </p>
          </Card>

          <Card className="bg-[#1b4332] border-[#2d6a4f] p-8 text-center hover:bg-[#2d6a4f] transition-colors">
            <BookOpen className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              {isArabic ? 'إدارة المخزون' : 'Inventory Management'}
            </h2>
            <p className="text-gray-300">
              {isArabic 
                ? 'تتبع المخزون وإدارة المنتجات بكفاءة عالية'
                : 'Track inventory and manage products efficiently'}
            </p>
          </Card>

          <Card className="bg-[#1b4332] border-[#2d6a4f] p-8 text-center hover:bg-[#2d6a4f] transition-colors">
            <Shield className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              {isArabic ? 'تقارير شاملة' : 'Comprehensive Reports'}
            </h2>
            <p className="text-gray-300">
              {isArabic 
                ? 'تقارير تفصيلية للمبيعات والمخزون والضرائب'
                : 'Detailed reports for sales, inventory, and taxes'}
            </p>
          </Card>
        </div>

        <Card className="bg-[#2d6a4f] border-none">
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2" htmlFor="email">
                {isArabic ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isArabic ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
                className="w-full bg-[#40916c] border-none text-white placeholder-gray-300"
                disabled={isProcessing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2" htmlFor="password">
                {isArabic ? 'كلمة المرور' : 'Password'}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
                className="w-full bg-[#40916c] border-none text-white placeholder-gray-300"
                disabled={isProcessing}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-white text-[#2d6a4f] hover:bg-gray-100" 
              disabled={isProcessing}
            >
              {isProcessing
                ? (isArabic ? 'جاري التحقق...' : 'Authenticating...')
                : (isArabic ? 'تسجيل الدخول' : 'Login')}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;

