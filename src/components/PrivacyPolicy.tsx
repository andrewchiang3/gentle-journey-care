
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Shield, Lock, FileText, AlertCircle } from "lucide-react";

interface PrivacyPolicyProps {
  language: string;
  isCompact?: boolean;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ 
  language,
  isCompact = false
}) => {
  return (
    <div className="space-y-6 my-4">
      {!isCompact && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            {language === 'en' 
              ? "Your Privacy Matters" 
              : "Su Privacidad Importa"}
          </h2>
          <p className="text-blue-600">
            {language === 'en'
              ? "Gentle Journey Care takes your privacy seriously. Here's how we protect your information:"
              : "Gentle Journey Care toma su privacidad en serio. Así es como protegemos su información:"}
          </p>
        </div>
      )}

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="phi">
          <AccordionTrigger className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>
              {language === 'en' 
                ? "Protected Health Information (PHI)" 
                : "Información de Salud Protegida (PHI)"}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            {language === 'en'
              ? "We follow HIPAA guidelines to safeguard your health information. Your medical details are encrypted and only accessible to authorized healthcare providers directly involved in your care."
              : "Seguimos las pautas de HIPAA para proteger su información de salud. Sus detalles médicos están encriptados y solo son accesibles para proveedores de atención médica autorizados directamente involucrados en su cuidado."}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hitech">
          <AccordionTrigger className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-green-600" />
            <span>
              {language === 'en' 
                ? "HITECH Act Compliance" 
                : "Cumplimiento de la Ley HITECH"}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            {language === 'en'
              ? "In accordance with the Health Information Technology for Economic and Clinical Health (HITECH) Act, we implement robust security measures including encryption, access controls, and regular security assessments to protect your data."
              : "De acuerdo con la Ley de Tecnología de Información de Salud para la Salud Económica y Clínica (HITECH), implementamos medidas de seguridad robustas que incluyen encriptación, controles de acceso y evaluaciones de seguridad regulares para proteger sus datos."}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="myhealth">
          <AccordionTrigger className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-600" />
            <span>
              {language === 'en' 
                ? "My Health My Data Act" 
                : "Ley Mi Salud Mis Datos"}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            {language === 'en'
              ? "We respect your right to control your health data. Under the My Health My Data Act, you can request access to your information, ask for corrections, and control how your data is shared. We never sell your personal health information."
              : "Respetamos su derecho a controlar sus datos de salud. Bajo la Ley Mi Salud Mis Datos, puede solicitar acceso a su información, pedir correcciones y controlar cómo se comparten sus datos. Nunca vendemos su información de salud personal."}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="consent">
          <AccordionTrigger className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span>
              {language === 'en' 
                ? "Your Explicit Consent" 
                : "Su Consentimiento Explícito"}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            {language === 'en'
              ? "We collect health information only with your explicit permission. You can withdraw consent at any time. We clearly explain how your data will be used, stored, and shared throughout our services."
              : "Recolectamos información de salud solo con su permiso explícito. Puede retirar su consentimiento en cualquier momento. Explicamos claramente cómo se utilizarán, almacenarán y compartirán sus datos a través de nuestros servicios."}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="text-xs text-gray-500 mt-4">
        {language === 'en'
          ? "If you have questions about our privacy practices or wish to exercise your data rights, please contact our privacy office at privacy@gentlejourneycare.org or call (509) 123-4567."
          : "Si tiene preguntas sobre nuestras prácticas de privacidad o desea ejercer sus derechos de datos, comuníquese con nuestra oficina de privacidad en privacy@gentlejourneycare.org o llame al (509) 123-4567."}
      </div>
    </div>
  );
};
