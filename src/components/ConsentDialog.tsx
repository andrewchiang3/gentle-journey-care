
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
import { Shield, Lock, FileCheck } from "lucide-react";

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
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
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

        <div className="space-y-6 my-4">
          {/* Privacy section */}
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 p-2 rounded-full">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-base">
                {language === 'en' 
                  ? "Protected Health Information (PHI)" 
                  : "Información de Salud Protegida (PHI)"}
              </h3>
              <p className="text-sm text-gray-500">
                {language === 'en'
                  ? "We follow HIPAA guidelines to safeguard your health information and maintain your privacy at all times."
                  : "Seguimos las pautas de HIPAA para proteger su información de salud y mantener su privacidad en todo momento."}
              </p>
            </div>
          </div>

          {/* Security section */}
          <div className="flex gap-4 items-start">
            <div className="bg-green-100 p-2 rounded-full">
              <Lock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-base">
                {language === 'en' 
                  ? "Security & Encryption" 
                  : "Seguridad y Encriptación"}
              </h3>
              <p className="text-sm text-gray-500">
                {language === 'en'
                  ? "Your data is encrypted and secured in compliance with the Health Information Technology for Economic and Clinical Health (HITECH) Act and My Health My Data Act."
                  : "Sus datos están encriptados y protegidos de acuerdo con la Ley de Tecnología de Información de Salud para la Salud Económica y Clínica (HITECH) y la Ley Mi Salud Mis Datos."}
              </p>
            </div>
          </div>

          {/* Consent section */}
          <div className="flex gap-4 items-start">
            <div className="bg-amber-100 p-2 rounded-full">
              <FileCheck className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-base">
                {language === 'en' 
                  ? "Your Explicit Consent" 
                  : "Su Consentimiento Explícito"}
              </h3>
              <p className="text-sm text-gray-500">
                {language === 'en'
                  ? "By clicking 'I Understand & Consent', you agree that we may collect and use your health information to provide care services. Your data will only be shared with your healthcare providers and as required by law."
                  : "Al hacer clic en 'Entiendo y Doy Consentimiento', acepta que podemos recopilar y usar su información de salud para proporcionar servicios de atención. Sus datos solo se compartirán con sus proveedores de atención médica y según lo requiera la ley."}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md text-xs text-gray-500 mt-4">
            {language === 'en'
              ? "You can withdraw your consent at any time by contacting our privacy office. For complete details on how we use your information, please review our Privacy Policy."
              : "Puede retirar su consentimiento en cualquier momento contactando a nuestra oficina de privacidad. Para obtener detalles completos sobre cómo usamos su información, consulte nuestra Política de Privacidad."}
          </div>
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
