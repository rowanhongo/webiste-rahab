export interface Business {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  isNew?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  accentColors: string[];
  features: string[];
}

export interface RegistrationForm {
  fullName: string;
  phoneNumber: string;
  country: string;
  industry: string;
  businessIdea: string;
  openToCollaboration: 'yes' | 'no';
  bornAgain: 'yes' | 'not-sure';
  available8Weeks: 'yes' | 'heavy';
  timePreference: 'morning' | 'evening';
  daysPreference: string[];
  paymentMethod: string;
  paymentProof: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}