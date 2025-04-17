
import { SystemRequirements } from '../../types';

/**
 * Creates the system requirements section
 * @param isArabic Whether the language is Arabic
 * @param requirements System requirements object
 * @returns HTML string for the requirements section
 */
export const generateRequirementsSection = (isArabic: boolean, requirements: SystemRequirements): string => {
  const language = isArabic ? 'ar' : 'en';
  
  return `<div class="requirements">
      <h3>${isArabic ? 'متطلبات النظام' : 'System Requirements'}</h3>
      <ul>
        <li>${requirements.os[language]}</li>
        <li>${requirements.processor[language]}</li>
        <li>${requirements.memory[language]}</li>
        <li>${requirements.storage[language]}</li>
      </ul>
    </div>`;
};
