
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, Size } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import productService from "@/services/products/ProductService";
import { useProductVariants } from "./useProductVariants";
import { useProductChanges } from "./useProductChanges";
import { validateProduct } from "../utils/productValidation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";

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

export const useProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    product,
    setProduct,
    handleInputChange,
    handleSwitchChange,
    handleTypeChange,
    handleCategoryChange,
    handlePriceChange,
    handleImageChange
  } = useProductChanges(emptyProduct);

  const {
    variants,
    setVariants,
    addVariant,
    updateVariant,
    removeVariant
  } = useProductVariants();

  useEffect(() => {
    if (isEditing && id) {
      const fetchProduct = async () => {
        try {
          const products = await productService.getProducts();
          const existingProduct = products.find(p => p.id === id);
          
          if (existingProduct) {
            setProduct(existingProduct);
            setVariants(existingProduct.variants || []);
          } else {
            toast({
              title: isArabic ? "المنتج غير موجود" : "Product not found",
              variant: "destructive"
            });
            navigate("/products");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          toast({
            title: isArabic ? "حدث خطأ أثناء جلب المنتج" : "Error fetching product",
            variant: "destructive"
          });
        }
      };
      
      fetchProduct();
    }
  }, [id, isEditing, navigate, isArabic, setProduct, setVariants]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", product);
    
    if (product.type === "sized" && variants.length === 0) {
      toast({
        title: isArabic ? "يرجى إضافة مقاس واحد على الأقل" : "Please add at least one size",
        variant: "destructive"
      });
      return;
    }

    const productWithVariants = {
      ...product,
      variants: product.type === "sized" ? variants : []
    };
    
    const validation = validateProduct(productWithVariants, isArabic);
    if (!validation.isValid) {
      toast({
        title: validation.error,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const finalVariants = product.type === "sized" 
        ? variants 
        : [{
            id: `var-${uuidv4()}`,
            size: "medium" as Size,
            price: product.price || 0
          }];

      const updatedProduct: Product = {
        ...product,
        id: isEditing ? product.id : `prod-${uuidv4()}`,
        variants: finalVariants,
      };

      console.log('Saving product with variants:', updatedProduct);
      const result = await productService.saveProduct(updatedProduct);
      
      if (result.success) {
        const successMessage = isEditing 
          ? isArabic ? "تم تعديل المنتج بنجاح" : "Product updated successfully" 
          : isArabic ? "تم إضافة المنتج بنجاح" : "Product added successfully";
        
        toast({
          title: successMessage,
          variant: "default"
        });
        
        window.dispatchEvent(new CustomEvent('product-updated'));
        window.dispatchEvent(new CustomEvent('data-updated'));
        
        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        throw new Error(result.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: isArabic ? "حدث خطأ أثناء حفظ المنتج" : "Error saving product",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    product,
    variants,
    isEditing,
    isArabic,
    isSubmitting,
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
