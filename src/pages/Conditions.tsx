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
    },
    {
      topic: "Skin Conditions (Rashes, Infections, Itching)",
      remedies: [
        {
          title: "Topical Treatments",
          description: "Calamine lotion for itchy rashes or poison ivy. Hydrocortisone cream for eczema or minor skin irritation. Antiseptic ointments like Neosporin for cuts and minor infections."
        },
        {
          title: "Oatmeal Baths",
          description: "Soothing for itchy skin or chickenpox; grind oatmeal into a fine powder and mix into bathwater."
        },
        {
          title: "Clean and Cover Wounds",
          description: "Wash with soap and water, apply antiseptic, and cover with a clean bandage."
        }
      ]
    },
    {
      topic: "Nutritional Deficiencies (Fatigue, Weakness)",
      remedies: [
        {
          title: "Iron-Rich Foods",
          description: "Add canned beans, peanut butter, or fortified cereals to meals to combat iron deficiency."
        },
        {
          title: "Multivitamins",
          description: "Store-bought children's vitamins can help fill nutritional gaps."
        },
        {
          title: "Hydration",
          description: "Encourage drinking plenty of water, especially for kids who are tired or sluggish."
        }
      ]
    },
    {
      topic: "Fever and Pain",
      remedies: [
        {
          title: "Fever Management",
          description: "Use acetaminophen or ibuprofen based on the child's weight (always check dosing instructions). Lukewarm baths can help bring down fevers."
        },
        {
          title: "Cool Compress",
          description: "Apply a damp cloth to the forehead or back of the neck for relief."
        }
      ]
    },
    {
      topic: "Allergies (Sneezing, Itchy Eyes)",
      remedies: [
        {
          title: "Allergy Medications",
          description: "OTC products like loratadine (Claritin) or diphenhydramine (Benadryl) can manage symptoms."
        },
        {
          title: "Local Honey",
          description: "Some believe local honey may help reduce allergy symptoms over time."
        },
        {
          title: "Dust and Pollen Reduction",
          description: "Use damp cloths to wipe down surfaces, and vacuum regularly to reduce indoor allergens."
        }
      ]
    },
    {
      topic: "Infections (Ear Pain, Toothaches, Tick Bites)",
      remedies: [
        {
          title: "Ear Pain",
          description: "Use a warm compress over the ear to ease discomfort. OTC pain relievers can reduce inflammation and pain."
        },
        {
          title: "Toothaches",
          description: "Saltwater rinses can help with gum inflammation. Clove oil (available at some pharmacies) can be applied with a cotton swab for temporary relief."
        },
        {
          title: "Tick Removal",
          description: "Use fine-tipped tweezers to remove the tick and clean the bite area with alcohol (isopropyl alcohol or ethyl alcohol). Watch for symptoms like fever or rash and seek medical attention if needed."
        }
      ]
    },
    {
      topic: "Preventive and General Care",
      remedies: [
        {
          title: "Handwashing",
          description: "Teach children to wash hands with soap and water frequently to prevent spreading illness."
        },
        {
          title: "Hygiene Kits",
          description: "Keep basic supplies like soap, tissues, and sanitizer handy."
        },
        {
          title: "Thermometers",
          description: "Affordable digital thermometers can help monitor fever accurately."
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
    },
    {
      topic: "Condiciones de la Piel (Sarpullidos, Infecciones, Picazón)",
      remedies: [
        {
          title: "Tratamientos Tópicos",
          description: "Loción de calamina para sarpullidos con picazón. Crema de hidrocortisona para eccema o irritación menor. Ungüentos antisépticos para cortes menores."
        },
        {
          title: "Baños de Avena",
          description: "Calmante para la piel con picazón o varicela; muela la avena hasta obtener un polvo fino y mézclelo en el agua del baño."
        },
        {
          title: "Limpiar y Cubrir Heridas",
          description: "Lave con agua y jabón, aplique antiséptico y cubra con un vendaje limpio."
        }
      ]
    },
    {
      topic: "Deficiencias Nutricionales (Fatiga, Debilidad)",
      remedies: [
        {
          title: "Alimentos Ricos en Hierro",
          description: "Agregue harinas de canasta, manteca de nueces o cereales fortificados a las comidas para combatir la deficiencia de hierro."
        },
        {
          title: "Vitaminas Multivitamínicas",
          description: "Las vitaminas multivitamínicas de marca son esenciales para llenar las brechas nutricionales."
        },
        {
          title: "Hidratación",
          description: "Encourage drinking plenty of water, especially for kids who are tired or sluggish."
        }
      ]
    },
    {
      topic: "Fiebre y Dolores",
      remedies: [
        {
          title: "Gestión de la Fiebre",
          description: "Utilice acetaminophen o ibuprofeno según el peso del niño (siempre revise las instrucciones de dosificación). Las baños fríos pueden ayudar a reducir la fiebre."
        },
        {
          title: "Compresso Caliente",
          description: "Aplicar una toalla húmeda en la frente o en la espalda para aliviar el dolor."
        }
      ]
    },
    {
      topic: "Alergias (Sneezing, Itchy Eyes)",
      remedies: [
        {
          title: "Medicamentos de Alergias",
          description: "Productos de venta libre como loratadine (Claritin) o diphenhydramine (Benadryl) pueden manejar los síntomas."
        },
        {
          title: "Hielo Local",
          description: "Algunos creen que el hielo local puede ayudar a reducir los síntomas de la alergia con el tiempo."
        },
        {
          title: "Reducción de la Infección de Polen y Dustos",
          description: "Utilice toallas húmedas para limpiar superficies y limpieza regular para reducir los polen y los dusterios en el hogar."
        }
      ]
    },
    {
      topic: "Infecciones (Dolor de Oído, Dorso de Diente, Picazón de Tóxido)",
      remedies: [
        {
          title: "Dolor de Oído",
          description: "Utilice un compresso caliente sobre el oído para aliviar el dolor. Los productos de venta libre para aliviar el dolor y la inflamación pueden ayudar."
        },
        {
          title: "Dolor de Diente",
          description: "Las gotas de sal pueden ayudar con la inflamación de los dientes. El aceite de clove (disponible en algunos farmacias) puede aplicarse con un paño para aliviar el dolor temporalmente."
        },
        {
          title: "Eliminación de la Picazón de Tóxido",
          description: "Utilice pinzas finas para eliminar el tóxico y limpie la zona de picazón con alcohol (alcohol isopropilico o alcohol etílico). Supervise los síntomas como fiebre o pinta y busque atención médica si es necesario."
        }
      ]
    },
    {
      topic: "Prevención y Cuidado General",
      remedies: [
        {
          title: "Higiene de las manos",
          description: "Instruya a los niños a lavar las manos con jabón y agua frecuentemente para prevenir la propagación de la enfermedad."
        },
        {
          title: "Cajas de Higiene",
          description: "Mantenga suministros básicos como jabón, toallas y antiseptico a mano."
        },
        {
          title: "Termómetros",
          description: "Termómetros digitales económicos pueden ayudar a monitorear la fiebre con precisión."
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
  const [selectedRemedies, setSelectedRemedies] = useState<{[key: string]: string[]}>({});

  const filteredHomeRemedies = homeRemedies[language].filter(section =>
    section.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.remedies.some(remedy => 
      remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleRemedy = (topic: string, remedyTitle: string) => {
    setSelectedRemedies(prev => {
      const newRemedies = { ...prev };
      if (!newRemedies[topic]) {
        newRemedies[topic] = [];
      }
      
      const remedyIndex = newRemedies[topic].indexOf(remedyTitle);
      if (remedyIndex === -1) {
        newRemedies[topic] = [...newRemedies[topic], remedyTitle];
      } else {
        newRemedies[topic] = newRemedies[topic].filter(r => r !== remedyTitle);
        if (newRemedies[topic].length === 0) {
          delete newRemedies[topic];
        }
      }
      return newRemedies;
    });
  };

  const handleBack = () => {
    const formattedConditions = Object.entries(selectedRemedies).map(([topic, remedies]) => ({
      topic,
      remedies
    }));
    
    navigate('/confirmation', {
      state: {
        ...location.state,
        selectedConditions: formattedConditions
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

        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-[#2D1810]">
            {language === 'en' ? "What You Can Do at Home" : "Qué Puede Hacer en Casa"}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? "Click the + button to add remedies to your downloadable summary"
              : "Haga clic en el botón + para agregar remedios a su resumen descargable"}
          </p>
        </div>

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
                          Object.keys(selectedRemedies).some(topic => 
                            topic === section.topic && selectedRemedies[topic].includes(remedy.title)
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
                              Object.keys(selectedRemedies).some(topic => 
                                topic === section.topic && selectedRemedies[topic].includes(remedy.title)
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
