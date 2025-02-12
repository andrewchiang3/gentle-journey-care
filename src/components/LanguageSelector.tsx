
import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="absolute top-4 right-4 flex items-center space-x-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-transparent text-sm text-muted-foreground hover:text-gray-900 cursor-pointer"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};
