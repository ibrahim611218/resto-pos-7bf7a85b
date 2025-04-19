
import React from 'react';
import { Input } from "@/components/ui/input";
import { Clock } from 'lucide-react';
import HeaderSection from '../common/HeaderSection';
import { BusinessSettings } from '@/types';

interface WorkHoursSettingsProps {
  settings: BusinessSettings;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WorkHoursSettings: React.FC<WorkHoursSettingsProps> = ({
  settings,
  isArabic,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <HeaderSection 
        icon={Clock}
        title={isArabic ? "أوقات العمل" : "Work Hours"}
        isArabic={isArabic}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="workStartTime" className="text-sm font-medium">
            {isArabic ? "وقت بدء العمل" : "Work Start Time"}
          </label>
          <Input
            type="time"
            id="workStartTime"
            name="workStartTime"
            value={settings.workStartTime || ""}
            onChange={onChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="workEndTime" className="text-sm font-medium">
            {isArabic ? "وقت نهاية العمل" : "Work End Time"}
          </label>
          <Input
            type="time"
            id="workEndTime"
            name="workEndTime"
            value={settings.workEndTime || ""}
            onChange={onChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkHoursSettings;
