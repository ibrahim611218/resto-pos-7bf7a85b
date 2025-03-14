
const { generateLicenseKey } = require('./license-generator');
const { 
  saveLicensesToFile, 
  loadLicensesFromFile, 
  saveActivatedLicense, 
  loadActivatedLicense 
} = require('./license-storage');

// Get activated license
async function getActivatedLicenseHandler(app) {
  return loadActivatedLicense(app);
}

// Activate a license
async function activateLicenseHandler(app, licenseKey) {
  try {
    // Load all available licenses
    const licenses = loadLicensesFromFile(app);
    
    // Find the license with the provided key
    const licenseIndex = licenses.findIndex(license => 
      license.key.toLowerCase() === licenseKey.toLowerCase());
    
    if (licenseIndex === -1) {
      return { success: false, message: 'Invalid license key' };
    }
    
    const license = licenses[licenseIndex];
    
    // Check if license is already used
    if (license.used) {
      return { success: false, message: 'License key already used' };
    }
    
    // Check if license is expired
    if (license.expiryDate < Date.now()) {
      return { success: false, message: 'License key expired' };
    }
    
    // Mark license as used
    license.used = true;
    license.activatedAt = Date.now();
    
    // Update license in the list
    licenses[licenseIndex] = license;
    
    // Save updated licenses
    saveLicensesToFile(app, licenses);
    
    // Save activated license
    saveActivatedLicense(app, license);
    
    return { 
      success: true, 
      message: 'License activated successfully',
      license: license
    };
  } catch (error) {
    console.error('License activation error:', error);
    return { success: false, message: 'Error activating license' };
  }
}

// Generate a new license
async function generateLicenseHandler(app, type, durationDays) {
  try {
    // Generate new license
    const newLicense = generateLicenseKey(type, durationDays);
    
    // Load existing licenses
    const licenses = loadLicensesFromFile(app);
    
    // Add new license
    licenses.push(newLicense);
    
    // Save updated licenses
    const saved = saveLicensesToFile(app, licenses);
    
    if (saved) {
      return { 
        success: true, 
        message: 'License generated successfully',
        license: newLicense
      };
    } else {
      return { success: false, message: 'Error saving license' };
    }
  } catch (error) {
    console.error('License generation error:', error);
    return { success: false, message: 'Error generating license' };
  }
}

// Get all licenses
async function getAllLicensesHandler(app) {
  return loadLicensesFromFile(app);
}

module.exports = {
  getActivatedLicenseHandler,
  activateLicenseHandler,
  generateLicenseHandler,
  getAllLicensesHandler
};
