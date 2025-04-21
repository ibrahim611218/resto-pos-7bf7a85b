
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "@/components/ProductForm";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import productService from "@/services/products/ProductService";
import { useLanguage } from "@/context/LanguageContext";

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        toast.error(isArabic ? "معرّف المنتج غير صالح" : "Invalid product ID");
        navigate("/products");
        return;
      }

      try {
        setLoading(true);
        console.log(`Fetching product with ID: ${id}`);
        const product = await productService.getProductById(id);
        
        if (!product) {
          toast.error(isArabic ? "لم يتم العثور على المنتج" : "Product not found");
          navigate("/products");
          return;
        }
        
        setProductData(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error(isArabic ? "حدث خطأ أثناء جلب بيانات المنتج" : "Error loading product data");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, isArabic]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <ProductForm 
      product={productData} 
      isEditing={true} 
    />
  );
};

export default ProductEdit;
