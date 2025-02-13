import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { generatePDF } from '@/utils/pdfGenerator';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const commonConditions = {
  en: {
    trending: [
      { name: "Respiratory Syncytial Virus (RSV)", description: "Common respiratory infection affecting young children" },
      { name: "Hand, Foot, and Mouth Disease", description: "Viral infection causing sores in mouth and rash on hands and feet" },
      { name: "Strep Throat", description: "Bacterial infection causing sore throat and fever" }
    ],
    all: [
      { name: "Acute Otitis Media", description: "Middle ear infection common in young children" },
      { name: "Bronchiolitis", description: "Inflammation of small airways in the lungs" },
      { name: "Chickenpox", description: "Viral infection causing itchy rash and fever" },
      { name: "Croup", description: "Upper airway infection with barking cough" },
      { name: "Gastroenteritis", description: "Stomach flu causing diarrhea and vomiting" },
      { name: "Impetigo", description: "Bacterial skin infection common in children" },
      { name: "Pinkeye", description: "Conjunctivitis, eye inflammation or infection" },
      { name: "Pneumonia", description: "Lung infection causing cough and fever" }
    ]
  },
  es: {
    trending: [
      { name: "Virus Respiratorio Sincitial (VRS)", description: "Infección respiratoria común que afecta a niños pequeños" },
      { name: "Enfermedad de Mano, Pie y Boca", description: "Infección viral que causa llagas en la boca y sarpullido en manos y pies" },
      { name: "Faringitis Estreptocócica", description: "Infección bacteriana que causa dolor de garganta y fiebre" }
    ],
    all: [
      { name: "Otitis Media Aguda", description: "Infección del oído medio común en niños pequeños" },
      { name: "Bronquiolitis", description: "Inflamación de las vías respiratorias pequeñas en los pulmones" },
      { name: "Varicela", description: "Infección viral que causa sarpullido con picazón y fiebre" },
      { name: "Crup", description: "Infección de las vías respiratorias superiores con tos perruna" },
      { name: "Gastroenteritis", description: "Gripe estomacal que causa diarrea y vómitos" },
      { name: "Impétigo", description: "Infección bacteriana de la piel común en niños" },
      { name: "Conjuntivitis", description: "Inflamación o infección del ojo" },
      { name: "Neumonía", description: "Infección pulmonar que causa tos y fiebre" }
    ]
  }
};

const commonMedications = {
  en: {
    trending: [
      { name: "Amoxicillin", usage: "Antibiotic for bacterial infections" },
      { name: "Children's Tylenol", usage: "Pain and fever reducer" },
      { name: "Children's Motrin", usage: "Pain and fever reducer" }
    ],
    all: [
      { name: "Azithromycin", usage: "Antibiotic for various infections" },
      { name: "Benadryl", usage: "Antihistamine for allergies" },
      { name: "Cefdinir", usage: "Antibiotic for various infections" },
      { name: "Children's Allegra", usage: "Antihistamine for allergies" },
      { name: "Children's Claritin", usage: "Antihistamine for allergies" },
      { name: "Children's Zyrtec", usage: "Antihistamine for allergies" },
      { name: "Pedialyte", usage: "Oral rehydration solution" },
      { name: "Prednisone", usage: "Steroid for inflammation" }
    ]
  },
  es: {
    trending: [
      { name: "Amoxicilina", usage: "Antibiótico para infecciones bacterianas" },
      { name: "Tylenol para Niños", usage: "Reductor de dolor y fiebre" },
      { name: "Motrin para Niños", usage: "Reductor de dolor y fiebre" }
    ],
    all: [
      { name: "Azitromicina", usage: "Antibiótico para varias infecciones" },
      { name: "Benadryl", usage: "Antihistamínico para alergias" },
      { name: "Cefdinir", usage: "Antibiótico para varias infecciones" },
      { name: "Allegra para Niños", usage: "Antihistamínico para alergias" },
      { name: "Claritin para Niños", usage: "Antihistamínico para alergias" },
      { name: "Zyrtec para Niños", usage: "Antihistamínico para alergias" },
      { name: "Pedialyte", usage: "Solución de rehidratación oral" },
      { name: "Prednisona", usage: "Esteroide para la inflamación" }
    ]
  }
};

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
  const [searchTerm, setSearchTerm] = useState('');

  const handleDownloadPDF = () => {
    const guidelinesToUse = isCheckup ? checkupGuidelines[language].join('\n\n') : specificConcerns[language].join('\n\n');
    const pdfUrl = generatePDF(concerns, guidelinesToUse, language);
    window.open(pdfUrl, '_blank');
  };

  const filterItems = (items: any[]) => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.usage?.toLowerCase().includes(searchTerm.toLowerCase())
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

          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              className="pl-10 bg-white"
              placeholder={language === 'en' ? "Search conditions or medications..." : "Buscar condiciones o medicamentos..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-[#FEF7CD] p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? "Find Conditions" : "Encontrar Condiciones"}
            </h3>
            
            {/* Trending Conditions */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3 text-orange-600">
                {language === 'en' ? "Trending Now" : "Tendencias Actuales"}
              </h4>
              <div className="grid gap-3">
                {filterItems(commonConditions[language].trending).map((condition, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-gray-800">{condition.name}</h5>
                    <p className="text-gray-600 text-sm mt-1">{condition.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* All Conditions */}
            <div className="grid gap-3">
              {filterItems(commonConditions[language].all).map((condition, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold text-gray-800">{condition.name}</h5>
                  <p className="text-gray-600 text-sm mt-1">{condition.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#E5F2FC] p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? "Medicine Guide" : "Guía de Medicamentos"}
            </h3>
            
            {/* Trending Medications */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3 text-blue-600">
                {language === 'en' ? "Commonly Prescribed" : "Comúnmente Recetados"}
              </h4>
              <div className="grid gap-3">
                {filterItems(commonMedications[language].trending).map((medication, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-gray-800">{medication.name}</h5>
                    <p className="text-gray-600 text-sm mt-1">{medication.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* All Medications */}
            <div className="grid gap-3">
              {filterItems(commonMedications[language].all).map((medication, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold text-gray-800">{medication.name}</h5>
                  <p className="text-gray-600 text-sm mt-1">{medication.usage}</p>
                </div>
              ))}
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
