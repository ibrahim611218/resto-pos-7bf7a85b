
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
    price: 12,
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
  },
  {
    id: "prod2",
    name: "Americano",
    nameAr: "أمريكانو",
    price: 15,
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1530032582480-edd739014c39?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
  },
  {
    id: "prod3",
    name: "Latte",
    nameAr: "لاتيه",
    price: 18,
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
  },
  {
    id: "prod4",
    name: "Cappuccino",
    nameAr: "كابتشينو",
    price: 18,
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
  },
  {
    id: "prod5",
    name: "Iced Coffee",
    nameAr: "قهوة مثلجة",
    price: 20,
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1578314675339-36e3b37b5d48?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
  },
  {
    id: "prod6",
    name: "Iced Latte",
    nameAr: "لاتيه مثلج",
    price: 22,
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
  },
  {
    id: "prod7",
    name: "Chocolate Cake",
    nameAr: "كيكة شوكولاتة",
    price: 25,
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
  },
  {
    id: "prod8",
    name: "Cheesecake",
    nameAr: "تشيز كيك",
    price: 28,
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1567254790685-6b6d6abe4689?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
  },
  {
    id: "prod9",
    name: "Croissant",
    nameAr: "كرواسون",
    price: 15,
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
  },
  {
    id: "prod10",
    name: "Sandwich",
    nameAr: "ساندويش",
    price: 22,
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400",
    defaultSize: "regular"
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
