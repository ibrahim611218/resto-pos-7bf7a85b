
import React from "react";
import { Language } from "@/types";

interface LanguageToggleProps {
  className?: string;
  collapsed?: boolean;
  language: Language;
}

// This component is now a stub since we only support Arabic
const LanguageToggle = ({ 
  className, 
  collapsed = false, 
  language 
}: LanguageToggleProps) => {
  return null;
};

export default LanguageToggle;
