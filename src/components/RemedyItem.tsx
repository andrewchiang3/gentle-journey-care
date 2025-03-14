
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';

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
      className={`p-4 rounded-lg border transition-all hover-scale ${
        isSelected
          ? 'border-2 border-primary bg-primary-soft'
          : 'border-gray-100 shadow-soft hover:border-primary/30'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className={`font-semibold mb-1 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`}>
            {title}
          </h4>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`shrink-0 ml-2 ${
            isSelected
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'text-primary border border-primary/20 hover:bg-primary-soft'
          }`}
          onClick={onToggle}
          title={isSelected ? "Remove from summary" : "Add to summary"}
          aria-label={isSelected ? "Remove from summary" : "Add to summary"}
        >
          {isSelected ? (
            <Check className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {isSelected 
          ? "✓ Added to your summary" 
          : "Click + to add this to your downloadable summary"}
      </div>
    </div>
  );
};
