
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Secret key for encryption/decryption
const SECRET_KEY = 'nectarpos-license-secret-key-2024';

// Function to generate a license key
function generateLicenseKey(type, durationDays) {
  const id = uuidv4().replace(/-/g, '').substring(0, 16);
  const timestamp = Date.now();
  const expiryDate = new Date(timestamp + durationDays * 24 * 60 * 60 * 1000);

  // Create the license data
  const licenseData = {
    key: id.toUpperCase(),
    type: type, // 'trial' or 'full'
    issuedAt: timestamp,
    expiryDate: expiryDate.getTime(),
    durationDays: durationDays,
    used: false
  };

  return licenseData;
}

// Function to encrypt license data
function encryptLicenseData(data) {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
    
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted
    };
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
}

// Function to decrypt license data
function decryptLicenseData(encryptedData, iv) {
  try {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc', 
      Buffer.from(SECRET_KEY), 
      Buffer.from(iv, 'hex')
    );
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}

// Get path to license file
function getLicensePath(app) {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'license.dat');
}

// Save generated licenses to file
function saveLicensesToFile(app, licenses) {
  try {
    const licensePath = getLicensePath(app);
    const encryptedData = encryptLicenseData(licenses);
    
    if (encryptedData) {
      fs.writeFileSync(licensePath, JSON.stringify(encryptedData));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving licenses:', error);
    return false;
  }
}

// Load licenses from file
function loadLicensesFromFile(app) {
  try {
    const licensePath = getLicensePath(app);
    
    if (!fs.existsSync(licensePath)) {
      return [];
    }
    
    const fileData = fs.readFileSync(licensePath, 'utf8');
    const { encryptedData, iv } = JSON.parse(fileData);
    
    return decryptLicenseData(encryptedData, iv) || [];
  } catch (error) {
    console.error('Error loading licenses:', error);
    return [];
  }
}

// Get path to activated license file
function getActivatedLicensePath(app) {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'activated-license.dat');
}

// Save activated license
function saveActivatedLicense(app, licenseData) {
  try {
    const licensePath = getActivatedLicensePath(app);
    const encryptedData = encryptLicenseData(licenseData);
    
    if (encryptedData) {
      fs.writeFileSync(licensePath, JSON.stringify(encryptedData));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving activated license:', error);
    return false;
  }
}

// Load activated license
function loadActivatedLicense(app) {
  try {
    const licensePath = getActivatedLicensePath(app);
    
    if (!fs.existsSync(licensePath)) {
      return null;
    }
    
    const fileData = fs.readFileSync(licensePath, 'utf8');
    const { encryptedData, iv } = JSON.parse(fileData);
    
    return decryptLicenseData(encryptedData, iv);
  } catch (error) {
    console.error('Error loading activated license:', error);
    return null;
  }
}

// Setup IPC handlers for license operations
function setupLicenseHandlers(ipcMain, app) {
  // Get activated license
  ipcMain.handle('license:getActivated', async () => {
    return loadActivatedLicense(app);
  });
  
  // Activate a license
  ipcMain.handle('license:activate', async (event, licenseKey) => {
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
  });
  
  // Generate a new license
  ipcMain.handle('license:generate', async (event, type, durationDays) => {
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
  });
  
  // Get all licenses
  ipcMain.handle('license:getAll', async () => {
    return loadLicensesFromFile(app);
  });
}

module.exports = {
  setupLicenseHandlers
};
