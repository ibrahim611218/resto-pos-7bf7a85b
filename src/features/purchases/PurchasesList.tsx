
import React, { useEffect, useState } from 'react';
import { PurchaseInvoice, Language } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import purchasesService from '@/services/purchases/PurchasesService';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Trash2, Edit, FileSpreadsheet } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import PurchaseDialog from './components/PurchaseDialog';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import { toast } from 'sonner';
import PurchaseDetailsDialog from './components/PurchaseDetailsDialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface PurchasesListProps {
  language: Language;
}

const PurchasesList: React.FC<PurchasesListProps> = ({ language }) => {
  const { language: contextLanguage } = useLanguage();
  const isArabic = (language || contextLanguage) === 'ar';
  
  const [purchases, setPurchases] = useState<PurchaseInvoice[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<PurchaseInvoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseInvoice | null>(null);
  
  useEffect(() => {
    loadPurchases();
  }, []);
  
  useEffect(() => {
    filterPurchases();
  }, [purchases, searchTerm]);
  
  const loadPurchases = async () => {
    try {
      const purchasesList = await purchasesService.getPurchaseInvoices();
      setPurchases(purchasesList);
      setFilteredPurchases(purchasesList);
    } catch (error) {
      console.error('Error loading purchases:', error);
    }
  };
  
  const filterPurchases = () => {
    if (!searchTerm.trim()) {
      setFilteredPurchases(purchases);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = purchases.filter(purchase => 
      purchase.invoiceNumber.toLowerCase().includes(term) ||
      purchase.supplier.name.toLowerCase().includes(term)
    );
    setFilteredPurchases(filtered);
  };
  
  const handleSavePurchase = async (purchase: PurchaseInvoice) => {
    try {
      await purchasesService.savePurchaseInvoice(purchase);
      toast.success(isArabic ? 'تم حفظ فاتورة الشراء بنجاح' : 'Purchase invoice saved successfully');
      loadPurchases();
      setDialogOpen(false);
      setSelectedPurchase(null);
    } catch (error) {
      console.error('Error saving purchase:', error);
      toast.error(isArabic ? 'حدث خطأ أثناء حفظ الفاتورة' : 'Error saving the invoice');
    }
  };
  
  const handleDeletePurchase = async () => {
    if (!selectedPurchase) return;
    
    try {
      await purchasesService.deletePurchaseInvoice(selectedPurchase.id);
      toast.success(isArabic ? 'تم حذف فاتورة الشراء بنجاح' : 'Purchase invoice deleted successfully');
      loadPurchases();
      setDeleteDialogOpen(false);
      setSelectedPurchase(null);
    } catch (error) {
      console.error('Error deleting purchase:', error);
      toast.error(isArabic ? 'حدث خطأ أثناء حذف الفاتورة' : 'Error deleting the invoice');
    }
  };
  
  const handleAddNew = () => {
    setSelectedPurchase(null);
    setDialogOpen(true);
  };
  
  const handleEdit = (purchase: PurchaseInvoice) => {
    setSelectedPurchase(purchase);
    setDialogOpen(true);
  };
  
  const handleView = (purchase: PurchaseInvoice) => {
    setSelectedPurchase(purchase);
    setDetailsDialogOpen(true);
  };
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', options);
  };
  
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {isArabic ? 'فواتير المشتريات' : 'Purchase Invoices'}
          </CardTitle>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            {isArabic ? 'إضافة فاتورة جديدة' : 'Add New Purchase'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder={isArabic ? 'بحث عن فاتورة...' : 'Search invoices...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isArabic ? 'رقم الفاتورة' : 'Invoice #'}</TableHead>
                  <TableHead>{isArabic ? 'المورد' : 'Supplier'}</TableHead>
                  <TableHead>{isArabic ? 'التاريخ' : 'Date'}</TableHead>
                  <TableHead>{isArabic ? 'المجموع' : 'Total'}</TableHead>
                  <TableHead>{isArabic ? 'حالة الدفع' : 'Payment Status'}</TableHead>
                  <TableHead>{isArabic ? 'الإجراءات' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      {isArabic ? 'لا توجد فواتير مشتريات' : 'No purchase invoices found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPurchases.map(purchase => (
                    <TableRow key={purchase.id}>
                      <TableCell>{purchase.invoiceNumber}</TableCell>
                      <TableCell>{isArabic && purchase.supplier.nameAr ? purchase.supplier.nameAr : purchase.supplier.name}</TableCell>
                      <TableCell>{formatDate(purchase.date)}</TableCell>
                      <TableCell>{formatCurrency(purchase.total)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          purchase.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          purchase.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {isArabic 
                            ? purchase.paymentStatus === 'paid' ? 'مدفوع' :
                              purchase.paymentStatus === 'partial' ? 'مدفوع جزئياً' :
                              'غير مدفوع'
                            : purchase.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleView(purchase)}>
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(purchase)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive" onClick={() => {
                            setSelectedPurchase(purchase);
                            setDeleteDialogOpen(true);
                          }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PurchaseDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={selectedPurchase}
        onSave={handleSavePurchase}
        language={language}
      />
      
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeletePurchase}
        language={language}
        title={isArabic ? 'حذف فاتورة الشراء' : 'Delete Purchase Invoice'}
        description={isArabic 
          ? 'هل أنت متأكد من رغبتك في حذف فاتورة الشراء هذه؟ لا يمكن التراجع عن هذا الإجراء.'
          : 'Are you sure you want to delete this purchase invoice? This action cannot be undone.'
        }
      />
      
      <PurchaseDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        purchase={selectedPurchase}
        language={language}
      />
    </div>
  );
};

export default PurchasesList;
