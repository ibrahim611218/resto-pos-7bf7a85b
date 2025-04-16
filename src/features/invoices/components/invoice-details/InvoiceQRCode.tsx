
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useTheme } from "@/context/ThemeContext";
import { Barcode } from "lucide-react";

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
  
  const parsedData = React.useMemo(() => {
    try {
      return JSON.parse(qrCodeData);
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      return { total: 0 };
    }
  }, [qrCodeData]);
  
  return (
    <>
      <div className="flex flex-col items-center gap-4 print:block print:w-full">
        {/* Main QR Code */}
        <div className={`p-2 rounded border ${isDark ? 'bg-white' : 'bg-white'} border-gray-200 print:bg-white print:mx-auto print:my-3 print:block qr-code`}>
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
        
        {/* Amount Barcode */}
        <div className={`p-2 rounded border ${isDark ? 'bg-white' : 'bg-white'} border-gray-200 print:bg-white print:mx-auto print:my-3 print:block amount-barcode`}>
          <div className="flex items-center justify-center mb-1">
            <Barcode size={16} className="mr-1" />
            <span className="text-xs font-medium barcode-label">رمز المبلغ</span>
          </div>
          <QRCodeSVG 
            value={parsedData.total ? parsedData.total.toString() : "0"}
            size={80}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="M"
            includeMargin={true}
            className="print:block"
            style={{
              width: '80px',
              height: '80px',
              display: 'block'
            }}
          />
          <div className="text-center text-xs mt-1 barcode-amount">
            المبلغ: {parsedData.total ? parsedData.total.toFixed(2) : "0.00"} ر.س
          </div>
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
