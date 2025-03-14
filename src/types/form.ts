
export type FormState = {
  isListening: boolean;
  language: string;
  concerns: string;
  showCheckupForm: boolean;
  showConcernsForm: boolean;
  showConfirmDialog: boolean;
  isAnalyzing?: boolean;
};

export type ConsentStatus = {
  hasConsented: boolean;
  consentDate?: Date;
  consentVersion?: string;
};

export type RiskAssessment = {
  riskLevel: 'low' | 'moderate' | 'elevated' | 'high';
  keyFactors: string[];
  recommendations: string[];
};

