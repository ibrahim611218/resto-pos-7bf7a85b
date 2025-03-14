
import { BaseService, isElectron } from "../base/BaseService";

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

// Mock implementation for browser testing
class BrowserLicenseService extends BaseService implements ILicenseService {
  private getStoredLicense(): License | null {
    try {
      const license = localStorage.getItem('active-license');
      return license ? JSON.parse(license) : null;
    } catch (error) {
      console.error('Error reading license from localStorage:', error);
      return null;
    }
  }

  async getActivatedLicense(): Promise<License | null> {
    return this.getStoredLicense();
  }

  async activateLicense(licenseKey: string): Promise<LicenseResponse> {
    // Mock activation - in a real browser app, this would call an API
    const mockLicense: License = {
      key: licenseKey,
      type: 'trial',
      issuedAt: Date.now(),
      expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      durationDays: 30,
      used: true,
      activatedAt: Date.now()
    };
    
    localStorage.setItem('active-license', JSON.stringify(mockLicense));
    
    return {
      success: true,
      message: 'License activated (browser mode)',
      license: mockLicense
    };
  }

  async generateLicense(type: 'trial' | 'full', durationDays: number): Promise<LicenseResponse> {
    // Mock generation - in browser mode this is just for UI testing
    const licenseKey = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const mockLicense: License = {
      key: licenseKey,
      type: type,
      issuedAt: Date.now(),
      expiryDate: Date.now() + durationDays * 24 * 60 * 60 * 1000,
      durationDays: durationDays,
      used: false
    };
    
    return {
      success: true,
      message: 'License generated (browser mode)',
      license: mockLicense
    };
  }

  async getAllLicenses(): Promise<License[]> {
    // In browser mode, just return a couple of mock licenses
    return [
      {
        key: 'DEMO1234567890',
        type: 'trial',
        issuedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        expiryDate: Date.now() + 25 * 24 * 60 * 60 * 1000,
        durationDays: 30,
        used: false
      },
      {
        key: 'FULL9876543210',
        type: 'full',
        issuedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
        expiryDate: Date.now() + 355 * 24 * 60 * 60 * 1000,
        durationDays: 365,
        used: true,
        activatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000
      }
    ];
  }

  async getLicenseStatus(): Promise<LicenseStatus> {
    const license = this.getStoredLicense();
    
    if (!license) {
      return { isActive: false };
    }
    
    const now = Date.now();
    const expiryDate = new Date(license.expiryDate);
    const diffTime = license.expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Show warning if less than 7 days left
    const showWarning = diffDays <= 7 && diffDays > 0;
    
    return {
      isActive: now < license.expiryDate,
      daysLeft: diffDays > 0 ? diffDays : 0,
      expiryDate,
      type: license.type,
      showWarning
    };
  }
}

// Electron implementation
class ElectronLicenseService extends BaseService implements ILicenseService {
  async getActivatedLicense(): Promise<License | null> {
    if (this.isElectron()) {
      // @ts-ignore - window.db is defined in Electron's preload script
      return await window.electron.invoke('license:getActivated');
    }
    return null;
  }

  async activateLicense(licenseKey: string): Promise<LicenseResponse> {
    if (this.isElectron()) {
      // @ts-ignore - window.db is defined in Electron's preload script
      return await window.electron.invoke('license:activate', licenseKey);
    }
    return { success: false, message: 'Electron not available' };
  }

  async generateLicense(type: 'trial' | 'full', durationDays: number): Promise<LicenseResponse> {
    if (this.isElectron()) {
      // @ts-ignore - window.db is defined in Electron's preload script
      return await window.electron.invoke('license:generate', type, durationDays);
    }
    return { success: false, message: 'Electron not available' };
  }

  async getAllLicenses(): Promise<License[]> {
    if (this.isElectron()) {
      // @ts-ignore - window.db is defined in Electron's preload script
      return await window.electron.invoke('license:getAll');
    }
    return [];
  }

  async getLicenseStatus(): Promise<LicenseStatus> {
    const license = await this.getActivatedLicense();
    
    if (!license) {
      return { isActive: false };
    }
    
    const now = Date.now();
    const expiryDate = new Date(license.expiryDate);
    const diffTime = license.expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Show warning if less than 7 days left
    const showWarning = diffDays <= 7 && diffDays > 0;
    
    return {
      isActive: now < license.expiryDate,
      daysLeft: diffDays > 0 ? diffDays : 0,
      expiryDate,
      type: license.type,
      showWarning
    };
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
