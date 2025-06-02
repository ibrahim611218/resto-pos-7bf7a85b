
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductFormHeader from "./product-form/ProductFormHeader";
import ProductBasicInfo from "./product-form/ProductBasicInfo";
import ProductCategorySelect from "./product-form/ProductCategorySelect";
import ProductTypeRadio from "./product-form/ProductTypeRadio";
import ProductTaxSwitch from "./product-form/ProductTaxSwitch";
import ProductPriceInput from "./product-form/ProductPriceInput";
import ProductVariantsManager from "./product-form/ProductVariantsManager";
import ProductFormFooter from "./product-form/ProductFormFooter";
import { useProductForm } from "./product-form/hooks/useProductForm";

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

  const onFormSubmit = (e: React.FormEvent) => {
    console.log("Form submitting with product:", product);
    handleSubmit(e);
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full max-w-4xl mx-auto">
          <Card className="h-full flex flex-col">
            <form onSubmit={onFormSubmit} className="h-full flex flex-col">
              <ProductFormHeader isEditing={isEditing} isArabic={isArabic} />
              
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <CardContent className="space-y-4 p-6">
                    <ProductBasicInfo 
                      product={product}
                      handleInputChange={handleInputChange}
                      handleImageChange={handleImageChange}
                      isArabic={isArabic}
                    />
                    
                    <ProductCategorySelect 
                      categoryId={product.categoryId}
                      handleCategoryChange={handleCategoryChange}
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
                </ScrollArea>
              </div>
              
              <ProductFormFooter 
                isEditing={isEditing}
                isArabic={isArabic}
                isSubmitting={isSubmitting}
                onCancel={() => navigate("/products")}
              />
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
