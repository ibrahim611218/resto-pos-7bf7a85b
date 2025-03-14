
import React from "react";
import { Language } from "@/types";

interface LanguageToggleProps {
  className?: string;
  collapsed?: boolean;
  language: Language;
}

// هذا المكون أصبح فارغاً لأننا نستخدم اللغة العربية فقط
const LanguageToggle = ({ 
  className, 
  collapsed = false, 
  language 
}: LanguageToggleProps) => {
  return null;
};

export default LanguageToggle;
