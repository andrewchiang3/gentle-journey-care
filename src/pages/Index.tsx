
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
  const [showCheckupForm, setShowCheckupForm] = useState(false);
  const [showConcernsForm, setShowConcernsForm] = useState(false);
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

  if (!showCheckupForm && !showConcernsForm) {
    return (
      <div className="min-h-screen bg-background">
        <LanguageSelector
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />
        
        <main className="container max-w-4xl mx-auto px-4 py-6 md:py-8">
          <WelcomeHeader />
          
          <div className="mt-8 md:mt-12 flex flex-col items-center space-y-4 md:space-y-8">
            <div className="grid grid-cols-1 gap-4 w-full max-w-md md:max-w-2xl">
              <Button
                onClick={() => setShowCheckupForm(true)}
                className="h-auto p-6 md:p-8 bg-[#F2FCE2] hover:bg-[#E2ECD2] text-gray-800 rounded-xl md:rounded-2xl shadow-md transition-all duration-300 flex flex-col items-center gap-3 md:gap-4 group"
              >
                <img
                  src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
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
                onClick={() => setShowConcernsForm(true)}
                className="h-auto p-6 md:p-8 bg-[#FEF7CD] hover:bg-[#FEC6A1] text-gray-800 rounded-xl md:rounded-2xl shadow-md transition-all duration-300 flex flex-col items-center gap-3 md:gap-4 group"
              >
                <img
                  src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
                  alt="Specific Concerns"
                  className="w-16 h-16 md:w-24 md:h-24 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-center">
                  <p className="font-medium text-base md:text-lg mb-1 md:mb-2">
                    {language === 'en'
                      ? "Have a specific concern?"
                      : "¿Tiene una preocupación?"}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 px-2">
                    {language === 'en'
                      ? "We're here to help with any concerns"
                      : "Estamos aquí para ayudar"}
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (showCheckupForm) {
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
                  ? "Please tell us about your child"
                  : "Por favor, cuéntenos sobre su hijo"}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "Share any general updates or milestones since their last visit"
                  : "Comparta cualquier actualización o hito desde su última visita"}
              </p>
            </div>

            <div className="w-full max-w-md space-y-4">
              <Textarea
                value={concerns}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder={language === 'en' 
                  ? "For example: sleeping patterns, eating habits, recent growth, etc..."
                  : "Por ejemplo: patrones de sueño, hábitos alimenticios, crecimiento reciente, etc..."}
                className="min-h-[120px] text-base"
              />
              
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={navigateToConfirmation}
                  className="w-full max-w-xs bg-[#FEF7CD] hover:bg-[#FEC6A1] text-gray-800 font-medium py-3 px-6 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-102"
                >
                  {language === 'en' 
                    ? "Let's get started with the check-up →" 
                    : "Comencemos con el chequeo →"}
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
  }

  // Show concerns form (original form)
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
