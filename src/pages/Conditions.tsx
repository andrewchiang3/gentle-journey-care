
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft } from 'lucide-react';

const conditions = {
  en: [
    { name: "Common Cold", description: "A viral infection causing upper respiratory symptoms." },
    { name: "Acute Otitis Media (Ear Infection)", description: "Infection of the middle ear, common in young children." },
    { name: "Hand, Foot, and Mouth Disease", description: "Viral infection causing sores in mouth and rash on hands and feet." },
    { name: "Respiratory Syncytial Virus (RSV)", description: "Common respiratory infection affecting infants and young children." },
    { name: "Strep Throat", description: "Bacterial infection causing sore throat and fever." },
    { name: "Chickenpox", description: "Viral infection causing itchy rash and fever." },
    { name: "Bronchiolitis", description: "Inflammation of small airways in lungs, common in infants." }
  ],
  es: [
    { name: "Resfriado Común", description: "Una infección viral que causa síntomas respiratorios superiores." },
    { name: "Otitis Media Aguda (Infección del Oído)", description: "Infección del oído medio, común en niños pequeños." },
    { name: "Enfermedad de Mano, Pie y Boca", description: "Infección viral que causa llagas en la boca y sarpullido en manos y pies." },
    { name: "Virus Respiratorio Sincitial (VRS)", description: "Infección respiratoria común que afecta a bebés y niños pequeños." },
    { name: "Faringitis Estreptocócica", description: "Infección bacteriana que causa dolor de garganta y fiebre." },
    { name: "Varicela", description: "Infección viral que causa sarpullido con picazón y fiebre." },
    { name: "Bronquiolitis", description: "Inflamación de las vías respiratorias pequeñas en los pulmones, común en bebés." }
  ]
};

const Conditions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const filteredConditions = conditions[language].filter(condition =>
    condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condition.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCondition = (conditionName: string) => {
    setSelectedConditions(prev =>
      prev.includes(conditionName)
        ? prev.filter(name => name !== conditionName)
        : [...prev, conditionName]
    );
  };

  const handleBack = () => {
    navigate('/confirmation', {
      state: {
        ...location.state,
        selectedConditions
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF7F3]">
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Brain className="h-6 w-6 text-[#FF9999]" />
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        <h1 className="text-2xl font-bold mb-2 text-[#2D1810]">
          {language === 'en' ? "Common Childhood Conditions" : "Condiciones Infantiles Comunes"}
        </h1>

        <div className="relative mb-6">
          <Input
            type="search"
            placeholder={language === 'en' 
              ? "Search conditions by name, symptoms..."
              : "Buscar condiciones por nombre, síntomas..."}
            className="w-full pl-4 pr-4 py-3 rounded-full bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredConditions.map((condition, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-xl shadow-sm cursor-pointer transition-colors ${
                selectedConditions.includes(condition.name)
                  ? 'border-2 border-[#FF9999]'
                  : 'border border-[#FFE4E4] hover:border-[#FF9999]'
              }`}
              onClick={() => toggleCondition(condition.name)}
            >
              <h3 className="text-lg font-semibold text-[#FF9999] mb-1">
                {condition.name}
              </h3>
              <p className="text-gray-600">
                {condition.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conditions;
