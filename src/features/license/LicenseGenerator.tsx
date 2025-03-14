
import React from 'react';
import LicenseForm from './components/LicenseForm';
import LicensesTable from './components/LicensesTable';
import { useLicenseManager } from './hooks/useLicenseManager';

const LicenseGenerator = () => {
  const {
    licenses,
    isLoading,
    handleLicenseGenerated,
    handleCopyLicense,
    handleExportLicenses
  } = useLicenseManager();
  
  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">مولد التراخيص</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <LicenseForm 
          onLicenseGenerated={handleLicenseGenerated}
          onExportLicenses={handleExportLicenses}
        />
        
        <LicensesTable
          licenses={licenses}
          isLoading={isLoading}
          onCopyLicense={handleCopyLicense}
        />
      </div>
    </div>
  );
};

export default LicenseGenerator;
