
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const ReportsPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold mb-4">
        {isArabic ? "التقارير" : "Reports"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">
            {isArabic ? "تقرير المبيعات" : "Sales Report"}
          </h2>
          <p className="text-gray-600 mb-4">
            {isArabic 
              ? "عرض تقارير المبيعات والإيرادات" 
              : "View sales and revenue reports"}
          </p>
          <a href="/sales-report" className="text-primary hover:underline">
            {isArabic ? "عرض التقرير" : "View Report"} →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">
            {isArabic ? "تقرير المخزون" : "Inventory Report"}
          </h2>
          <p className="text-gray-600 mb-4">
            {isArabic 
              ? "مراقبة حالة المخزون والمنتجات" 
              : "Monitor inventory and product status"}
          </p>
          <a href="/inventory-report" className="text-primary hover:underline">
            {isArabic ? "عرض التقرير" : "View Report"} →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">
            {isArabic ? "تقرير العملاء" : "Customers Report"}
          </h2>
          <p className="text-gray-600 mb-4">
            {isArabic 
              ? "تحليل بيانات العملاء والمبيعات" 
              : "Analyze customer data and sales"}
          </p>
          <a href="/customers-report" className="text-primary hover:underline">
            {isArabic ? "عرض التقرير" : "View Report"} →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">
            {isArabic ? "تقرير ضريبة القيمة المضافة" : "VAT Report"}
          </h2>
          <p className="text-gray-600 mb-4">
            {isArabic 
              ? "عرض تقارير ضريبة القيمة المضافة" 
              : "View VAT tax reports"}
          </p>
          <a href="/vat-report" className="text-primary hover:underline">
            {isArabic ? "عرض التقرير" : "View Report"} →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
