
export interface License {
  key: string;
  type: 'trial' | 'full';
  issuedAt: number;
  expiryDate: number;
  durationDays: number;
  used: boolean;
  activatedAt?: number;
}

export interface LicenseStatus {
  isActive: boolean;
  daysLeft?: number;
  expiryDate?: Date;
  type?: 'trial' | 'full';
  showWarning?: boolean;
}

export interface LicenseResponse {
  success: boolean;
  message: string;
  license?: License;
}

export interface ILicenseService {
  getActivatedLicense: () => Promise<License | null>;
  activateLicense: (licenseKey: string) => Promise<LicenseResponse>;
  generateLicense: (type: 'trial' | 'full', durationDays: number) => Promise<LicenseResponse>;
  getAllLicenses: () => Promise<License[]>;
  getLicenseStatus: () => Promise<LicenseStatus>;
}
