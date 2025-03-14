import React, { useState, useEffect } from 'react';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { analyzeMedicalConcerns } from '@/utils/llmProcessor';
import { MainMenuButtons } from '@/components/MainMenuButtons';
import { ConcernsForm } from '@/components/ConcernsForm';
import { ConsentDialog } from '@/components/ConsentDialog';
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
    isAnalyzing: false,
  });
  const [showConsent, setShowConsent] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user has already given consent
  useEffect(() => {
    const hasConsented = localStorage.getItem('healthDataConsent');
    if (hasConsented === 'true') {
      setShowConsent(false);
    }
  }, []);

  const handleConsentAccept = () => {
    localStorage.setItem('healthDataConsent', 'true');
    setShowConsent(false);
    toast({
      title: formState.language === 'en' ? "Thank you" : "Gracias",
      description: formState.language === 'en' 
        ? "Your privacy is important to us" 
        : "Su privacidad es importante para nosotros",
    });
  };

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
      setFormState(prev => ({ ...prev, isAnalyzing: true }));
      
      try {
        const analysisResult = await analyzeMedicalConcerns(formState.concerns, formState.language);
        setAnalysis(analysisResult);

        navigate('/confirmation', { 
          state: { 
            concerns: formState.concerns, 
            language: formState.language,
            isCheckup: formState.showCheckupForm,
            analysis: analysisResult
          } 
        });
      } catch (error) {
        toast({
          title: formState.language === 'en' ? "Error" : "Error",
          description: formState.language === 'en' 
            ? "There was an error analyzing your concerns. Please try again." 
            : "Hubo un error al analizar sus preocupaciones. Por favor, inténtelo de nuevo.",
          variant: "destructive",
        });
      } finally {
        setFormState(prev => ({ ...prev, isAnalyzing: false }));
      }
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

  // Show the consent dialog first
  if (showConsent) {
    return (
      <ConsentDialog 
        open={showConsent} 
        language={formState.language}
        onAccept={handleConsentAccept} 
      />
    );
  }

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
                disabled={formState.isAnalyzing}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {formState.isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {formState.language === 'en' ? "Analyzing..." : "Analizando..."}
                  </span>
                ) : (
                  formState.language === 'en' ? "Yes, that looks good" : "Sí, está correcto"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
