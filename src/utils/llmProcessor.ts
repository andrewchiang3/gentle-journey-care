
import { pipeline } from '@huggingface/transformers';

interface AnalysisResult {
  success: boolean;
  text: string;
}

let generator: any = null;

async function initializePipeline() {
  if (!generator) {
    generator = await pipeline(
      'text2text-generation',
      'Xenova/medical-summarization-en',
      { 
        device: 'webgpu',
        quantized: true // Enable model quantization for better performance
      }
    );
  }
  return generator;
}

export const analyzeMedicalConcerns = async (
  concerns: string,
  language: string = 'en'
): Promise<AnalysisResult> => {
  try {
    const generator = await initializePipeline();

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
      repetition_penalty: 1.2,
      no_repeat_ngram_size: 2,
      num_beams: 1 // Reduced for better mobile performance
    });

    // Extract the generated text from the result
    const output = Array.isArray(result) ? result[0] : result;
    const generatedText = String(typeof output === 'object' && 'generated_text' in output
      ? output.generated_text
      : output).replace(prompt, '').trim();

    return {
      success: true,
      text: generatedText
    };
  } catch (error) {
    console.error('Error during analysis:', error);
    return {
      success: false,
      text: language === 'en'
        ? "Please consult with your healthcare provider for a proper evaluation."
        : "Por favor consulte con su proveedor de atención médica para una evaluación adecuada."
    };
  }
};
