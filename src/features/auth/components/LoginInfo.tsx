
import React from 'react';
import { Phone, HelpCircle } from 'lucide-react';
import { Language } from '@/types';

interface LoginInfoProps {
  language: Language;
}

const LoginInfo: React.FC<LoginInfoProps> = ({ language }) => {
  const isArabic = language === 'ar';

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center space-y-6">
      <div className="max-w-xl space-y-6">
        <h1 className={`text-4xl font-bold ${isArabic ? "font-[Tajawal]" : ""}`}>
          {isArabic ? "نظام نقاط البيع للمطاعم" : "Restaurant POS System"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {isArabic 
            ? "نظام متكامل لإدارة المطاعم والمقاهي يشمل إدارة المبيعات، المخزون، التقارير، والمزيد"
            : "Complete system for managing restaurants and cafes including sales, inventory, reports, and more"}
        </p>
        
        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            <span className="text-lg">0581283398</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">
              {isArabic ? "للدعم الفني والاستفسارات" : "For technical support and inquiries"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInfo;
