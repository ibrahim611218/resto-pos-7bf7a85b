import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, ProductVariant, ProductType } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import productService from "@/services/products/ProductService";

export const useProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const emptyProduct: Product = {
    id: "",
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    image: "/placeholder.svg",
    categoryId: "",
    taxable: true,
    type: "sized",
    variants: [],
  };

  const [product, setProduct] = useState<Product>(emptyProduct);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  
  useEffect(() => {
    if (isEditing) {
      const products = productService.getProducts();
      const existingProduct = products.find(p => p.id === id);
      
      if (existingProduct) {
        setProduct(existingProduct);
        setVariants([...existingProduct.variants]);
      } else {
        toast.error(isArabic ? "المنتج غير موجود" : "Product not found");
        navigate("/products");
      }
    }
  }, [id, isEditing, navigate, isArabic]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setProduct(prev => ({
      ...prev,
      taxable: checked
    }));
  };

  const handleTypeChange = (value: ProductType) => {
    setProduct(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setProduct(prev => ({
      ...prev,
      categoryId: value
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setProduct(prev => ({
      ...prev,
      price: isNaN(value) ? 0 : value
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    setProduct(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const addVariant = () => {
    const sizeOptions: { size: string, label: string }[] = [
      { size: "small", label: "صغير" },
      { size: "medium", label: "وسط" },
      { size: "large", label: "كبير" }
    ];
    
    const availableSizes = sizeOptions
      .filter(option => !variants.some(v => v.size === option.size))
      .map(option => option.size);
    
    if (availableSizes.length === 0) {
      toast.error("تم إضافة جميع المقاسات المتاحة");
      return;
    }

    const newVariant: ProductVariant = {
      id: `var-${Date.now()}`,
      size: availableSizes[0] as any,
      price: 0
    };

    setVariants(prev => [...prev, newVariant]);
  };

  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    setVariants(prev => 
      prev.map(variant => 
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const removeVariant = (id: string) => {
    setVariants(prev => prev.filter(variant => variant.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product.name || !product.categoryId) {
      toast.error(isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields");
      return;
    }

    if (product.type === "sized" && variants.length === 0) {
      toast.error(isArabic ? "يرجى إضافة مقاس واحد على الأقل" : "Please add at least one size");
      return;
    }

    if (product.type === "single" && (!product.price || product.price <= 0)) {
      toast.error(isArabic ? "يرجى إدخال سعر صحيح للمنتج" : "Please enter a valid price for the product");
      return;
    }

    const updatedProduct: Product = {
      ...product,
      id: isEditing ? product.id : `prod-${Date.now()}`,
      variants: product.type === "sized" ? variants : [],
    };

    const success = productService.saveProduct(updatedProduct);
    
    if (success) {
      const successMessage = isEditing 
        ? isArabic ? "تم تعديل المنتج بنجاح" : "Product updated successfully" 
        : isArabic ? "تم إضافة المنتج بنجاح" : "Product added successfully";
      
      toast.success(successMessage);
      navigate("/products");
    } else {
      toast.error(isArabic ? "حدث خطأ أثناء حفظ المنتج" : "Error saving product");
    }
  };

  return {
    product,
    variants,
    isEditing,
    isArabic,
    handleInputChange,
    handleSwitchChange,
    handleTypeChange,
    handleCategoryChange,
    handlePriceChange,
    handleImageChange,
    addVariant,
    updateVariant,
    removeVariant,
    handleSubmit,
    navigate
  };
};
