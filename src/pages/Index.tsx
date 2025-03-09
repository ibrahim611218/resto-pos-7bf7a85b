
import React from "react";
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Users,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GlassCard from "@/components/ui-custom/GlassCard";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { Language } from "@/types";

interface DashboardProps {
  language: Language;
}

const Dashboard = ({ language }: DashboardProps) => {
  const isArabic = language === "ar";
  
  const stats = [
    {
      title: isArabic ? "إجمالي المبيعات اليوم" : "Today's Sales",
      value: "2,854.50 SAR",
      change: "+12.5%",
      icon: <DollarSign className="text-white" size={20} />,
      iconBg: "bg-primary",
    },
    {
      title: isArabic ? "معاملات اليوم" : "Today's Transactions",
      value: "42",
      change: "+4.2%",
      icon: <CreditCard className="text-white" size={20} />,
      iconBg: "bg-green-500",
    },
    {
      title: isArabic ? "المنتجات النشطة" : "Active Products",
      value: "278",
      change: "+8",
      icon: <ShoppingBag className="text-white" size={20} />,
      iconBg: "bg-blue-500",
    },
    {
      title: isArabic ? "العملاء" : "Customers",
      value: "1,429",
      change: "+4",
      icon: <Users className="text-white" size={20} />,
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <div 
      className={`space-y-6 p-6 pb-16 ${isArabic ? "font-[system-ui]" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {isArabic ? "لوحة التحكم" : "Dashboard"}
        </h2>
        <p className="text-muted-foreground">
          {isArabic
            ? "نظرة عامة على أداء مطعمك"
            : "Overview of your restaurant's performance"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <GlassCard 
            key={stat.title} 
            animation="slide-up" 
            delay={index * 100}
            hover
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.iconBg}`}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center pt-4 text-xs text-green-500">
              <TrendingUp size={14} className="mr-1" />
              <span>{stat.change}</span>
              <span className="text-muted-foreground ml-1">
                {isArabic ? "من الأمس" : "from yesterday"}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <GlassCard 
          className="lg:col-span-2" 
          animation="fade" 
          delay={200}
          hover
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {isArabic ? "مبيعات هذا الأسبوع" : "Sales This Week"}
            </h3>
            <BarChart3 size={20} className="text-muted-foreground" />
          </div>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            {isArabic ? "رسم بياني للمبيعات" : "Sales Chart"}
          </div>
        </GlassCard>

        <GlassCard animation="fade" delay={300} hover>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {isArabic ? "أفضل المنتجات" : "Top Products"}
            </h3>
            <ShoppingBag size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <AnimatedTransition
                key={item}
                animation="fade"
                delay={300 + item * 50}
              >
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center mr-3">
                      <ShoppingBag size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {isArabic ? `المنتج ${item}` : `Product ${item}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {`${20 - item * 2} ${
                          isArabic ? "المبيعات" : "sales"
                        }`}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {`${120 - item * 15} ${isArabic ? "ر.س" : "SAR"}`}
                  </p>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
