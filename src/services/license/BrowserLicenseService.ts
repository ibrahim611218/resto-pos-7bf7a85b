
import { BaseService } from "../base/BaseService";
import { ILicenseService, License, LicenseResponse, LicenseStatus } from "./types";
import { calculateLicenseStatus } from "./utils";

export class BrowserLicenseService extends BaseService implements ILicenseService {
  private getStoredLicense(): License | null {
    try {
      const license = localStorage.getItem('active-license');
      
      // If no license exists, create a default one for browser environment
      if (!license) {
        console.log("No license found, creating a default browser license");
        const defaultLicense = this.createDefaultLicense();
        localStorage.setItem('active-license', JSON.stringify(defaultLicense));
        return defaultLicense;
      }
      
      return JSON.parse(license);
    } catch (error) {
      console.error('Error reading license from localStorage:', error);
      return null;
    }
  }
  
  // Create a default license for browser environment to prevent freezes
  private createDefaultLicense(): License {
    const now = Date.now();
    const thirtyDaysFromNow = now + 30 * 24 * 60 * 60 * 1000;
    
    return {
      key: 'BROWSER-DEFAULT-LICENSE',
      type: 'trial',
      issuedAt: now,
      expiryDate: thirtyDaysFromNow,
      durationDays: 30,
      used: true,
      activatedAt: now
    };
  }

  async getActivatedLicense(): Promise<License | null> {
    try {
      // Minimal delay for browser environment (200ms)
      await new Promise(resolve => setTimeout(resolve, 200));
      return this.getStoredLicense();
    } catch (error) {
      console.error('Error in getActivatedLicense:', error);
      // Return default license on error to prevent app from freezing
      return this.createDefaultLicense();
    }
  }

  async activateLicense(licenseKey: string): Promise<LicenseResponse> {
    // Add validation
    if (!licenseKey || licenseKey.trim() === '') {
      return {
        success: false,
        message: 'يجب إدخال رمز تفعيل صحيح'
      };
    }
    
    try {
      // Add a small delay to simulate network latency
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
        message: 'تم تفعيل الرمز بنجاح',
        license: mockLicense
      };
    } catch (error) {
      console.error('Error activating license:', error);
      return {
        success: false,
        message: 'حدث خطأ أثناء تفعيل الرمز'
      };
    }
  }

  async generateLicense(type: 'trial' | 'full', durationDays: number): Promise<LicenseResponse> {
    try {
      // Add a small delay to simulate network latency
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
        message: 'تم إنشاء رمز التفعيل بنجاح',
        license: mockLicense
      };
    } catch (error) {
      console.error('Error generating license:', error);
      return {
        success: false,
        message: 'حدث خطأ أثناء إنشاء رمز التفعيل'
      };
    }
  }

  async getAllLicenses(): Promise<License[]> {
    try {
      // Add a small delay to simulate network latency
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
    } catch (error) {
      console.error('Error getting licenses:', error);
      return [];
    }
  }

  async getLicenseStatus(): Promise<LicenseStatus> {
    try {
      // Minimal delay
      await new Promise(resolve => setTimeout(resolve, 200));
      const license = this.getStoredLicense();
      return calculateLicenseStatus(license);
    } catch (error) {
      console.error('Error getting license status:', error);
      // Return active status on error to prevent app from freezing
      return { isActive: true, daysLeft: 30 };
    }
  }
}
