
import React from 'react';
import { Button } from '@/components/ui/button';
import happy from '../img/happy.png'
import koala from '../img/koala.png'

type MainMenuButtonsProps = {
  language: string;
  onCheckupClick: () => void;
  onConcernsClick: () => void;
};

export const MainMenuButtons = ({ language, onCheckupClick, onConcernsClick }: MainMenuButtonsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <Button
        onClick={onCheckupClick}
        className="h-auto p-6 md:p-8 bg-primary-soft hover:bg-primary/20 text-primary-foreground rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col items-center gap-3 md:gap-4 group border border-primary/10"
      >
        <div className="bg-white p-4 rounded-full shadow-sm mb-2">
          <img
            src={happy}
            alt="Regular Checkup"
            className="w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="text-center">
          <p className="font-semibold text-base md:text-lg mb-1 md:mb-2">
            {language === 'en'
              ? "Time for a check-up?"
              : "¿Es hora de un chequeo?"}
          </p>
          <p className="text-sm md:text-base text-gray-600 px-2">
            {language === 'en'
              ? "Let's make sure your little one is growing healthy"
              : "Asegurémonos de que su pequeño esté creciendo sano"}
          </p>
        </div>
      </Button>

      <Button
        onClick={onConcernsClick}
        className="h-auto p-6 md:p-8 bg-secondary-soft hover:bg-secondary/20 text-secondary-foreground rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col items-center gap-3 md:gap-4 group border border-secondary/10"
      >
        <div className="bg-white p-4 rounded-full shadow-sm mb-2">
          <img
            src={koala}
            alt="Specific Concerns"
            className="w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="text-center">
          <p className="font-semibold text-base md:text-lg mb-1 md:mb-2">
            {language === 'en'
              ? "Tell us about your child's symptoms"
              : "Cuéntenos sobre los síntomas de su hijo"}
          </p>
          <p className="text-sm md:text-base text-gray-600 px-2">
            {language === 'en'
              ? "We'll help you find the best ways to make them feel better"
              : "Le ayudaremos a encontrar las mejores formas de hacerlos sentir mejor"}
          </p>
        </div>
      </Button>
    </div>
  );
};
