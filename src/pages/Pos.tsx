import React from "react";
import { Search, Plus, Minus, Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import GlassCard from "@/components/ui-custom/GlassCard";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { toast } from "sonner";
import {
  Language,
  CartItem,
  Product,
  Category,
  Invoice,
} from "@/types";
import { calculateInvoiceAmounts, generateInvoiceNumber } from "@/utils/invoice";

interface PosProps {
  language: Language;
}

const Pos = ({ language }: PosProps) => {
  const isArabic = language === "ar";
  const [searchTerm, setSearchTerm] = React.useState("");
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  
  // Mock data for demo purposes
  const categories: Category[] = [
    { id: "1", name: "Main Dishes", nameAr: "الأطباق الرئيسية" },
    { id: "2", name: "Appetizers", nameAr: "المقبلات" },
    { id: "3", name: "Desserts", nameAr: "الحلويات" },
    { id: "4", name: "Beverages", nameAr: "المشروبات" },
  ];
  
  const products: Product[] = [
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
  
  const filteredProducts = activeCategory
    ? products.filter((product) => product.categoryId === activeCategory)
    : products;
    
  const searchedProducts = searchTerm
    ? products.filter((product) =>
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.nameAr && product.nameAr.includes(searchTerm))))
    : filteredProducts;
  
  const addToCart = (product: Product, variantId: string) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) return;
    
    const existingItem = cartItems.find(
      (item) => item.productId === product.id && item.variantId === variantId
    );
    
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: `${Date.now()}`,
        productId: product.id,
        name: product.name,
        nameAr: product.nameAr,
        variantId,
        size: variant.size,
        price: variant.price,
        quantity: 1,
        taxable: product.taxable,
      };
      setCartItems([...cartItems, newItem]);
    }
    
    toast.success(
      isArabic
        ? `تمت إضافة ${product.nameAr || product.name} (${
            variant.size === "small"
              ? "صغير"
              : variant.size === "medium"
              ? "وسط"
              : "كبير"
          })`
        : `Added ${product.name} (${variant.size})`
    );
  };
  
  const updateQuantity = (itemId: string, change: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const createInvoice = () => {
    if (cartItems.length === 0) {
      toast.error(
        isArabic ? "السلة فارغة" : "Cart is empty"
      );
      return;
    }
    
    const { subtotal, taxAmount, total } = calculateInvoiceAmounts(cartItems, 15); // 15% VAT
    
    const invoice: Invoice = {
      id: `${Date.now()}`,
      number: generateInvoiceNumber(),
      date: new Date(),
      items: [...cartItems],
      subtotal,
      taxAmount,
      total,
      paymentMethod: "Cash",
      cashierId: "1",
      cashierName: "John Doe",
      status: "completed",
    };
    
    console.log("Created invoice:", invoice);
    
    toast.success(
      isArabic
        ? `تم إنشاء الفاتورة رقم ${invoice.number}`
        : `Created invoice #${invoice.number}`
    );
    
    clearCart();
  };
  
  const { subtotal, taxAmount, total } = calculateInvoiceAmounts(cartItems, 15); // 15% VAT

  const getSizeLabel = (size: string) => {
    if (isArabic) {
      return size === "small" ? "صغير" : size === "medium" ? "وسط" : "كبير";
    }
    return size === "small" ? "S" : size === "medium" ? "M" : "L";
  };
  
  return (
    <div 
      className={`h-[calc(100vh-4rem)] flex flex-col md:flex-row ${
        isArabic ? "font-[system-ui]" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
        </div>
        
        <Tabs defaultValue="categories" className="mb-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="categories">
              {isArabic ? "الفئات" : "Categories"}
            </TabsTrigger>
            <TabsTrigger value="all">
              {isArabic ? "كل المنتجات" : "All Products"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {categories.map((category, index) => (
                <GlassCard
                  key={category.id}
                  className={`cursor-pointer transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  animation="fade"
                  delay={index * 50}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.id ? null : category.id
                    )
                  }
                >
                  <div className="text-center py-2">
                    {isArabic ? category.nameAr : category.name}
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {products.map((product, index) => (
                <GlassCard
                  key={product.id}
                  animation="fade"
                  delay={index * 50}
                  className="cursor-pointer hover:shadow-md"
                  onClick={() => addToCart(product, product.variants[0].id)}
                >
                  <div className="text-center py-2">
                    <p className="font-medium">
                      {isArabic ? product.nameAr : product.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.variants[0].price} {isArabic ? "ر.س" : "SAR"}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {searchedProducts.map((product, index) => (
            <AnimatedTransition
              key={product.id}
              animation="fade"
              delay={index * 50}
            >
              <GlassCard hover>
                <div className="p-2">
                  <h3 className="font-medium text-center mb-2">
                    {isArabic ? product.nameAr : product.name}
                  </h3>
                  <div className="grid grid-cols-3 gap-1 mt-2">
                    {product.variants.map((variant) => (
                      <Button
                        key={variant.id}
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => addToCart(product, variant.id)}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs">
                            {getSizeLabel(variant.size)}
                          </span>
                          <span>
                            {variant.price} {isArabic ? "ر.س" : "SAR"}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </AnimatedTransition>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-96 bg-card border-l p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {isArabic ? "السلة" : "Cart"}
        </h2>
        
        {cartItems.length === 0 ? (
          <AnimatedTransition animation="fade">
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p>
                {isArabic ? "السلة فارغة" : "Your cart is empty"}
              </p>
            </div>
          </AnimatedTransition>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <AnimatedTransition
                key={item.id}
                animation="slide-up"
                delay={index * 50}
              >
                <div className="flex justify-between items-center bg-secondary p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">
                      {isArabic ? item.nameAr : item.name}
                      <span className="text-xs ml-1 text-muted-foreground">
                        ({getSizeLabel(item.size)})
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.price} {isArabic ? "ر.س" : "SAR"} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        )}
        
        <Separator className="my-4" />
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {isArabic ? "المجموع الفرعي" : "Subtotal"}
            </span>
            <span>
              {subtotal.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {isArabic ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}
            </span>
            <span>
              {taxAmount.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
            </span>
          </div>
          <div className="flex justify-between font-bold">
            <span>
              {isArabic ? "الإجمالي" : "Total"}
            </span>
            <span>
              {total.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
            </span>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <Button 
            className="w-full h-12" 
            onClick={createInvoice}
            disabled={cartItems.length === 0}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isArabic ? "إنشاء فاتورة" : "Create Invoice"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={clearCart}
            disabled={cartItems.length === 0}
          >
            {isArabic ? "مسح السلة" : "Clear Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pos;
