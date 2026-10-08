/**
 * Static content mappers. Every JSON document under `content/` is imported here
 * so pages can render from the versioned build data; the matching hooks in
 * `src/hooks/tina` swap in live TinaCMS data during visual editing.
 */

// ─── Shared ──────────────────────────────────────────────────────────────────

export interface PageSeo {
  title: string;
  description: string;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface IconItem {
  label: string;
  icon: string;
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export interface Social {
  name: string;
  url: string;
  openInNewTab?: boolean;
}

/** @deprecated Use `LinkItem`. */
export type FooterLink = LinkItem;

export interface NavigationLink {
  label: string;
  href: string;
  activePaths?: string[];
  hasServicesMenu?: boolean;
  showOnDesktop?: boolean;
  showOnMobile?: boolean;
}

export interface ServiceMenuItem {
  label: string;
  href: string;
  description: string;
  icon: string;
}

export interface NavigationSettings {
  ctaLabel: string;
  ctaShortLabel: string;
  links: NavigationLink[];
  servicesMenu: {
    label: string;
    heading: string;
    description: string;
    overviewLabel: string;
    overviewDescription: string;
    items: ServiceMenuItem[];
  };
  mobileTranslateLabel: string;
  mobileConnectLabel: string;
}

export interface FooterSettings {
  label: string;
  ctaLabel: string;
  reachUsLabel: string;
  exploreLabel: string;
  exploreLinks: LinkItem[];
  servicesLabel: string;
  serviceLinks: LinkItem[];
  followLabel: string;
}

export interface ProjectCtaSettings {
  imageLabel: string;
  slotLabel: string;
  heading: string;
  description: string;
  ctaLabel: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  order: number;
}

export interface TeamSettings {
  heading: string;
  description: string;
  members: TeamMember[];
}

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

export interface SiteSettings {
  email: string;
  phone: string;
  phoneLink: string;
  address: string;
  copyright: string;
  contactHeadingLine1: string;
  contactHeadingLine2: string;
  scrollText: string;
  loaderMotto: string;
  socials: Social[];
  newsletterLabel: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterButtonLabel: string;
  newsletterConsent: string;
  footerNewsletterHeading: string;
  footerNewsletterDescription: string;
  newsletterSuccessHeading: string;
  newsletterSuccessDescription: string;
  navigation: NavigationSettings;
  footer: FooterSettings;
  footerLinks: LinkItem[];
  projectCta: ProjectCtaSettings;
  team: TeamSettings;
  partners: PartnersData;
  cookies: CookieSettingsContent;
}

export interface CookieSettingsContent {
  bannerLabel: string;
  bannerHeading: string;
  bannerDescription: string;
  settingsButtonLabel: string;
  rejectButtonLabel: string;
  acceptButtonLabel: string;
  triggerLabel: string;
  panelLabel: string;
  panelHeading: string;
  panelDescription: string;
  necessaryTitle: string;
  necessaryDescription: string;
  alwaysOnLabel: string;
  analyticsTitle: string;
  analyticsDescription: string;
  analyticsOnLabel: string;
  analyticsOffLabel: string;
  cancelLabel: string;
  rejectOptionalLabel: string;
  saveLabel: string;
}

import settingsJson from "@/content/site/settings.json";
export function getSiteSettings(): SiteSettings {
  return settingsJson as unknown as SiteSettings;
}

export function getPartners(): PartnersData {
  return getSiteSettings().partners;
}

export function getTeam(): TeamSettings {
  return getSiteSettings().team;
}

// ─── Home Page ───────────────────────────────────────────────────────────────

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

export interface HeroStat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  format?: "number" | "year";
}

export interface HomePageContent {
  seo: PageSeo;
  heroLabel: string;
  heroTypingPrefix: string;
  heroTypingPhrases: string[];
  heroDescription: string;
  heroSignals: IconItem[];
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  heroCapabilityLabel: string;
  heroCapabilityHeading: string;
  heroCapabilityItems: IconItem[];
  heroStats: HeroStat[];
  aboutHeading: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  projectsLabel: string;
  projectsHeading: string;
  projectsDescription: string;
  projectsButtonText: string;
  projectsSiteLinkLabel: string;
  processLabel: string;
  processHeading: string;
  processSubtext: string;
  processSteps: ProcessStep[];
}

import homeJson from "@/content/pages/home.json";
export function getHomePage(): HomePageContent {
  return homeJson as unknown as HomePageContent;
}

// ─── About Page ──────────────────────────────────────────────────────────────

export interface CoreValue {
  id: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  seo: PageSeo;
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  heroCtaLabel: string;
  studioImage: string;
  studioImageAlt: string;
  storyLabel: string;
  introHeading: string;
  introParagraph1: string;
  introParagraph2: string;
  storyCtaLabel: string;
  valuesLabel: string;
  valuesHeading: string;
  values: CoreValue[];
}

import aboutJson from "@/content/pages/about.json";
export function getAboutPage(): AboutPageContent {
  return aboutJson as unknown as AboutPageContent;
}

// ─── Services ────────────────────────────────────────────────────────────────

export interface ServiceCategory {
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  plan: string[];
  items: string[];
}

export interface ServiceShowcaseCopy {
  label: string;
  heading: string;
  description: string;
  listLabel: string;
  coversLabel: string;
  focusLabel: string;
}

export interface ServiceExplorerCopy {
  label: string;
  heading: string;
  description: string;
  listLabel: string;
  listPrompt: string;
  allServicesLabel: string;
  selectedLabel: string;
  planLabel: string;
  scopeLabel: string;
  ctaLabel: string;
  imageLabel: string;
}

export interface ServicesPageContent {
  seo: PageSeo;
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  categories: ServiceCategory[];
  showcase: ServiceShowcaseCopy;
  explorer: ServiceExplorerCopy;
}

import servicesJson from "@/content/pages/services/index.json";
export function getServicesPage(): ServicesPageContent {
  return servicesJson as unknown as ServicesPageContent;
}

export interface ServicePageContent {
  seo: PageSeo;
  label: string;
  title: string;
  mutedTitle?: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  noticeLabel?: string;
  noticeText?: string;
}

import aiAutomationsJson from "@/content/pages/services/ai-automations.json";
import brandingJson from "@/content/pages/services/branding.json";
import mobileAppsJson from "@/content/pages/services/mobile-apps.json";
import socialMediaMarketingJson from "@/content/pages/services/social-media-marketing.json";
import softwaresJson from "@/content/pages/services/softwares.json";
import templatesJson from "@/content/pages/services/templates.json";
import websitesJson from "@/content/pages/services/websites.json";

const servicePages = {
  "ai-automations": aiAutomationsJson,
  branding: brandingJson,
  "mobile-apps": mobileAppsJson,
  "social-media-marketing": socialMediaMarketingJson,
  softwares: softwaresJson,
  templates: templatesJson,
  websites: websitesJson,
} as unknown as Record<string, ServicePageContent>;

export type ServicePageSlug = keyof typeof servicePages;

export function getServicePage(slug: string): ServicePageContent {
  return servicePages[slug];
}

export interface SaasProductsPageContent {
  seo: PageSeo;
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  tracksLabel: string;
  tracksHeading: string;
  productTypes: { title: string; description: string }[];
  capabilitiesLabel: string;
  capabilitiesHeading: string;
  capabilitiesDescription: string;
  capabilities: { title: string; text: string; icon: string }[];
  deliveryLabel: string;
  deliveryHeading: string;
  phases: string[];
}

import saasProductsJson from "@/content/pages/services/saas-products.json";
export function getSaasProductsPage(): SaasProductsPageContent {
  return saasProductsJson as unknown as SaasProductsPageContent;
}

// ─── Testimonials & FAQ ──────────────────────────────────────────────────────

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

export interface TestimonialsPageContent {
  seo: PageSeo;
  heroLabel: string;
  heading: string;
  subtext: string;
  viewAllLabel: string;
  emptyMessage: string;
  testimonials: Testimonial[];
}

import testimonialsJson from "@/content/pages/testimonials.json";
export function getTestimonialsPage(): TestimonialsPageContent {
  return testimonialsJson as unknown as TestimonialsPageContent;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqPageContent {
  seo: PageSeo;
  label: string;
  faqHeading: string;
  faqSubtext: string;
  faqItems: FaqItem[];
  viewAllLabel: string;
  previousLabel: string;
  nextLabel: string;
}

import faqJson from "@/content/pages/faq.json";
export function getFaqPage(): FaqPageContent {
  return faqJson as unknown as FaqPageContent;
}

// ─── Projects, Booking, Brief, Walkthrough, 404 ──────────────────────────────

export interface ProjectsPageContent {
  seo: PageSeo;
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  caseStudy: CaseStudyLabels;
}

export interface CaseStudyLabels {
  backLabel: string;
  visitSiteLabel: string;
  detailsHeading: string;
  yearLabel: string;
  categoryLabel: string;
  roleLabel: string;
  defaultRole: string;
  liveSiteLabel: string;
  viewSiteLabel: string;
  techStackLabel: string;
  overviewTitle: string;
  challengeTitle: string;
  strategyTitle: string;
  solutionTitle: string;
  emptySectionText: string;
  galleryLabel: string;
  notFoundHeading: string;
  notFoundCtaLabel: string;
}

import projectsPageJson from "@/content/pages/projects.json";
export function getProjectsPage(): ProjectsPageContent {
  return projectsPageJson as unknown as ProjectsPageContent;
}

export interface BookCallPageContent {
  seo: PageSeo;
  label: string;
  heading: string;
  description: string;
  highlights: { title: string; description: string; icon: string }[];
  scopeHeading: string;
  scopeDescription: string;
  scopeCtaLabel: string;
  formHeading: string;
  timezoneLabel: string;
  submitLabel: string;
  submittingLabel: string;
  dateLabel: string;
  weekdaysLabel: string;
  timeLabel: string;
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  errorMessage: string;
  confirmation: BookCallConfirmationContent;
}

export interface BookCallConfirmationContent {
  label: string;
  heading: string;
  description: string;
  slotLabel: string;
  slotJoiner: string;
  referenceLabel: string;
  homeCtaLabel: string;
  projectCtaLabel: string;
}

import bookCallJson from "@/content/pages/book-call.json";
export function getBookCallPage(): BookCallPageContent {
  return bookCallJson as unknown as BookCallPageContent;
}

export interface StartProjectPageContent {
  seo: PageSeo;
  steps: { label: string; title: string; intro: string }[];
  labels: StartProjectLabels;
  confirmation: BriefConfirmationContent;
}

export interface StartProjectLabels {
  nameLabel: string;
  companyLabel: string;
  emailLabel: string;
  phoneLabel: string;
  reviewServiceHeading: string;
  reviewContactHeading: string;
  reviewBriefHeading: string;
  deliveryPrefix: string;
  notProvided: string;
  notSelected: string;
  summaryHeading: string;
  summaryServiceLabel: string;
  summaryPackageLabel: string;
  privacyHeading: string;
  privacyText: string;
  progressLabel: string;
  stepCounter: string;
  backLabel: string;
  continueLabel: string;
  submitLabel: string;
  submittingLabel: string;
  errorMessage: string;
}

export interface BriefConfirmationContent {
  label: string;
  heading: string;
  description: string;
  contactPrompt: string;
  homeCtaLabel: string;
}

import startProjectJson from "@/content/pages/start-project.json";
export function getStartProjectPage(): StartProjectPageContent {
  return startProjectJson as unknown as StartProjectPageContent;
}

export interface WalkthroughPageContent {
  seo: PageSeo;
  navigationItems: IconItem[];
  statusLabel: string;
  statusText: string;
  label: string;
  heading: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  todayLabel: string;
  todayBadge: string;
  activityItems: string[];
  outcomeLabel: string;
  steps: {
    eyebrow: string;
    title: string;
    description: string;
    outcome: string;
    icon: string;
  }[];
  closingHeading: string;
  closingDescription: string;
  closingCtaLabel: string;
}

import walkthroughJson from "@/content/pages/walkthrough.json";
export function getWalkthroughPage(): WalkthroughPageContent {
  return walkthroughJson as unknown as WalkthroughPageContent;
}

export interface NotFoundPageContent {
  heading: string;
  description: string;
  ctaLabel: string;
}

import notFoundJson from "@/content/pages/not-found.json";
export function getNotFoundPage(): NotFoundPageContent {
  return notFoundJson as unknown as NotFoundPageContent;
}

// ─── Legal Pages ─────────────────────────────────────────────────────────────

export interface LegalSection {
  title: string;
  body: string;
}

export interface LegalPageContent {
  seo: PageSeo;
  title: string;
  slug: string;
  heroLabel: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}

import privacyJson from "@/content/pages/privacy.json";
import termsJson from "@/content/pages/terms.json";

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
