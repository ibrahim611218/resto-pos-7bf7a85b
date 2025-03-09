
import { Category, Product } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Main Dishes", nameAr: "الأطباق الرئيسية" },
  { id: "2", name: "Appetizers", nameAr: "المقبلات" },
  { id: "3", name: "Desserts", nameAr: "الحلويات" },
  { id: "4", name: "Beverages", nameAr: "المشروبات" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Burger",
    nameAr: "برجر",
    categoryId: "1",
    variants: [
      { id: "1-s", size: "small", price: 25 },
      { id: "1-m", size: "medium", price: 35 },
      { id: "1-l", size: "large", price: 45 },
    ],
    taxable: true,
    type: "sized",
  },
  {
    id: "2",
    name: "Pizza",
    nameAr: "بيتزا",
    categoryId: "1",
    variants: [
      { id: "2-s", size: "small", price: 30 },
      { id: "2-m", size: "medium", price: 45 },
      { id: "2-l", size: "large", price: 60 },
    ],
    taxable: true,
    type: "sized",
  },
  {
    id: "3",
    name: "Salad",
    nameAr: "سلطة",
    categoryId: "2",
    variants: [
      { id: "3-s", size: "small", price: 15 },
      { id: "3-m", size: "medium", price: 20 },
      { id: "3-l", size: "large", price: 25 },
    ],
    taxable: true,
    type: "sized",
  },
  {
    id: "4",
    name: "Cake",
    nameAr: "كيك",
    categoryId: "3",
    variants: [
      { id: "4-s", size: "small", price: 18 },
      { id: "4-m", size: "medium", price: 25 },
      { id: "4-l", size: "large", price: 35 },
    ],
    taxable: true,
    type: "sized",
  },
  {
    id: "5",
    name: "Coffee",
    nameAr: "قهوة",
    categoryId: "4",
    variants: [
      { id: "5-s", size: "small", price: 10 },
      { id: "5-m", size: "medium", price: 15 },
      { id: "5-l", size: "large", price: 20 },
    ],
    taxable: true,
    type: "sized",
  },
];
