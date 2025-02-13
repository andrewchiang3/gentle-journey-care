
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { generatePDF } from '@/utils/pdfGenerator';

const specificConcerns = {
  en: [
    "Developmental Delays: Consult a pediatrician and potentially an expert in child development or special education to develop an appropriate intervention plan.",
    "Behavioral Issues: Implement evidence-based approaches like Positive Behavioral Interventions and Supports (PBIS) for strategies on positive reinforcement and communication.",
    "Chronic Illnesses like Asthma: Work closely with local clinics to manage medications, develop an Asthma Action Plan, and ensure proper emergency preparedness.",
    "Injuries or Accidents: Seek prompt medical attention at a nearby clinic if any occur.",
    "Common Pediatric Complaints like Earaches or Strep Throat: Recognize symptoms and seek appropriate treatment within 24 hours to prevent complications."
  ],
  es: [
    "Retrasos en el desarrollo: Consulte con un pediatra y posiblemente con un experto en desarrollo infantil o educación especial para desarrollar un plan de intervención apropiado.",
    "Problemas de comportamiento: Implemente enfoques basados en evidencia como Intervenciones y Apoyos Conductuales Positivos (PBIS) para estrategias de refuerzo positivo y comunicación.",
    "Enfermedades crónicas como el asma: Trabaje estrechamente con clínicas locales para manejar medicamentos, desarrollar un Plan de Acción para el Asma y asegurar la preparación para emergencias.",
    "Lesiones o accidentes: Busque atención médica inmediata en una clínica cercana si ocurren.",
    "Quejas pediátricas comunes como dolor de oídos o faringitis estreptocócica: Reconozca los síntomas y busque tratamiento apropiado dentro de las 24 horas para prevenir complicaciones."
  ]
};

const checkupGuidelines = {
  en: [
    "Regular well-child visits are essential for monitoring growth and development",
    "Vaccinations should be kept up to date according to the recommended schedule",
    "Discuss any changes in eating, sleeping, or behavior patterns",
    "Track developmental milestones and discuss any concerns",
    "Maintain regular dental check-ups and good oral hygiene"
  ],
  es: [
    "Las visitas regulares de control del niño son esenciales para monitorear el crecimiento y desarrollo",
    "Las vacunas deben mantenerse actualizadas según el calendario recomendado",
    "Discutir cualquier cambio en los patrones de alimentación, sueño o comportamiento",
    "Seguir los hitos del desarrollo y discutir cualquier preocupación",
    "Mantener chequeos dentales regulares y buena higiene oral"
  ]
};

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const concerns = location.state?.concerns || '';
  const language = location.state?.language || 'en';
  const isCheckup = location.state?.isCheckup || false;

  const handleDownloadPDF = () => {
    const guidelinesToUse = isCheckup ? checkupGuidelines[language].join('\n\n') : specificConcerns[language].join('\n\n');
    const pdfUrl = generatePDF(concerns, guidelinesToUse, language);
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <ScrollArea className="h-[80vh] rounded-md">
          <div className="p-6 space-y-6">
            {/* Header with Avatar */}
            <div className="text-center space-y-4">
              <img
                src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
                alt="Friendly Medical Helper"
                className="w-24 h-24 mx-auto"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                {isCheckup 
                  ? (language === 'en' ? "Check-up Information Summary" : "Resumen de Información del Chequeo")
                  : (language === 'en' ? "Health Information Summary" : "Resumen de Información de Salud")}
              </h1>
            </div>

            {/* User's Input Summary */}
            <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2]">
              <h3 className="text-lg font-semibold mb-3">
                {isCheckup
                  ? (language === 'en' ? "Your Check-up Information" : "Su Información del Chequeo")
                  : (language === 'en' ? "Your Concerns" : "Sus Preocupaciones")}
              </h3>
              <p className="text-gray-700 whitespace-pre-line">{concerns}</p>
            </div>

            {/* Guidelines Section */}
            <div className="bg-[#FEF7CD] p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
                  alt="Health Tips"
                  className="w-16 h-16"
                />
                <h3 className="text-lg font-semibold">
                  {isCheckup
                    ? (language === 'en' ? "Important Check-up Guidelines" : "Pautas Importantes del Chequeo")
                    : (language === 'en' ? "Important Health Guidelines" : "Pautas Importantes de Salud")}
                </h3>
              </div>
              <ul className="space-y-4">
                {(isCheckup ? checkupGuidelines[language] : specificConcerns[language]).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="bg-white"
              >
                {language === 'en' ? "Return Home" : "Volver al Inicio"}
              </Button>
              <Button
                onClick={handleDownloadPDF}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {language === 'en' ? "Download Summary (PDF)" : "Descargar Resumen (PDF)"}
              </Button>
              <Button
                onClick={() => navigate('/schedule', { state: { ...location.state } })}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {language === 'en' ? "Schedule Appointment" : "Programar Cita"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Confirmation;
