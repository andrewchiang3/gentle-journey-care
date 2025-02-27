
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, Plus, Check } from 'lucide-react';

const medicines = {
  en: [
    {
      name: "Pain Relief for Children",
      description: "Children's acetaminophen (Tylenol) or ibuprofen (Motrin, Advil) for fever and pain. Always check the correct dose based on your child's weight."
    },
    {
      name: "Rehydration Drinks",
      description: "Pedialyte or similar drinks to prevent dehydration during illness with vomiting or diarrhea."
    },
    {
      name: "Allergy Medicines",
      description: "Over-the-counter options like Claritin (loratadine) or Benadryl (diphenhydramine) for allergy symptoms."
    },
    {
      name: "Skin Treatment Creams",
      description: "Calamine lotion for itching, hydrocortisone cream for irritation, antiseptic ointments for minor cuts."
    },
    {
      name: "Saline Products",
      description: "Salt water nasal sprays and rinses to help clear congestion, safe for all ages."
    },
    {
      name: "Gas Relief",
      description: "Products like Gas-X (simethicone) to relieve bloating and stomach discomfort."
    },
    {
      name: "Children's Vitamins",
      description: "Daily supplements to support overall health and fill nutritional gaps."
    }
  ],
  es: [
    {
      name: "Analgésicos para Niños",
      description: "Acetaminofén (Tylenol) o ibuprofeno (Motrin, Advil) para niños para fiebre y dolor. Siempre verifique la dosis correcta según el peso de su hijo."
    },
    {
      name: "Bebidas de Rehidratación",
      description: "Pedialyte o alternativas similares para prevenir la deshidratación durante enfermedades con vómitos o diarrea."
    },
    {
      name: "Medicamentos para Alergias",
      description: "Opciones sin receta como Claritin (loratadina) o Benadryl (difenhidramina) para síntomas de alergia."
    },
    {
      name: "Cremas para Tratamiento de Piel",
      description: "Loción de calamina para picazón, crema de hidrocortisona para irritación, ungüentos antisépticos para cortes menores."
    },
    {
      name: "Productos Salinos",
      description: "Sprays y enjuagues nasales de agua salada para ayudar con la congestión, seguros para todas las edades."
    },
    {
      name: "Alivio de Gases",
      description: "Productos con simeticona como Gas-X para aliviar la hinchazón y el malestar estomacal."
    },
    {
      name: "Vitaminas para Niños",
      description: "Suplementos diarios para apoyar la salud general y complementar la nutrición."
    }
  ]
};

const Medicines = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);

  const filteredMedicines = medicines[language].filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMedicine = (medicineName: string) => {
    setSelectedMedicines(prev =>
      prev.includes(medicineName)
        ? prev.filter(name => name !== medicineName)
        : [...prev, medicineName]
    );
  };

  const handleBack = () => {
    navigate('/confirmation', {
      state: {
        ...location.state,
        selectedMedicines
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
          <Shield className="h-6 w-6 text-[#7EB8E7]" />
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        <h1 className="text-2xl font-bold mb-2 text-[#2D1810]">
          {language === 'en' ? "Children's Medicine Guide" : "Guía de Medicamentos para Niños"}
        </h1>

        <p className="text-gray-600 mb-4">
          {language === 'en' 
            ? "Click the + button to add medicines to your downloadable summary" 
            : "Haga clic en el botón + para agregar medicamentos a su resumen descargable"}
        </p>

        <div className="relative mb-6">
          <Input
            type="search"
            placeholder={language === 'en'
              ? "Search medicines by name or condition..."
              : "Buscar medicamentos por nombre o condición..."}
            className="w-full pl-4 pr-4 py-3 rounded-full bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredMedicines.map((medicine, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-xl shadow-sm transition-colors ${
                selectedMedicines.includes(medicine.name)
                  ? 'border-2 border-[#7EB8E7]'
                  : 'border border-[#D3E5F5] hover:border-[#7EB8E7]'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#7EB8E7] mb-1">
                    {medicine.name}
                  </h3>
                  <p className="text-gray-600">
                    {medicine.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`shrink-0 ml-2 ${
                    selectedMedicines.includes(medicine.name)
                      ? 'bg-[#7EB8E7] text-white hover:bg-[#7EB8E7]/90'
                      : 'text-[#7EB8E7] hover:text-[#7EB8E7]/90'
                  }`}
                  onClick={() => toggleMedicine(medicine.name)}
                  title={selectedMedicines.includes(medicine.name) ? "Remove from summary" : "Add to summary"}
                >
                  {selectedMedicines.includes(medicine.name) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {selectedMedicines.includes(medicine.name) 
                  ? "✓ Added to your summary" 
                  : "Click + to add this to your downloadable summary"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Medicines;
