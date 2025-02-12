
import jsPDF from 'jspdf';

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

  return doc.output('bloburl');
};
