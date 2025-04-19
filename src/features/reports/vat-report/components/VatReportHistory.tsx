
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { VatReportItem } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { formatCurrency } from '@/utils/formatters';

interface VatReportHistoryProps {
  reports: VatReportItem[];
  onSelectReport: (report: VatReportItem) => void;
}

const VatReportHistory: React.FC<VatReportHistoryProps> = ({ reports, onSelectReport }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const locale = isArabic ? ar : enUS;
  
  const formatDate = (dateValue: string | Date) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return format(date, 'PPP', { locale });
  };
  
  const getPeriodTypeText = (type: string) => {
    switch (type) {
      case 'monthly': return isArabic ? 'شهري' : 'Monthly';
      case 'quarterly': return isArabic ? 'ربع سنوي' : 'Quarterly';
      case 'annual': return isArabic ? 'سنوي' : 'Annual';
      default: return type;
    }
  };
  
  // Sort reports by date (most recent first)
  const sortedReports = [...reports].sort((a, b) => {
    const endDateA = a.period.endDate instanceof Date ? a.period.endDate : new Date(a.period.endDate);
    const endDateB = b.period.endDate instanceof Date ? b.period.endDate : new Date(b.period.endDate);
    return endDateB.getTime() - endDateA.getTime();
  });
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isArabic ? 'الفترة' : 'Period'}</TableHead>
            <TableHead>{isArabic ? 'النوع' : 'Type'}</TableHead>
            <TableHead className="text-right">{isArabic ? 'ضريبة المبيعات' : 'Sales Tax'}</TableHead>
            <TableHead className="text-right">{isArabic ? 'ضريبة المشتريات' : 'Purchases Tax'}</TableHead>
            <TableHead className="text-right">{isArabic ? 'الضريبة المستحقة' : 'Tax Due'}</TableHead>
            <TableHead className="text-center">{isArabic ? 'إجراءات' : 'Actions'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedReports.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                {isArabic ? 'لا توجد تقارير سابقة' : 'No previous reports'}
              </TableCell>
            </TableRow>
          ) : (
            sortedReports.map((report, index) => (
              <TableRow key={index}>
                <TableCell>
                  {formatDate(report.period.startDate)} - {formatDate(report.period.endDate)}
                </TableCell>
                <TableCell>{getPeriodTypeText(report.period.type)}</TableCell>
                <TableCell className="text-right">{formatCurrency(report.salesTax)}</TableCell>
                <TableCell className="text-right">{formatCurrency(report.purchasesTax)}</TableCell>
                <TableCell className="text-right">{formatCurrency(report.netTaxDue)}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="sm" onClick={() => onSelectReport(report)}>
                    <FileText className="h-4 w-4 mr-2" />
                    {isArabic ? 'عرض' : 'View'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VatReportHistory;
