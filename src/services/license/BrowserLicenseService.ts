
import { BaseService } from "../base/BaseService";
import { ILicenseService, License, LicenseResponse, LicenseStatus } from "./types";
import { calculateLicenseStatus } from "./utils";

export class BrowserLicenseService extends BaseService implements ILicenseService {
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
    return calculateLicenseStatus(license);
  }
}
