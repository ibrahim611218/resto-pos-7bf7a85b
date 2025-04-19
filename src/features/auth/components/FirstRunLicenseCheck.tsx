
import React from 'react';

interface FirstRunLicenseCheckProps {
  children: React.ReactNode;
}

// Simplified version that always allows access
const FirstRunLicenseCheck: React.FC<FirstRunLicenseCheckProps> = ({ children }) => {
  return <>{children}</>;
};

export default FirstRunLicenseCheck;
