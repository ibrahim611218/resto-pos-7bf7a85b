
const sizeLabels = {
  small: {
    en: "Small",
    ar: "صغير"
  },
  regular: {
    en: "Regular",
    ar: "عادي"
  },
  large: {
    en: "Large",
    ar: "كبير"
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
