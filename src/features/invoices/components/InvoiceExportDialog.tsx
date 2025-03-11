
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Invoice, BusinessSettings, InvoiceExportType } from "@/types";
import { Printer, FileDown, Mail } from "lucide-react";
import { handleInvoiceExport } from "@/utils/invoice";

interface InvoiceExportDialogProps {
  open: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  businessSettings: BusinessSettings;
  language?: "en" | "ar";
}

const InvoiceExportDialog: React.FC<InvoiceExportDialogProps> = ({
  open,
  onClose,
  invoice,
  businessSettings,
  language = "ar"
}) => {
  const isArabic = language === "ar";
  const [email, setEmail] = useState("");

  if (!invoice) return null;

  const handleExport = (type: InvoiceExportType) => {
    handleInvoiceExport(type, invoice, businessSettings, email);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "تصدير الفاتورة" : "Export Invoice"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <p className="text-center text-sm text-muted-foreground mb-6">
            {isArabic
              ? `اختر طريقة تصدير الفاتورة رقم ${invoice.number}`
              : `Choose how to export invoice #${invoice.number}`}
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-4"
              onClick={() => handleExport("print")}
            >
              <Printer className="h-6 w-6 mb-2" />
              <span>{isArabic ? "طباعة" : "Print"}</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-4"
              onClick={() => handleExport("pdf")}
            >
              <FileDown className="h-6 w-6 mb-2" />
              <span>PDF</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-auto py-4"
              onClick={() => handleExport("email")}
            >
              <Mail className="h-6 w-6 mb-2" />
              <span>{isArabic ? "بريد" : "Email"}</span>
            </Button>
          </div>
          
          <div className="pt-4">
            <Label htmlFor="email">{isArabic ? "البريد الإلكتروني" : "Email"}</Label>
            <Input
              id="email"
              type="email"
              placeholder={isArabic ? "أدخل البريد الإلكتروني للعميل" : "Enter customer email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {isArabic 
                ? "مطلوب فقط عند اختيار إرسال بالبريد الإلكتروني" 
                : "Required only when sending via email"}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceExportDialog;
