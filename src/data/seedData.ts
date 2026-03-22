
import { v4 as uuidv4 } from 'uuid';
import { Product, Category } from '@/types/products';
import { Customer } from '@/types/customers';

// 10 تصنيفات
const categories: Category[] = [
  { id: uuidv4(), name: "مشروبات ساخنة", nameAr: "مشروبات ساخنة" },
  { id: uuidv4(), name: "مشروبات باردة", nameAr: "مشروبات باردة" },
  { id: uuidv4(), name: "عصائر طبيعية", nameAr: "عصائر طبيعية" },
  { id: uuidv4(), name: "وجبات رئيسية", nameAr: "وجبات رئيسية" },
  { id: uuidv4(), name: "مقبلات", nameAr: "مقبلات" },
  { id: uuidv4(), name: "سلطات", nameAr: "سلطات" },
  { id: uuidv4(), name: "حلويات", nameAr: "حلويات" },
  { id: uuidv4(), name: "معجنات", nameAr: "معجنات" },
  { id: uuidv4(), name: "شاورما وساندويتشات", nameAr: "شاورما وساندويتشات" },
  { id: uuidv4(), name: "إضافات وصوصات", nameAr: "إضافات وصوصات" },
];

const createProduct = (name: string, categoryIndex: number, price: number): Product => ({
  id: uuidv4(),
  name,
  nameAr: name,
  price,
  categoryId: categories[categoryIndex].id,
  type: "single",
  taxable: true,
  variants: [],
});

// 100+ منتج
const products: Product[] = [
  // مشروبات ساخنة (0)
  createProduct("شاي أحمر", 0, 5),
  createProduct("شاي أخضر", 0, 6),
  createProduct("شاي كرك", 0, 7),
  createProduct("شاي بالنعناع", 0, 6),
  createProduct("قهوة عربية", 0, 8),
  createProduct("قهوة تركية", 0, 10),
  createProduct("كابتشينو", 0, 15),
  createProduct("لاتيه", 0, 15),
  createProduct("إسبريسو", 0, 12),
  createProduct("موكا", 0, 18),
  createProduct("هوت شوكلت", 0, 14),
  createProduct("قهوة أمريكية", 0, 12),
  // مشروبات باردة (1)
  createProduct("آيس لاتيه", 1, 18),
  createProduct("آيس موكا", 1, 20),
  createProduct("آيس كراميل", 1, 20),
  createProduct("فرابتشينو", 1, 22),
  createProduct("سموذي فراولة", 1, 18),
  createProduct("سموذي مانجو", 1, 18),
  createProduct("ميلك شيك فانيلا", 1, 16),
  createProduct("ميلك شيك شوكلت", 1, 16),
  createProduct("كولا", 1, 5),
  createProduct("سبرايت", 1, 5),
  createProduct("ماء معدني", 1, 3),
  createProduct("ريد بول", 1, 15),
  // عصائر طبيعية (2)
  createProduct("عصير برتقال", 2, 12),
  createProduct("عصير تفاح", 2, 12),
  createProduct("عصير رمان", 2, 15),
  createProduct("عصير جزر", 2, 10),
  createProduct("عصير ليمون بالنعناع", 2, 10),
  createProduct("عصير أناناس", 2, 14),
  createProduct("عصير كوكتيل", 2, 16),
  createProduct("عصير فراولة", 2, 14),
  createProduct("عصير مانجو", 2, 14),
  createProduct("عصير أفوكادو", 2, 18),
  // وجبات رئيسية (3)
  createProduct("كبسة لحم", 3, 35),
  createProduct("كبسة دجاج", 3, 28),
  createProduct("مندي لحم", 3, 40),
  createProduct("مندي دجاج", 3, 30),
  createProduct("مظبي دجاج", 3, 32),
  createProduct("برياني لحم", 3, 38),
  createProduct("برياني دجاج", 3, 30),
  createProduct("مشوي مشكل", 3, 55),
  createProduct("ستيك لحم", 3, 65),
  createProduct("دجاج مشوي كامل", 3, 35),
  createProduct("سمك مشوي", 3, 45),
  createProduct("ربيان مشوي", 3, 55),
  createProduct("كفتة مشوية", 3, 30),
  createProduct("ريش غنم", 3, 70),
  createProduct("فيليه دجاج", 3, 28),
  // مقبلات (4)
  createProduct("حمص", 4, 8),
  createProduct("متبل", 4, 8),
  createProduct("فول", 4, 10),
  createProduct("تبولة", 4, 10),
  createProduct("ورق عنب", 4, 15),
  createProduct("كبة مقلية", 4, 12),
  createProduct("سمبوسة لحم", 4, 10),
  createProduct("سمبوسة جبن", 4, 10),
  createProduct("بطاطس مقلية", 4, 10),
  createProduct("ناجتس دجاج", 4, 14),
  createProduct("أصابع موزاريلا", 4, 16),
  createProduct("سبرنج رول", 4, 12),
  // سلطات (5)
  createProduct("سلطة خضراء", 5, 10),
  createProduct("سلطة سيزر", 5, 18),
  createProduct("سلطة يونانية", 5, 16),
  createProduct("سلطة فتوش", 5, 12),
  createProduct("سلطة روكا", 5, 14),
  createProduct("سلطة تونة", 5, 20),
  createProduct("سلطة فواكه", 5, 15),
  createProduct("سلطة دجاج مشوي", 5, 22),
  // حلويات (6)
  createProduct("كنافة نابلسية", 6, 18),
  createProduct("بسبوسة", 6, 12),
  createProduct("أم علي", 6, 15),
  createProduct("كريم كراميل", 6, 14),
  createProduct("تشيز كيك", 6, 20),
  createProduct("براوني شوكلت", 6, 16),
  createProduct("آيس كريم", 6, 10),
  createProduct("موهلبية", 6, 10),
  createProduct("بقلاوة", 6, 18),
  createProduct("تيراميسو", 6, 22),
  // معجنات (7)
  createProduct("بيتزا مارجريتا", 7, 25),
  createProduct("بيتزا بيبروني", 7, 30),
  createProduct("بيتزا خضار", 7, 25),
  createProduct("فطيرة جبن", 7, 12),
  createProduct("فطيرة لحم", 7, 15),
  createProduct("فطيرة زعتر", 7, 10),
  createProduct("مناقيش جبن", 7, 8),
  createProduct("خبز تنور", 7, 5),
  createProduct("خبز صاج", 7, 5),
  createProduct("كرواسون", 7, 8),
  // شاورما وساندويتشات (8)
  createProduct("شاورما لحم", 8, 15),
  createProduct("شاورما دجاج", 8, 12),
  createProduct("شاورما عربي لحم", 8, 18),
  createProduct("شاورما عربي دجاج", 8, 15),
  createProduct("برجر لحم", 8, 20),
  createProduct("برجر دجاج", 8, 18),
  createProduct("كلوب ساندويتش", 8, 22),
  createProduct("ساندويتش فلافل", 8, 10),
  createProduct("ساندويتش تونة", 8, 14),
  createProduct("طورتيلا دجاج", 8, 18),
  createProduct("هوت دوج", 8, 12),
  createProduct("ساندويتش ستيك", 8, 25),
  // إضافات وصوصات (9)
  createProduct("صوص ثوم", 9, 3),
  createProduct("صوص حار", 9, 3),
  createProduct("صوص باربكيو", 9, 3),
  createProduct("صوص رانش", 9, 3),
  createProduct("جبن إضافي", 9, 5),
  createProduct("خبز إضافي", 9, 2),
  createProduct("أرز إضافي", 9, 5),
  createProduct("بيض مسلوق", 9, 3),
  createProduct("مخلل", 9, 3),
  createProduct("زيتون", 9, 4),
];

// 10 عملاء
const customers: Customer[] = [
  { id: uuidv4(), name: "أحمد محمد العتيبي", phone: "0551234567", email: "ahmed@email.com", address: "الرياض - حي النسيم" },
  { id: uuidv4(), name: "محمد عبدالله القحطاني", phone: "0559876543", email: "mohammed@email.com", address: "الرياض - حي الملز" },
  { id: uuidv4(), name: "خالد سعد الدوسري", phone: "0541112233", address: "جدة - حي الصفا" },
  { id: uuidv4(), name: "فهد ناصر الشمري", phone: "0533344556", address: "الدمام - حي الفيصلية" },
  { id: uuidv4(), name: "عبدالرحمن يوسف الغامدي", phone: "0567788990", email: "abdulrahman@email.com", address: "مكة - حي العزيزية" },
  { id: uuidv4(), name: "سلطان فيصل الحربي", phone: "0544455667", address: "المدينة - حي العنابس" },
  { id: uuidv4(), name: "ماجد عمر السبيعي", phone: "0552233445", address: "الطائف - حي الشهداء" },
  { id: uuidv4(), name: "تركي حمد المطيري", phone: "0538899001", email: "turki@email.com", address: "بريدة - حي السالمية" },
  { id: uuidv4(), name: "نواف سعود العنزي", phone: "0561122334", address: "تبوك - حي المروج" },
  { id: uuidv4(), name: "بندر خالد الزهراني", phone: "0547766554", email: "bandar@email.com", address: "أبها - حي المنسك", taxNumber: "300123456789012" },
];

/**
 * Seeds demo data into localStorage if no data exists
 */
export const seedDemoData = () => {
  const existingProducts = localStorage.getItem('stored-products');
  const existingCategories = localStorage.getItem('stored-categories');
  const existingCustomers = localStorage.getItem('customers');

  // Only seed if all are empty
  if (!existingProducts || JSON.parse(existingProducts).length === 0) {
    localStorage.setItem('stored-products', JSON.stringify(products));
    console.log(`Seeded ${products.length} products`);
  }

  if (!existingCategories || JSON.parse(existingCategories).length === 0) {
    localStorage.setItem('stored-categories', JSON.stringify(categories));
    console.log(`Seeded ${categories.length} categories`);
  }

  if (!existingCustomers || JSON.parse(existingCustomers).length === 0) {
    localStorage.setItem('customers', JSON.stringify(customers));
    console.log(`Seeded ${customers.length} customers`);
  }

  // Dispatch events to refresh UI
  window.dispatchEvent(new CustomEvent('product-updated'));
  window.dispatchEvent(new CustomEvent('category-updated'));
  window.dispatchEvent(new CustomEvent('customer-updated'));
};
