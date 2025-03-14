
import React from 'react';
import { useLicenseCheck } from '../hooks/useLicenseCheck';
import LicenseCheckLoading from './LicenseCheckLoading';
import ActivationButton from './ActivationButton';

interface FirstRunLicenseCheckProps {
  children: React.ReactNode;
}

const FirstRunLicenseCheck: React.FC<FirstRunLicenseCheckProps> = ({ children }) => {
  const { isChecking, isAdminUser } = useLicenseCheck();
  
  if (isChecking) {
    return <LicenseCheckLoading />;
  }
  
  // If the admin is logged in, don't show the activation page button
  if (isAdminUser) {
    return <>{children}</>;
  }
  
  return (
    <>
      {children}
      <ActivationButton />
    </>
  );
};

export default FirstRunLicenseCheck;
