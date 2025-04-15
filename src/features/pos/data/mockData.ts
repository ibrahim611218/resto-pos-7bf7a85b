
import { Size } from "@/types";

export const mockCategories = [
  {
    id: "cat1",
    name: "Hot Drinks",
    nameAr: "مشروبات ساخنة"
  },
  {
    id: "cat2",
    name: "Cold Drinks",
    nameAr: "مشروبات باردة"
  },
  {
    id: "cat3",
    name: "Food",
    nameAr: "طعام"
  },
  {
    id: "cat4",
    name: "Desserts",
    nameAr: "حلويات"
  }
];

export const mockProducts = [
  {
    id: "prod1",
    name: "Espresso",
    nameAr: "اسبريسو",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var1", size: "regular" as Size, price: 12 }
    ]
  },
  {
    id: "prod2",
    name: "Americano",
    nameAr: "أمريكانو",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1530032582480-edd739014c39?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var2-s", size: "small" as Size, price: 13 },
      { id: "var2-r", size: "regular" as Size, price: 15 },
      { id: "var2-l", size: "large" as Size, price: 17 }
    ]
  },
  {
    id: "prod3",
    name: "Latte",
    nameAr: "لاتيه",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var3-s", size: "small" as Size, price: 16 },
      { id: "var3-r", size: "regular" as Size, price: 18 },
      { id: "var3-l", size: "large" as Size, price: 20 }
    ]
  },
  {
    id: "prod4",
    name: "Cappuccino",
    nameAr: "كابتشينو",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var4-s", size: "small" as Size, price: 16 },
      { id: "var4-r", size: "regular" as Size, price: 18 },
      { id: "var4-l", size: "large" as Size, price: 20 }
    ]
  },
  {
    id: "prod5",
    name: "Iced Coffee",
    nameAr: "قهوة مثلجة",
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1578314675339-36e3b37b5d48?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var5-s", size: "small" as Size, price: 18 },
      { id: "var5-r", size: "regular" as Size, price: 20 },
      { id: "var5-l", size: "large" as Size, price: 22 }
    ]
  },
  {
    id: "prod6",
    name: "Iced Latte",
    nameAr: "لاتيه مثلج",
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var6-s", size: "small" as Size, price: 20 },
      { id: "var6-r", size: "regular" as Size, price: 22 },
      { id: "var6-l", size: "large" as Size, price: 24 }
    ]
  },
  {
    id: "prod7",
    name: "Chocolate Cake",
    nameAr: "كيكة شوكولاتة",
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var7", size: "regular" as Size, price: 25 }
    ]
  },
  {
    id: "prod8",
    name: "Cheesecake",
    nameAr: "تشيز كيك",
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1567254790685-6b6d6abe4689?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var8", size: "regular" as Size, price: 28 }
    ]
  },
  {
    id: "prod9",
    name: "Croissant",
    nameAr: "كرواسون",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var9", size: "regular" as Size, price: 15 }
    ]
  },
  {
    id: "prod10",
    name: "Sandwich",
    nameAr: "ساندويش",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var10", size: "regular" as Size, price: 22 }
    ]
  }
];

export const mockCustomers = [
  {
    id: "cust1",
    name: "John Smith",
    phone: "+1234567890",
    taxNumber: "123456",
    commercialRegister: "CR123456",
    address: "123 Main St, City"
  },
  {
    id: "cust2",
    name: "Sarah Johnson",
    phone: "+9876543210",
    taxNumber: "654321",
    commercialRegister: "CR654321",
    address: "456 Oak Ave, Town"
  },
  {
    id: "cust3",
    name: "محمد أحمد",
    phone: "+966512345678",
    taxNumber: "789012",
    commercialRegister: "CR789012",
    address: "شارع الملك فهد، الرياض"
  }
];

export const sizeLabels = {
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
