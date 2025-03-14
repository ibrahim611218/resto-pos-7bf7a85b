
import { isElectron } from "../base/BaseService";
import { BrowserLicenseService } from "./BrowserLicenseService";
import { ElectronLicenseService } from "./ElectronLicenseService";
import { ILicenseService } from "./types";

// Create and export the appropriate service based on environment
let licenseService: ILicenseService;

if (isElectron()) {
  licenseService = new ElectronLicenseService();
} else {
  licenseService = new BrowserLicenseService();
}

export default licenseService;
export * from './types';
