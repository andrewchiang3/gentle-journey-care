
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const homeRemedies = {
  en: [
    {
      topic: "Respiratory Symptoms (Cold, Cough, Sore Throat)",
      remedies: [
        {
          title: "Steam Inhalation",
          description: "Use a bowl of hot water and a towel or a humidifier to relieve congestion."
        },
        {
          title: "Saline Nasal Spray or Rinse",
          description: "Affordable at local pharmacies; helps clear nasal passages."
        },
        {
          title: "Honey and Warm Liquids",
          description: "Honey (for kids over 1 year old) can soothe sore throats and suppress coughs when mixed with warm water or tea."
        },
        {
          title: "Over-the-Counter (OTC) Medications",
          description: "Decongestants (like pseudoephedrine) and antihistamines (like diphenhydramine) for stuffy/runny noses. Children's ibuprofen or acetaminophen for fever or body aches."
        },
        {
          title: "Elevated Sleeping Position",
          description: "Use extra pillows to help kids sleep better when congested."
        }
      ]
    },
    {
      topic: "Gastrointestinal Symptoms (Diarrhea, Vomiting, Stomach Pain)",
      remedies: [
        {
          title: "Oral Rehydration Solutions (ORS)",
          description: "Electrolyte drinks like Pedialyte or store-brand alternatives are essential for preventing dehydration. Homemade ORS: Mix 1 liter of clean water with 6 teaspoons of sugar and ½ teaspoon of salt."
        },
        {
          title: "Bland Diet",
          description: "Stick to BRAT foods (Bananas, Rice, Applesauce, Toast) to ease upset stomachs."
        },
        {
          title: "Probiotics",
          description: "Yogurt with live cultures can help restore gut health after diarrhea or antibiotics."
        },
        {
          title: "Anti-Gas Remedies",
          description: "Simethicone (found in OTC products like Gas-X) can relieve bloating and stomach discomfort."
        }
      ]
    }
  ],
  es: [
    {
      topic: "Síntomas Respiratorios (Resfriado, Tos, Dolor de Garganta)",
      remedies: [
        {
          title: "Inhalación de Vapor",
          description: "Use un recipiente con agua caliente y una toalla o un humidificador para aliviar la congestión."
        },
        {
          title: "Spray o Enjuague Nasal Salino",
          description: "Económico en farmacias locales; ayuda a despejar las vías nasales."
        },
        {
          title: "Miel y Líquidos Calientes",
          description: "La miel (para niños mayores de 1 año) puede aliviar el dolor de garganta y suprimir la tos cuando se mezcla con agua tibia o té."
        },
        {
          title: "Medicamentos de Venta Libre",
          description: "Descongestionantes y antihistamínicos para nariz tapada/mocosa. Ibuprofeno o acetaminofén para niños en caso de fiebre o dolores corporales."
        },
        {
          title: "Posición Elevada para Dormir",
          description: "Use almohadas adicionales para ayudar a los niños a dormir mejor cuando están congestionados."
        }
      ]
    },
    {
      topic: "Síntomas Gastrointestinales (Diarrea, Vómitos, Dolor de Estómago)",
      remedies: [
        {
          title: "Soluciones de Rehidratación Oral (SRO)",
          description: "Bebidas de electrolitos como Pedialyte o alternativas de marca propia son esenciales para prevenir la deshidratación. SRO casero: Mezcle 1 litro de agua limpia con 6 cucharaditas de azúcar y ½ cucharadita de sal."
        },
        {
          title: "Dieta Blanda",
          description: "Siga la dieta BRAT (Plátano, Arroz, Manzana, Pan tostado) para aliviar el malestar estomacal."
        },
        {
          title: "Probióticos",
          description: "El yogur con cultivos vivos puede ayudar a restaurar la salud intestinal después de la diarrea o los antibióticos."
        },
        {
          title: "Remedios Anti-Gas",
          description: "Simeticona (encontrada en productos de venta libre como Gas-X) puede aliviar la hinchazón y el malestar estomacal."
        }
      ]
    }
  ]
};

const Conditions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRemedies, setSelectedRemedies] = useState<Array<{topic: string, remedy: string}>>([]);

  const filteredHomeRemedies = homeRemedies[language].filter(section =>
    section.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.remedies.some(remedy => 
      remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleRemedy = (topic: string, remedyTitle: string) => {
    setSelectedRemedies(prev => {
      const isSelected = prev.some(item => 
        item.topic === topic && item.remedy === remedyTitle
      );
      
      if (isSelected) {
        return prev.filter(item => 
          !(item.topic === topic && item.remedy === remedyTitle)
        );
      } else {
        return [...prev, { topic, remedy: remedyTitle }];
      }
    });
  };

  const handleBack = () => {
    navigate('/confirmation', {
      state: {
        ...location.state,
        selectedConditions: selectedRemedies
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
          <div className="w-10" />
        </div>

        <h1 className="text-2xl font-bold mb-2 text-[#2D1810]">
          {language === 'en' ? "What You Can Do at Home" : "Qué Puede Hacer en Casa"}
        </h1>

        <div className="relative mb-6">
          <Input
            type="search"
            placeholder={language === 'en' 
              ? "Search remedies, symptoms..."
              : "Buscar remedios, síntomas..."}
            className="w-full pl-4 pr-4 py-3 rounded-full bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredHomeRemedies.map((section, index) => (
            <Accordion key={index} type="single" collapsible className="bg-white rounded-xl shadow-sm">
              <AccordionItem value={`section-${index}`} className="border-none">
                <AccordionTrigger className="px-4 py-3 text-lg font-semibold text-[#2D1810] hover:bg-[#FDF7F3] rounded-t-xl">
                  {section.topic}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    {section.remedies.map((remedy, remedyIndex) => (
                      <div
                        key={remedyIndex}
                        className={`p-4 rounded-lg border transition-colors ${
                          selectedRemedies.some(item => 
                            item.topic === section.topic && item.remedy === remedy.title
                          )
                            ? 'border-2 border-[#FF9999] bg-[#FFF5F5]'
                            : 'border-[#FFE4E4] hover:border-[#FF9999]'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#FF9999] mb-1">
                              {remedy.title}
                            </h4>
                            <p className="text-gray-600">
                              {remedy.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`shrink-0 ml-2 ${
                              selectedRemedies.some(item => 
                                item.topic === section.topic && item.remedy === remedy.title
                              )
                                ? 'bg-[#FF9999] text-white hover:bg-[#FF9999]/90'
                                : 'text-[#FF9999] hover:text-[#FF9999]/90'
                            }`}
                            onClick={() => toggleRemedy(section.topic, remedy.title)}
                          >
                            <Plus className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conditions;
