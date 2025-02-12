
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { VoiceInput } from '@/components/VoiceInput';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const concerns = location.state?.concerns || '';
  const language = location.state?.language || 'en';
  const [isListening, setIsListening] = React.useState(false);

  const handleVoiceConfirmation = (transcript: string) => {
    const normalizedTranscript = transcript.toLowerCase().trim();
    if (normalizedTranscript.includes('yes') || normalizedTranscript.includes('sí')) {
      processWithLLM();
    } else if (normalizedTranscript.includes('no')) {
      navigate('/');
    }
  };

  const processWithLLM = async () => {
    try {
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
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <img
            src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
            alt="Friendly Medical Helper"
            className="w-32 h-32 mx-auto animate-float"
          />
          
          <h2 className="text-2xl font-semibold text-gray-900">
            {language === 'en' ? "Did I get that right?" : "¿Entendí bien?"}
          </h2>
          
          <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2] mt-4">
            <p className="text-lg text-gray-700">{concerns}</p>
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

          <div className="flex justify-center gap-4 mt-6">
            <AlertDialogCancel onClick={() => navigate('/')}>
              {language === 'en' ? "No, let me revise" : "No, déjame revisar"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={processWithLLM}>
              {language === 'en' ? "Yes, that's correct" : "Sí, es correcto"}
            </AlertDialogAction>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
