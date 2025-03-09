
import { Language } from "@/types";

export const getSizeLabel = (size: string, language: Language): string => {
  if (language === "ar") {
    return size === "small" ? "صغير" : size === "medium" ? "وسط" : "كبير";
  }
  return size === "small" ? "S" : size === "medium" ? "M" : "L";
};
