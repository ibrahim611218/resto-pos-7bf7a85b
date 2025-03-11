
import React from "react";
import KitchenOrders from "@/features/kitchen/KitchenOrders";
import { Language } from "@/types";

interface KitchenProps {
  language?: Language;
}

const Kitchen: React.FC<KitchenProps> = ({ language = "ar" }) => {
  return <KitchenOrders language={language} />;
};

export default Kitchen;
