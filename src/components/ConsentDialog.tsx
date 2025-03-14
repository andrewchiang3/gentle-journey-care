
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Lock, FileCheck, Info } from "lucide-react";
import { PrivacyPolicy } from "./PrivacyPolicy";

interface ConsentDialogProps {
  open: boolean;
  language: string;
  onAccept: () => void;
}

export const ConsentDialog: React.FC<ConsentDialogProps> = ({
  open,
  language,
  onAccept
}) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-center flex items-center justify-center gap-2">
            <Lock className="h-5 w-5 text-green-600" />
            {language === 'en' 
              ? "Your Privacy & Data Protection" 
              : "Su Privacidad y Protección de Datos"}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            {language === 'en'
              ? "Before we begin, please read how we protect your information"
              : "Antes de comenzar, por favor lea cómo protegemos su información"}
          </DialogDescription>
        </DialogHeader>

        <div className="my-4">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex items-start gap-3 mb-2">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700 font-medium">
                {language === 'en'
                  ? "We need your explicit consent to collect and process your health information"
                  : "Necesitamos su consentimiento explícito para recopilar y procesar su información de salud"}
              </p>
            </div>
            <p className="text-sm text-gray-600 ml-8">
              {language === 'en'
                ? "Under the HIPAA, HITECH Act, and My Health My Data Act, we are committed to safeguarding your health information."
                : "Bajo HIPAA, la Ley HITECH y la Ley Mi Salud Mis Datos, estamos comprometidos a proteger su información de salud."}
            </p>
          </div>

          <PrivacyPolicy language={language} isCompact={true} />
        </div>

        <div className="bg-green-50 p-4 rounded-md border border-green-100 mt-2 mb-4">
          <p className="text-sm text-green-800 font-medium">
            {language === 'en'
              ? "By clicking 'I Understand & Consent', you acknowledge that:"
              : "Al hacer clic en 'Entiendo y Doy Consentimiento', usted reconoce que:"}
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-green-700 space-y-1">
            {language === 'en' ? (
              <>
                <li>You provide explicit consent for us to collect your health information</li>
                <li>Your data will only be used to provide care services</li>
                <li>You can withdraw consent at any time</li>
                <li>Your information is encrypted and protected</li>
              </>
            ) : (
              <>
                <li>Usted proporciona consentimiento explícito para que recopilemos su información de salud</li>
                <li>Sus datos solo se utilizarán para proporcionar servicios de atención</li>
                <li>Puede retirar su consentimiento en cualquier momento</li>
                <li>Su información está encriptada y protegida</li>
              </>
            )}
          </ul>
        </div>

        <DialogFooter className="flex justify-center">
          <Button
            onClick={onAccept}
            className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
          >
            {language === 'en' 
              ? "I Understand & Consent" 
              : "Entiendo y Doy Consentimiento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
