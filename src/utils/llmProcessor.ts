
interface AnalysisResult {
  success: boolean;
  text: string;
}

export const analyzeMedicalConcerns = async (
  concerns: string,
  language: string = 'en'
): Promise<AnalysisResult> => {
  return {
    success: true,
    text: language === 'en'
      ? "Thank you for sharing your concerns. A healthcare provider will review them shortly."
      : "Gracias por compartir sus preocupaciones. Un proveedor de atención médica las revisará en breve."
  };
};
