
import { BusinessSettings } from "@/types";
import { BaseService, isElectron } from "../base/BaseService";

export interface ISettingsService {
  getSettings: () => Promise<BusinessSettings>;
  saveSettings: (settings: BusinessSettings) => Promise<{ success: boolean; error?: string }>;
}

// Default settings to use when none are available
const DEFAULT_SETTINGS: BusinessSettings = {
  name: "مطعم الذواق",
  nameAr: "مطعم الذواق",
  taxNumber: "300000000000003",
  address: "الرياض، المملكة العربية السعودية",
  addressAr: "الرياض، المملكة العربية السعودية",
  phone: "966500000000",
  email: "info@example.com",
  taxRate: 15,
  taxIncluded: false,
  invoiceNotesAr: "شكراً لزيارتكم",
  workStartTime: "09:00",
  workEndTime: "23:00"
};

// Browser implementation for settings operations
class BrowserSettingsService extends BaseService implements ISettingsService {
  async getSettings(): Promise<BusinessSettings> {
    try {
      const storedSettings = localStorage.getItem('businessSettings');
      if (storedSettings) {
        return JSON.parse(storedSettings);
      }
      
      // Return default settings
      return { ...DEFAULT_SETTINGS };
    } catch (error) {
      console.error('Error getting settings from localStorage:', error);
      return { ...DEFAULT_SETTINGS };
    }
  }

  async saveSettings(settings: BusinessSettings): Promise<{ success: boolean; error?: string }> {
    try {
      localStorage.setItem('businessSettings', JSON.stringify(settings));
      return { success: true };
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

// Electron implementation for settings operations
class ElectronSettingsService extends BaseService implements ISettingsService {
  async getSettings(): Promise<BusinessSettings> {
    try {
      if (isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.getSettings();
      }
      
      // Return default if Electron is not available
      return { ...DEFAULT_SETTINGS };
    } catch (error) {
      console.error('Error getting settings from Electron:', error);
      return { ...DEFAULT_SETTINGS };
    }
  }

  async saveSettings(settings: BusinessSettings): Promise<{ success: boolean; error?: string }> {
    try {
      if (isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.saveSettings(settings);
      }
      return { success: false, error: 'Electron not available' };
    } catch (error) {
      console.error('Error saving settings in Electron:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

// Create and export the appropriate service based on environment
// Since we're removing desktop functionality, always use BrowserSettingsService
const settingsService = new BrowserSettingsService();

export default settingsService;
