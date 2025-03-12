
import React from "react";
import Pos from "@/features/pos/Pos";

const PosPage: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0f1729] dark:bg-[#0f1729] fixed top-0 left-0 z-20">
      <Pos />
    </div>
  );
};

export default PosPage;
