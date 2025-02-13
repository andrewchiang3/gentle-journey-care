
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VoiceInput } from '@/components/VoiceInput';

type ConcernsFormProps = {
  showCheckupForm: boolean;
  language: string;
  concerns: string;
  isListening: boolean;
  onListeningChange: (value: boolean) => void;
  onTranscript: (transcript: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
};

export const ConcernsForm = ({
  showCheckupForm,
  language,
  concerns,
  isListening,
  onListeningChange,
  onTranscript,
  onInputChange,
  onInputKeyDown,
  onSubmit
}: ConcernsFormProps) => {
  return (
    <div className="mt-12 flex flex-col items-center space-y-6">
      <div className="text-center space-y-4">
        <p className="text-lg text-gray-700">
          {showCheckupForm 
            ? (language === 'en' 
                ? "Please tell us about your child"
                : "Por favor, cuéntenos sobre su hijo")
            : (language === 'en' 
                ? "Tell us what brings you in today"
                : "Cuéntenos qué lo trae hoy")}
        </p>
        <p className="text-sm text-muted-foreground">
          {showCheckupForm
            ? (language === 'en'
                ? "Share any general updates or milestones since their last visit"
                : "Comparta cualquier actualización o hito desde su última visita")
            : (language === 'en'
                ? "You can speak or type your concerns"
                : "Puede hablar o escribir sus preocupaciones")}
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <Textarea
          value={concerns}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          placeholder={showCheckupForm
            ? (language === 'en' 
                ? "For example: sleeping patterns, eating habits, recent growth, etc..."
                : "Por ejemplo: patrones de sueño, hábitos alimenticios, crecimiento reciente, etc...")
            : (language === 'en' 
                ? "Type your concerns here..."
                : "Escriba sus preocupaciones aquí...")}
          className="min-h-[120px] text-base"
        />
        
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={onSubmit}
            className="w-full max-w-xs bg-[#FEF7CD] hover:bg-[#FEC6A1] text-gray-800 font-medium py-3 px-6 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-102"
          >
            {showCheckupForm
              ? (language === 'en' 
                  ? "Let's get started with the check-up →" 
                  : "Comencemos con el chequeo →")
              : (language === 'en' 
                  ? "Let's get you the care you need →" 
                  : "Obtengamos la atención que necesita →")}
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {language === 'en' ? "or" : "o"}
            </span>
            <VoiceInput
              isListening={isListening}
              onListeningChange={onListeningChange}
              onTranscript={onTranscript}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
