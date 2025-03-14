
import { RiskAssessment } from '@/types/form';
import { homeRemedies } from '@/data/homeRemedies';

interface AnalysisResult {
  success: boolean;
  text: string;
  insightAssessment?: RiskAssessment;
}

export const analyzeMedicalConcerns = async (
  concerns: string,
  language: string = 'en'
): Promise<AnalysisResult> => {
  // Simulate AI processing delay (would be replaced with actual API call)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // This is a simulated/conceptual response that would come from an LLM
  // In a real implementation, this would be an API call to a medical LLM model
  
  // Basic keyword detection for demo purposes
  const keywords = concerns.toLowerCase();
  
  let insightAssessment: RiskAssessment = {
    riskLevel: 'low',
    keyFactors: [],
    recommendations: [],
    suggestedRemedies: []
  };
  
  // Simple demonstration logic - in reality this would be a sophisticated LLM analysis
  if (keywords.includes('fever') || keywords.includes('fiebre')) {
    insightAssessment.riskLevel = 'moderate';
    insightAssessment.keyFactors.push(language === 'en' ? 'Noticed fever symptoms' : 'Síntomas de fiebre observados');
    insightAssessment.recommendations.push(
      language === 'en' 
        ? 'Monitor temperature every 4 hours' 
        : 'Controle la temperatura cada 4 horas'
    );
    
    // Add remedies for fever
    const remedyCategory = homeRemedies[language].find(cat => 
      cat.topic.toLowerCase().includes('fever') || 
      cat.topic.toLowerCase().includes('fiebre')
    );
    
    if (remedyCategory) {
      insightAssessment.suggestedRemedies.push({
        topic: remedyCategory.topic,
        remedies: remedyCategory.remedies.filter(r => 
          r.title.toLowerCase().includes('fever') || 
          r.description.toLowerCase().includes('fever') ||
          r.title.toLowerCase().includes('fiebre') || 
          r.description.toLowerCase().includes('fiebre')
        )
      });
    }
  }
  
  if (keywords.includes('breathing') || keywords.includes('breath') || keywords.includes('respiración')) {
    insightAssessment.riskLevel = 'elevated';
    insightAssessment.keyFactors.push(
      language === 'en' ? 'Breathing concerns mentioned' : 'Preocupaciones respiratorias mencionadas'
    );
    insightAssessment.recommendations.push(
      language === 'en' 
        ? 'Consult healthcare provider within 24 hours' 
        : 'Consulte al proveedor de atención médica dentro de las 24 horas'
    );
    
    // Add remedies for respiratory issues
    const remedyCategory = homeRemedies[language].find(cat => 
      cat.topic.toLowerCase().includes('respiratory') || 
      cat.topic.toLowerCase().includes('respirator')
    );
    
    if (remedyCategory) {
      insightAssessment.suggestedRemedies.push({
        topic: remedyCategory.topic,
        remedies: remedyCategory.remedies.filter(r => 
          r.title.toLowerCase().includes('steam') || 
          r.description.toLowerCase().includes('congestion') ||
          r.title.toLowerCase().includes('vapor') || 
          r.description.toLowerCase().includes('congestión')
        )
      });
    }
  }
  
  if (keywords.includes('rash') || keywords.includes('sarpullido')) {
    insightAssessment.keyFactors.push(
      language === 'en' ? 'Skin condition noticed' : 'Condición de la piel observada'
    );
    insightAssessment.recommendations.push(
      language === 'en' 
        ? 'Apply cool compress and monitor for changes' 
        : 'Aplique una compresa fría y observe si hay cambios'
    );
    
    // Add remedies for skin conditions
    const remedyCategory = homeRemedies[language].find(cat => 
      cat.topic.toLowerCase().includes('skin') || 
      cat.topic.toLowerCase().includes('piel')
    );
    
    if (remedyCategory) {
      insightAssessment.suggestedRemedies.push({
        topic: remedyCategory.topic,
        remedies: remedyCategory.remedies.filter(r => 
          r.title.toLowerCase().includes('topical') || 
          r.description.toLowerCase().includes('rash') ||
          r.title.toLowerCase().includes('tópico') || 
          r.description.toLowerCase().includes('sarpullido')
        )
      });
    }
  }
  
  // Check for stomach/digestive issues
  if (keywords.includes('stomach') || keywords.includes('diarrhea') || keywords.includes('vomit') || 
      keywords.includes('estómago') || keywords.includes('diarrea') || keywords.includes('vómito')) {
    insightAssessment.keyFactors.push(
      language === 'en' ? 'Digestive discomfort mentioned' : 'Malestar digestivo mencionado'
    );
    insightAssessment.recommendations.push(
      language === 'en' 
        ? 'Stay hydrated and monitor food intake' 
        : 'Manténgase hidratado y controle la ingesta de alimentos'
    );
    
    // Add remedies for digestive issues
    const remedyCategory = homeRemedies[language].find(cat => 
      cat.topic.toLowerCase().includes('gastrointestinal') || 
      cat.topic.toLowerCase().includes('stomach') ||
      cat.topic.toLowerCase().includes('estómago')
    );
    
    if (remedyCategory) {
      insightAssessment.suggestedRemedies.push({
        topic: remedyCategory.topic,
        remedies: remedyCategory.remedies.slice(0, 2) // Just take the first couple remedies as example
      });
    }
  }
  
  // Add general recommendations
  insightAssessment.recommendations.push(
    language === 'en'
      ? 'Ensure adequate hydration'
      : 'Asegure una hidratación adecuada'
  );
  
  return {
    success: true,
    text: language === 'en'
      ? "Thank you for sharing your concerns. A healthcare provider will review them shortly."
      : "Gracias por compartir sus preocupaciones. Un proveedor de atención médica las revisará en breve.",
    insightAssessment
  };
};
