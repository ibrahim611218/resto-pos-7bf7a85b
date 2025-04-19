
import { useState } from "react";
import { Product, ProductType } from "@/types";

export const useProductChanges = (initialProduct: Product) => {
  const [product, setProduct] = useState<Product>(initialProduct);

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

  return {
    product,
    setProduct,
    handleInputChange,
    handleSwitchChange,
    handleTypeChange,
    handleCategoryChange,
    handlePriceChange,
    handleImageChange
  };
};
