export interface UniversityPackage {
  firstYearPackage: string;
  tuitionFeeYearly: string;
  hostelFeeYearly: string;
  visaFee?: string;
  policeRegistration?: string;
  messFeeYearly?: string;
  healthInsurance?: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  location: string;
  overview: string;
  package: UniversityPackage;
  features: string[];
  eligibility: string[];
  documentsRequired: string[];
  admissionProcess: string[];
  image: string;
  gallery?: string[];
  usps?: string[];
  flag: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  university: string;
  text: string;
  rating: number;
}
