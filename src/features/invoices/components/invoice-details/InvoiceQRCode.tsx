
import React, { useEffect, useRef } from "react";
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
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const amountCodeRef = useRef<HTMLDivElement>(null);
  
  const parsedData = React.useMemo(() => {
    try {
      return JSON.parse(qrCodeData);
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      return { total: 0 };
    }
  }, [qrCodeData]);

  // Force QR code re-render on mount and before printing
  useEffect(() => {
    // Force redraw on mount
    if (qrCodeRef.current && amountCodeRef.current) {
      // Force layout recalculation
      qrCodeRef.current.style.opacity = '0.99';
      amountCodeRef.current.style.opacity = '0.99';
      setTimeout(() => {
        if (qrCodeRef.current && amountCodeRef.current) {
          qrCodeRef.current.style.opacity = '1';
          amountCodeRef.current.style.opacity = '1';
        }
      }, 100);
    }
    
    // Handle print event
    const beforePrintHandler = () => {
      console.log("Before print event triggered");
      if (qrCodeRef.current && amountCodeRef.current) {
        // Force redraw before printing
        qrCodeRef.current.style.display = 'block';
        amountCodeRef.current.style.display = 'block';
        // Wait a bit and then force layout recalculation
        setTimeout(() => {
          if (qrCodeRef.current && amountCodeRef.current) {
            qrCodeRef.current.style.opacity = '0.99';
            amountCodeRef.current.style.opacity = '0.99';
            
            setTimeout(() => {
              if (qrCodeRef.current && amountCodeRef.current) {
                qrCodeRef.current.style.opacity = '1';
                amountCodeRef.current.style.opacity = '1';
              }
            }, 50);
          }
        }, 50);
      }
    };
    
    window.addEventListener('beforeprint', beforePrintHandler);
    
    return () => {
      window.removeEventListener('beforeprint', beforePrintHandler);
    };
  }, []);
  
  return (
    <>
      <div className="flex flex-col items-center gap-3 print:block print:w-full qr-code-container" style={{pageBreakInside: 'avoid'}}>
        {/* Main QR Code */}
        <div 
          ref={qrCodeRef}
          className={`p-1 rounded border ${isDark ? 'bg-white' : 'bg-white'} border-gray-200 print:bg-white print:mx-auto print:my-2 print:block qr-code`}
          style={{minHeight: '100px', minWidth: '100px'}}
        >
          <QRCodeSVG 
            value={qrCodeData || ""}
            size={90}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="M"
            includeMargin={true}
            className="print:block"
            style={{
              width: '90px',
              height: '90px',
              display: 'block'
            }}
          />
        </div>
        
        {/* Amount Barcode */}
        <div 
          ref={amountCodeRef}
          className={`p-1 rounded border ${isDark ? 'bg-white' : 'bg-white'} border-gray-200 print:bg-white print:mx-auto print:my-2 print:block amount-barcode`}
          style={{minHeight: '70px', minWidth: '70px'}}
        >
          <div className="barcode-label">رمز المبلغ</div>
          <QRCodeSVG 
            value={parsedData.total ? parsedData.total.toString() : "0"}
            size={60}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="M"
            includeMargin={true}
            className="print:block"
            style={{
              width: '60px',
              height: '60px',
              display: 'block'
            }}
          />
          <div className="barcode-amount">
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
