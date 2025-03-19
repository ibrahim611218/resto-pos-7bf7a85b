
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { mockInvoices } from './data/mockInvoices';
import InvoiceDetailsModal from './components/InvoiceDetailsModal';
import { Invoice } from '@/types';

const RetrieveInvoice = () => {
  const [invoiceId, setInvoiceId] = useState('');
  const [foundInvoice, setFoundInvoice] = useState<Invoice | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState('');
  
  const handleSearch = () => {
    // Clear previous states
    setError('');
    setFoundInvoice(null);
    
    if (!invoiceId.trim()) {
      setError('الرجاء إدخال رقم الفاتورة');
      return;
    }
    
    // In a real app, this would be an API call
    const invoice = mockInvoices.find(inv => inv.invoiceNumber === invoiceId);
    
    if (invoice) {
      setFoundInvoice(invoice);
      setShowDetails(true);
    } else {
      setError('لم يتم العثور على فاتورة بهذا الرقم');
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">استرجاع فاتورة</CardTitle>
          <CardDescription>ادخل رقم الفاتورة للبحث عنها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Input
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              placeholder="رقم الفاتورة"
              className="flex-1"
              dir="rtl"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              بحث
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
          onOpenChange={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default RetrieveInvoice;
