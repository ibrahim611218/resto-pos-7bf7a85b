
import React from "react";
import { Button } from "@/components/ui/button";
import { Invoice, BusinessSettings } from "@/types";
import { handleInvoiceExport } from "@/utils/invoice";

interface EmailDialogProps {
  email: string;
  setEmail: (email: string) => void;
  invoice: Invoice;
  settings: BusinessSettings;
  onClose: () => void;
  show: boolean;
}

export const EmailDialog: React.FC<EmailDialogProps> = ({
  email,
  setEmail,
  invoice,
  settings,
  onClose,
  show
}) => {
  if (!show) return null;
  
  return (
    <div className="border-t pt-3 mt-2">
      <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
      <div className="flex gap-2">
        <input
          type="email"
          className="flex-1 border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="أدخل البريد الإلكتروني"
        />
        <Button 
          onClick={() => {
            handleInvoiceExport("email", invoice, settings, email);
            onClose();
          }}
          disabled={!email}
        >
          إرسال
        </Button>
      </div>
    </div>
  );
};
