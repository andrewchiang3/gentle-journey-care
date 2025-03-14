
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
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  const lineHeight = 7;
  let yPosition = 20;
  let currentPage = 1;

  // Function to check if we need a new page and add one if necessary
  const checkForNewPage = (heightNeeded: number): void => {
    if (yPosition + heightNeeded >= pageHeight - 30) {
      doc.addPage();
      currentPage++;
      yPosition = 20;
      
      // Add page number at the bottom
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`${language === 'en' ? 'Page' : 'Página'} ${currentPage}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.setTextColor(0);
      doc.setFontSize(12);
    }
  };

  // Add title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Care Summary Report' : 'Informe Resumen de Cuidados', margin, yPosition);
  
  // Add date
  yPosition += lineHeight * 2;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${language === 'en' ? 'Date' : 'Fecha'}: ${new Date().toLocaleDateString()}`, margin, yPosition);

  // Add concerns section
  yPosition += lineHeight * 2;
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Reported Concerns:' : 'Preocupaciones Reportadas:', margin, yPosition);
  yPosition += lineHeight;
  doc.setFont('helvetica', 'normal');
  
  const splitConcerns = doc.splitTextToSize(concerns, contentWidth);
  checkForNewPage(splitConcerns.length * lineHeight);
  doc.text(splitConcerns, margin, yPosition);
  yPosition += (splitConcerns.length * lineHeight) + lineHeight;

  // Add care insights section - use the actual analysis content passed to the function
  checkForNewPage(lineHeight * 2);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'en' ? 'Care Insights & Helpful Tips:' : 'Información de Cuidado y Consejos Útiles:', margin, yPosition);
  yPosition += lineHeight * 1.5;
  doc.setFont('helvetica', 'normal');
  
  const splitAnalysis = doc.splitTextToSize(analysis, contentWidth);
  checkForNewPage(splitAnalysis.length * lineHeight);
  doc.text(splitAnalysis, margin, yPosition);
  yPosition += (splitAnalysis.length * lineHeight) + lineHeight;

  // Add selected conditions if any
  if (selectedConditions && selectedConditions.length > 0) {
    checkForNewPage(lineHeight * 3);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'Home Care Recommendations:' : 'Recomendaciones de Cuidado en Casa:', margin, yPosition);
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
      // Check if we need a new page for the topic
      checkForNewPage(lineHeight * 2);
      
      // Add topic
      doc.setFont('helvetica', 'bold');
      doc.text(`${topic}:`, margin, yPosition);
      yPosition += lineHeight * 1.5;
      
      // Add unique remedies with their descriptions
      doc.setFont('helvetica', 'normal');
      const uniqueRemedies = [...new Map(remedies.map(r => [r.title, r])).values()];
      
      uniqueRemedies.forEach(remedy => {
        const remedyText = `• ${remedy.description}`;
        const splitRemedyText = doc.splitTextToSize(remedyText, contentWidth - 10);
        
        // Check if we need a new page for this remedy
        checkForNewPage(splitRemedyText.length * lineHeight + 2);
        
        doc.text(splitRemedyText, margin + 10, yPosition);
        yPosition += (splitRemedyText.length * lineHeight) + 2; // Added spacing between remedies
      });
      
      // Add extra space after each topic group
      yPosition += lineHeight / 2;
    });
  }

  // Add selected medicines if any
  if (selectedMedicines && selectedMedicines.length > 0) {
    checkForNewPage(lineHeight * 3);
    yPosition += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'Medicines of Interest:' : 'Medicamentos de Interés:', margin, yPosition);
    yPosition += lineHeight * 1.5;
    doc.setFont('helvetica', 'normal');
    
    selectedMedicines.forEach(medicine => {
      if (medicine) {
        checkForNewPage(lineHeight + 2);
        const medicineText = `• ${medicine}`;
        const splitMedicineText = doc.splitTextToSize(medicineText, contentWidth - 10);
        doc.text(splitMedicineText, margin + 10, yPosition);
        yPosition += (splitMedicineText.length * lineHeight) + 2;
      }
    });
  }

  // Add page number on first page too
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(`${language === 'en' ? 'Page' : 'Página'} 1`, pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Add footer on a new page if needed, or ensure space for it
  checkForNewPage(15);
  doc.setFontSize(10);
  doc.setTextColor(128);
  doc.text(
    language === 'en' 
      ? 'This is an AI-generated summary. Please consult with a healthcare professional for medical advice.' 
      : 'Este es un resumen generado por IA. Por favor consulte con un profesional de la salud para consejos médicos.',
    margin, 
    pageHeight - 20
  );

  const blobUrl = doc.output('bloburl');
  return typeof blobUrl === 'string' ? blobUrl : String(blobUrl);
};
