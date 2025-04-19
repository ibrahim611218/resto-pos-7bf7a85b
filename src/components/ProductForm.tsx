
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { sampleCategories } from "@/data/sampleData";
import ProductFormHeader from "./product-form/ProductFormHeader";
import ProductBasicInfo from "./product-form/ProductBasicInfo";
import ProductCategorySelect from "./product-form/ProductCategorySelect";
import ProductTypeRadio from "./product-form/ProductTypeRadio";
import ProductTaxSwitch from "./product-form/ProductTaxSwitch";
import ProductPriceInput from "./product-form/ProductPriceInput";
import ProductVariantsManager from "./product-form/ProductVariantsManager";
import ProductFormFooter from "./product-form/ProductFormFooter";
import { useProductForm } from "./product-form/useProductForm";

const ProductForm = () => {
  const {
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
  } = useProductForm();

  return (
    <div className="container mx-auto p-4">
      <Card>
        <form onSubmit={handleSubmit}>
          <ProductFormHeader isEditing={isEditing} isArabic={isArabic} />
          
          <CardContent className="space-y-4">
            <ProductBasicInfo 
              product={product}
              handleInputChange={handleInputChange}
              handleImageChange={handleImageChange}
              isArabic={isArabic}
            />
            
            <ProductCategorySelect 
              categoryId={product.categoryId}
              handleCategoryChange={handleCategoryChange}
              categories={sampleCategories}
              isArabic={isArabic}
            />
            
            <ProductTypeRadio 
              productType={product.type}
              handleTypeChange={handleTypeChange}
              isArabic={isArabic}
            />
            
            <ProductTaxSwitch 
              taxable={product.taxable}
              handleSwitchChange={handleSwitchChange}
              isArabic={isArabic}
            />
            
            {product.type === "single" ? (
              <ProductPriceInput 
                price={product.price}
                handlePriceChange={handlePriceChange}
                isArabic={isArabic}
              />
            ) : (
              <ProductVariantsManager 
                variants={variants}
                addVariant={addVariant}
                updateVariant={updateVariant}
                removeVariant={removeVariant}
                isArabic={isArabic}
              />
            )}
          </CardContent>
          
          <ProductFormFooter 
            isEditing={isEditing}
            isArabic={isArabic}
            isSubmitting={isSubmitting}
            onCancel={() => navigate("/products")}
          />
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
