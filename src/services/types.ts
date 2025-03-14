
import { Invoice, BusinessSettings } from "@/types";
import { IInvoiceService } from "./invoices/InvoiceService";
import { ISettingsService } from "./settings/SettingsService";

// Define a type for our database service
export interface IDatabaseService extends IInvoiceService, ISettingsService {
  // Combined interface that includes all service methods
}
