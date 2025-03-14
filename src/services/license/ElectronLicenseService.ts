
import { BaseService } from "../base/BaseService";
import { ILicenseService, License, LicenseResponse, LicenseStatus } from "./types";
import { calculateLicenseStatus } from "./utils";

export class ElectronLicenseService extends BaseService implements ILicenseService {
  async getActivatedLicense(): Promise<License | null> {
    if (this.isElectron()) {
      // @ts-ignore - window.electron is defined in Electron's preload script
      return await window.electron.invoke('license:getActivated');
    }
    return null;
  }

  async activateLicense(licenseKey: string): Promise<LicenseResponse> {
    if (this.isElectron()) {
      // @ts-ignore - window.electron is defined in Electron's preload script
      return await window.electron.invoke('license:activate', licenseKey);
    }
    return { success: false, message: 'Electron not available' };
  }

  async generateLicense(type: 'trial' | 'full', durationDays: number): Promise<LicenseResponse> {
    if (this.isElectron()) {
      // @ts-ignore - window.electron is defined in Electron's preload script
      return await window.electron.invoke('license:generate', type, durationDays);
    }
    return { success: false, message: 'Electron not available' };
  }

  async getAllLicenses(): Promise<License[]> {
    if (this.isElectron()) {
      // @ts-ignore - window.electron is defined in Electron's preload script
      return await window.electron.invoke('license:getAll');
    }
    return [];
  }

  async getLicenseStatus(): Promise<LicenseStatus> {
    const license = await this.getActivatedLicense();
    return calculateLicenseStatus(license);
  }
}
