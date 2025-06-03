
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
  },
  {
    id: "cat5",
    name: "Snacks",
    nameAr: "وجبات خفيفة"
  },
  {
    id: "cat6",
    name: "Breakfast",
    nameAr: "إفطار"
  },
  {
    id: "cat7",
    name: "Juice",
    nameAr: "عصائر"
  },
  {
    id: "cat8",
    name: "Pastries",
    nameAr: "معجنات"
  }
];

export const mockProducts = [
  // المنتجات الأصلية
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
  },
  
  // إضافة 40 منتج جديد
  {
    id: "prod11",
    name: "Turkish Coffee",
    nameAr: "قهوة تركية",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var11", size: "regular" as Size, price: 14 }
    ]
  },
  {
    id: "prod12",
    name: "Macchiato",
    nameAr: "ماكياتو",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var12-s", size: "small" as Size, price: 17 },
      { id: "var12-r", size: "regular" as Size, price: 19 }
    ]
  },
  {
    id: "prod13",
    name: "Mocha",
    nameAr: "موكا",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var13-s", size: "small" as Size, price: 18 },
      { id: "var13-r", size: "regular" as Size, price: 21 },
      { id: "var13-l", size: "large" as Size, price: 24 }
    ]
  },
  {
    id: "prod14",
    name: "Green Tea",
    nameAr: "شاي أخضر",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var14", size: "regular" as Size, price: 10 }
    ]
  },
  {
    id: "prod15",
    name: "Black Tea",
    nameAr: "شاي أسود",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var15", size: "regular" as Size, price: 8 }
    ]
  },
  {
    id: "prod16",
    name: "Hot Chocolate",
    nameAr: "شوكولاتة ساخنة",
    categoryId: "cat1",
    image: "https://images.unsplash.com/photo-1542990253-0b8628acccc8?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var16-s", size: "small" as Size, price: 15 },
      { id: "var16-r", size: "regular" as Size, price: 18 }
    ]
  },
  {
    id: "prod17",
    name: "Iced Tea",
    nameAr: "شاي مثلج",
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1499638472823-5ca11845aa49?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var17", size: "regular" as Size, price: 12 }
    ]
  },
  {
    id: "prod18",
    name: "Lemonade",
    nameAr: "عصير ليمون",
    categoryId: "cat7",
    image: "https://images.unsplash.com/photo-1521781707815-8ba6f2177d61?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var18-s", size: "small" as Size, price: 14 },
      { id: "var18-r", size: "regular" as Size, price: 16 }
    ]
  },
  {
    id: "prod19",
    name: "Orange Juice",
    nameAr: "عصير برتقال",
    categoryId: "cat7",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var19-s", size: "small" as Size, price: 15 },
      { id: "var19-r", size: "regular" as Size, price: 18 }
    ]
  },
  {
    id: "prod20",
    name: "Apple Juice",
    nameAr: "عصير تفاح",
    categoryId: "cat7",
    image: "https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var20", size: "regular" as Size, price: 16 }
    ]
  },
  {
    id: "prod21",
    name: "Mango Smoothie",
    nameAr: "سموذي مانجو",
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var21", size: "regular" as Size, price: 22 }
    ]
  },
  {
    id: "prod22",
    name: "Strawberry Smoothie",
    nameAr: "سموذي فراولة",
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1559686495-bd0bdde4ba76?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var22", size: "regular" as Size, price: 20 }
    ]
  },
  {
    id: "prod23",
    name: "Blueberry Muffin",
    nameAr: "مافن توت",
    categoryId: "cat6",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var23", size: "regular" as Size, price: 12 }
    ]
  },
  {
    id: "prod24",
    name: "Chocolate Muffin",
    nameAr: "مافن شوكولاتة",
    categoryId: "cat6",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var24", size: "regular" as Size, price: 13 }
    ]
  },
  {
    id: "prod25",
    name: "Donut",
    nameAr: "دونت",
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var25", size: "regular" as Size, price: 8 }
    ]
  },
  {
    id: "prod26",
    name: "Bagel",
    nameAr: "بيجل",
    categoryId: "cat6",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var26", size: "regular" as Size, price: 11 }
    ]
  },
  {
    id: "prod27",
    name: "Pancakes",
    nameAr: "بان كيك",
    categoryId: "cat6",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var27", size: "regular" as Size, price: 25 }
    ]
  },
  {
    id: "prod28",
    name: "Waffle",
    nameAr: "وافل",
    categoryId: "cat6",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var28", size: "regular" as Size, price: 22 }
    ]
  },
  {
    id: "prod29",
    name: "Caesar Salad",
    nameAr: "سلطة سيزر",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var29", size: "regular" as Size, price: 28 }
    ]
  },
  {
    id: "prod30",
    name: "Greek Salad",
    nameAr: "سلطة يونانية",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var30", size: "regular" as Size, price: 26 }
    ]
  },
  {
    id: "prod31",
    name: "Club Sandwich",
    nameAr: "ساندويش كلوب",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var31", size: "regular" as Size, price: 32 }
    ]
  },
  {
    id: "prod32",
    name: "Burger",
    nameAr: "برجر",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var32", size: "regular" as Size, price: 35 }
    ]
  },
  {
    id: "prod33",
    name: "French Fries",
    nameAr: "بطاطس مقلية",
    categoryId: "cat5",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var33-s", size: "small" as Size, price: 12 },
      { id: "var33-r", size: "regular" as Size, price: 15 }
    ]
  },
  {
    id: "prod34",
    name: "Onion Rings",
    nameAr: "حلقات البصل",
    categoryId: "cat5",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var34", size: "regular" as Size, price: 16 }
    ]
  },
  {
    id: "prod35",
    name: "Chicken Wings",
    nameAr: "أجنحة دجاج",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var35", size: "regular" as Size, price: 29 }
    ]
  },
  {
    id: "prod36",
    name: "Pizza Slice",
    nameAr: "قطعة بيتزا",
    categoryId: "cat3",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var36", size: "regular" as Size, price: 18 }
    ]
  },
  {
    id: "prod37",
    name: "Tiramisu",
    nameAr: "تيراميسو",
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var37", size: "regular" as Size, price: 32 }
    ]
  },
  {
    id: "prod38",
    name: "Ice Cream",
    nameAr: "آيس كريم",
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var38-s", size: "small" as Size, price: 14 },
      { id: "var38-r", size: "regular" as Size, price: 18 }
    ]
  },
  {
    id: "prod39",
    name: "Brownies",
    nameAr: "براونيز",
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var39", size: "regular" as Size, price: 20 }
    ]
  },
  {
    id: "prod40",
    name: "Cookies",
    nameAr: "كوكيز",
    categoryId: "cat4",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var40", size: "regular" as Size, price: 6 }
    ]
  },
  {
    id: "prod41",
    name: "Pretzel",
    nameAr: "بريتزل",
    categoryId: "cat5",
    image: "https://images.unsplash.com/photo-1551198188-969b9b39f5e8?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var41", size: "regular" as Size, price: 9 }
    ]
  },
  {
    id: "prod42",
    name: "Popcorn",
    nameAr: "فشار",
    categoryId: "cat5",
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var42-s", size: "small" as Size, price: 8 },
      { id: "var42-r", size: "regular" as Size, price: 12 }
    ]
  },
  {
    id: "prod43",
    name: "Nuts Mix",
    nameAr: "مكسرات مشكلة",
    categoryId: "cat5",
    image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var43", size: "regular" as Size, price: 15 }
    ]
  },
  {
    id: "prod44",
    name: "Croissant Sandwich",
    nameAr: "ساندويش كرواسون",
    categoryId: "cat6",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var44", size: "regular" as Size, price: 24 }
    ]
  },
  {
    id: "prod45",
    name: "Eggs Benedict",
    nameAr: "بيض بنديكت",
    categoryId: "cat6",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var45", size: "regular" as Size, price: 35 }
    ]
  },
  {
    id: "prod46",
    name: "Danish Pastry",
    nameAr: "معجنات دنماركية",
    categoryId: "cat8",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var46", size: "regular" as Size, price: 14 }
    ]
  },
  {
    id: "prod47",
    name: "Eclair",
    nameAr: "إيكلير",
    categoryId: "cat8",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var47", size: "regular" as Size, price: 16 }
    ]
  },
  {
    id: "prod48",
    name: "Cinnamon Roll",
    nameAr: "رول القرفة",
    categoryId: "cat8",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var48", size: "regular" as Size, price: 18 }
    ]
  },
  {
    id: "prod49",
    name: "Energy Drink",
    nameAr: "مشروب طاقة",
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1608418359443-26b12b50e59d?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var49", size: "regular" as Size, price: 12 }
    ]
  },
  {
    id: "prod50",
    name: "Sparkling Water",
    nameAr: "مياه غازية",
    categoryId: "cat2",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=400",
    type: "single" as const,
    taxable: true,
    variants: [
      { id: "var50-s", size: "small" as Size, price: 5 },
      { id: "var50-r", size: "regular" as Size, price: 8 }
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
