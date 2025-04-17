
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import DesktopAlert from './desktop-settings/DesktopAlert';
import DownloadCard from './desktop-settings/DownloadCard';
import UpdateCheckCard from './desktop-settings/UpdateCheckCard';
import SystemRequirementsCard from './desktop-settings/SystemRequirementsCard';
import HelpCard from './desktop-settings/HelpCard';

const DesktopSettings = () => {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <DesktopAlert />

      <div className="grid gap-6 md:grid-cols-2">
        <DownloadCard />
        <UpdateCheckCard />
      </div>

      <SystemRequirementsCard />
      <HelpCard />
    </div>
  );
};

export default DesktopSettings;
