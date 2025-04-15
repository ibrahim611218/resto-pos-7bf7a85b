
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import InvoiceDetailsModal from './components/InvoiceDetailsModal';
import { Invoice } from '@/types';
import { useBusinessSettings } from '@/hooks/useBusinessSettings';
import { useLanguage } from '@/context/LanguageContext';
import { useInvoiceData } from './hooks/useInvoiceData';
import { useInvoiceFormatting } from './hooks/useInvoiceFormatting';

const RetrieveInvoice = () => {
  const [invoiceId, setInvoiceId] = useState('');
  const [foundInvoice, setFoundInvoice] = useState<Invoice | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState('');
  
  const { settings } = useBusinessSettings();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { invoices } = useInvoiceData();
  const { formatInvoiceDate, printInvoice } = useInvoiceFormatting();
  
  const handleSearch = () => {
    // Clear previous states
    setError('');
    setFoundInvoice(null);
    
    if (!invoiceId.trim()) {
      setError(isArabic ? 'الرجاء إدخال رقم الفاتورة' : 'Please enter an invoice number');
      return;
    }
    
    // Search in actual invoices from useInvoiceData
    const invoice = invoices.find(inv => inv.number === invoiceId);
    
    if (invoice) {
      setFoundInvoice(invoice);
      setShowDetails(true);
    } else {
      setError(isArabic ? 'لم يتم العثور على فاتورة بهذا الرقم' : 'No invoice found with this number');
    }
  };
  
  return (
    <div className="container mx-auto p-4" dir={isArabic ? "rtl" : "ltr"}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            {isArabic ? "استرجاع فاتورة" : "Retrieve Invoice"}
          </CardTitle>
          <CardDescription>
            {isArabic ? "ادخل رقم الفاتورة للبحث عنها" : "Enter invoice number to search"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`flex ${isArabic ? "space-x-reverse" : "space-x-2"}`}>
            <Input
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              placeholder={isArabic ? "رقم الفاتورة" : "Invoice Number"}
              className="flex-1"
              dir={isArabic ? "rtl" : "ltr"}
            />
            <Button onClick={handleSearch}>
              <Search className={`h-4 w-4 ${isArabic ? "ml-2" : "mr-2"}`} />
              {isArabic ? "بحث" : "Search"}
            </Button>
          </div>
          
          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
        </CardContent>
      </Card>
      
      {showDetails && foundInvoice && (
        <InvoiceDetailsModal
          invoice={foundInvoice}
          open={showDetails}
          onClose={() => setShowDetails(false)}
          formatInvoiceDate={formatInvoiceDate}
          onPrint={() => printInvoice(foundInvoice)}
        />
      )}
    </div>
  );
};

export default RetrieveInvoice;
