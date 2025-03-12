
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch } from "lucide-react";
import { useInvoiceSearch } from "@/features/pos/hooks/useInvoiceSearch";
import InvoiceDetailsModal from "./components/InvoiceDetailsModal";
import { formatInvoiceDate } from "@/features/pos/utils/formatters";

const RetrieveInvoice: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const {
    invoiceNumber,
    setInvoiceNumber,
    currentInvoice,
    setCurrentInvoice,
    showInvoiceModal,
    setShowInvoiceModal,
    handleInvoiceSearch,
    handleRefundInvoice,
  } = useInvoiceSearch();

  const handlePrintInvoice = (invoice: any) => {
    window.print();
  };

  return (
    <div
      className="container mx-auto py-6"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <FileSearch className="h-6 w-6" />
            {isArabic ? "استرجاع الفاتورة" : "Retrieve Invoice"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {isArabic ? "رقم الفاتورة" : "Invoice Number"}
            </label>
            <div className="flex gap-2">
              <Input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder={isArabic ? "ادخل رقم الفاتورة" : "Enter invoice number"}
                className="flex-1"
              />
              <Button onClick={handleInvoiceSearch}>
                {isArabic ? "بحث" : "Search"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {isArabic
                ? "أدخل رقم الفاتورة للبحث عنها واسترجاعها"
                : "Enter the invoice number to search and retrieve it"}
            </p>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-md">
            <h3 className="font-medium mb-2">
              {isArabic ? "تعليمات" : "Instructions"}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                {isArabic
                  ? "أدخل رقم الفاتورة كاملاً كما هو مطبوع على الفاتورة"
                  : "Enter the complete invoice number as printed on the invoice"}
              </li>
              <li>
                {isArabic
                  ? "يمكنك طباعة الفاتورة أو إرجاعها"
                  : "You can print or refund the invoice"}
              </li>
              <li>
                {isArabic
                  ? "للفواتير القديمة يرجى مراجعة صفحة الفواتير"
                  : "For older invoices, please check the Invoices page"}
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <InvoiceDetailsModal
        invoice={currentInvoice}
        open={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        formatInvoiceDate={(date) => formatInvoiceDate(date, language)}
        onPrint={handlePrintInvoice}
        onRefund={handleRefundInvoice}
      />
    </div>
  );
};

export default RetrieveInvoice;
