
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
import { useFullscreen } from "@/hooks/useFullscreen";

const ProductForm = () => {
  const {
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
  } = useProductForm();
  
  const { isFullscreen } = useFullscreen();

  return (
    <div className={`container mx-auto p-4 product-form-container ${isFullscreen ? 'scrollable-content' : ''}`}>
      <Card className="product-form-card">
        <form onSubmit={handleSubmit}>
          <ProductFormHeader isEditing={isEditing} isArabic={isArabic} />
          
          <CardContent className="space-y-4">
            <div className="form-section">
              <ProductBasicInfo 
                product={product}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                isArabic={isArabic}
              />
            </div>
            
            <div className="form-section select-container">
              <ProductCategorySelect 
                categoryId={product.categoryId}
                handleCategoryChange={handleCategoryChange}
                categories={sampleCategories}
                isArabic={isArabic}
              />
            </div>
            
            <div className="form-section">
              <ProductTypeRadio 
                productType={product.type}
                handleTypeChange={handleTypeChange}
                isArabic={isArabic}
              />
            </div>
            
            <div className="form-section">
              <ProductTaxSwitch 
                taxable={product.taxable}
                handleSwitchChange={handleSwitchChange}
                isArabic={isArabic}
              />
            </div>
            
            {product.type === "single" ? (
              <div className="form-section">
                <ProductPriceInput 
                  price={product.price}
                  handlePriceChange={handlePriceChange}
                  isArabic={isArabic}
                />
              </div>
            ) : (
              <div className="form-section">
                <ProductVariantsManager 
                  variants={variants}
                  addVariant={addVariant}
                  updateVariant={updateVariant}
                  removeVariant={removeVariant}
                  isArabic={isArabic}
                />
              </div>
            )}
          </CardContent>
          
          <ProductFormFooter 
            isEditing={isEditing}
            isArabic={isArabic}
            onCancel={() => navigate("/products")}
          />
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
