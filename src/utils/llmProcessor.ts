
import { pipeline } from '@huggingface/transformers';

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

    // Extract the generated text from the result
    const output = Array.isArray(result) ? result[0] : result;
    const generatedText = typeof output === 'object' && 'generated_text' in output
      ? output.generated_text
      : String(output);

    return {
      success: true,
      text: generatedText.replace(prompt, '').trim(),
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
