import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { generatePDF } from '@/utils/pdfGenerator';
import { Brain, Shield } from 'lucide-react';

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
    "Vaccinations: Keep your child up-to-date with routine vaccinations as per CDC recommendations",
    "Nutrition: Aim for a balanced diet including fresh fruits, vegetables, whole grains, lean proteins, and low-fat dairy products. Be mindful of food insecurity in rural communities",
    "Sleep Hygiene: Establish consistent sleep schedules to promote healthy sleep patterns",
    "Physical Activity: Encourage regular physical activity through playtime or community sports programs",
    "Screen Time: Limit screen time, especially before bedtime; encourage active engagement instead",
    "Preventive Care: Regular check-ups with local clinics for routine health maintenance and early detection of potential issues",
    "Developmental Milestones: Track and discuss any concerns about your child's development",
    "Dental Health: Maintain regular dental check-ups and practice good oral hygiene"
  ],
  es: [
    "Vacunas: Mantenga a su hijo al día con las vacunas de rutina según las recomendaciones del CDC",
    "Nutrición: Procure una dieta equilibrada que incluya frutas frescas, verduras, granos integrales, proteínas magras y productos lácteos bajos en grasa. Tenga en cuenta la inseguridad alimentaria en las comunidades rurales",
    "Higiene del Sueño: Establezca horarios de sueño consistentes para promover patrones de sueño saludables",
    "Actividad Física: Fomente la actividad física regular a través del tiempo de juego o programas deportivos comunitarios",
    "Tiempo de Pantalla: Limite el tiempo frente a la pantalla, especialmente antes de dormir; fomente la participación activa en su lugar",
    "Atención Preventiva: Chequeos regulares en clínicas locales para el mantenimiento rutinario de la salud y la detección temprana de posibles problemas",
    "Hitos del Desarrollo: Realice seguimiento y discuta cualquier preocupación sobre el desarrollo de su hijo",
    "Salud Dental: Mantenga chequeos dentales regulares y practique una buena higiene oral"
  ]
};

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const concerns = location.state?.concerns || '';
  const language = location.state?.language || 'en';
  const isCheckup = location.state?.isCheckup || false;
  const selectedConditions = location.state?.selectedConditions || [];
  const selectedMedicines = location.state?.selectedMedicines || [];

  const handleDownloadPDF = () => {
    const guidelinesToUse = isCheckup ? checkupGuidelines[language].join('\n\n') : specificConcerns[language].join('\n\n');
    const pdfUrl = generatePDF(
      concerns, 
      guidelinesToUse, 
      language,
      selectedConditions,
      selectedMedicines
    );
    window.open(pdfUrl, '_blank');
  };

  if (isCheckup) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-6 max-w-4xl mx-auto">
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

            <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2]">
              <h3 className="text-lg font-semibold mb-3">
                {isCheckup
                  ? (language === 'en' ? "Your Check-up Information" : "Su Información del Chequeo")
                  : (language === 'en' ? "Your Concerns" : "Sus Preocupaciones")}
              </h3>
              <p className="text-gray-700 whitespace-pre-line">{concerns}</p>
            </div>

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
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <img
              src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
              alt="Friendly Medical Helper"
              className="w-24 h-24 mx-auto"
            />
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'en' ? "Health Information Summary" : "Resumen de Información de Salud"}
            </h1>
          </div>

          <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2]">
            <h3 className="text-lg font-semibold mb-3">
              {language === 'en' ? "Your Concerns" : "Sus Preocupaciones"}
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{concerns}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Find Conditions Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-[#FFF5F5] w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-[#FF9999]" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? "Find Conditions" : "Encontrar Condiciones"}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'en'
                  ? "Learn about common children's health conditions and their treatments, with expert insights."
                  : "Aprenda sobre condiciones de salud comunes en niños y sus tratamientos, con información experta."}
              </p>
              <Button
                onClick={() => navigate('/conditions', { state: { ...location.state } })}
                className="w-full bg-[#C3E8DF] hover:bg-[#A5D4C8] text-gray-800"
              >
                {language === 'en' ? "Explore Conditions" : "Explorar Condiciones"}
              </Button>
            </div>

            {/* Medicine Guide Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-[#F5F9FF] w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-[#7EB8E7]" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? "Medicine Guide" : "Guía de Medicamentos"}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'en'
                  ? "Access our comprehensive guide to child-safe medications and proper dosage information."
                  : "Acceda a nuestra guía completa de medicamentos seguros para niños e información de dosificación."}
              </p>
              <Button
                onClick={() => navigate('/medicines', { state: { ...location.state } })}
                className="w-full bg-white hover:bg-gray-50 border-2 border-[#7EB8E7] text-gray-800"
              >
                {language === 'en' ? "Search Medicines" : "Buscar Medicamentos"}
              </Button>
            </div>
          </div>

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
  );
};

export default Confirmation;
