
import { Size } from "@/types";

export const getSizeLabel = (size: string, isArabic: boolean): string => {
  if (isArabic) {
    switch (size) {
      case "small": return "صغير";
      case "medium": return "وسط";
      case "large": return "كبير";
      case "xlarge": return "كبير جداً";
      case "regular": return "عادي";
      default: return size;
    }
  } else {
    switch (size) {
      case "small": return "Small";
      case "medium": return "Medium";
      case "large": return "Large";
      case "xlarge": return "X-Large";
      case "regular": return "Regular";
      default: return size;
    }
  }
};
