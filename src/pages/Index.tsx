
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import DownloadSection from '@/components/home/DownloadSection';

const Index = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          {isArabic ? 'نظام نقاط البيع للمطاعم' : 'Restaurant POS System'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {isArabic 
            ? 'نظام متكامل لإدارة المطاعم والمقاهي مع دعم للعمل بدون انترنت.'
            : 'A comprehensive management system for restaurants and cafes with offline support.'}
        </p>
      </header>

      <DownloadSection />
      
      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            {isArabic ? 'إدارة المبيعات' : 'Sales Management'}
          </h2>
          <p className="text-muted-foreground">
            {isArabic 
              ? 'تتبع المبيعات وإصدار الفواتير بسهولة وسرعة.'
              : 'Track sales and issue invoices quickly and easily.'}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            {isArabic ? 'إدارة المخزون' : 'Inventory Management'}
          </h2>
          <p className="text-muted-foreground">
            {isArabic 
              ? 'مراقبة المخزون وإدارة المنتجات بكفاءة.'
              : 'Monitor inventory and manage products efficiently.'}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            {isArabic ? 'تقارير تفصيلية' : 'Detailed Reports'}
          </h2>
          <p className="text-muted-foreground">
            {isArabic 
              ? 'تحليل أداء المطعم من خلال تقارير متنوعة.'
              : 'Analyze restaurant performance through various reports.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
