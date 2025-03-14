
import { License, LicenseStatus } from './types';

export function calculateLicenseStatus(license: License | null): LicenseStatus {
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
