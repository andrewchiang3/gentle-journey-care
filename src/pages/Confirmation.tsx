import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { generatePDF } from '@/utils/pdfGenerator';
import { 
  Shield, Globe, Info, Heart, WandSparkles, Sparkles, 
  Leaf, ArrowLeft, Plus, Check 
} from 'lucide-react';
import { RiskAssessment, RemedySuggestion } from '@/types/form';
import cow from '../img/cow.png'
import sheep from '../img/sheep.png'
import { toast } from "@/hooks/use-toast";

const specificConcerns = {
  en: [
    {
      level: "Emergency - Seek Immediate Care",
      concerns: [
        "Difficulty breathing or turning blue",
        "Unresponsiveness or seizures",
        "Severe bleeding or deep wounds",
        "Stiff neck with fever (possible meningitis)"
      ]
    },
    {
      level: "Urgent - See Doctor Within 24 Hours",
      concerns: [
        "High fever (above 103°F) for over 24 hours",
        "Any fever in babies under 3 months",
        "Persistent vomiting or diarrhea",
        "Worsening rash with fever"
      ]
    },
    {
      level: "Call Your Doctor When Convenient",
      concerns: [
        "Mild fever with normal behavior",
        "Ear pain without fever",
        "Cough without breathing problems",
        "Minor injuries that may need assessment"
      ]
    },
    {
      level: "Home Care Is Usually Sufficient",
      concerns: [
        "Minor cold symptoms with normal activity",
        "Low-grade fever with good fluid intake",
        "Mild stomach upset (1-2 episodes)",
        "Minor scratches healing normally"
      ]
    }
  ],
  es: [
    {
      level: "Emergencia - Atención Inmediata",
      concerns: [
        "Dificultad para respirar o color azulado",
        "Falta de respuesta o convulsiones",
        "Sangrado severo o heridas profundas",
        "Rigidez de cuello con fiebre (posible meningitis)"
      ]
    },
    {
      level: "Urgente - Ver al Médico en 24 Horas",
      concerns: [
        "Fiebre alta (más de 39.4°C) por más de 24 horas",
        "Cualquier fiebre en bebés menores de 3 meses",
        "Vómitos o diarrea persistentes",
        "Sarpullido que empeora con fiebre"
      ]
    },
    {
      level: "Llame a Su Médico Cuando Sea Conveniente",
      concerns: [
        "Fiebre leve con comportamiento normal",
        "Dolor de oído sin fiebre",
        "Tos sin problemas respiratorios",
        "Lesiones menores que pueden necesitar evaluación"
      ]
    },
    {
      level: "El Cuidado en Casa Suele Ser Suficiente",
      concerns: [
        "Síntomas leves de resfriado con actividad normal",
        "Fiebre baja con buena ingesta de líquidos",
        "Malestar estomacal leve (1-2 episodios)",
        "Rasguños menores que sanan normalmente"
      ]
    }
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
  const insightAssessment: RiskAssessment | undefined = location.state?.analysis?.insightAssessment;
  
  const [selectedRemedies, setSelectedRemedies] = useState<{
    topic: string;
    remedies: {title: string; description: string}[];
  }[]>([]);

  const handleDownloadPDF = () => {
    const guidelinesToUse = isCheckup ? checkupGuidelines[language].join('\n\n') : specificConcerns[language].map(item => 
      `${item.level}:\n${item.concerns.map(concern => `• ${concern}`).join('\n')}`
    ).join('\n\n');
    
    const pdfUrl = generatePDF(
      concerns, 
      guidelinesToUse, 
      language,
      [...selectedConditions, ...selectedRemedies],
      selectedMedicines
    );
    window.open(pdfUrl, '_blank');
  };

  const getStatusColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      case 'moderate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'elevated': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getStatusLabel = (riskLevel: string) => {
    if (language === 'en') {
      switch (riskLevel) {
        case 'low': return 'Routine Care';
        case 'moderate': return 'Some Attention Needed';
        case 'elevated': return 'Attention Recommended';
        case 'high': return 'Prompt Attention Advised';
        default: return 'Care Insights';
      }
    } else {
      switch (riskLevel) {
        case 'low': return 'Cuidado Rutinario';
        case 'moderate': return 'Algo de Atención Necesaria';
        case 'elevated': return 'Atención Recomendada';
        case 'high': return 'Atención Pronta Aconsejada';
        default: return 'Información de Cuidado';
      }
    }
  };

  const addRemedy = (remedy: RemedySuggestion) => {
    setSelectedRemedies(prev => {
      const exists = prev.some(r => r.topic === remedy.topic && 
        r.remedies.some(item => remedy.remedies.some(ri => ri.title === item.title)));
      
      if (exists) {
        return prev;
      }
      
      const newRemedies = [...prev, remedy];
      toast({
        title: language === 'en' ? "Added to summary" : "Añadido al resumen",
        description: language === 'en' ? 
          "Home care recommendations added to your downloadable summary" : 
          "Recomendaciones de cuidado en casa añadidas a su resumen descargable"
      });
      return newRemedies;
    });
  };

  const renderAIInsights = () => {
    if (!insightAssessment) return null;
    
    return (
      <div className="bg-[#F0F7FF] p-6 rounded-lg shadow-sm border border-[#D0E3F7] mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-white p-2 rounded-full">
            <Sparkles className="h-8 w-8 text-[#4B9FE1]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1A5089]">
              {language === 'en' ? "Care Insights & Helpful Tips" : "Información de Cuidado y Consejos Útiles"}
            </h3>
            <p className="text-sm text-[#4B78A5]">
              {language === 'en' 
                ? "Based on what you've shared, we've put together some helpful information"
                : "Basado en lo que ha compartido, hemos reunido información útil"}
            </p>
          </div>
        </div>

        <div className={`p-3 rounded-md mb-4 border ${getStatusColor(insightAssessment.riskLevel)}`}>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <span className="font-medium">
              {language === 'en' ? "Care Level: " : "Nivel de Cuidado: "}
              {getStatusLabel(insightAssessment.riskLevel)}
            </span>
          </div>
        </div>

        {insightAssessment.keyFactors.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[#1A5089] mb-2">
              {language === 'en' ? "We've noticed:" : "Hemos notado:"}
            </h4>
            <ul className="space-y-1">
              {insightAssessment.keyFactors.map((factor, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Leaf className="h-4 w-4 mr-2 mt-0.5 text-[#4B9FE1]" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {insightAssessment.recommendations.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[#1A5089] mb-2">
              {language === 'en' ? "Helpful suggestions:" : "Sugerencias útiles:"}
            </h4>
            <ul className="space-y-1">
              {insightAssessment.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Heart className="h-4 w-4 mr-2 mt-0.5 text-[#4B9FE1]" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {insightAssessment.suggestedRemedies && insightAssessment.suggestedRemedies.length > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <h4 className="text-sm font-medium text-[#1A5089] mb-2">
              {language === 'en' ? "At-home care options you might find helpful:" : "Opciones de cuidado en casa que podrían ser útiles:"}
            </h4>
            <div className="space-y-3">
              {insightAssessment.suggestedRemedies.map((remedyGroup, groupIndex) => (
                <div key={groupIndex} className="bg-white p-3 rounded-md border border-blue-100">
                  <div className="flex justify-between items-start">
                    <h5 className="text-sm font-medium text-blue-800">{remedyGroup.topic}</h5>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 px-2" 
                      onClick={() => addRemedy(remedyGroup)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      <span className="text-xs">
                        {language === 'en' ? "Add to summary" : "Añadir al resumen"}
                      </span>
                    </Button>
                  </div>
                  <ul className="mt-2 space-y-2">
                    {remedyGroup.remedies.map((remedy, remedyIndex) => (
                      <li key={remedyIndex} className="text-xs text-gray-700">
                        <span className="font-medium">{remedy.title}:</span> {remedy.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-blue-200 text-xs text-blue-600">
          {language === 'en' 
            ? "NOTE: This information is not a medical diagnosis. Always consult with a healthcare professional for proper medical advice."
            : "NOTA: Esta información no es un diagnóstico médico. Siempre consulte con un profesional de la salud para obtener un consejo médico adecuado."}
        </div>
      </div>
    );
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
                {language === 'en' ? "Check-up Information Summary" : "Resumen de Información del Chequeo"}
              </h1>
            </div>

            <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#E2ECD2]">
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? "Your Check-up Information" : "Su Información del Chequeo"}
              </h3>
              <p className="text-gray-700 whitespace-pre-line">{concerns}</p>
            </div>

            {renderAIInsights()}

            <div className="bg-[#FEF7CD] p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={sheep}
                  alt="Health Tips"
                  className="w-16 h-16"
                />
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? "Important Check-up Guidelines" : "Pautas Importantes del Chequeo"}
                </h3>
              </div>
              <ul className="space-y-4">
                {checkupGuidelines[language].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
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

          {renderAIInsights()}

          <div className="bg-[#FEF7CD] p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={cow}
                alt="Health Tips"
                className="w-16 h-16"
              />
              <h3 className="text-lg font-semibold">
                {language === 'en' ? "When to Seek Help" : "Cuándo buscar ayuda"}
              </h3>
            </div>
            
            <div className="space-y-4">
              {specificConcerns[language].map((category, categoryIndex) => (
                <div key={categoryIndex} className={`p-4 rounded-lg ${
                  categoryIndex === 0 
                    ? 'bg-red-50 border border-red-200' 
                    : categoryIndex === 1 
                      ? 'bg-orange-50 border border-orange-200'
                      : categoryIndex === 2
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-green-50 border border-green-200'
                }`}>
                  <h4 className={`font-bold text-base ${
                    categoryIndex === 0 
                      ? 'text-red-700' 
                      : categoryIndex === 1 
                        ? 'text-orange-700'
                        : categoryIndex === 2
                          ? 'text-blue-700'
                          : 'text-green-700'
                  }`}>
                    {category.level}
                  </h4>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {category.concerns.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className={`mr-1.5 mt-1 text-sm ${
                          categoryIndex === 0 
                            ? 'text-red-500' 
                            : categoryIndex === 1 
                              ? 'text-orange-500'
                              : categoryIndex === 2
                                ? 'text-blue-500'
                                : 'text-green-500'
                        }`}>•</span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-[#FFF5F5] w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <WandSparkles className="h-8 w-8 text-[#FF9999]" />
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
