
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, Plus } from 'lucide-react';

const medicines = {
  en: [
    { name: "Children's Acetaminophen", description: "Pain reliever and fever reducer" },
    { name: "Children's Ibuprofen", description: "NSAID pain reliever" },
    { name: "Diphenhydramine (Benadryl)", description: "Antihistamine" },
    { name: "Amoxicillin", description: "Antibiotic for bacterial infections" },
    { name: "Children's Zyrtec", description: "24-hour allergy relief" },
    { name: "Pedialyte", description: "Oral rehydration solution" },
    { name: "Children's Delsym", description: "Cough suppressant" }
  ],
  es: [
    { name: "Acetaminofén para Niños", description: "Analgésico y reductor de fiebre" },
    { name: "Ibuprofeno para Niños", description: "Analgésico antiinflamatorio" },
    { name: "Difenhidramina (Benadryl)", description: "Antihistamínico" },
    { name: "Amoxicilina", description: "Antibiótico para infecciones bacterianas" },
    { name: "Zyrtec para Niños", description: "Alivio de alergias por 24 horas" },
    { name: "Pedialyte", description: "Solución de rehidratación oral" },
    { name: "Delsym para Niños", description: "Supresor de la tos" }
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
