
import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Cast window to unknown first to avoid TypeScript errors
      const windowWithSpeech = window as unknown as {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      };

      const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          console.log("Speech recognized:", transcript);
          onTranscript(transcript);
        };

        recognitionInstance.onend = () => {
          console.log("Speech recognition ended");
          onListeningChange(false);
        };

        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          toast({
            title: "Speech recognition error",
            description: `There was a problem with the microphone: ${event.error}. Please try again or type your concerns.`,
            variant: "destructive",
          });
          onListeningChange(false);
        };

        setRecognition(recognitionInstance);
      } else {
        console.error("Speech recognition not supported in this browser");
        toast({
          title: "Speech recognition not supported",
          description: "Your browser doesn't support speech recognition. Please type your concerns instead.",
          variant: "destructive",
        });
      }
    }
  }, [onTranscript, onListeningChange, toast]);

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Speech recognition not available",
        description: "Please try using a different browser or type your concerns.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isListening) {
        recognition.stop();
        onListeningChange(false);
      } else {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            recognition.start();
            onListeningChange(true);
            toast({
              title: "Listening...",
              description: "Speak clearly and we'll record your concerns.",
            });
          })
          .catch(error => {
            console.error("Microphone access error:", error);
            toast({
              title: "Microphone access denied",
              description: "Please allow microphone access to use voice input.",
              variant: "destructive",
            });
          });
      }
    } catch (error) {
      console.error("Toggle listening error:", error);
      toast({
        title: "Speech recognition error",
        description: "There was a problem starting speech recognition. Please try again.",
        variant: "destructive",
      });
      onListeningChange(false);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`p-4 rounded-full transition-all duration-300 ${
        isListening
          ? 'bg-primary text-primary-foreground animate-pulse'
          : 'bg-muted hover:bg-primary/10'
      }`}
      aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      title={isListening ? 'Click to stop recording' : 'Click to start voice recording'}
    >
      {isListening ? (
        <Mic className="w-6 h-6" />
      ) : (
        <MicOff className="w-6 h-6" />
      )}
      <span className="sr-only">{isListening ? 'Stop voice input' : 'Start voice input'}</span>
    </button>
  );
};
