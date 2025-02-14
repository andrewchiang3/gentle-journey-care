
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface RemedyItemProps {
  title: string;
  description: string;
  isSelected: boolean;
  onToggle: () => void;
}

export const RemedyItem: React.FC<RemedyItemProps> = ({ 
  title, 
  description, 
  isSelected, 
  onToggle 
}) => {
  return (
    <div
      className={`p-4 rounded-lg border transition-colors ${
        isSelected
          ? 'border-2 border-[#FF9999] bg-[#FFF5F5]'
          : 'border-[#FFE4E4] hover:border-[#FF9999]'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-[#FF9999] mb-1">
            {title}
          </h4>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`shrink-0 ml-2 ${
            isSelected
              ? 'bg-[#FF9999] text-white hover:bg-[#FF9999]/90'
              : 'text-[#FF9999] hover:text-[#FF9999]/90'
          }`}
          onClick={onToggle}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
