import type { Collection, Template } from "tinacms";
import {
  iconField,
  pricingAddOnFields,
  pricingCarePlanFields,
  pricingPlanFields,
  seoField,
  stringList,
  text,
  textarea,
} from "../fields";

/**
 * Every page on the site is one document in `content/pages`. The document's
 * `_template` decides which form Tina shows; its file path decides the route.
 */

const home: Template = {
  name: "home",
  label: "Home Page",
  fields: [
    seoField,
    text("heroLabel", "Hero Label"),
    text("heroTypingPrefix", "Hero Headline Prefix", "Fixed first line, e.g. We build your"),
    stringList("heroTypingPhrases", "Hero Rotating Phrases", "Each phrase is typed after the prefix. End with a period to show the yellow accent."),
    textarea("heroDescription", "Hero Description"),
    {
      type: "object",
      name: "heroSignals",
      label: "Hero Proof Signals",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label || "Signal" }) },
      fields: [text("label", "Label"), iconField()],
    },
    text("heroPrimaryCtaLabel", "Hero Primary Button Label"),
    text("heroSecondaryCtaLabel", "Hero Secondary Button Label"),
    text("heroCapabilityLabel", "Capability Panel Label"),
    text("heroCapabilityHeading", "Capability Panel Heading"),
    {
      type: "object",
      name: "heroCapabilityItems",
      label: "Capability Panel Items",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label || "Capability" }) },
      fields: [text("label", "Label"), iconField()],
    },
    {
      type: "object",
      name: "heroStats",
      label: "Hero Stats",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label || "Stat" }) },
      fields: [
        { type: "string", name: "label", label: "Label", required: true },
        { type: "number", name: "value", label: "Value", required: true },
        text("prefix", "Prefix"),
        text("suffix", "Suffix"),
        {
          type: "string",
          name: "format",
          label: "Format",
          options: [
            { label: "Number", value: "number" },
            { label: "Year", value: "year" },
          ],
        },
      ],
    },
    text("aboutHeading", "About Block Heading"),
    textarea("aboutParagraph1", "About Block Paragraph 1"),
    textarea("aboutParagraph2", "About Block Paragraph 2"),
    text("projectsLabel", "Case Studies Label"),
    text("projectsHeading", "Case Studies Heading"),
    textarea("projectsDescription", "Case Studies Description"),
    text("projectsButtonText", "Case Studies Button Label"),
    text("projectsSiteLinkLabel", "Case Study Site Link Label"),
    text("processLabel", "Process Label"),
    text("processHeading", "Process Heading"),
    text("processSubtext", "Process Subtext"),
    {
      type: "object",
      name: "processSteps",
      label: "Process Steps",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Step" }) },
      fields: [
        text("num", "Step Number"),
        { type: "string", name: "title", label: "Title", required: true },
        textarea("description", "Description"),
        stringList("tags", "Tags"),
      ],
    },
  ],
};

const about: Template = {
  name: "about",
  label: "About Page",
  fields: [
    seoField,
    text("heroLabel", "Hero Label"),
    text("heroTitleLine1", "Hero Title Line 1"),
    text("heroTitleLine2", "Hero Title Line 2 (muted)"),
    textarea("heroDescription", "Hero Description"),
    text("heroCtaLabel", "Hero Button Label"),
    text("studioImage", "Studio Image URL"),
    text("studioImageAlt", "Studio Image Alt Text"),
    text("storyLabel", "Story Label"),
    text("introHeading", "Story Heading"),
    textarea("introParagraph1", "Story Paragraph 1"),
    textarea("introParagraph2", "Story Paragraph 2"),
    text("storyCtaLabel", "Story Button Label"),
    text("valuesLabel", "Values Section Label"),
    text("valuesHeading", "Values Section Heading"),
    {
      type: "object",
      name: "values",
      label: "Core Values",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Value" }) },
      fields: [
        text("id", "ID (e.g. 01)"),
        { type: "string", name: "title", label: "Title", required: true },
        textarea("description", "Description"),
      ],
    },
  ],
};

const services: Template = {
  name: "services",
  label: "Services Overview",
  fields: [
    seoField,
    text("heroLabel", "Hero Label"),
    text("heroTitleLine1", "Hero Title Line 1"),
    text("heroTitleLine2", "Hero Title Line 2 (muted)"),
    {
      type: "object",
      name: "categories",
      label: "Service Categories",
      description: "Shared by the homepage service showcase and the /services explorer.",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.category || "Service" }) },
      fields: [
        { type: "string", name: "category", label: "Category Name", required: true },
        textarea("description", "Description"),
        { type: "image", name: "image", label: "Service Image" },
        text("imageAlt", "Service Image Alt Text"),
        stringList("plan", "Delivery Plan Steps"),
        stringList("items", "Service Items"),
      ],
    },
    {
      type: "object",
      name: "showcase",
      label: "Homepage Showcase Copy",
      fields: [
        text("label", "Label"),
        text("heading", "Heading"),
        textarea("description", "Description"),
        text("listLabel", "Service List Label"),
        text("coversLabel", "Caption Label"),
        text("focusLabel", "Focus Label"),
      ],
    },
    {
      type: "object",
      name: "explorer",
      label: "Services Page Explorer Copy",
      fields: [
        text("label", "Label"),
        text("heading", "Heading"),
        textarea("description", "Description"),
        text("listLabel", "Service List Label"),
        text("listPrompt", "Service List Prompt"),
        text("allServicesLabel", "Back Button Label"),
        text("selectedLabel", "Selected Service Label"),
        text("planLabel", "Plan Label"),
        text("scopeLabel", "Scope Label"),
        text("ctaLabel", "Button Label"),
        text("imageLabel", "Image Caption"),
      ],
    },
  ],
};

const servicePage: Template = {
  name: "servicePage",
  label: "Service Page",
  fields: [
    seoField,
    text("label", "Hero Label"),
    text("title", "Title"),
    text("mutedTitle", "Muted Title", "Coming-soon pages only, shown in grey under the title."),
    textarea("description", "Description"),
    text("primaryCtaLabel", "Primary Button Label"),
    text("secondaryCtaLabel", "Secondary Button Label", "Coming-soon pages only."),
    text("secondaryCtaHref", "Secondary Button URL", "Coming-soon pages only."),
    text("noticeLabel", "Notice Label", "Coming-soon pages only."),
    textarea("noticeText", "Notice Text", "Coming-soon pages only."),
  ],
};

const saasProducts: Template = {
  name: "saasProducts",
  label: "SaaS Products Page",
  fields: [
    seoField,
    text("heroLabel", "Hero Label"),
    text("heroTitleLine1", "Hero Title Line 1"),
    text("heroTitleLine2", "Hero Title Line 2 (muted)"),
    textarea("heroDescription", "Hero Description"),
    text("primaryCtaLabel", "Primary Button Label"),
    text("secondaryCtaLabel", "Secondary Button Label"),
    text("tracksLabel", "Product Tracks Label"),
    text("tracksHeading", "Product Tracks Heading"),
    {
      type: "object",
      name: "productTypes",
      label: "Product Tracks",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Track" }) },
      fields: [text("title", "Title"), textarea("description", "Description")],
    },
    text("capabilitiesLabel", "Capabilities Label"),
    text("capabilitiesHeading", "Capabilities Heading"),
    textarea("capabilitiesDescription", "Capabilities Description"),
    {
      type: "object",
      name: "capabilities",
      label: "Capabilities",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Capability" }) },
      fields: [text("title", "Title"), textarea("text", "Text"), iconField()],
    },
    text("deliveryLabel", "Delivery Label"),
    text("deliveryHeading", "Delivery Heading"),
    stringList("phases", "Delivery Phases"),
  ],
};

const pricing: Template = {
  name: "pricing",
  label: "Pricing Page",
  fields: [
    seoField,
    text("heroLabel", "Hero Label"),
    text("heroTitleLine1", "Hero Title Line 1"),
    text("heroTitleLine2", "Hero Title Line 2 (muted)"),
    textarea("heroSubtext", "Hero Subtext"),
    {
      type: "image",
      name: "heroBackgroundImage",
      label: "Hero Background Image Upload",
      description: "Upload a WEBP, PNG, or JPG hero image. Used when no pasted image URL is provided.",
    },
    text(
      "heroBackgroundImageUrl",
      "Hero Background Image URL",
      "Optional external image URL. If filled, this takes priority over the uploaded image.",
    ),
    text("sectionLabel", "Section Label"),
    text("sectionHeading", "Section Heading"),
    textarea("sectionSubtext", "Section Subtext"),
    {
      type: "object",
      name: "pricingCategories",
      label: "Shared Service Pricing",
      description:
        "Single source of truth for homepage pricing cards and the full pricing page. Edit packages, prices, features, CTAs, and monthly care plans here.",
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.label || "Service"} pricing` }) },
      fields: [
        { type: "string", name: "label", label: "Tab Label", required: true },
        text(
          "slug",
          "Tab Slug",
          "Lowercase identifier, e.g. social-media-marketing, websites, branding, ai-integrations-automations",
        ),
        {
          type: "object",
          name: "plans",
          label: "Packages",
          description:
            "These packages render as homepage cards and pricing page rows. Care plans inside each package render as monthly maintenance pricing.",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: `${item?.label ? `${item.label} — ` : ""}${item?.name || "Package"}${item?.price ? ` (${item.price})` : ""}`,
            }),
          },
          fields: pricingPlanFields,
        },
        {
          type: "object",
          name: "carePlans",
          label: "Pricing Page Care Plans",
          description:
            "Fallback monthly care rows shown on the full pricing page when a package does not define its own care plan.",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: `${item?.title || "Care plan"}${item?.price ? ` (${item.price})` : ""}`,
            }),
          },
          fields: pricingCarePlanFields,
        },
        {
          type: "object",
          name: "addOns",
          label: "Pricing Page Add-ons",
          description: "Common additional-cost rows shown below packages on the full pricing page.",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: `${item?.label || "Add-on"}${item?.price ? ` (${item.price})` : ""}`,
            }),
          },
          fields: pricingAddOnFields,
        },
      ],
    },
    text("customLabel", "Custom Block Heading"),
    textarea("customDescription", "Custom Block Description"),
    text("customCtaLabel", "Custom CTA Label"),
    text("customCtaHref", "Custom CTA Link"),
    {
      type: "object",
      name: "labels",
      label: "Pricing Labels",
      description: "Shared labels for homepage pricing cards and the /pricing page. Use {service} to insert the selected service name.",
      fields: [
        text("mostPopular", "Featured Badge"),
        text("choosePlan", "Choose Plan Button"),
        text("viewAllPlans", "View All Plans Link"),
        text("carePlanPrefix", "Care Plan Prefix"),
        text("bestForPrefix", "Best For Prefix"),
        text("revisionsPrefix", "Revisions Prefix"),
        text("careLabel", "Care Plans Label"),
        text("careHeading", "Care Plans Heading"),
        textarea("careDescription", "Care Plans Description"),
        text("maintenanceLabel", "Maintenance Label"),
        text("maintenanceHeading", "Maintenance Heading"),
        textarea("maintenanceDescription", "Maintenance Description"),
        text("addOnsLabel", "Add-ons Label"),
        text("addOnsHeading", "Add-ons Heading"),
        textarea("addOnsDescription", "Add-ons Description"),
      ],
    },
  ],
};

const testimonials: Template = {
  name: "testimonials",
  label: "Testimonials Page",
  fields: [
    seoField,
    text("heroLabel", "Hero Label"),
    text("heading", "Heading", "Also used as the homepage testimonials heading."),
    text("subtext", "Subtext"),
    text("viewAllLabel", "Homepage View All Label"),
    text("emptyMessage", "Empty State Message"),
    {
      type: "object",
      name: "testimonials",
      label: "Testimonials",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.name || "New Testimonial" }) },
      fields: [
        {
          type: "string",
          name: "quote",
          label: "Quote",
          required: true,
          ui: { component: "textarea" },
        },
        { type: "string", name: "name", label: "Client Name", required: true },
        { type: "string", name: "role", label: "Role / Title", required: true },
        text("company", "Company"),
      ],
    },
  ],
};

const faq: Template = {
  name: "faq",
  label: "FAQ Page",
  fields: [
    seoField,
    text("label", "Section Label"),
    text("faqHeading", "FAQ Heading"),
    textarea("faqSubtext", "FAQ Supporting Copy"),
    {
      type: "object",
      name: "faqItems",
      label: "FAQ Items",
      description: "The homepage shows the same list; the /faq page paginates it 10 at a time.",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.question || "New FAQ" }) },
      fields: [
        { type: "string", name: "question", label: "Question", required: true },
        textarea("answer", "Answer"),
      ],
    },
  ],
};

const projects: Template = {
  name: "projects",
  label: "Projects Page",
  fields: [
    seoField,
    text("heroLabel", "Hero Label"),
    text("heroTitleLine1", "Hero Title Line 1"),
    text("heroTitleLine2", "Hero Title Line 2 (muted)"),
    textarea("heroDescription", "Hero Description"),
    {
      type: "object",
      name: "caseStudy",
      label: "Case Study Page Labels",
      description: "Shared labels on every /project/<slug> page.",
      fields: [
        text("backLabel", "Back Link Label"),
        text("visitSiteLabel", "Visit Live Site Button"),
        text("detailsHeading", "Details Heading"),
        text("yearLabel", "Year Label"),
        text("categoryLabel", "Category Label"),
        text("roleLabel", "Role Label"),
        text("defaultRole", "Default Role", "Used when a project has no role set."),
        text("liveSiteLabel", "Live Site Label"),
        text("viewSiteLabel", "View Site Button"),
        text("techStackLabel", "Tech Stack Label"),
        text("overviewTitle", "Overview Section Title"),
        text("challengeTitle", "Challenge Section Title"),
        text("strategyTitle", "Strategy Section Title"),
        text("solutionTitle", "Solution Section Title"),
        text("emptySectionText", "Empty Section Text"),
        text("galleryLabel", "Gallery Label"),
        text("notFoundHeading", "Not Found Heading"),
        text("notFoundCtaLabel", "Not Found Link Label"),
      ],
    },
  ],
};

const bookCall: Template = {
  name: "bookCall",
  label: "Book a Call Page",
  fields: [
    seoField,
    text("label", "Label"),
    text("heading", "Heading"),
    textarea("description", "Description"),
    {
      type: "object",
      name: "highlights",
      label: "Call Highlights",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Highlight" }) },
      fields: [text("title", "Title"), textarea("description", "Description"), iconField()],
    },
    text("scopeHeading", "Start a Project Heading"),
    textarea("scopeDescription", "Start a Project Description"),
    text("scopeCtaLabel", "Start a Project Button Label"),
    text("formHeading", "Form Heading"),
    text("timezoneLabel", "Timezone Note"),
    text("submitLabel", "Submit Button Label"),
    text("submittingLabel", "Submitting Button Label"),
    text("dateLabel", "Date Field Label"),
    text("weekdaysLabel", "Weekdays Note"),
    text("timeLabel", "Time Field Label"),
    text("nameLabel", "Name Field Label"),
    text("emailLabel", "Email Field Label"),
    text("companyLabel", "Company Field Label"),
    textarea("errorMessage", "Submission Error Message"),
    {
      type: "object",
      name: "confirmation",
      label: "Confirmation Popup",
      fields: [
        text("label", "Label"),
        text("heading", "Heading"),
        textarea("description", "Description", "Use {email} to insert the visitor's email."),
        text("slotLabel", "Selected Slot Label"),
        text("slotJoiner", "Date/Time Joiner", "Word between the date and time, e.g. at."),
        text("referenceLabel", "Reference Label"),
        text("homeCtaLabel", "Home Button Label"),
        text("projectCtaLabel", "Start a Project Button Label"),
      ],
    },
  ],
};

const startProject: Template = {
  name: "startProject",
  label: "Start a Project Page",
  fields: [
    seoField,
    {
      type: "object",
      name: "steps",
      label: "Step Headings",
      description:
        "Keep five steps in this order: service, package, project questions, contact details, review. Questionnaire options live in src/lib/project-brief.ts.",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Step" }) },
      fields: [
        text("label", "Progress Label", "Short name shown in the progress bar."),
        text("title", "Title"),
        textarea("intro", "Intro"),
      ],
    },
    {
      type: "object",
      name: "labels",
      label: "Form Labels",
      fields: [
        text("nameLabel", "Name Field"),
        text("companyLabel", "Company Field"),
        text("emailLabel", "Email Field"),
        text("phoneLabel", "Phone Field"),
        text("reviewServiceHeading", "Review: Service Heading"),
        text("reviewContactHeading", "Review: Contact Heading"),
        text("reviewBriefHeading", "Review: Brief Heading"),
        text("deliveryPrefix", "Delivery Prefix"),
        text("notProvided", "Empty Answer Text"),
        text("notSelected", "Nothing Selected Text"),
        text("summaryHeading", "Sidebar Heading"),
        text("summaryServiceLabel", "Sidebar Service Label"),
        text("summaryPackageLabel", "Sidebar Package Label"),
        text("privacyHeading", "Privacy Heading"),
        textarea("privacyText", "Privacy Text"),
        text("progressLabel", "Progress Panel Label"),
        text("stepCounter", "Step Counter", "Use {current} and {total}, e.g. Step {current} of {total}."),
        text("backLabel", "Back Button"),
        text("continueLabel", "Continue Button"),
        text("submitLabel", "Submit Button"),
        text("submittingLabel", "Submitting Button"),
        textarea("errorMessage", "Submission Error Message"),
      ],
    },
    {
      type: "object",
      name: "confirmation",
      label: "Confirmation Popup",
      fields: [
        text("label", "Label"),
        text("heading", "Heading"),
        textarea("description", "Description", "Use {reference} to insert the brief reference."),
        textarea("contactPrompt", "Contact Prompt"),
        text("homeCtaLabel", "Home Button Label"),
      ],
    },
  ],
};

const walkthrough: Template = {
  name: "walkthrough",
  label: "Portal Walkthrough Page",
  fields: [
    seoField,
    {
      type: "object",
      name: "navigationItems",
      label: "Sidebar Items",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label || "Item" }) },
      fields: [text("label", "Label"), iconField()],
    },
    text("statusLabel", "Sidebar Status Label"),
    textarea("statusText", "Sidebar Status Text"),
    text("label", "Label"),
    text("heading", "Heading"),
    textarea("description", "Description"),
    text("primaryCtaLabel", "Primary Button Label"),
    text("secondaryCtaLabel", "Secondary Button Label"),
    text("todayLabel", "Activity Panel Label"),
    text("todayBadge", "Activity Panel Badge"),
    stringList("activityItems", "Activity Items"),
    text("outcomeLabel", "Step Outcome Label"),
    {
      type: "object",
      name: "steps",
      label: "Steps",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Step" }) },
      fields: [
        text("eyebrow", "Number"),
        text("title", "Title"),
        textarea("description", "Description"),
        text("outcome", "Outcome"),
        iconField(),
      ],
    },
    text("closingHeading", "Closing Heading"),
    textarea("closingDescription", "Closing Description"),
    text("closingCtaLabel", "Closing Button Label"),
  ],
};

const legal: Template = {
  name: "legal",
  label: "Legal Page",
  fields: [
    seoField,
    text("title", "Title"),
    text("slug", "Slug", "Use 'privacy' or 'terms'."),
    text("heroLabel", "Hero Label"),
    textarea("intro", "Intro"),
    text("lastUpdated", "Last Updated", "Use YYYY-MM-DD format."),
    {
      type: "object",
      name: "sections",
      label: "Sections",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Section" }) },
      fields: [
        { type: "string", name: "title", label: "Title", required: true },
        textarea("body", "Body"),
      ],
    },
  ],
};

const notFound: Template = {
  name: "notFound",
  label: "404 Page",
  fields: [
    text("heading", "Heading"),
    textarea("description", "Description"),
    text("ctaLabel", "Button Label"),
  ],
};

/** Maps a document path such as `services/index` to its public route. */
const getPageRoute = (breadcrumbs: string[]) => {
  const path = breadcrumbs.join("/");
  if (path === "home") return "/";
  if (path === "not-found") return "/404";
  if (path.endsWith("/index")) return `/${path.slice(0, -"/index".length)}`;
  return `/${path}`;
};

export const pagesCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "content/pages",
  format: "json",
  ui: {
    router: ({ document }) => getPageRoute(document._sys.breadcrumbs),
    allowedActions: { create: false, delete: false },
  },
  templates: [
    home,
    about,
    services,
    servicePage,
    saasProducts,
    pricing,
    testimonials,
    faq,
    projects,
    bookCall,
    startProject,
    walkthrough,
    legal,
    notFound,
  ],
};
