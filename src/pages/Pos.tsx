
import PosFeature from "@/features/pos/Pos";
import { Language } from "@/types";

interface PosProps {
  language: Language;
}

const Pos = ({ language }: PosProps) => {
  return <PosFeature language={language} />;
};

export default Pos;
