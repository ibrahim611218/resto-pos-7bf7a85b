
import { License, LicenseState, LicenseType } from "@/types/license";
import { BaseService, isElectron } from "../base/BaseService";

export interface ILicenseService {
  activateLicense: (licenseKey: string) => Promise<{ success: boolean; error?: string }>;
  getLicenseState: () => Promise<LicenseState>;
  deactivateLicense: () => Promise<{ success: boolean; error?: string }>;
}

// Generate license hash for additional security
const hashLicense = (license: License): string => {
  const str = `${license.key}-${license.type}-${license.expiresAt}`;
  return btoa(str);
};

// Browser implementation
class BrowserLicenseService extends BaseService implements ILicenseService {
  async activateLicense(licenseKey: string): Promise<{ success: boolean; error?: string }> {
    try {
      // This is a simplified validation - in production, you should validate against a server
      // with proper encryption and verification
      if (!licenseKey || licenseKey.length < 16) {
        return { success: false, error: "Invalid license key" };
      }
      
      const parts = licenseKey.split('-');
      if (parts.length !== 4) {
        return { success: false, error: "Invalid license key format" };
      }
      
      const typeCode = parts[0].charAt(0);
      let licenseType: LicenseType = "trial";
      
      if (typeCode === "M") {
        licenseType = "monthly";
      } else if (typeCode === "Y") {
        licenseType = "yearly";
      } else if (typeCode !== "T") {
        return { success: false, error: "Invalid license type" };
      }
      
      // Calculate expiration based on current date and license type
      const now = new Date();
      let expiresAt = new Date(now);
      
      if (licenseType === "trial") {
        expiresAt.setDate(now.getDate() + 14); // 14 days trial
      } else if (licenseType === "monthly") {
        expiresAt.setMonth(now.getMonth() + 1); // 1 month subscription
      } else if (licenseType === "yearly") {
        expiresAt.setFullYear(now.getFullYear() + 1); // 1 year subscription
      }
      
      const license: License = {
        key: licenseKey,
        type: licenseType,
        expiresAt: expiresAt.toISOString(),
        isActive: true,
        activatedAt: now.toISOString()
      };
      
      // Store the license and its hash
      localStorage.setItem('license', JSON.stringify(license));
      localStorage.setItem('licenseHash', hashLicense(license));
      
      return { success: true };
    } catch (error) {
      console.error('Error activating license:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async getLicenseState(): Promise<LicenseState> {
    try {
      const storedLicense = localStorage.getItem('license');
      const storedHash = localStorage.getItem('licenseHash');
      
      if (!storedLicense || !storedHash) {
        return { isLicensed: false };
      }
      
      const license: License = JSON.parse(storedLicense);
      
      // Verify hash to prevent tampering
      if (storedHash !== hashLicense(license)) {
        // Hash mismatch indicates tampering
        localStorage.removeItem('license');
        localStorage.removeItem('licenseHash');
        return { isLicensed: false };
      }
      
      const now = new Date();
      const expiresAt = new Date(license.expiresAt);
      const isExpired = now > expiresAt;
      
      // Calculate days remaining
      const diffTime = Math.abs(expiresAt.getTime() - now.getTime());
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return {
        isLicensed: license.isActive && !isExpired,
        licenseType: license.type,
        expiresAt: license.expiresAt,
        daysRemaining: isExpired ? 0 : daysRemaining,
        isExpired,
        isTrial: license.type === 'trial'
      };
    } catch (error) {
      console.error('Error getting license state:', error);
      return { isLicensed: false };
    }
  }

  async deactivateLicense(): Promise<{ success: boolean; error?: string }> {
    try {
      localStorage.removeItem('license');
      localStorage.removeItem('licenseHash');
      return { success: true };
    } catch (error) {
      console.error('Error deactivating license:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

// Electron implementation
class ElectronLicenseService extends BaseService implements ILicenseService {
  async activateLicense(licenseKey: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.activateLicense(licenseKey);
      }
      return { success: false, error: 'Electron not available' };
    } catch (error) {
      console.error('Error activating license in Electron:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async getLicenseState(): Promise<LicenseState> {
    try {
      if (this.isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.getLicenseState();
      }
      return { isLicensed: false };
    } catch (error) {
      console.error('Error getting license state from Electron:', error);
      return { isLicensed: false };
    }
  }

  async deactivateLicense(): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.deactivateLicense();
      }
      return { success: false, error: 'Electron not available' };
    } catch (error) {
      console.error('Error deactivating license in Electron:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

// Create and export the appropriate service based on environment
let licenseService: ILicenseService;

if (isElectron()) {
  licenseService = new ElectronLicenseService();
} else {
  licenseService = new BrowserLicenseService();
}

export default licenseService;
