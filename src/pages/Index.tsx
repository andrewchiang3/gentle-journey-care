
import React, { useState } from 'react';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { VoiceInput } from '@/components/VoiceInput';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');
  const [concerns, setConcerns] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTranscript = (transcript: string) => {
    setConcerns(transcript);
    if (!isListening) {
      navigateToConfirmation();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConcerns(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      navigateToConfirmation();
    }
  };

  const navigateToConfirmation = () => {
    if (concerns.trim()) {
      navigate('/confirmation', { state: { concerns, language } });
    } else {
      toast({
        title: language === 'en' ? "Please share your concerns" : "Por favor comparta sus preocupaciones",
        description: language === 'en' 
          ? "We need to know what brings you in today" 
          : "Necesitamos saber qué lo trae hoy",
        variant: "destructive",
      });
    }
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

          <div className="w-full max-w-md space-y-4">
            <Textarea
              value={concerns}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder={language === 'en' ? "Type your concerns here..." : "Escriba sus preocupaciones aquí..."}
              className="min-h-[120px] text-base"
            />
            
            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={navigateToConfirmation}
                className="w-full max-w-xs bg-[#FEF7CD] hover:bg-[#FEC6A1] text-gray-800 font-medium py-3 px-6 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-102"
              >
                {language === 'en' 
                  ? "Let's get you the care you need →" 
                  : "Obtengamos la atención que necesita →"}
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? "or" : "o"}
                </span>
                <VoiceInput
                  isListening={isListening}
                  onListeningChange={setIsListening}
                  onTranscript={handleTranscript}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
