
import React from "react";
import KitchenOrders from "@/features/kitchen/KitchenOrders";
import { useLanguage } from "@/context/LanguageContext";

const Kitchen = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto p-4">
      <KitchenOrders language={language} />
    </div>
  );
};

export default Kitchen;
