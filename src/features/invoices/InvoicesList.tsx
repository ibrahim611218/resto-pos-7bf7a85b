
import React from "react";
import { FileTextIcon, PrinterIcon, SearchIcon } from "lucide-react";
import { useInvoices } from "./hooks/useInvoices";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/utils/invoice";
import InvoiceDetailsModal from "./components/InvoiceDetailsModal";

interface InvoicesListProps {
  language?: "en" | "ar";
}

const InvoicesList: React.FC<InvoicesListProps> = ({ language = "ar" }) => {
  const isArabic = language === "ar";
  const {
    filteredInvoices,
    selectedInvoice,
    searchTerm,
    setSearchTerm,
    viewInvoiceDetails,
    closeInvoiceDetails,
    formatInvoiceDate,
    getStatusBadgeColor,
    printInvoice
  } = useInvoices();

  return (
    <div className="container mx-auto py-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isArabic ? "الفواتير" : "Invoices"}
        </h1>
        <div className="relative w-64">
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10 w-full"
            placeholder={isArabic ? "بحث عن فاتورة..." : "Search invoices..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="all" className="flex-1">
            {isArabic ? "جميع الفواتير" : "All Invoices"}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            {isArabic ? "مكتملة" : "Completed"}
          </TabsTrigger>
          <TabsTrigger value="refunded" className="flex-1">
            {isArabic ? "مستردة" : "Refunded"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {isArabic ? "قائمة الفواتير" : "Invoices List"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">{isArabic ? "رقم الفاتورة" : "Invoice #"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "التاريخ" : "Date"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "العميل" : "Customer"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "الإجمالي" : "Total"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "الحالة" : "Status"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "الإجراءات" : "Actions"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{invoice.number}</td>
                        <td className="py-3 px-4">{formatInvoiceDate(invoice.date)}</td>
                        <td className="py-3 px-4">{invoice.customer?.name || "عميل عادي"}</td>
                        <td className="py-3 px-4">{formatCurrency(invoice.total, isArabic ? "ar-SA" : "en-US", "SAR")}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-white text-xs ${getStatusBadgeColor(invoice.status)}`}>
                            {isArabic 
                              ? invoice.status === "completed" 
                                ? "مكتملة" 
                                : invoice.status === "cancelled" 
                                  ? "ملغاة" 
                                  : "مستردة"
                              : invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 justify-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => viewInvoiceDetails(invoice.id)}
                              className="h-8 px-2"
                            >
                              <FileTextIcon className="h-4 w-4" />
                              <span className="sr-only">
                                {isArabic ? "عرض" : "View"}
                              </span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => printInvoice(invoice)}
                              className="h-8 px-2"
                            >
                              <PrinterIcon className="h-4 w-4" />
                              <span className="sr-only">
                                {isArabic ? "طباعة" : "Print"}
                              </span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredInvoices.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    {isArabic ? "لا توجد فواتير متطابقة مع البحث" : "No invoices found"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">{isArabic ? "رقم الفاتورة" : "Invoice #"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "التاريخ" : "Date"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "العميل" : "Customer"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "الإجمالي" : "Total"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "الإجراءات" : "Actions"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices
                      .filter(invoice => invoice.status === "completed")
                      .map((invoice) => (
                        <tr key={invoice.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{invoice.number}</td>
                          <td className="py-3 px-4">{formatInvoiceDate(invoice.date)}</td>
                          <td className="py-3 px-4">{invoice.customer?.name || "عميل عادي"}</td>
                          <td className="py-3 px-4">{formatCurrency(invoice.total, isArabic ? "ar-SA" : "en-US", "SAR")}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2 justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => viewInvoiceDetails(invoice.id)}
                                className="h-8 px-2"
                              >
                                <FileTextIcon className="h-4 w-4" />
                                <span className="sr-only">
                                  {isArabic ? "عرض" : "View"}
                                </span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => printInvoice(invoice)}
                                className="h-8 px-2"
                              >
                                <PrinterIcon className="h-4 w-4" />
                                <span className="sr-only">
                                  {isArabic ? "طباعة" : "Print"}
                                </span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunded" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">{isArabic ? "رقم الفاتورة" : "Invoice #"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "التاريخ" : "Date"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "العميل" : "Customer"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "الإجمالي" : "Total"}</th>
                      <th className="text-right py-3 px-4">{isArabic ? "الإجراءات" : "Actions"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices
                      .filter(invoice => invoice.status === "refunded")
                      .map((invoice) => (
                        <tr key={invoice.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{invoice.number}</td>
                          <td className="py-3 px-4">{formatInvoiceDate(invoice.date)}</td>
                          <td className="py-3 px-4">{invoice.customer?.name || "عميل عادي"}</td>
                          <td className="py-3 px-4">{formatCurrency(invoice.total, isArabic ? "ar-SA" : "en-US", "SAR")}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2 justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => viewInvoiceDetails(invoice.id)}
                                className="h-8 px-2"
                              >
                                <FileTextIcon className="h-4 w-4" />
                                <span className="sr-only">
                                  {isArabic ? "عرض" : "View"}
                                </span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => printInvoice(invoice)}
                                className="h-8 px-2"
                              >
                                <PrinterIcon className="h-4 w-4" />
                                <span className="sr-only">
                                  {isArabic ? "طباعة" : "Print"}
                                </span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <InvoiceDetailsModal
        invoice={selectedInvoice}
        open={!!selectedInvoice}
        onClose={closeInvoiceDetails}
        formatInvoiceDate={formatInvoiceDate}
        onPrint={printInvoice}
      />
    </div>
  );
};

export default InvoicesList;
