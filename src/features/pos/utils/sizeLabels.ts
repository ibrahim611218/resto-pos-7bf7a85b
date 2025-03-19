
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

export const getSizeLabel = (size: string, isArabic: boolean): string => {
  const sizeKey = size as keyof typeof sizeLabels;
  if (sizeLabels[sizeKey]) {
    return isArabic ? sizeLabels[sizeKey].ar : sizeLabels[sizeKey].en;
  }
  return size;
};
