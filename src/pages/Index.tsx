
import React, { useState } from 'react';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { analyzeMedicalConcerns } from '@/utils/llmProcessor';
import { MainMenuButtons } from '@/components/MainMenuButtons';
import { ConcernsForm } from '@/components/ConcernsForm';
import { FormState } from '@/types/form';
import owl from '../img/owl.png'

const Index = () => {
  const location = useLocation();
  const [formState, setFormState] = useState<FormState>({
    isListening: false,
    language: location.state?.language || 'en',
    concerns: '',
    showCheckupForm: false,
    showConcernsForm: false,
    showConfirmDialog: false,
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTranscript = (transcript: string) => {
    setFormState(prev => ({
      ...prev,
      concerns: transcript,
      showConfirmDialog: !prev.isListening
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, concerns: e.target.value }));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (formState.concerns.trim()) {
        setFormState(prev => ({ ...prev, showConfirmDialog: true }));
      } else {
        showEmptyInputToast();
      }
    }
  };

  const showEmptyInputToast = () => {
    toast({
      title: formState.language === 'en' ? "Please share your concerns" : "Por favor comparta sus preocupaciones",
      description: formState.language === 'en' 
        ? "We need to know what brings you in today" 
        : "Necesitamos saber qué lo trae hoy",
      variant: "destructive",
    });
  };

  const handleConfirmation = async () => {
    if (formState.concerns.trim()) {
      const analysis = await analyzeMedicalConcerns(formState.concerns, formState.language);
      navigate('/confirmation', { 
        state: { 
          concerns: formState.concerns, 
          language: formState.language,
          isCheckup: formState.showCheckupForm,
          analysis: analysis.text 
        } 
      });
    } else {
      showEmptyInputToast();
    }
  };

  const handleSubmit = () => {
    if (formState.concerns.trim()) {
      setFormState(prev => ({ ...prev, showConfirmDialog: true }));
    } else {
      showEmptyInputToast();
    }
  };

  if (!formState.showCheckupForm && !formState.showConcernsForm) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container max-w-4xl mx-auto px-4 py-6 md:py-8">
          <WelcomeHeader />
          
          <div className="mt-8 md:mt-12 flex flex-col items-center space-y-4 md:space-y-8">
            <MainMenuButtons
              language={formState.language}
              onCheckupClick={() => setFormState(prev => ({ ...prev, showCheckupForm: true }))}
              onConcernsClick={() => setFormState(prev => ({ ...prev, showConcernsForm: true }))}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <WelcomeHeader />
        
        <ConcernsForm
          showCheckupForm={formState.showCheckupForm}
          language={formState.language}
          concerns={formState.concerns}
          isListening={formState.isListening}
          onListeningChange={(value) => setFormState(prev => ({ ...prev, isListening: value }))}
          onTranscript={handleTranscript}
          onInputChange={handleInputChange}
          onInputKeyDown={handleInputKeyDown}
          onSubmit={handleSubmit}
        />
      </main>

      <AlertDialog 
        open={formState.showConfirmDialog} 
        onOpenChange={(open) => setFormState(prev => ({ ...prev, showConfirmDialog: open }))}
      >
        <AlertDialogContent>
          <div className="text-center space-y-4">
            <img
              src={owl}
              alt="Friendly Medical Helper"
              className="w-24 h-24 mx-auto animate-bounce"
            />
            
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl">
                {formState.language === 'en' 
                  ? "Please Review Your Input"
                  : "Por favor Revise su Entrada"}
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>
                  {formState.language === 'en'
                    ? "Is this what you wanted to share with us?"
                    : "¿Es esto lo que quería compartir con nosotros?"}
                </p>
                <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2]">
                  <p className="text-sm font-medium text-gray-700">{formState.concerns}</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col sm:flex-row justify-center gap-4">
              <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">
                {formState.language === 'en' 
                  ? "No, let me correct it"
                  : "No, déjame corregirlo"}
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmation}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {formState.language === 'en' 
                  ? "Yes, that looks good"
                  : "Sí, está correcto"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
