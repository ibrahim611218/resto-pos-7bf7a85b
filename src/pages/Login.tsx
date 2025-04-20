
import React, { useState, useEffect } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail, Lock, Phone, HelpCircle } from 'lucide-react';
import GlassCard from '@/components/ui-custom/GlassCard';
import AnimatedTransition from '@/components/ui-custom/AnimatedTransition';

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
      <div className="w-full max-w-6xl mx-4 flex flex-col md:flex-row gap-8 items-center">
        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center space-y-6">
          <AnimatedTransition animation="fade" className="space-y-6">
            <img 
              src="/assets/restopos-logo.png" 
              alt="RestoPOS Logo" 
              className="w-48 h-auto mb-6"
            />
            <h1 className="text-4xl font-bold text-white">
              {isArabic ? "نظام نقاط البيع للمطاعم" : "Restaurant POS System"}
            </h1>
            <p className="text-lg text-white/80">
              {isArabic 
                ? "نظام متكامل لإدارة المطاعم والمقاهي يشمل إدارة المبيعات، المخزون، التقارير، والمزيد"
                : "Complete system for managing restaurants and cafes including sales, inventory, reports, and more"}
            </p>
            
            <div className="pt-8 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5 text-white/80" />
                <span className="text-lg text-white">0581283398</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5 text-white/80" />
                <span className="text-white/80">
                  {isArabic ? "للدعم الفني والاستفسارات" : "For technical support and inquiries"}
                </span>
              </div>
            </div>
          </AnimatedTransition>
        </div>

        {/* Login Form Section */}
        <GlassCard className="w-full md:w-1/2 p-8" animation="slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              {isArabic ? 'تسجيل الدخول' : 'Login'}
            </h2>
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'}
                  className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
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
                  className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                  disabled={isProcessing}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-white hover:bg-gray-100 text-[#1b4332]" 
              disabled={isProcessing}
            >
              {isProcessing
                ? (isArabic ? 'جاري التحقق...' : 'Authenticating...')
                : (isArabic ? 'تسجيل الدخول' : 'Login')}
            </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
