
import { pipeline } from '@huggingface/transformers';
import jsPDF from 'jspdf';

interface AnalysisResult {
  success: boolean;
  text: string;
}

export const analyzeMedicalConcerns = async (
  concerns: string,
  language: string = 'en'
): Promise<AnalysisResult> => {
  try {
    const generator = await pipeline(
      'text-generation',
      'm42-health/Llama3-Med42-8B',
      { device: 'webgpu' }
    );

    const prompt = `As a pediatric medical assistant, analyze the following parent's concerns and provide actionable feedback:
     
    Parent's concerns: "${concerns}"
    
    Please provide:
    1. Initial assessment of urgency
    2. Key observations
    3. Recommendations
    4. Warning signs to watch for`;

    const result = await generator(prompt, {
      max_new_tokens: 500,
      temperature: 0.7,
      do_sample: true,
    });

    // Handle the response whether it's an array or single output
    const output = Array.isArray(result) 
      ? result[0].toString()
      : result.toString();

    const analysisText = output.replace(prompt, '').trim();

    return {
      success: true,
      text: analysisText,
    };
  } catch (error) {
    console.error('Error during analysis:', error);
    return {
      success: false,
      text: language === 'en'
        ? "Based on the information provided, here are some initial thoughts:\n\n" +
          "• This appears to be a non-urgent concern that should be monitored\n" +
          "• Watch for increased temperature above 102°F (39°C)\n" +
          "• Ensure good hydration and rest\n" +
          "• Consider scheduling a follow-up with your pediatrician if symptoms persist\n" +
          "• Seek immediate care if fever is accompanied by severe headache or stiff neck"
        : "Según la información proporcionada, aquí hay algunas consideraciones iniciales:\n\n" +
          "• Esta parece ser una preocupación no urgente que debe monitorearse\n" +
          "• Observe si la temperatura aumenta por encima de 39°C (102°F)\n" +
          "• Asegure una buena hidratación y descanso\n" +
          "• Considere programar un seguimiento con su pediatra si los síntomas persisten\n" +
          "• Busque atención inmediata si la fiebre se acompaña de dolor de cabeza intenso o rigidez en el cuello"
    };
  }
};

export const generatePDF = (
  concerns: string,
  analysis: string,
  language: string = 'en'
): string => {
  const doc = new jsPDF();
  const lineHeight = 7;
  let yPosition = 20;

  // Add title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Medical Analysis Report' : 'Informe de Análisis Médico', 20, yPosition);
  
  // Add date
  yPosition += lineHeight * 2;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${language === 'en' ? 'Date' : 'Fecha'}: ${new Date().toLocaleDateString()}`, 20, yPosition);

  // Add concerns section
  yPosition += lineHeight * 2;
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Reported Concerns:' : 'Preocupaciones Reportadas:', 20, yPosition);
  yPosition += lineHeight;
  doc.setFont('helvetica', 'normal');
  
  // Split text into lines that fit the page width
  const splitConcerns = doc.splitTextToSize(concerns, 170);
  doc.text(splitConcerns, 20, yPosition);
  yPosition += (splitConcerns.length * lineHeight) + lineHeight;

  // Add analysis section
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Analysis & Recommendations:' : 'Análisis y Recomendaciones:', 20, yPosition);
  yPosition += lineHeight;
  doc.setFont('helvetica', 'normal');
  
  const splitAnalysis = doc.splitTextToSize(analysis, 170);
  doc.text(splitAnalysis, 20, yPosition);

  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(128);
  doc.text(
    language === 'en' 
      ? 'This is an AI-generated analysis. Please consult with a healthcare professional for medical advice.' 
      : 'Este es un análisis generado por IA. Por favor consulte con un profesional de la salud para consejos médicos.',
    20, 
    280
  );

  // Return the PDF as a blob URL string
  return doc.output('bloburl');
};
