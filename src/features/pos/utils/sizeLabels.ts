
const sizeLabels = {
  small: {
    en: "Small",
    ar: "صغير"
  },
  medium: {
    en: "Medium",
    ar: "وسط"  // Updated to use Arabic translation
  },
  large: {
    en: "Large",
    ar: "كبير"
  },
  regular: {
    en: "Regular",
    ar: "عادي"
  }
};

export const getSizeLabel = (size: string, isArabic: boolean | string): string => {
  const sizeKey = size as keyof typeof sizeLabels;
  // Convert string "ar" to boolean true
  const isArabicBool = isArabic === true || isArabic === "ar";
  
  if (sizeLabels[sizeKey]) {
    return isArabicBool ? sizeLabels[sizeKey].ar : sizeLabels[sizeKey].en;
  }
  return size;
};
