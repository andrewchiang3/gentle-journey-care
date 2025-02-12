
import React, { useState } from 'react';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { VoiceInput } from '@/components/VoiceInput';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');
  const { toast } = useToast();

  const handleTranscript = (transcript: string) => {
    console.log('Transcript:', transcript);
    // We'll handle the transcript processing in the next iteration
    toast({
      title: "We heard you!",
      description: "We're processing your concerns...",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <WelcomeHeader />
        
        <div className="mt-12 flex flex-col items-center space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700">
              {language === 'en' 
                ? "Tell us what brings you in today"
                : "Cuéntenos qué lo trae hoy"}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'en'
                ? "You can speak or type your concerns"
                : "Puede hablar o escribir sus preocupaciones"}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <VoiceInput
              isListening={isListening}
              onListeningChange={setIsListening}
              onTranscript={handleTranscript}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
