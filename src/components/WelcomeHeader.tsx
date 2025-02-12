
import React from 'react';

export const WelcomeHeader = () => {
  return (
    <header className="flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
      <img
        src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
        alt="Ferry County Children's Health"
        className="w-64 h-auto mb-6 animate-slideUp"
      />
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 bg-primary-soft text-primary-foreground rounded-full text-sm font-medium">
          Virtual Pediatric Care
        </span>
        <h1 className="text-3xl font-bold mt-4 text-gray-900">
          Here for a check-up?
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          We're here to help you take care of your little ones. No appointment needed.
        </p>
      </div>
    </header>
  );
};
