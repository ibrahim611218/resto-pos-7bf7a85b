
import { Category, Product } from "@/types";

export const sampleCategories: Category[] = [
  {
    id: "cat1",
    name: "المشروبات",
    nameAr: "المشروبات",
    image: "/placeholder.svg"
  },
  {
    id: "cat2",
    name: "الوجبات السريعة",
    nameAr: "الوجبات السريعة",
    image: "/placeholder.svg"
  },
  {
    id: "cat3",
    name: "الحلويات",
    nameAr: "الحلويات",
    image: "/placeholder.svg"
  },
  {
    id: "cat4",
    name: "المأكولات الفردية",
    nameAr: "المأكولات الفردية",
    image: "/placeholder.svg"
  }
];

export const sampleProducts: Product[] = [
  {
    id: "prod1",
    name: "قهوة عربية",
    nameAr: "قهوة عربية",
    description: "قهوة عربية أصيلة بالهيل",
    descriptionAr: "قهوة عربية أصيلة بالهيل",
    image: "/placeholder.svg",
    categoryId: "cat1",
    taxable: true,
    type: "sized",
    variants: [
      { id: "var1", size: "small", price: 10 },
      { id: "var2", size: "medium", price: 15 },
      { id: "var3", size: "large", price: 20 }
    ]
  },
  {
    id: "prod2",
    name: "شاي",
    nameAr: "شاي",
    description: "شاي أسود فاخر",
    descriptionAr: "شاي أسود فاخر",
    image: "/placeholder.svg",
    categoryId: "cat1",
    taxable: true,
    type: "sized",
    variants: [
      { id: "var4", size: "small", price: 8 },
      { id: "var5", size: "medium", price: 12 }
    ]
  },
  {
    id: "prod3",
    name: "برجر لحم",
    nameAr: "برجر لحم",
    description: "برجر لحم مع جبنة وخضروات",
    descriptionAr: "برجر لحم مع جبنة وخضروات",
    image: "/placeholder.svg",
    categoryId: "cat2",
    taxable: true,
    type: "sized",
    variants: [
      { id: "var6", size: "medium", price: 25 },
      { id: "var7", size: "large", price: 35 }
    ]
  },
  {
    id: "prod4",
    name: "كنافة",
    nameAr: "كنافة",
    description: "كنافة بالجبنة",
    descriptionAr: "كنافة بالجبنة",
    image: "/placeholder.svg",
    categoryId: "cat3",
    taxable: true,
    type: "sized",
    variants: [
      { id: "var8", size: "small", price: 15 },
      { id: "var9", size: "medium", price: 25 },
      { id: "var10", size: "large", price: 35 }
    ]
  },
  {
    id: "prod5",
    name: "سمبوسة لحم",
    nameAr: "سمبوسة لحم",
    description: "سمبوسة محشية باللحم المفروم والبهارات",
    descriptionAr: "سمبوسة محشية باللحم المفروم والبهارات",
    image: "/placeholder.svg",
    categoryId: "cat4",
    taxable: true,
    type: "single",
    price: 5,
    variants: []
  },
  {
    id: "prod6",
    name: "مخبوز جبنة",
    nameAr: "مخبوز جبنة",
    description: "عجينة مخبوزة محشية بالجبنة",
    descriptionAr: "عجينة مخبوزة محشية بالجبنة",
    image: "/placeholder.svg",
    categoryId: "cat4",
    taxable: true,
    type: "single",
    price: 7,
    variants: []
  }
];
