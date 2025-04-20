
import React from 'react';
import { Outlet } from 'react-router-dom';

// برنامج بسيط للتحقق من الترخيص الذي ينجح دائمًا في الوضع المتصل
const LicenseCheck: React.FC = () => {
  // نعيد مباشرة المحتوى بدون أي تحقق من الترخيص في الوضع المتصل
  return <Outlet />;
};

export default LicenseCheck;
