
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { VatReportItem, VatReportPeriod } from '@/types';
import vatReportService from '@/services/reports/VatReportService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VatReportGenerator from './components/VatReportGenerator';
import VatReportSummary from './components/VatReportSummary';
import VatReportHistory from './components/VatReportHistory';
import { toast } from 'sonner';
import LoadingState from './components/LoadingState';
import { useReportsSync } from '@/hooks/useReportsSync';

const VatReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [loading, setLoading] = useState<boolean>(false);
  const [currentReport, setCurrentReport] = useState<VatReportItem | null>(null);
  const [reportsHistory, setReportsHistory] = useState<VatReportItem[]>([]);
  
  // Sync reports with invoices
  useReportsSync();
  
  useEffect(() => {
    loadReportsHistory();
  }, []);
  
  // Listen for reports data updates
  useEffect(() => {
    const handleReportsUpdate = () => {
      loadReportsHistory();
    };
    
    window.addEventListener('reports-data-updated', handleReportsUpdate);
    return () => window.removeEventListener('reports-data-updated', handleReportsUpdate);
  }, []);
  
  const loadReportsHistory = async () => {
    try {
      const history = await vatReportService.getVatReportsHistory();
      setReportsHistory(history);
    } catch (error) {
      console.error('Error loading VAT reports history:', error);
      toast.error(
        isArabic 
          ? 'حدث خطأ أثناء تحميل سجل تقارير ضريبة القيمة المضافة' 
          : 'Error loading VAT reports history'
      );
    }
  };
  
  const handleGenerateReport = async (period: VatReportPeriod) => {
    setLoading(true);
    try {
      const report = await vatReportService.generateVatReport(period);
      setCurrentReport(report);
      await loadReportsHistory(); // Refresh history
      toast.success(
        isArabic 
          ? 'تم إنشاء التقرير الضريبي بنجاح' 
          : 'VAT report generated successfully'
      );
    } catch (error) {
      console.error('Error generating VAT report:', error);
      toast.error(
        isArabic 
          ? 'حدث خطأ أثناء إنشاء التقرير الضريبي' 
          : 'Error generating VAT report'
      );
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectReportFromHistory = (report: VatReportItem) => {
    setCurrentReport(report);
  };
  
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{isArabic ? 'تقرير ضريبة القيمة المضافة' : 'VAT Report'}</CardTitle>
        </CardHeader>
        <CardContent>
          <VatReportGenerator onGenerateReport={handleGenerateReport} />
        </CardContent>
      </Card>
      
      {loading ? (
        <LoadingState message={isArabic ? 'جاري إنشاء التقرير...' : 'Generating report...'} />
      ) : (
        <>
          {currentReport && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{isArabic ? 'ملخص التقرير' : 'Report Summary'}</CardTitle>
              </CardHeader>
              <CardContent>
                <VatReportSummary report={currentReport} />
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'سجل التقارير' : 'Reports History'}</CardTitle>
            </CardHeader>
            <CardContent>
              <VatReportHistory 
                reports={reportsHistory} 
                onSelectReport={handleSelectReportFromHistory} 
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default VatReport;
