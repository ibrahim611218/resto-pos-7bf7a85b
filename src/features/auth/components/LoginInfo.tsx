
import React from 'react';
import { Phone, HelpCircle } from 'lucide-react';
import { Language } from '@/types';
import Image from '@/components/ui/image';

interface LoginInfoProps {
  language: Language;
}

const LoginInfo: React.FC<LoginInfoProps> = ({ language }) => {
  const isArabic = language === 'ar';

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center space-y-6">
      <div className="max-w-xl space-y-6">
        <div className="flex flex-col items-center justify-center mb-6">
          <Image 
            src="/lovable-uploads/964401f3-c14b-4749-bafd-81c3ba741526.png" 
            alt="RestoPOS Logo" 
            width={200} 
            height={200} 
            className="mb-4 object-contain max-w-full h-auto"
          />
          <h1 className={`text-4xl font-bold ${isArabic ? "font-[Tajawal]" : ""}`}>
            {isArabic ? "نظام نقاط البيع للمطاعم" : "Restaurant POS System"}
          </h1>
        </div>
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
