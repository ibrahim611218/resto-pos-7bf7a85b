
import React from "react";
import InventoryManager from "@/features/inventory/InventoryManager";
import { useLanguage } from "@/context/LanguageContext";

const Inventory = () => {
  const { language } = useLanguage();
  return <InventoryManager language={language} />;
};

export default Inventory;
