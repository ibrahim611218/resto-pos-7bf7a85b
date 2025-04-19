
import React, { useState } from 'react';
import { PurchaseInvoice } from '@/types';
import PurchaseDialog from './components/PurchaseDialog';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import PurchaseDetailsDialog from './components/PurchaseDetailsDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PurchaseSearch from './components/PurchaseSearch';
import PurchasesTable from './components/PurchasesTable';
import { usePurchases } from './hooks/usePurchases';

interface PurchasesListProps {
  language: "en" | "ar";
}

const PurchasesList: React.FC<PurchasesListProps> = ({ language }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseInvoice | null>(null);

  const {
    filteredPurchases,
    searchTerm,
    setSearchTerm,
    handleSavePurchase,
    handleDeletePurchase,
    isArabic
  } = usePurchases();

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

  const onDelete = (purchase: PurchaseInvoice) => {
    setSelectedPurchase(purchase);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPurchase) {
      await handleDeletePurchase(selectedPurchase.id);
      setDeleteDialogOpen(false);
      setSelectedPurchase(null);
    }
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
          <PurchaseSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isArabic={isArabic}
          />
          
          <div className="border rounded-md">
            <PurchasesTable
              purchases={filteredPurchases}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={onDelete}
              isArabic={isArabic}
            />
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
        onConfirm={confirmDelete}
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
