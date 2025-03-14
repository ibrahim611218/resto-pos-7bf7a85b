
const crypto = require('crypto');

// Secret key for encryption/decryption
const SECRET_KEY = 'nectarpos-license-secret-key-2024';

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

module.exports = {
  encryptLicenseData,
  decryptLicenseData
};
