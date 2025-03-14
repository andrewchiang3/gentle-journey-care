
export type FormState = {
  isListening: boolean;
  language: string;
  concerns: string;
  showCheckupForm: boolean;
  showConcernsForm: boolean;
  showConfirmDialog: boolean;
};

export type ConsentStatus = {
  hasConsented: boolean;
  consentDate?: Date;
  consentVersion?: string;
};
