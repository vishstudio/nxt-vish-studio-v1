/// <reference types="vite/client" />

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
  socials: Social[];
  footerLinks: FooterLink[];
  scrollText: string;
}

const settingsModule = import.meta.glob<SiteSettings>(
  "/content/site/settings.json",
  { eager: true, import: "default" },
) as Record<string, SiteSettings>;

export function getSiteSettings(): SiteSettings {
  return Object.values(settingsModule)[0];
}

// ─── Partners ────────────────────────────────────────────────────────────────

export interface PartnersData {
  partnersLabel: string;
  partners: string[];
}

const partnersModule = import.meta.glob<PartnersData>(
  "/content/site/partners.json",
  { eager: true, import: "default" },
) as Record<string, PartnersData>;

export function getPartners(): PartnersData {
  return Object.values(partnersModule)[0];
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

export interface HomePageContent {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  aboutHeading: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  servicesHeading: string;
  servicesSubtext: string;
  servicesButtonText: string;
  services: HomeService[];
  processHeading: string;
  processSubtext: string;
  processSteps: ProcessStep[];
}

const homeModule = import.meta.glob<HomePageContent>(
  "/content/pages/home.json",
  { eager: true, import: "default" },
) as Record<string, HomePageContent>;

export function getHomePage(): HomePageContent {
  return Object.values(homeModule)[0];
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

const aboutModule = import.meta.glob<AboutPageContent>(
  "/content/pages/about.json",
  { eager: true, import: "default" },
) as Record<string, AboutPageContent>;

export function getAboutPage(): AboutPageContent {
  return Object.values(aboutModule)[0];
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

const servicesModule = import.meta.glob<ServicesPageContent>(
  "/content/pages/services.json",
  { eager: true, import: "default" },
) as Record<string, ServicesPageContent>;

export function getServicesPage(): ServicesPageContent {
  return Object.values(servicesModule)[0];
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

const contactModule = import.meta.glob<ContactPageContent>(
  "/content/pages/contact.json",
  { eager: true, import: "default" },
) as Record<string, ContactPageContent>;

export function getContactPage(): ContactPageContent {
  return Object.values(contactModule)[0];
}
