
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { RemedyList } from '@/components/RemedyList';
import { homeRemedies } from '@/data/homeRemedies';

interface SelectedRemedy {
  title: string;
  description: string;
}

const Conditions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRemedies, setSelectedRemedies] = useState<{[key: string]: SelectedRemedy[]}>({});

  const filteredHomeRemedies = homeRemedies[language].filter(section =>
    section.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.remedies.some(remedy => 
      remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleRemedy = (topic: string, remedy: { title: string; description: string }) => {
    setSelectedRemedies(prev => {
      const newRemedies = { ...prev };
      if (!newRemedies[topic]) {
        newRemedies[topic] = [];
      }
      
      const remedyIndex = newRemedies[topic].findIndex(r => r.title === remedy.title);
      if (remedyIndex === -1) {
        newRemedies[topic] = [...newRemedies[topic], remedy];
      } else {
        newRemedies[topic] = newRemedies[topic].filter(r => r.title !== remedy.title);
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
      remedies: remedies.map(r => ({ title: r.title, description: r.description }))
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

        <SearchBar 
          language={language}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <RemedyList 
          sections={filteredHomeRemedies}
          selectedRemedies={selectedRemedies}
          onToggleRemedy={toggleRemedy}
        />
      </div>
    </div>
  );
};

export default Conditions;
