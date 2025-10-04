
export interface BusinessSettings {
  name: string;
  nameAr: string;
  taxNumber: string;
  address: string;
  addressAr: string;
  phone: string;
  email: string;
  taxRate: number;
  taxIncluded: boolean;
  taxEnabled?: boolean; // Enable/disable tax completely
  showAddress?: boolean; // Show/hide address in invoice
  showPhone?: boolean; // Show/hide phone in invoice
  showEmail?: boolean; // Show/hide email in invoice
  invoiceNotesAr: string;
  invoiceNotes?: string;
  commercialRegisterAr?: string;
  commercialRegister?: string;
  logo?: string;
  workStartTime?: string;
  workEndTime?: string;
}
