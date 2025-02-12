
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { VoiceInput } from '@/components/VoiceInput';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const concerns = location.state?.concerns || '';
  const language = location.state?.language || 'en';
  const [isListening, setIsListening] = React.useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const handleVoiceConfirmation = (transcript: string) => {
    const normalizedTranscript = transcript.toLowerCase().trim();
    if (normalizedTranscript.includes('yes') || normalizedTranscript.includes('sí')) {
      processWithLLM();
    } else if (normalizedTranscript.includes('no')) {
      navigate('/');
    }
  };

  const processWithLLM = async () => {
    setIsProcessing(true);
    try {
      // This is a placeholder for the actual LLM processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Placeholder analysis result
      setAnalysis(language === 'en' 
        ? "Based on the information provided, here are some initial thoughts:\n\n" +
          "• This appears to be a non-urgent concern\n" +
          "• We recommend scheduling a follow-up with your pediatrician\n" +
          "• In the meantime, monitor for any changes in symptoms"
        : "Según la información proporcionada, aquí hay algunas consideraciones iniciales:\n\n" +
          "• Esta parece ser una preocupación no urgente\n" +
          "• Recomendamos programar un seguimiento con su pediatra\n" +
          "• Mientras tanto, monitoreé cualquier cambio en los síntomas"
      );
      
      toast({
        title: language === 'en' ? "Analysis Complete" : "Análisis Completado",
        description: language === 'en' 
          ? "We've processed your information"
          : "Hemos procesado su información",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: language === 'en'
          ? "There was an error processing your concerns. Please try again."
          : "Hubo un error al procesar sus preocupaciones. Por favor, intente de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-2xl">
        <div className="text-center space-y-4">
          <img
            src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
            alt="Friendly Medical Helper"
            className={`w-24 h-24 md:w-32 md:h-32 mx-auto ${isProcessing ? 'animate-bounce' : 'animate-float'}`}
          />
          
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl md:text-2xl">
              {isProcessing 
                ? (language === 'en' ? "Analyzing your information..." : "Analizando su información...")
                : analysis 
                  ? (language === 'en' ? "Here's what I think" : "Esto es lo que pienso")
                  : (language === 'en' ? "Did I get that right?" : "¿Entendí bien?")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isProcessing ? (
                <div className="text-center py-8">
                  <p className="text-sm md:text-base text-muted-foreground">
                    {language === 'en'
                      ? "I'm carefully reviewing your information..."
                      : "Estoy revisando cuidadosamente su información..."}
                  </p>
                </div>
              ) : analysis ? (
                <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2] mt-4 text-left">
                  <p className="whitespace-pre-line text-sm md:text-base text-gray-700">{analysis}</p>
                </div>
              ) : (
                <>
                  <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2] mt-4">
                    <p className="text-sm md:text-base text-gray-700">{concerns}</p>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    {language === 'en' 
                      ? "You can speak 'yes' or 'no', or use the buttons below"
                      : "Puede decir 'sí' o 'no', o usar los botones abajo"}
                  </p>

                  <div className="flex items-center justify-center gap-4 mt-6">
                    <VoiceInput
                      isListening={isListening}
                      onListeningChange={setIsListening}
                      onTranscript={handleVoiceConfirmation}
                    />
                  </div>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {!isProcessing && !analysis && (
            <AlertDialogFooter className="flex justify-center gap-4 mt-6">
              <AlertDialogCancel onClick={() => navigate('/')}>
                {language === 'en' ? "No, let me revise" : "No, déjame revisar"}
              </AlertDialogCancel>
              <AlertDialogAction onClick={processWithLLM}>
                {language === 'en' ? "Yes, that's correct" : "Sí, es correcto"}
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Confirmation;
