
import { IDatabaseService } from "./types";
import invoiceService from "./invoices/InvoiceService";
import settingsService from "./settings/SettingsService";
import licenseService from "./license/LicenseService";
import { isElectron } from "./base/BaseService";

// Create a combined service that implements all interfaces
const databaseService: IDatabaseService = {
  // Invoice methods
  getInvoices: invoiceService.getInvoices,
  saveInvoice: invoiceService.saveInvoice,
  updateInvoice: invoiceService.updateInvoice,
  
  // Settings methods
  getSettings: settingsService.getSettings,
  saveSettings: settingsService.saveSettings,
  
  // License methods
  activateLicense: licenseService.activateLicense,
  getLicenseState: licenseService.getLicenseState,
  deactivateLicense: licenseService.deactivateLicense,
};

export default databaseService;
export { isElectron };
export { default as invoiceService } from "./invoices/InvoiceService";
export { default as settingsService } from "./settings/SettingsService";
export { default as licenseService } from "./license/LicenseService";
