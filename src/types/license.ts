
export type LicenseType = "trial" | "monthly" | "yearly";

export interface License {
  key: string;
  type: LicenseType;
  expiresAt: string; // ISO date string
  isActive: boolean;
  activatedAt?: string; // ISO date string
  userId?: string;
}

export interface LicenseState {
  isLicensed: boolean;
  licenseType?: LicenseType;
  expiresAt?: string;
  daysRemaining?: number;
  isExpired?: boolean;
  isTrial?: boolean;
}
