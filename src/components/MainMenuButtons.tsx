
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import happy from '../img/happy.png'
import koala from '../img/koala.png'

type MainMenuButtonsProps = {
  language: string;
  onCheckupClick: () => void;
  onConcernsClick: () => void;
  showCheckupForm?: boolean;
  showConcernsForm?: boolean;
  onBackClick?: () => void;
};

export const MainMenuButtons = ({ 
  language, 
  onCheckupClick, 
  onConcernsClick,
  showCheckupForm,
  showConcernsForm,
  onBackClick
}: MainMenuButtonsProps) => {
  if (showCheckupForm || showConcernsForm) {
    return (
      <div className="w-full flex justify-start mb-4">
        <Button
          onClick={onBackClick}
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === 'en' ? "Back to Menu" : "Volver al Menú"}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-md md:max-w-2xl">
      <Button
        onClick={onCheckupClick}
        className="h-auto p-6 md:p-8 bg-[#F2FCE2] hover:bg-[#E2ECD2] text-gray-800 rounded-xl md:rounded-2xl shadow-md transition-all duration-300 flex flex-col items-center gap-3 md:gap-4 group"
      >
        <img
          src={happy}
          alt="Regular Checkup"
          className="w-16 h-16 md:w-24 md:h-24 group-hover:scale-110 transition-transform duration-300"
        />
        <div className="text-center">
          <p className="font-medium text-base md:text-lg mb-1 md:mb-2">
            {language === 'en'
              ? "Time for a check-up?"
              : "¿Es hora de un chequeo?"}
          </p>
          <p className="text-xs md:text-sm text-gray-600 px-2">
            {language === 'en'
              ? "Let's make sure your little one is growing healthy"
              : "Asegurémonos de que su pequeño esté creciendo sano"}
          </p>
        </div>
      </Button>

      <Button
        onClick={onConcernsClick}
        className="h-auto p-6 md:p-8 bg-[#FEF7CD] hover:bg-[#FEC6A1] text-gray-800 rounded-xl md:rounded-2xl shadow-md transition-all duration-300 flex flex-col items-center gap-3 md:gap-4 group"
      >
        <img
          src={koala}
          alt="Specific Concerns"
          className="w-16 h-16 md:w-24 md:h-24 group-hover:scale-110 transition-transform duration-300"
        />
        <div className="text-center">
          <p className="font-medium text-base md:text-lg mb-1 md:mb-2">
            {language === 'en'
              ? "Tell us about your child's symptoms"
              : "Cuéntenos sobre los síntomas de su hijo"}
          </p>
          <p className="text-xs md:text-sm text-gray-600 px-2">
            {language === 'en'
              ? "We'll help you find the best ways to make them feel better"
              : "Le ayudaremos a encontrar las mejores formas de hacerlos sentir mejor"}
          </p>
        </div>
      </Button>
    </div>
  );
};
