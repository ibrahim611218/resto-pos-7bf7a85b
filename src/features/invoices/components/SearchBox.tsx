
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 py-6 rounded-xl bg-secondary/20 border-secondary/30 focus:bg-white transition-colors duration-200 placeholder:text-muted-foreground/60"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute inset-y-0 right-2 h-full"
          onClick={() => setSearchTerm("")}
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </Button>
      )}
    </div>
  );
};

export default SearchBox;
