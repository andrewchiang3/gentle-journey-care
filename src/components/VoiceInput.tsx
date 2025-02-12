
import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  isListening: boolean;
  onListeningChange: (isListening: boolean) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  isListening,
  onListeningChange,
}) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Cast window to unknown first to avoid TypeScript errors
      const windowWithSpeech = window as unknown as {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      };

      const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          onTranscript(transcript);
        };

        recognition.onend = () => {
          onListeningChange(false);
        };

        setRecognition(recognition);
      }
    }
  }, [onTranscript, onListeningChange]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      onListeningChange(false);
    } else {
      recognition.start();
      onListeningChange(true);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`p-4 rounded-full transition-all duration-300 ${
        isListening
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted hover:bg-primary/10'
      }`}
      aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
    >
      {isListening ? (
        <Mic className="w-6 h-6 animate-pulse" />
      ) : (
        <MicOff className="w-6 h-6" />
      )}
    </button>
  );
};
