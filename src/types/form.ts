
export type FormState = {
  isListening: boolean;
  language: string;
  concerns: string;
  showCheckupForm: boolean;
  showConcernsForm: boolean;
  showConfirmDialog: boolean;
  isAnalyzing?: boolean;
  offlineMode?: boolean;
};

export type ConsentStatus = {
  hasConsented: boolean;
  consentDate?: Date;
  consentVersion?: string;
};

export type RemedySuggestion = {
  topic: string;
  remedies: {
    title: string;
    description: string;
  }[];
};

export type RiskAssessment = {
  riskLevel: 'low' | 'moderate' | 'elevated' | 'high';
  keyFactors: string[];
  recommendations: string[];
  suggestedRemedies?: RemedySuggestion[];
};

export type ClinicInfo = {
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  website: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};
