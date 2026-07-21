import aboutContent from '../../content/pages/about.json';
import qualityContent from '../../content/pages/quality.json';
import customizationContent from '../../content/pages/customization.json';
import contactContent from '../../content/pages/contact.json';

export interface AboutContent {
  heroTitle: string;
  storyHeading: string;
  storyParagraphs: string[];
  values: Array<{ title: string; description: string }>;
  philosophyHeading: string;
  philosophyParagraphs: string[];
}

export interface QualityContent {
  heroTitle: string;
  heroSubtitle: string;
  introParagraphs: string[];
  certifications: Array<{ name: string; description: string }>;
  testingProcedures: string[];
  qaSteps: Array<{ title: string; description: string }>;
}

export interface CustomizationContent {
  heroTitle: string;
  heroSubtitle: string;
  introHeading: string;
  introText: string;
  services: Array<{ title: string; description: string; features: string[] }>;
  process: Array<{ title: string; description: string }>;
  portfolioText: string;
}

export interface ContactContent {
  heroTitle: string;
  heroSubtitle: string;
  contactPersonName: string;
  phone: string;
  email: string;
  addressLines: string[];
  mapEmbedUrl: string;
}

export const about = aboutContent as AboutContent;
export const quality = qualityContent as QualityContent;
export const customization = customizationContent as CustomizationContent;
export const contact = contactContent as ContactContent;
