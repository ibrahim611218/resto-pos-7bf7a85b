
import { VatReportItem, VatReportPeriod, PurchaseInvoice, Invoice } from "@/types";
import { BaseService } from "../base/BaseService";
import invoiceService from "../invoices/InvoiceService";
import purchasesService from "../purchases/PurchasesService";

export interface IVatReportService {
  generateVatReport: (period: VatReportPeriod) => Promise<VatReportItem>;
  getVatReportsHistory: () => Promise<VatReportItem[]>;
  saveVatReport: (report: VatReportItem) => Promise<boolean>;
}

class BrowserVatReportService extends BaseService implements IVatReportService {
  private vatReportsKey = 'stored-vat-reports';
  
  async generateVatReport(period: VatReportPeriod): Promise<VatReportItem> {
    try {
      // Get all invoices and purchase invoices
      const [invoices, purchaseInvoices] = await Promise.all([
        invoiceService.getInvoices(),
        purchasesService.getPurchaseInvoices()
      ]);
      
      // Filter by period
      const startDate = new Date(period.startDate);
      const endDate = new Date(period.endDate);
      
      const filteredInvoices = invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= startDate && 
               invoiceDate <= endDate && 
               invoice.status === 'completed'; // Only include completed invoices
      });
      
      const filteredPurchaseInvoices = purchaseInvoices.filter(purchase => {
        const purchaseDate = new Date(purchase.date);
        return purchaseDate >= startDate && purchaseDate <= endDate;
      });
      
      // Calculate sales totals
      const salesBeforeTax = filteredInvoices.reduce((sum, invoice) => sum + invoice.subtotal, 0);
      const salesTax = filteredInvoices.reduce((sum, invoice) => sum + invoice.taxAmount, 0);
      
      // Calculate purchases totals
      const purchasesBeforeTax = filteredPurchaseInvoices.reduce(
        (sum, purchase) => sum + purchase.subtotal, 0
      );
      const purchasesTax = filteredPurchaseInvoices.reduce(
        (sum, purchase) => sum + purchase.taxAmount, 0
      );
      
      // Calculate net tax due
      const netTaxDue = salesTax - purchasesTax;
      
      const report: VatReportItem = {
        totalSalesBeforeTax: salesBeforeTax,
        salesTax: salesTax,
        totalPurchasesBeforeTax: purchasesBeforeTax,
        purchasesTax: purchasesTax,
        netTaxDue: netTaxDue,
        period: {
          startDate: period.startDate,
          endDate: period.endDate,
          type: period.type || 'monthly' // Ensure type is set even if not provided
        }
      };
      
      // Save report to history
      await this.saveVatReport(report);
      
      return report;
    } catch (error) {
      console.error('Error generating VAT report:', error);
      throw error;
    }
  }
  
  async getVatReportsHistory(): Promise<VatReportItem[]> {
    try {
      const storedReports = localStorage.getItem(this.vatReportsKey);
      if (!storedReports) return [];
      
      const reports: VatReportItem[] = JSON.parse(storedReports);
      
      // Convert dates to Date objects
      return reports.map(report => ({
        ...report,
        period: {
          ...report.period,
          startDate: new Date(report.period.startDate),
          endDate: new Date(report.period.endDate),
          type: report.period.type || 'monthly' // Ensure type is always set
        }
      }));
    } catch (error) {
      console.error('Error getting VAT reports history:', error);
      return [];
    }
  }
  
  async saveVatReport(report: VatReportItem): Promise<boolean> {
    try {
      const reports = await this.getVatReportsHistory();
      
      // Check if a report for the same period already exists
      const existingReportIndex = reports.findIndex(r => 
        new Date(r.period.startDate).getTime() === new Date(report.period.startDate).getTime() &&
        new Date(r.period.endDate).getTime() === new Date(report.period.endDate).getTime()
      );
      
      if (existingReportIndex >= 0) {
        reports[existingReportIndex] = report;
      } else {
        reports.push(report);
      }
      
      localStorage.setItem(this.vatReportsKey, JSON.stringify(reports));
      return true;
    } catch (error) {
      console.error('Error saving VAT report:', error);
      return false;
    }
  }
}

const vatReportService = new BrowserVatReportService();
export default vatReportService;
