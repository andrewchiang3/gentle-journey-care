import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { generatePDF } from '@/utils/pdfGenerator';
import { Brain, Shield, Globe } from 'lucide-react';

const specificConcerns = {
  en: [
    "When to Seek Help:",
    "Persistent high fever (above 103°F) or fever lasting more than 3 days.",
    "Severe dehydration (no urination, dry mouth, sunken eyes).",
    "Difficulty breathing, confusion, or seizures.",
    "Signs of serious infection (red streaks around a wound, swollen joints, unresponsiveness)."
  ],
  es: [
    "Cuándo Buscar Ayuda:",
    "Fiebre alta persistente (superior a 39.4°C) o fiebre que dura más de 3 días.",
    "Deshidratación severa (sin orinar, boca seca, ojos hundidos).",
    "Dificultad para respirar, confusión o convulsiones.",
    "Signos de infección grave (líneas rojas alrededor de una herida, articulaciones hinchadas, falta de respuesta)."
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

          <div className="bg-[#FEF7CD] p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
                alt="Health Tips"
                className="w-16 h-16"
              />
              <h3 className="text-lg font-semibold">
                {language === 'en' ? "Important Health Guidelines" : "Pautas Importantes de Salud"}
              </h3>
            </div>
            <ul className="space-y-4">
              {specificConcerns[language].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* What You Can Do At Home Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-[#FFF5F5] w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-[#FF9999]" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? "Helpful Care at Home" : "Cuidados Útiles en Casa"}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'en'
                  ? "Discover gentle, comforting ways to care for your child at home with our family-friendly guide to common childhood symptoms."
                  : "Descubra formas suaves y reconfortantes de cuidar a su hijo en casa con nuestra guía familiar para síntomas infantiles comunes."}
              </p>
              <Button
                onClick={() => navigate('/conditions', { state: { ...location.state } })}
                className="w-full bg-[#C3E8DF] hover:bg-[#A5D4C8] text-gray-800"
              >
                {language === 'en' ? "Explore Home Care Options" : "Explorar Opciones de Cuidado en Casa"}
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

            {/* Community Resources Card */}
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-[#E8F5FF] w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-[#4B9FE1]" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? "Community Support & Resources" : "Apoyo y Recursos Comunitarios"}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'en'
                  ? "Connect with local resources and support services that can help your family thrive. Discover programs, assistance, and community organizations ready to support you."
                  : "Conéctese con recursos locales y servicios de apoyo que pueden ayudar a su familia a prosperar. Descubra programas, asistencia y organizaciones comunitarias listas para apoyarlo."}
              </p>
              <Button
                onClick={() => navigate('/resources', { state: { ...location.state } })}
                className="w-full bg-[#4B9FE1] hover:bg-[#3A8ED0] text-white"
              >
                {language === 'en' ? "Explore Community Resources" : "Explorar Recursos Comunitarios"}
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
