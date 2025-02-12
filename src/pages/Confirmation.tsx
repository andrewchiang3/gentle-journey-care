
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { pipeline } from '@huggingface/transformers';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const concerns = location.state?.concerns || 'My child has had a fever for the past day and seems more tired than usual.';
  const language = location.state?.language || 'en';
  const [isProcessing, setIsProcessing] = useState(true);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const analyzeConcerns = async () => {
      try {
        // Initialize the model pipeline
        const generator = await pipeline(
          'text-generation',
          'm42-health/Llama3-Med42-8B',
          { device: 'webgpu' }
        );

        // Prepare the prompt
        const prompt = `As a pediatric medical assistant, analyze the following parent's concerns and provide actionable feedback:
         
        Parent's concerns: "${concerns}"
        
        Please provide:
        1. Initial assessment of urgency
        2. Key observations
        3. Recommendations
        4. Warning signs to watch for`;

        // Generate the response
        const result = await generator(prompt, {
          max_new_tokens: 500,
          temperature: 0.7,
          do_sample: true,
        });

        // Process and format the response
        // Check if result is an array or single output
        const outputText = Array.isArray(result) 
          ? result[0].generated_text 
          : result.generated_text;

        // Clean up the response by removing the original prompt
        const analysisText = outputText.replace(prompt, '').trim();
        
        setAnalysis(analysisText);
        setIsProcessing(false);

        toast({
          title: language === 'en' ? "Analysis Complete" : "Análisis Completado",
          description: language === 'en' 
            ? "We've processed your information"
            : "Hemos procesado su información",
        });
      } catch (error) {
        console.error('Error during analysis:', error);
        // Fallback to placeholder text in case of error
        setAnalysis(language === 'en' 
          ? "Based on the information provided, here are some initial thoughts:\n\n" +
            "• This appears to be a non-urgent concern that should be monitored\n" +
            "• Watch for increased temperature above 102°F (39°C)\n" +
            "• Ensure good hydration and rest\n" +
            "• Consider scheduling a follow-up with your pediatrician if symptoms persist\n" +
            "• Seek immediate care if fever is accompanied by severe headache or stiff neck"
          : "Según la información proporcionada, aquí hay algunas consideraciones iniciales:\n\n" +
            "• Esta parece ser una preocupación no urgente que debe monitorearse\n" +
            "• Observe si la temperatura aumenta por encima de 39°C (102°F)\n" +
            "• Asegure una buena hidratación y descanso\n" +
            "• Considere programar un seguimiento con su pediatra si los síntomas persisten\n" +
            "• Busque atención inmediata si la fiebre se acompaña de dolor de cabeza intenso o rigidez en el cuello"
        );
        setIsProcessing(false);
        
        toast({
          title: "Error",
          description: language === 'en'
            ? "There was an error processing your concerns. Showing general recommendations instead."
            : "Hubo un error al procesar sus preocupaciones. Mostrando recomendaciones generales.",
          variant: "destructive",
        });
      }
    };

    analyzeConcerns();
  }, [concerns, language, toast]);

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-2xl">
        <div className="text-center space-y-4">
          <img
            src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
            alt="Friendly Medical Helper"
            className={`w-24 h-24 md:w-32 md:h-32 mx-auto transition-all duration-500 ${
              isProcessing ? 'animate-bounce' : 'animate-float'
            }`}
          />
          
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl md:text-2xl">
              {isProcessing 
                ? (language === 'en' ? "Analyzing your information..." : "Analizando su información...")
                : (language === 'en' ? "Here's what I think" : "Esto es lo que pienso")}
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-4">
              {isProcessing ? (
                <div className="text-center py-8 space-y-4">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {language === 'en'
                      ? "I'm carefully reviewing your information..."
                      : "Estoy revisando cuidadosamente su información..."}
                  </p>
                </div>
              ) : (
                <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2] mt-4 text-left">
                  <p className="whitespace-pre-line text-sm md:text-base text-gray-700">{analysis}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {!isProcessing && (
            <AlertDialogFooter className="flex justify-center gap-4 mt-6">
              <AlertDialogAction onClick={() => navigate('/')}>
                {language === 'en' ? "Return Home" : "Volver al Inicio"}
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Confirmation;
