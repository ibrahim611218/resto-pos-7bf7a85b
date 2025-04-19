
import React from 'react';
import { Outlet } from 'react-router-dom';

// Simplified license check that always succeeds in offline mode
const LicenseCheck: React.FC = () => {
  return <Outlet />;
};

export default LicenseCheck;
