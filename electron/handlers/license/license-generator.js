
const { v4: uuidv4 } = require('uuid');

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

module.exports = {
  generateLicenseKey
};
