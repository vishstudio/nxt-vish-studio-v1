// ─── Site Settings ───────────────────────────────────────────────────────────

export interface Social {
  name: string;
  url: string;
  openInNewTab?: boolean;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  email: string;
  phone: string;
  phoneLink: string;
  address: string;
  copyright: string;
  contactHeadingLine1: string;
  contactHeadingLine2: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterButtonLabel: string;
  newsletterConsent: string;
  footerNewsletterHeading: string;
  footerNewsletterDescription: string;
  socials: Social[];
  footerLinks: FooterLink[];
  scrollText: string;
}

import settingsJson from "@/content/site/settings.json";
export function getSiteSettings(): SiteSettings {
  return settingsJson as unknown as SiteSettings;
}

// ─── Partners ────────────────────────────────────────────────────────────────

export interface Partner {
  name: string;
  url?: string;
}

export interface PartnerProofPoint {
  value: string;
  label: string;
}

export interface PartnersData {
  partnersLabel: string;
  trustHeading: string;
  trustDescription: string;
  ctaLabel: string;
  proofPoints: PartnerProofPoint[];
  partners: Partner[];
}

import partnersJson from "@/content/site/partners.json";
export function getPartners(): PartnersData {
  return partnersJson as unknown as PartnersData;
}

// ─── Team Members ────────────────────────────────────────────────────────────

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  order: number;
}

// ─── Page Content ────────────────────────────────────────────────────────────

export interface HomeService {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HeroStat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  format?: "number" | "year";
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

export interface HomePageContent {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  heroStats: HeroStat[];
  aboutHeading: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  projectsLabel: string;
  projectsHeading: string;
  projectsDescription: string;
  projectsButtonText: string;
  servicesHeading: string;
  servicesSubtext: string;
  servicesButtonText: string;
  services: HomeService[];
  processHeading: string;
  processSubtext: string;
  processSteps: ProcessStep[];
  faqHeading: string;
  faqSubtext: string;
  faqItems: FaqItem[];
}

export interface TestimonialsPageContent {
  heading: string;
  subtext: string;
  testimonials: Testimonial[];
}

import homeJson from "@/content/pages/home.json";
export function getHomePage(): HomePageContent {
  return homeJson as unknown as HomePageContent;
}

import testimonialsJson from "@/content/pages/testimonials.json";
export function getTestimonialsPage(): TestimonialsPageContent {
  return testimonialsJson as unknown as TestimonialsPageContent;
}

// ─── About Page ──────────────────────────────────────────────────────────────

export interface CoreValue {
  id: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  studioImage: string;
  studioImageAlt: string;
  introHeading: string;
  introParagraph1: string;
  introParagraph2: string;
  valuesLabel: string;
  valuesHeading: string;
  values: CoreValue[];
  teamMembers: TeamMember[];
}

import aboutJson from "@/content/pages/about.json";
export function getAboutPage(): AboutPageContent {
  return aboutJson as unknown as AboutPageContent;
}

// ─── Services Page ───────────────────────────────────────────────────────────

export interface ServiceCategory {
  category: string;
  description: string;
  items: string[];
}

export interface ServicesPageContent {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  categories: ServiceCategory[];
}

import servicesJson from "@/content/pages/services.json";
export function getServicesPage(): ServicesPageContent {
  return servicesJson as unknown as ServicesPageContent;
}

// ─── Contact Page ────────────────────────────────────────────────────────────

export interface TrustIndicator {
  icon: string;
  title: string;
  description: string;
}

export interface ContactPageContent {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitlePunctuation: string;
  heroDescription: string;
  trustIndicators: TrustIndicator[];
}

import contactJson from "@/content/pages/contact.json";
export function getContactPage(): ContactPageContent {
  return contactJson as unknown as ContactPageContent;
}

// ─── Legal Pages ─────────────────────────────────────────────────────────────

export interface LegalSection {
  title: string;
  body: string;
}

export interface LegalPageContent {
  title: string;
  slug: string;
  heroLabel: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}

import privacyJson from "@/content/legal/privacy.json";
import termsJson from "@/content/legal/terms.json";

const legalPages: Record<string, LegalPageContent> = {
  privacy: privacyJson as unknown as LegalPageContent,
  terms: termsJson as unknown as LegalPageContent,
};

export function getLegalPage(slug: string): LegalPageContent | undefined {
  return legalPages[slug];
}

export function getLegalPages(): LegalPageContent[] {
  return Object.values(legalPages);
}
