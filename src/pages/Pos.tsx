
import React from "react";
import Pos from "@/features/pos/Pos";

const PosPage: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Pos />
    </div>
  );
};

export default PosPage;
