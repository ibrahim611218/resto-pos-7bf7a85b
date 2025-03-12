
import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface InvoiceQRCodeProps {
  qrCodeData: string;
  notes?: string;
}

export const InvoiceQRCode: React.FC<InvoiceQRCodeProps> = ({ 
  qrCodeData,
  notes
}) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white p-2 rounded">
          <QRCodeSVG value={qrCodeData} size={120} />
        </div>
      </div>
      
      {notes && (
        <div className="text-center text-sm text-muted-foreground border-t pt-2">
          {notes}
        </div>
      )}
    </>
  );
};
