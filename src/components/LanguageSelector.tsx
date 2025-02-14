
import React from 'react';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-[100px] bg-transparent border-none focus:ring-0">
          <SelectValue>
            {currentLanguage === 'en' ? 'English' : 'Español'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
