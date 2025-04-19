
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { VatReportItem } from '@/types';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { formatCurrency } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, Printer } from 'lucide-react';
import { exportVatReportToExcel, printVatReport } from '../utils/export-utils';

interface VatReportSummaryProps {
  report: VatReportItem;
}

const VatReportSummary: React.FC<VatReportSummaryProps> = ({ report }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const locale = isArabic ? ar : enUS;
  
  const formatDate = (dateValue: string | Date) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return format(date, 'PPP', { locale });
  };
  
  const handlePrint = () => {
    printVatReport(report, isArabic);
  };
  
  const handleExportExcel = () => {
    exportVatReportToExcel(report, isArabic);
  };
  
  const getPeriodTypeText = (type: string) => {
    switch (type) {
      case 'monthly': return isArabic ? 'شهري' : 'Monthly';
      case 'quarterly': return isArabic ? 'ربع سنوي' : 'Quarterly';
      case 'annual': return isArabic ? 'سنوي' : 'Annual';
      default: return type;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-1">
          {isArabic ? 'تقرير ضريبة القيمة المضافة' : 'VAT Report'}
        </h2>
        <p className="text-muted-foreground">
          {isArabic ? 'الفترة:' : 'Period:'} {formatDate(report.period.startDate)} - {formatDate(report.period.endDate)}
        </p>
        <p className="text-muted-foreground">
          {isArabic ? 'نوع التقرير:' : 'Report Type:'} {getPeriodTypeText(report.period.type)}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-blue-50 dark:bg-blue-900/20">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">
              {isArabic ? 'المبيعات' : 'Sales'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{isArabic ? 'إجمالي المبيعات (قبل الضريبة):' : 'Total Sales (before tax):'}</span>
                <span className="font-bold">{formatCurrency(report.totalSalesBeforeTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>{isArabic ? 'ضريبة المبيعات:' : 'Sales Tax:'}</span>
                <span className="font-bold">{formatCurrency(report.salesTax)}</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-green-50 dark:bg-green-900/20">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">
              {isArabic ? 'المشتريات' : 'Purchases'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{isArabic ? 'إجمالي المشتريات (قبل الضريبة):' : 'Total Purchases (before tax):'}</span>
                <span className="font-bold">{formatCurrency(report.totalPurchasesBeforeTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>{isArabic ? 'ضريبة المشتريات:' : 'Purchases Tax:'}</span>
                <span className="font-bold">{formatCurrency(report.purchasesTax)}</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-red-50 dark:bg-red-900/20 md:col-span-2 lg:col-span-1">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">
              {isArabic ? 'صافي الضريبة المستحقة' : 'Net Tax Due'}
            </h3>
            <div className="flex justify-between items-center">
              <span>{isArabic ? 'ضريبة المبيعات - ضريبة المشتريات:' : 'Sales Tax - Purchases Tax:'}</span>
              <span className="text-xl font-bold">
                {formatCurrency(report.netTaxDue)}
              </span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          {isArabic ? 'طباعة' : 'Print'}
        </Button>
        <Button onClick={handleExportExcel}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          {isArabic ? 'تصدير إكسل' : 'Export Excel'}
        </Button>
      </div>
    </div>
  );
};

export default VatReportSummary;
