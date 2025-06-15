
import { Size } from "@/types";

export const getSizeLabel = (size: string, isArabic: boolean): string => {
  if (isArabic) {
    switch (size) {
      case "small": return "صغير";
      case "medium": return "وسط"; // تصحيح: من "حبة" إلى "وسط"
      case "large": return "كبير";
      case "xlarge": return "كبير جداً";
      case "regular": return "حبة";
      default: return "حبة";
    }
  } else {
    switch (size) {
      case "small": return "Small";
      case "medium": return "Medium"; // Correction: from "Piece" to "Medium"
      case "large": return "Large";
      case "xlarge": return "X-Large";
      case "regular": return "Piece";
      default: return "Piece";
    }
  }
};
