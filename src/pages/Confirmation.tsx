import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { analyzeMedicalConcerns } from '@/utils/llmProcessor';
import { generatePDF } from '@/utils/pdfGenerator';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const concerns = location.state?.concerns || 'My child has had a fever for the past day and seems more tired than usual.';
  const language = location.state?.language || 'en';
  const [isProcessing, setIsProcessing] = useState(true);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const processAnalysis = async () => {
      const result = await analyzeMedicalConcerns(concerns, language);
      setAnalysis(result.text);
      setIsProcessing(false);

      toast({
        title: language === 'en' ? "Analysis Complete" : "Análisis Completado",
        description: language === 'en' 
          ? "We've processed your information"
          : "Hemos procesado su información",
      });
    };

    processAnalysis();
  }, [concerns, language, toast]);

  const handleDownloadPDF = () => {
    const pdfUrl = generatePDF(concerns, analysis, language);
    window.open(pdfUrl, '_blank');
    
    toast({
      title: language === 'en' ? "PDF Generated" : "PDF Generado",
      description: language === 'en' 
        ? "Your analysis report has been downloaded"
        : "Su informe de análisis ha sido descargado",
    });
  };

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
            <AlertDialogFooter className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button onClick={handleDownloadPDF} variant="outline">
                {language === 'en' ? "Download PDF Report" : "Descargar Informe PDF"}
              </Button>
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
