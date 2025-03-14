
import React from 'react';
import { useLocation } from 'react-router-dom';

export const WelcomeHeader = () => {
  const location = useLocation();
  const language = location.state?.language || 'en';

  return (
    <header className="flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
      <img
        src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
        alt="Ferry County Children's Health"
        className="w-32 h-auto mb-6 animate-float-slow"
      />
      <div className="space-y-2 max-w-xl">
        <span className="inline-block px-3 py-1 bg-primary-soft text-primary-foreground rounded-full text-sm font-medium">
          {language === 'en' ? "Virtual Pediatric Care" : "Atención Pediátrica Virtual"}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold mt-4 text-gray-900">
          {language === 'en' 
            ? "Care for your children, right from home" 
            : "Cuidado para sus niños, desde su hogar"}
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {language === 'en'
            ? "We're here to help you take care of your little ones"
            : "Estamos aquí para ayudarle a cuidar de sus pequeños"}
        </p>
      </div>
    </header>
  );
};
