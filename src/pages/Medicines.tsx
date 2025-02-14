
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, Plus } from 'lucide-react';

const medicines = {
  en: [
    {
      name: "Over-the-Counter Pain Relief",
      description: "Children's acetaminophen or ibuprofen for fever and pain. Always check weight-based dosing."
    },
    {
      name: "Oral Rehydration Solutions",
      description: "Pedialyte or store-brand alternatives to prevent dehydration during illness."
    },
    {
      name: "Antihistamines",
      description: "OTC options like Claritin (loratadine) or Benadryl (diphenhydramine) for allergy symptoms."
    },
    {
      name: "Topical Treatments",
      description: "Calamine lotion for itching, hydrocortisone cream for irritation, antiseptic ointments for minor cuts."
    },
    {
      name: "Saline Products",
      description: "Nasal sprays and rinses to help clear congestion, safe for all ages."
    },
    {
      name: "Anti-Gas Remedies",
      description: "Simethicone products like Gas-X to relieve bloating and discomfort."
    },
    {
      name: "Children's Multivitamins",
      description: "Daily supplements to support overall health and fill nutritional gaps."
    }
  ],
  es: [
    {
      name: "Analgésicos de Venta Libre",
      description: "Acetaminofén o ibuprofeno para niños para fiebre y dolor. Siempre verifique la dosis según el peso."
    },
    {
      name: "Soluciones de Rehidratación",
      description: "Pedialyte o alternativas de marca propia para prevenir la deshidratación durante la enfermedad."
    },
    {
      name: "Antihistamínicos",
      description: "Opciones como Claritin (loratadina) o Benadryl (difenhidramina) para síntomas de alergia."
    },
    {
      name: "Tratamientos Tópicos",
      description: "Loción de calamina para picazón, crema de hidrocortisona para irritación, ungüentos antisépticos para cortes menores."
    },
    {
      name: "Productos Salinos",
      description: "Sprays y enjuagues nasales para ayudar con la congestión, seguros para todas las edades."
    },
    {
      name: "Remedios Anti-Gas",
      description: "Productos con simeticona como Gas-X para aliviar la hinchazón y el malestar."
    },
    {
      name: "Multivitamínicos para Niños",
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

        <div className="relative mb-6">
          <Input
            type="search"
            placeholder={language === 'en'
              ? "Search medicines by name, type, or age..."
              : "Buscar medicamentos por nombre, tipo o edad..."}
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

export default Medicines;
