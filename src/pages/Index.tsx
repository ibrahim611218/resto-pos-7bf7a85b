
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, ShoppingCart, BookOpen } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className={`text-5xl font-bold mb-6 text-primary ${isArabic ? 'font-[Tajawal]' : ''}`}>
            {isArabic ? 'نظام نقاط البيع للمطاعم' : 'Restaurant POS System'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isArabic 
              ? 'نظام متكامل لإدارة المطاعم والمقاهي بكل سهولة وكفاءة'
              : 'A comprehensive management system for restaurants and cafes with efficiency and ease'}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
            <ShoppingCart className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-4">
              {isArabic ? 'نقاط البيع' : 'Point of Sale'}
            </h2>
            <p className="text-muted-foreground">
              {isArabic 
                ? 'نظام سهل الاستخدام لإدارة المبيعات وإصدار الفواتير'
                : 'Easy-to-use system for managing sales and issuing invoices'}
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
            <BookOpen className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-4">
              {isArabic ? 'إدارة المخزون' : 'Inventory Management'}
            </h2>
            <p className="text-muted-foreground">
              {isArabic 
                ? 'تتبع المخزون وإدارة المنتجات بكفاءة عالية'
                : 'Track inventory and manage products efficiently'}
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-4">
              {isArabic ? 'تقارير شاملة' : 'Comprehensive Reports'}
            </h2>
            <p className="text-muted-foreground">
              {isArabic 
                ? 'تقارير تفصيلية للمبيعات والمخزون والضرائب'
                : 'Detailed reports for sales, inventory, and taxes'}
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="px-8 py-6 text-lg"
          >
            {isArabic ? 'تسجيل الدخول للبدء' : 'Login to Start'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
