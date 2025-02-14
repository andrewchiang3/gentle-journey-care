
import jsPDF from 'jspdf';

interface Condition {
  topic: string;
  remedies: string[];
}

export const generatePDF = (
  concerns: string,
  analysis: string,
  language: string = 'en',
  selectedConditions: Condition[] = [],
  selectedMedicines: string[] = []
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
  yPosition += (splitAnalysis.length * lineHeight) + lineHeight;

  // Add selected conditions if any
  if (selectedConditions.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'Home Care Recommendations:' : 'Recomendaciones de Cuidado en Casa:', 20, yPosition);
    yPosition += lineHeight;
    doc.setFont('helvetica', 'normal');
    
    selectedConditions.forEach(condition => {
      // Add topic
      doc.setFont('helvetica', 'bold');
      doc.text(`• ${condition.topic}`, 30, yPosition);
      yPosition += lineHeight;
      
      // Add remedies
      doc.setFont('helvetica', 'normal');
      condition.remedies.forEach(remedy => {
        doc.text(`  - ${remedy}`, 40, yPosition);
        yPosition += lineHeight;
      });
      yPosition += lineHeight / 2; // Add small space between topics
    });
    yPosition += lineHeight;
  }

  // Add selected medicines if any
  if (selectedMedicines.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'Medicines of Interest:' : 'Medicamentos de Interés:', 20, yPosition);
    yPosition += lineHeight;
    doc.setFont('helvetica', 'normal');
    selectedMedicines.forEach(medicine => {
      doc.text(`• ${medicine}`, 30, yPosition);
      yPosition += lineHeight;
    });
  }

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

  const blobUrl = doc.output('bloburl');
  return typeof blobUrl === 'string' ? blobUrl : String(blobUrl);
};
