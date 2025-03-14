
import React from 'react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  language: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ language, searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-6">
      <Input
        type="search"
        placeholder={language === 'en' 
          ? "Search remedies, symptoms..."
          : "Buscar remedios, síntomas..."}
        className="w-full pl-4 pr-4 py-3 rounded-full bg-white"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
