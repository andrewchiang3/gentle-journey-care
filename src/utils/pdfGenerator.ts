
import jsPDF from 'jspdf';

interface Remedy {
  title: string;
  description: string;
}

interface Condition {
  topic: string;
  remedies: Remedy[];
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
  doc.text(language === 'en' ? 'Care Summary Report' : 'Informe Resumen de Cuidados', 20, yPosition);
  
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

  // Add care guidance section
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'When to Seek Help:' : 'Cuándo Buscar Ayuda:', 20, yPosition);
  yPosition += lineHeight * 1.5;
  doc.setFont('helvetica', 'normal');
  
  // The analysis text is now formatted with urgency levels
  const splitAnalysis = doc.splitTextToSize(analysis, 170);
  doc.text(splitAnalysis, 20, yPosition);
  yPosition += (splitAnalysis.length * lineHeight) + lineHeight;

  // Add selected conditions if any
  if (selectedConditions && selectedConditions.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'Home Care Recommendations:' : 'Recomendaciones de Cuidado en Casa:', 20, yPosition);
    yPosition += lineHeight * 2;
    
    // Group remedies by topic to prevent duplication
    const groupedConditions: { [key: string]: Remedy[] } = {};
    selectedConditions.forEach(condition => {
      if (!condition?.topic || !condition?.remedies) return;
      
      if (!groupedConditions[condition.topic]) {
        groupedConditions[condition.topic] = [];
      }
      groupedConditions[condition.topic] = [
        ...groupedConditions[condition.topic],
        ...condition.remedies
      ];
    });

    // Display grouped conditions and remedies
    Object.entries(groupedConditions).forEach(([topic, remedies]) => {
      // Add topic
      doc.setFont('helvetica', 'bold');
      doc.text(`${topic}:`, 20, yPosition);
      yPosition += lineHeight * 1.5;
      
      // Add unique remedies with their descriptions
      doc.setFont('helvetica', 'normal');
      const uniqueRemedies = [...new Map(remedies.map(r => [r.title, r])).values()];
      uniqueRemedies.forEach(remedy => {
        const remedyText = `• ${remedy.description}`;
        const splitRemedyText = doc.splitTextToSize(remedyText, 160);
        doc.text(splitRemedyText, 30, yPosition);
        yPosition += (splitRemedyText.length * lineHeight);
      });
      yPosition += lineHeight; // Add space after each topic group
    });
  }

  // Add selected medicines if any
  if (selectedMedicines && selectedMedicines.length > 0) {
    yPosition += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'Medicines of Interest:' : 'Medicamentos de Interés:', 20, yPosition);
    yPosition += lineHeight * 1.5;
    doc.setFont('helvetica', 'normal');
    selectedMedicines.forEach(medicine => {
      if (medicine) {
        doc.text(`• ${medicine}`, 30, yPosition);
        yPosition += lineHeight;
      }
    });
  }

  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(128);
  doc.text(
    language === 'en' 
      ? 'This is an AI-generated summary. Please consult with a healthcare professional for medical advice.' 
      : 'Este es un resumen generado por IA. Por favor consulte con un profesional de la salud para consejos médicos.',
    20, 
    280
  );

  const blobUrl = doc.output('bloburl');
  return typeof blobUrl === 'string' ? blobUrl : String(blobUrl);
};
