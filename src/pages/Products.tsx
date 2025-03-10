
import React from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Package,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import GlassCard from "@/components/ui-custom/GlassCard";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { Product, Category, Language } from "@/types";
import { toast } from "sonner";

interface ProductsProps {
  language: Language;
}

const Products = ({ language }: ProductsProps) => {
  const isArabic = language === "ar";
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  
  // Mock data
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
      description: "Juicy beef burger with toppings",
      descriptionAr: "برجر لحم مع إضافات",
      categoryId: "1",
      variants: [
        { id: "1-s", size: "small", price: 25 },
        { id: "1-m", size: "medium", price: 35 },
        { id: "1-l", size: "large", price: 45 },
      ],
      taxable: true,
    },
    {
      id: "2",
      name: "Pizza",
      nameAr: "بيتزا",
      description: "Classic pizza with cheese",
      descriptionAr: "بيتزا كلاسيكية بالجبن",
      categoryId: "1",
      variants: [
        { id: "2-s", size: "small", price: 30 },
        { id: "2-m", size: "medium", price: 45 },
        { id: "2-l", size: "large", price: 60 },
      ],
      taxable: true,
    },
    {
      id: "3",
      name: "Salad",
      nameAr: "سلطة",
      description: "Fresh garden salad",
      descriptionAr: "سلطة خضار طازجة",
      categoryId: "2",
      variants: [
        { id: "3-s", size: "small", price: 15 },
        { id: "3-m", size: "medium", price: 20 },
        { id: "3-l", size: "large", price: 25 },
      ],
      taxable: true,
    },
    {
      id: "4",
      name: "Cake",
      nameAr: "كيك",
      description: "Chocolate cake",
      descriptionAr: "كيك شوكولاتة",
      categoryId: "3",
      variants: [
        { id: "4-s", size: "small", price: 18 },
        { id: "4-m", size: "medium", price: 25 },
        { id: "4-l", size: "large", price: 35 },
      ],
      taxable: true,
    },
    {
      id: "5",
      name: "Coffee",
      nameAr: "قهوة",
      description: "Freshly brewed coffee",
      descriptionAr: "قهوة طازجة",
      categoryId: "4",
      variants: [
        { id: "5-s", size: "small", price: 10 },
        { id: "5-m", size: "medium", price: 15 },
        { id: "5-l", size: "large", price: 20 },
      ],
      taxable: true,
    },
  ];
  
  const handleAddProduct = () => {
    toast.info(
      isArabic ? "سيتم فتح نموذج إضافة منتج" : "Product creation form would open here"
    );
  };
  
  const handleEditProduct = (id: string) => {
    const product = products.find((p) => p.id === id);
    toast.info(
      isArabic
        ? `سيتم فتح نموذج تعديل ${product?.nameAr || product?.name}`
        : `Edit form for ${product?.name} would open here`
    );
  };
  
  const handleDeleteProduct = (id: string) => {
    const product = products.find((p) => p.id === id);
    toast.info(
      isArabic
        ? `سيتم حذف ${product?.nameAr || product?.name}`
        : `${product?.name} would be deleted`
    );
  };
  
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;
    
  const searchResults = searchTerm
    ? filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.nameAr &&
            product.nameAr.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.description &&
            product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.descriptionAr &&
            product.descriptionAr.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredProducts;
  
  return (
    <div 
      className={`space-y-6 p-6 pb-16 ${isArabic ? "font-[system-ui]" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {isArabic ? "المنتجات" : "Products"}
        </h2>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          {isArabic ? "إضافة منتج" : "Add Product"}
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {isArabic ? "تصفية حسب الفئة" : "Filter by Category"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
              {isArabic ? "جميع الفئات" : "All Categories"}
            </DropdownMenuItem>
            <Separator className="my-1" />
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {isArabic ? category.nameAr : category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((product, index) => (
          <GlassCard
            key={product.id}
            animation="fade"
            delay={index * 100}
            hover
            className="relative"
          >
            <div className="absolute top-3 right-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    {isArabic ? "تعديل" : "Edit"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isArabic ? "حذف" : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">
                  {isArabic ? product.nameAr : product.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isArabic
                    ? categories.find((c) => c.id === product.categoryId)?.nameAr
                    : categories.find((c) => c.id === product.categoryId)?.name}
                </p>
              </div>
            </div>
            
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {isArabic ? product.descriptionAr : product.description}
            </p>
            
            <div className="mt-4 grid grid-cols-3 gap-2">
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="bg-secondary rounded-md p-2 text-center"
                >
                  <div className="text-xs text-muted-foreground">
                    {variant.size === "small"
                      ? isArabic ? "صغير" : "Small"
                      : variant.size === "medium"
                      ? isArabic ? "وسط" : "Medium"
                      : isArabic ? "كبير" : "Large"}
                  </div>
                  <div className="font-medium">
                    {variant.price} {isArabic ? "ر.س" : "SAR"}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground">
                  {isArabic ? "خاضع للضريبة" : "Taxable"}:
                </span>
                <span className="ml-1 text-xs">
                  {product.taxable
                    ? isArabic ? "نعم" : "Yes"
                    : isArabic ? "لا" : "No"}
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      
      {searchResults.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">
            {isArabic ? "لا توجد منتجات" : "No products found"}
          </h3>
          <p className="text-muted-foreground">
            {isArabic
              ? "جرب تغيير معايير البحث أو التصفية"
              : "Try changing your search or filter criteria"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
