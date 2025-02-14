
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, Plus } from 'lucide-react';

const conditions = {
  en: [
    {
      name: "Respiratory Symptoms",
      description: "Steam inhalation with hot water and towel, saline nasal spray, honey with warm water (for kids over 1), elevated sleeping position with extra pillows."
    },
    {
      name: "Gastrointestinal Symptoms",
      description: "Use Pedialyte or homemade ORS (mix water with sugar and salt), try BRAT diet (Bananas, Rice, Applesauce, Toast), offer probiotic yogurt."
    },
    {
      name: "Skin Conditions",
      description: "Apply calamine lotion for itchy rashes, hydrocortisone cream for irritation, try oatmeal baths, keep wounds clean and covered."
    },
    {
      name: "Nutritional Care",
      description: "Offer iron-rich foods like beans and fortified cereals, consider children's multivitamins, ensure proper hydration."
    },
    {
      name: "Fever Management",
      description: "Use weight-appropriate doses of acetaminophen/ibuprofen, try lukewarm baths, apply cool compress to forehead."
    },
    {
      name: "Allergy Care",
      description: "Consider OTC antihistamines, try local honey, reduce indoor allergens with regular cleaning."
    },
    {
      name: "Common Infections",
      description: "Use warm compress for ear pain, try saltwater rinses for toothaches, proper tick removal with tweezers."
    },
    {
      name: "Preventive Care",
      description: "Regular handwashing, maintain hygiene supplies, monitor temperature with digital thermometer."
    }
  ],
  es: [
    {
      name: "Síntomas Respiratorios",
      description: "Inhalación de vapor con agua caliente y toalla, spray nasal salino, miel con agua tibia (para niños mayores de 1 año), posición elevada para dormir."
    },
    {
      name: "Síntomas Gastrointestinales",
      description: "Use Pedialyte o suero casero (mezcle agua con azúcar y sal), dieta blanda (Plátano, Arroz, Manzana, Pan), ofrezca yogur probiótico."
    },
    {
      name: "Condiciones de la Piel",
      description: "Aplique loción de calamina para picazón, crema de hidrocortisona para irritación, baños de avena, mantenga heridas limpias y cubiertas."
    },
    {
      name: "Cuidado Nutricional",
      description: "Ofrezca alimentos ricos en hierro como frijoles y cereales fortificados, considere multivitamínicos, asegure hidratación adecuada."
    },
    {
      name: "Manejo de Fiebre",
      description: "Use dosis apropiadas de acetaminofén/ibuprofeno, baños tibios, aplique compresas frías en la frente."
    },
    {
      name: "Cuidado de Alergias",
      description: "Considere antihistamínicos, pruebe miel local, reduzca alérgenos con limpieza regular."
    },
    {
      name: "Infecciones Comunes",
      description: "Use compresas tibias para dolor de oído, enjuagues con agua salada para dolor de dientes, retire garrapatas con pinzas."
    },
    {
      name: "Cuidado Preventivo",
      description: "Lavado regular de manos, mantenga suministros de higiene, monitoree temperatura con termómetro digital."
    }
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
              className={`bg-white p-4 rounded-xl shadow-sm transition-colors ${
                selectedConditions.includes(condition.name)
                  ? 'border-2 border-[#FF9999]'
                  : 'border border-[#FFE4E4] hover:border-[#FF9999]'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#FF9999] mb-1">
                    {condition.name}
                  </h3>
                  <p className="text-gray-600">
                    {condition.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`shrink-0 ml-2 ${
                    selectedConditions.includes(condition.name)
                      ? 'bg-[#FF9999] text-white hover:bg-[#FF9999]/90'
                      : 'text-[#FF9999] hover:text-[#FF9999]/90'
                  }`}
                  onClick={() => toggleCondition(condition.name)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conditions;
