
import { Invoice, BusinessSettings, InvoiceExportType } from "@/types";

export interface PrintWindowOptions {
  title?: string;
  printAutomatically?: boolean;
  delay?: number;
  isPdf?: boolean;  // Added this property to fix the type error
}
