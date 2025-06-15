
import { Size } from "@/types";

export const getSizeLabel = (size: string, isArabic: boolean): string => {
  if (isArabic) {
    switch (size) {
      case "small": return "صغير";
      case "medium": return "حبة"; // تغيير من "وسط" إلى "حبة" للمنتجات الفردية
      case "large": return "كبير";
      case "xlarge": return "كبير جداً";
      case "regular": return "حبة"; // تغيير من "عادي" إلى "حبة"
      default: return "حبة";
    }
  } else {
    switch (size) {
      case "small": return "Small";
      case "medium": return "Piece"; // تغيير من "Medium" إلى "Piece"
      case "large": return "Large";
      case "xlarge": return "X-Large";
      case "regular": return "Piece"; // تغيير من "Regular" إلى "Piece"
      default: return "Piece";
    }
  }
};
