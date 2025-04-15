
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useTheme } from "@/context/ThemeContext";

interface InvoiceQRCodeProps {
  qrCodeData: string;
  notes?: string;
}

export const InvoiceQRCode: React.FC<InvoiceQRCodeProps> = ({ 
  qrCodeData,
  notes
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <>
      <div className="flex justify-center print:block print:w-full">
        <div className={`p-2 rounded border ${isDark ? 'bg-white' : 'bg-white'} border-gray-200 print:bg-white print:mx-auto print:my-3 print:block`}>
          <QRCodeSVG 
            value={qrCodeData || ""}
            size={120}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="H"
            includeMargin={true}
            className="print:block"
            style={{
              width: '120px',
              height: '120px',
              display: 'block'
            }}
          />
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
