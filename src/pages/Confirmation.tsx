
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { analyzeMedicalConcerns } from '@/utils/llmProcessor';
import { generatePDF } from '@/utils/pdfGenerator';

const healthUpdates = {
  en: [
    "Keep your child up-to-date with routine vaccinations as per CDC recommendations.",
    "Aim for a balanced diet including fresh fruits, vegetables, whole grains, lean proteins, and low-fat dairy products.",
    "Establish consistent sleep schedules to promote healthy sleep patterns.",
    "Encourage regular physical activity through playtime or community sports programs.",
    "Limit screen time, especially before bedtime; encourage active engagement instead.",
    "Regular check-ups with local clinics for routine health maintenance."
  ],
  es: [
    "Mantenga al día las vacunas de rutina de su hijo según las recomendaciones del CDC.",
    "Procure una dieta balanceada que incluya frutas frescas, verduras, granos integrales, proteínas magras y lácteos bajos en grasa.",
    "Establezca horarios de sueño consistentes para promover patrones de sueño saludables.",
    "Fomente la actividad física regular a través de juegos o programas deportivos comunitarios.",
    "Limite el tiempo frente a las pantallas, especialmente antes de dormir; fomente la participación activa.",
    "Chequeos regulares en clínicas locales para el mantenimiento rutinario de la salud."
  ]
};

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const concerns = location.state?.concerns || '';
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
      <AlertDialogContent className="max-w-4xl">
        <div className="text-center space-y-6">
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
                : (language === 'en' ? "Here's your health summary" : "Aquí está su resumen de salud")}
            </AlertDialogTitle>
            
            {!isProcessing && (
              <div className="mt-8 space-y-6">
                {/* User's Input Summary */}
                <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2]">
                  <h3 className="text-lg font-semibold mb-3">
                    {language === 'en' ? "Your Input" : "Su Información"}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">{concerns}</p>
                </div>

                {/* Analysis */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3">
                    {language === 'en' ? "Our Analysis" : "Nuestro Análisis"}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">{analysis}</p>
                </div>

                {/* General Health Updates */}
                <div className="bg-[#FEF7CD] p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
                      alt="Health Tips"
                      className="w-16 h-16"
                    />
                    <h3 className="text-lg font-semibold">
                      {language === 'en' ? "General Health Updates" : "Actualizaciones Generales de Salud"}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {healthUpdates[language].map((update, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-700">{update}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <AlertDialogDescription className="mt-4">
              {isProcessing && (
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
