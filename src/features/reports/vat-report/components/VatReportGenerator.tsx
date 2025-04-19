import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { VatReportPeriod } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { CalendarIcon, FileSpreadsheet } from 'lucide-react';

interface VatReportGeneratorProps {
  onGenerateReport: (period: VatReportPeriod) => Promise<void>;
}

const VatReportGenerator: React.FC<VatReportGeneratorProps> = ({ onGenerateReport }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const locale = isArabic ? ar : enUS;
  
  const [reportType, setReportType] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  
  const handleReportTypeChange = (type: 'monthly' | 'quarterly' | 'annual') => {
    setReportType(type);
    
    // Calculate default period based on type
    const now = new Date();
    let start: Date = new Date();
    let end: Date = new Date();
    
    switch (type) {
      case 'monthly':
        // Current month
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'quarterly':
        // Current quarter
        const quarter = Math.floor(now.getMonth() / 3);
        start = new Date(now.getFullYear(), quarter * 3, 1);
        end = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
        break;
      case 'annual':
        // Current year
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
    }
    
    setStartDate(start);
    setEndDate(end);
  };
  
  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      return;
    }
    
    const period: VatReportPeriod = {
      startDate,
      endDate,
      type: reportType // Now matches the updated interface
    };
    
    onGenerateReport(period);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label>{isArabic ? 'نوع التقرير' : 'Report Type'}</Label>
          <Select value={reportType} onValueChange={(value: 'monthly' | 'quarterly' | 'annual') => handleReportTypeChange(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">{isArabic ? 'شهري' : 'Monthly'}</SelectItem>
              <SelectItem value="quarterly">{isArabic ? 'ربع سنوي' : 'Quarterly'}</SelectItem>
              <SelectItem value="annual">{isArabic ? 'سنوي' : 'Annual'}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>{isArabic ? 'تاريخ البداية' : 'Start Date'}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP", { locale }) : (isArabic ? 'اختر تاريخ البداية' : 'Select start date')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                locale={locale}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label>{isArabic ? 'تاريخ النهاية' : 'End Date'}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP", { locale }) : (isArabic ? 'اختر تاريخ النهاية' : 'Select end date')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                locale={locale}
                disabled={(date) => date < (startDate || new Date(0))}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button onClick={handleGenerateReport}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          {isArabic ? 'إنشاء التقرير' : 'Generate Report'}
        </Button>
      </div>
    </div>
  );
};

export default VatReportGenerator;
