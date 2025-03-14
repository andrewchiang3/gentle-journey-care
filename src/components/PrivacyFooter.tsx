
import React from 'react';
import { Lock, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PrivacyPolicy } from './PrivacyPolicy';

interface PrivacyFooterProps {
  language: string;
}

export const PrivacyFooter: React.FC<PrivacyFooterProps> = ({ language }) => {
  return (
    <footer className="w-full mt-8 border-t border-gray-100 pt-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Lock className="h-3 w-3" />
          <span>
            {language === 'en' 
              ? "Your data is protected under HIPAA and HITECH" 
              : "Sus datos están protegidos bajo HIPAA y HITECH"}
          </span>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" size="sm" className="text-xs text-blue-500 p-0 h-auto">
              <span className="flex items-center gap-1">
                {language === 'en' ? "Privacy Policy" : "Política de Privacidad"}
                <ExternalLink className="h-3 w-3" />
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center justify-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                {language === 'en' 
                  ? "Privacy Policy & Health Data Protection" 
                  : "Política de Privacidad y Protección de Datos de Salud"}
              </DialogTitle>
            </DialogHeader>
            <PrivacyPolicy language={language} />
          </DialogContent>
        </Dialog>
        
        <div>
          © {new Date().getFullYear()} Gentle Journey Care
        </div>
      </div>
    </footer>
  );
};
