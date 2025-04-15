
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
    type: "single",
    taxable: true,
    variants: [
      { id: "var1", size: "regular", price: 12 }
    ]
  },
  {
    id: "prod2",
    name: "Americano",
    nameAr: "أمريكانو",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1530032582480-edd739014c39?auto=format&fit=crop&q=80&w=400",
    type: "single",
    taxable: true,
    variants: [
      { id: "var2", size: "regular", price: 15 }
    ]
  },
  {
    id: "prod3",
    name: "Latte",
    nameAr: "لاتيه",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=400",
    type: "single",
    taxable: true,
    variants: [
      { id: "var3", size: "regular", price: 18 }
    ]
  },
  {
    id: "prod4",
    name: "Cappuccino",
    nameAr: "كابتشينو",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?auto=format&fit=crop&q=80&w=400",
    type: "single",
    taxable: true,
    variants: [
      { id: "var4", size: "regular", price: 18 }
    ]
  },
  {
    id: "prod5",
    name: "Iced Coffee",
    nameAr: "قهوة مثلجة",
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1578314675339-36e3b37b5d48?auto=format&fit=crop&q=80&w=400",
    type: "single",
    taxable: true,
    variants: [
      { id: "var5", size: "regular", price: 20 }
    ]
  },
  {
    id: "prod6",
    name: "Iced Latte",
    nameAr: "لاتيه مثلج",
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&q=80&w=400",
    type: "single",
    taxable: true,
    variants: [
      { id: "var6", size: "regular", price: 22 }
    ]
  },
  {
    id: "prod7",
    name: "Chocolate Cake",
    nameAr: "كيكة شوكولاتة",
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400",
    type: "single",
    taxable: true,
    variants: [
      { id: "var7", size: "regular", price: 25 }
    ]
  },
  {
    id: "prod8",
    name: "Cheesecake",
    nameAr: "تشيز كيك",
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1567254790685-6b6d6abe4689?auto=format&fit=crop&q=80&w=400",
    type: "single",
    taxable: true,
    variants: [
      { id: "var8", size: "regular", price: 28 }
    ]
  },
  {
    id: "prod9",
    name: "Croissant",
    nameAr: "كرواسون",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
    type: "single",
    taxable: true,
    variants: [
      { id: "var9", size: "regular", price: 15 }
    ]
  },
  {
    id: "prod10",
    name: "Sandwich",
    nameAr: "ساندويش",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400",
    type: "single",
    taxable: true,
    variants: [
      { id: "var10", size: "regular", price: 22 }
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
