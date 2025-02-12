
import React, { useState } from 'react';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { VoiceInput } from '@/components/VoiceInput';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');
  const [concerns, setConcerns] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const handleTranscript = (transcript: string) => {
    setConcerns(transcript);
    if (!isListening) {
      setShowConfirmation(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConcerns(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setShowConfirmation(true);
    }
  };

  const processWithLLM = async () => {
    try {
      // We'll implement the LLM processing in the next iteration
      toast({
        title: "Processing your concerns...",
        description: "Our medical AI is analyzing your input.",
        duration: 3000,
      });
      // Here we would make the API call to the LLM model
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your concerns. Please try again.",
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
            
            <div className="flex items-center justify-center gap-4">
              <VoiceInput
                isListening={isListening}
                onListeningChange={setIsListening}
                onTranscript={handleTranscript}
              />
            </div>
          </div>
        </div>
      </main>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'en' ? "Is this correct?" : "¿Es esto correcto?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p className="font-medium text-foreground">
                {language === 'en' ? "Here's what we heard:" : "Esto es lo que escuchamos:"}
              </p>
              <p className="text-base bg-muted p-4 rounded-md">
                {concerns}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'en' ? "No, let me revise" : "No, déjame revisar"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={processWithLLM}>
              {language === 'en' ? "Yes, that's correct" : "Sí, es correcto"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
