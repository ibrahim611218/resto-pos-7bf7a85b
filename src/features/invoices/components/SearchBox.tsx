
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  placeholder: string;
  className?: string; // Added className as optional prop
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder,
  className
}) => {
  return (
    <div className={`relative w-full max-w-md ${className || ''}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="pl-9 w-full"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
