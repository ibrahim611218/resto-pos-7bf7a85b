
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
  invoiceNotesAr: string;
  invoiceNotes?: string;
  commercialRegisterAr?: string;
  commercialRegister?: string;
  logo?: string;
  workStartTime?: string;
  workEndTime?: string;
}
