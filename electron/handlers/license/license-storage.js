
const fs = require('fs');
const path = require('path');
const { encryptLicenseData, decryptLicenseData } = require('./license-crypto');

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

module.exports = {
  saveLicensesToFile,
  loadLicensesFromFile,
  saveActivatedLicense,
  loadActivatedLicense
};
