
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  language: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ language, searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-6 max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder={language === 'en' 
            ? "Search remedies, symptoms..."
            : "Buscar remedios, síntomas..."}
          className="w-full pl-10 py-2 rounded-full bg-white shadow-sm border-gray-200 focus:border-primary focus:ring-primary"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
