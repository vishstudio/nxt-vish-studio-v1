import { getPricingPage } from "./pricing";

export type ServiceSlug =
  | "social-media-marketing"
  | "saas-products"
  | "websites"
  | "website-templates"
  | "softwares"
  | "mobile-apps"
  | "branding"
  | "ai-integrations-automations";
export type AnswerValue = string | string[];

export interface BriefQuestion {
  id: string;
  label: string;
  hint?: string;
  type: "text" | "textarea" | "single" | "multiple";
  options?: string[];
  required?: boolean;
}

export const services: { slug: ServiceSlug; label: string; description: string }[] = [
  { slug: "social-media-marketing", label: "Social Media Marketing", description: "Strategy, campaigns, creative direction, and performance support." },
  { slug: "saas-products", label: "SaaS Products", description: "Subscription-ready web products and operational platforms." },
  { slug: "websites", label: "Websites", description: "Marketing sites, e-commerce, landing pages, and web platforms." },
  { slug: "website-templates", label: "Website Templates", description: "Launch-ready website foundations, tailored to your brand." },
  { slug: "softwares", label: "Softwares", description: "Custom business tools, portals, and operational systems." },
  { slug: "mobile-apps", label: "Mobile Apps", description: "Customer-facing or internal iOS and Android experiences." },
  { slug: "branding", label: "Branding", description: "Identity, positioning, guidelines, and launch-ready assets." },
  { slug: "ai-integrations-automations", label: "AI Integrations & Automations", description: "Connected AI workflows that reduce repetitive work." },
];

const sharedQuestions: BriefQuestion[] = [
  { id: "projectSummary", label: "Describe the project in your own words", hint: "What are you creating, changing, or improving?", type: "textarea", required: true },
  { id: "businessGoal", label: "What is the primary business goal?", type: "single", options: ["Generate leads or sales", "Launch a new product", "Improve operations", "Strengthen the brand", "Replace an existing solution"], required: true },
  { id: "audience", label: "Who is the main audience?", hint: "Describe the people or teams who will use it.", type: "textarea", required: true },
  { id: "timeline", label: "When would you like to launch?", type: "single", options: ["As soon as possible", "Within 1 month", "Within 2–3 months", "Within 3–6 months", "Flexible / need guidance"], required: true },
];

const serviceQuestions: Record<ServiceSlug, BriefQuestion[]> = {
  "social-media-marketing": [
    { id: "marketingGoal", label: "What should social media help your business achieve?", type: "multiple", options: ["Grow awareness", "Generate leads", "Drive sales", "Build community", "Launch a campaign"], required: true },
    { id: "channels", label: "Which channels matter most?", type: "multiple", options: ["Instagram", "Facebook", "LinkedIn", "TikTok", "YouTube", "Not sure yet"] },
    { id: "marketingContext", label: "Tell us about your current social media presence", hint: "Share accounts, recent results, or the main challenge.", type: "textarea" },
  ],
  "saas-products": [
    { id: "saasUsers", label: "Who will use the product?", type: "multiple", options: ["Customers", "Internal teams", "Partners", "Public users", "Administrators"], required: true },
    { id: "saasProblem", label: "What problem should the SaaS product solve?", type: "textarea", required: true },
    { id: "saasFeatures", label: "Which capabilities are important?", type: "multiple", options: ["Accounts and roles", "Subscriptions", "Payments", "Dashboards", "Reporting", "Integrations", "Admin portal"] },
  ],
  websites: [
    { id: "websiteType", label: "What type of website do you need?", type: "single", options: ["Business or corporate website", "Landing page", "E-commerce store", "Portfolio or publication", "Web platform / other"], required: true },
    { id: "pageScope", label: "How many pages do you expect?", type: "single", options: ["1 page", "2–5 pages", "6–10 pages", "More than 10", "Not sure yet"], required: true },
    { id: "websiteFeatures", label: "Which capabilities are needed?", type: "multiple", options: ["Contact or quote forms", "Online booking", "Online payments / store", "CMS / blog", "Multilingual content", "Member login", "Third-party integrations"] },
    { id: "contentReadiness", label: "What content is ready?", type: "single", options: ["Copy and images are ready", "Some content is ready", "We need content support", "We are starting from scratch"], required: true },
    { id: "existingWebsite", label: "Existing website or reference links", hint: "Add URLs and what you like or dislike about them.", type: "textarea" },
  ],
  "website-templates": [
    { id: "templateType", label: "What kind of website template do you need?", type: "single", options: ["Business website", "Landing page", "Portfolio", "E-commerce", "Not sure yet"], required: true },
    { id: "templateCustomisation", label: "How much customisation do you expect?", type: "single", options: ["Brand and content only", "Layout adjustments", "New sections or pages", "Not sure yet"], required: true },
    { id: "templateReferences", label: "Share any template or visual references", type: "textarea" },
  ],
  "mobile-apps": [
    { id: "platforms", label: "Which platforms should the app support?", type: "multiple", options: ["iOS", "Android", "Tablet", "Web companion", "Not sure yet"], required: true },
    { id: "coreAction", label: "What is the one most important action a user should complete?", type: "textarea", required: true },
    { id: "appFeatures", label: "Which capabilities are required?", type: "multiple", options: ["Accounts and profiles", "Bookings", "Payments", "Push notifications", "Location / maps", "Chat or messaging", "Camera or uploads", "Offline use"] },
    { id: "adminNeeds", label: "Do you need an admin interface?", type: "single", options: ["Yes, web-based admin", "Yes, app-based admin", "No", "Not sure yet"], required: true },
    { id: "existingBackend", label: "Is there an existing backend or API?", type: "single", options: ["Yes, documented API", "Yes, but it needs work", "No, it must be built", "Not sure"], required: true },
  ],
  softwares: [
    { id: "softwareType", label: "What type of software are you planning?", type: "single", options: ["Internal business tool", "Customer portal", "SaaS product", "CRM or workflow system", "Marketplace", "Other custom platform"], required: true },
    { id: "workflow", label: "Which workflow should this software improve?", hint: "Describe the current process and its biggest bottleneck.", type: "textarea", required: true },
    { id: "userRoles", label: "Who will use the system?", type: "multiple", options: ["Administrators", "Internal staff", "Customers", "Vendors or partners", "Public visitors"] },
    { id: "softwareFeatures", label: "Which capabilities are required?", type: "multiple", options: ["Authentication", "Dashboards", "Data entry and approvals", "Payments or subscriptions", "Reports and exports", "Notifications", "API integrations", "File management"] },
    { id: "dataMigration", label: "Is existing data or software involved?", type: "single", options: ["No, this is new", "Yes, data must be migrated", "Yes, another system must be integrated", "Not sure yet"], required: true },
  ],
  branding: [
    { id: "brandStage", label: "Where is the brand today?", type: "single", options: ["New brand", "Existing brand needing refinement", "Complete rebrand", "New product under an existing brand"], required: true },
    { id: "brandChallenge", label: "What should the new identity change or communicate?", type: "textarea", required: true },
    { id: "brandDeliverables", label: "Which deliverables matter most?", type: "multiple", options: ["Logo system", "Color and typography", "Brand strategy", "Messaging and positioning", "Brand guidelines", "Social media assets", "Launch campaign assets"] },
    { id: "brandPersonality", label: "Choose the qualities the brand should express", type: "multiple", options: ["Premium", "Approachable", "Bold", "Minimal", "Innovative", "Trustworthy", "Playful", "Established"] },
    { id: "brandReferences", label: "Competitors or visual references", hint: "Share names or links and explain what resonates.", type: "textarea" },
  ],
  "ai-integrations-automations": [
    { id: "automationChallenge", label: "Which repetitive work or handoff should be improved?", type: "textarea", required: true },
    { id: "automationSystems", label: "Which tools should connect?", type: "multiple", options: ["CRM", "Email", "Spreadsheets", "Forms", "Documents", "Accounting", "Custom software", "Not sure yet"] },
    { id: "aiOutcome", label: "What should the AI or automation do?", type: "multiple", options: ["Draft content", "Route leads", "Summarize information", "Process documents", "Answer questions", "Create reports", "Trigger workflows"] },
  ],
};

export const questionsByService = Object.fromEntries(
  services.map(({ slug }) => [slug, [...sharedQuestions, ...serviceQuestions[slug]]]),
) as Record<ServiceSlug, BriefQuestion[]>;

export const pricingByService = Object.fromEntries(
  getPricingPage().pricingCategories.map((category) => [category.slug, category.plans]),
);
