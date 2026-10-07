// tina/config.ts
import { defineConfig } from "tinacms";

// src/lib/icon-names.ts
var ICON_NAMES = [
  "megaphone",
  "box",
  "boxes",
  "monitor",
  "layout-template",
  "smartphone",
  "palette",
  "bot",
  "crosshair",
  "mouse-pointer-click",
  "rocket",
  "clock",
  "video",
  "calendar-days",
  "layout-dashboard",
  "folder-kanban",
  "users-round",
  "file-text",
  "check-circle",
  "workflow",
  "shield-check",
  "chart"
];

// tina/fields.ts
var text = (name, label, description) => ({
  type: "string",
  name,
  label,
  ...description ? { description } : {}
});
var textarea = (name, label, description) => ({
  type: "string",
  name,
  label,
  ui: { component: "textarea" },
  ...description ? { description } : {}
});
var stringList = (name, label, description) => ({
  type: "string",
  name,
  label,
  list: true,
  ...description ? { description } : {}
});
var iconField = (name = "icon", label = "Icon") => ({
  type: "string",
  name,
  label,
  options: ICON_NAMES.map((icon) => ({ label: icon, value: icon }))
});
var seoField = {
  type: "object",
  name: "seo",
  label: "SEO",
  description: "Browser tab title and search-result description for this page.",
  fields: [
    text("title", "Meta Title"),
    textarea("description", "Meta Description")
  ]
};
var linkListField = (name, label) => ({
  type: "object",
  name,
  label,
  list: true,
  ui: { itemProps: (item) => ({ label: item?.label || "Link" }) },
  fields: [
    { type: "string", name: "label", label: "Label", required: true },
    { type: "string", name: "url", label: "URL", required: true }
  ]
});
var pricingPlanFields = [
  text("label", "Plan Label (e.g. STARTER)"),
  { type: "string", name: "name", label: "Plan Name", required: true },
  { type: "string", name: "price", label: "Mauritius Price (e.g. Rs 14,000)", required: true },
  text("priceGbp", "International Price (GBP)", "Shown to visitors outside Mauritius, e.g. \xA3230 or \xA31,590+."),
  text("discountedPrice", "Discounted Mauritius Price", "Optional sale price shown before the regular Mauritius price."),
  text("discountedPriceGbp", "Discounted International Price (GBP)", "Optional sale price shown before the regular GBP price."),
  text("priceNote", "Price Note (e.g. ONE-TIME)"),
  text("delivery", "Delivery Time (e.g. 2\u20133 weeks)"),
  textarea("tagline", "Tagline"),
  { type: "boolean", name: "featured", label: "Featured (Most Popular)" },
  text("ctaLabel", "CTA Button Label"),
  {
    type: "object",
    name: "ctaLink",
    label: "CTA Button Link",
    fields: [
      {
        type: "string",
        name: "linkType",
        label: "Link Type",
        options: [
          { label: "Internal path (e.g. /book-call)", value: "internal" },
          { label: "External URL (https://...)", value: "url" },
          { label: "Phone number", value: "phone" },
          { label: "Email address", value: "email" },
          { label: "WhatsApp number", value: "whatsapp" }
        ]
      },
      text(
        "linkValue",
        "Value",
        "Path, full URL, phone number (digits only), email, or WhatsApp number (digits only)"
      )
    ]
  },
  stringList("features", "Features"),
  {
    type: "object",
    name: "carePlan",
    label: "Monthly Care Plan",
    description: "Optional package-specific maintenance plan. This appears on the pricing page and in homepage package details.",
    fields: [
      text("title", "Care Plan Title"),
      text("price", "Monthly Mauritius Price"),
      text("priceGbp", "Monthly International Price (GBP)"),
      text("cadence", "Cadence"),
      textarea("summary", "Summary")
    ]
  },
  text("bestFor", "Best For"),
  text("revisions", "Revisions Policy")
];
var pricingCarePlanFields = [
  text("title", "Care Plan Title"),
  text("price", "Monthly Mauritius Price"),
  text("priceGbp", "Monthly International Price (GBP)"),
  text("cadence", "Cadence"),
  textarea("summary", "Summary")
];
var pricingAddOnFields = [
  text("label", "Add-on Label"),
  text("price", "Mauritius Price"),
  text("priceGbp", "International Price (GBP)"),
  textarea("note", "Note")
];

// tina/collections/pages.ts
var home = {
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
      fields: [text("label", "Label"), iconField()]
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
      fields: [text("label", "Label"), iconField()]
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
            { label: "Year", value: "year" }
          ]
        }
      ]
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
        stringList("tags", "Tags")
      ]
    }
  ]
};
var about = {
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
        textarea("description", "Description")
      ]
    }
  ]
};
var services = {
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
        stringList("items", "Service Items")
      ]
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
        text("focusLabel", "Focus Label")
      ]
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
        text("imageLabel", "Image Caption")
      ]
    }
  ]
};
var servicePage = {
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
    textarea("noticeText", "Notice Text", "Coming-soon pages only.")
  ]
};
var saasProducts = {
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
      fields: [text("title", "Title"), textarea("description", "Description")]
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
      fields: [text("title", "Title"), textarea("text", "Text"), iconField()]
    },
    text("deliveryLabel", "Delivery Label"),
    text("deliveryHeading", "Delivery Heading"),
    stringList("phases", "Delivery Phases")
  ]
};
var pricing = {
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
      description: "Upload a WEBP, PNG, or JPG hero image. Used when no pasted image URL is provided."
    },
    text(
      "heroBackgroundImageUrl",
      "Hero Background Image URL",
      "Optional external image URL. If filled, this takes priority over the uploaded image."
    ),
    text("sectionLabel", "Section Label"),
    text("sectionHeading", "Section Heading"),
    textarea("sectionSubtext", "Section Subtext"),
    {
      type: "object",
      name: "pricingCategories",
      label: "Shared Service Pricing",
      description: "Single source of truth for homepage pricing cards and the full pricing page. Edit packages, prices, features, CTAs, and monthly care plans here.",
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.label || "Service"} pricing` }) },
      fields: [
        { type: "string", name: "label", label: "Tab Label", required: true },
        text(
          "slug",
          "Tab Slug",
          "Lowercase identifier, e.g. social-media-marketing, websites, branding, ai-integrations-automations"
        ),
        {
          type: "object",
          name: "plans",
          label: "Packages",
          description: "These packages render as homepage cards and pricing page rows. Care plans inside each package render as monthly maintenance pricing.",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: `${item?.label ? `${item.label} \u2014 ` : ""}${item?.name || "Package"}${item?.price ? ` (${item.price})` : ""}`
            })
          },
          fields: pricingPlanFields
        },
        {
          type: "object",
          name: "carePlans",
          label: "Pricing Page Care Plans",
          description: "Fallback monthly care rows shown on the full pricing page when a package does not define its own care plan.",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: `${item?.title || "Care plan"}${item?.price ? ` (${item.price})` : ""}`
            })
          },
          fields: pricingCarePlanFields
        },
        {
          type: "object",
          name: "addOns",
          label: "Pricing Page Add-ons",
          description: "Common additional-cost rows shown below packages on the full pricing page.",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: `${item?.label || "Add-on"}${item?.price ? ` (${item.price})` : ""}`
            })
          },
          fields: pricingAddOnFields
        }
      ]
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
        textarea("addOnsDescription", "Add-ons Description")
      ]
    }
  ]
};
var testimonials = {
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
          ui: { component: "textarea" }
        },
        { type: "string", name: "name", label: "Client Name", required: true },
        { type: "string", name: "role", label: "Role / Title", required: true },
        text("company", "Company")
      ]
    }
  ]
};
var faq = {
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
        textarea("answer", "Answer")
      ]
    }
  ]
};
var projects = {
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
        text("notFoundCtaLabel", "Not Found Link Label")
      ]
    }
  ]
};
var bookCall = {
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
      fields: [text("title", "Title"), textarea("description", "Description"), iconField()]
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
        text("projectCtaLabel", "Start a Project Button Label")
      ]
    }
  ]
};
var startProject = {
  name: "startProject",
  label: "Start a Project Page",
  fields: [
    seoField,
    {
      type: "object",
      name: "steps",
      label: "Step Headings",
      description: "Keep five steps in this order: service, package, project questions, contact details, review. Questionnaire options live in src/lib/project-brief.ts.",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Step" }) },
      fields: [
        text("label", "Progress Label", "Short name shown in the progress bar."),
        text("title", "Title"),
        textarea("intro", "Intro")
      ]
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
        textarea("errorMessage", "Submission Error Message")
      ]
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
        text("homeCtaLabel", "Home Button Label")
      ]
    }
  ]
};
var walkthrough = {
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
      fields: [text("label", "Label"), iconField()]
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
        iconField()
      ]
    },
    text("closingHeading", "Closing Heading"),
    textarea("closingDescription", "Closing Description"),
    text("closingCtaLabel", "Closing Button Label")
  ]
};
var legal = {
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
        textarea("body", "Body")
      ]
    }
  ]
};
var notFound = {
  name: "notFound",
  label: "404 Page",
  fields: [
    text("heading", "Heading"),
    textarea("description", "Description"),
    text("ctaLabel", "Button Label")
  ]
};
var getPageRoute = (breadcrumbs) => {
  const path = breadcrumbs.join("/");
  if (path === "home") return "/";
  if (path === "not-found") return "/404";
  if (path.endsWith("/index")) return `/${path.slice(0, -"/index".length)}`;
  return `/${path}`;
};
var pagesCollection = {
  name: "page",
  label: "Pages",
  path: "content/pages",
  format: "json",
  ui: {
    router: ({ document }) => getPageRoute(document._sys.breadcrumbs),
    allowedActions: { create: false, delete: false }
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
    notFound
  ]
};

// tina/collections/project.ts
var projectCollection = {
  name: "project",
  label: "Projects",
  path: "content/projects",
  format: "json",
  ui: {
    router: ({ document }) => `/project/${document.slug || document._sys.filename}`,
    filename: {
      readonly: false,
      slugify: (values) => (values?.title || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "slug",
      label: "Slug",
      description: "URL-friendly identifier (e.g. 'my-project'). Used in /project/<slug>",
      required: true
    },
    {
      type: "string",
      name: "category",
      label: "Categories",
      description: "Select up to 3 categories",
      required: true,
      list: true,
      options: [
        "Web Design",
        "Branding",
        "Development",
        "Product Design",
        "UI/UX Design",
        "Mobile App",
        "Social Media Management"
      ],
      ui: {
        validate: (value) => {
          if (!value || value.length === 0)
            return "At least one category is required";
          if (value.length > 3) return "Maximum 3 categories allowed";
        }
      }
    },
    {
      type: "string",
      name: "techStack",
      label: "Tech Stack",
      description: "Select technologies used in this project",
      list: true,
      options: [
        "React JS",
        "Next JS",
        "MongoDB",
        "Laravel",
        "HTML 5",
        "CSS 3",
        "Javascript",
        "Java",
        "Figma",
        "SEO",
        "Node.js",
        "MySQL",
        "UI/UX",
        "Logo Design",
        "Marketing",
        "Analytics",
        "Webdesign"
      ]
    },
    {
      type: "string",
      name: "image",
      label: "Featured Image URL",
      description: "Paste a Dropbox share link and change '?dl=0' to '?raw=1' (e.g. https://www.dropbox.com/s/xxx/image.jpg?raw=1). Do NOT use the 'previews.dropbox.com' URL \u2014 that link expires."
    },
    { type: "string", name: "year", label: "Year", required: true },
    {
      type: "string",
      name: "role",
      label: "Our Role",
      description: "e.g. Design & Development. Leave empty to use the default from the Projects page."
    },
    {
      type: "number",
      name: "order",
      label: "Display Order",
      description: "Lower numbers appear first"
    },
    {
      type: "boolean",
      name: "featuredOnHome",
      label: "Show on Homepage",
      description: "Check to display this project in the Homepage. Only up to 4 will be shown."
    },
    {
      type: "string",
      name: "description",
      label: "Short Description",
      required: true,
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "fullDescription",
      label: "Full Description",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "overview",
      label: "Overview",
      description: "Project detail section: Overview. This title is shown on the project detail page.",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "overviewImage",
      label: "Overview Image URL",
      description: "Optional image for the Overview section. Paste a Dropbox share link with '?raw=1' or another image URL."
    },
    {
      type: "string",
      name: "challenge",
      label: "The Challenge",
      description: "Project detail section: The Challenge. This title is shown on the project detail page.",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "challengeImage",
      label: "The Challenge Image URL",
      description: "Optional image for The Challenge section. Paste a Dropbox share link with '?raw=1' or another image URL."
    },
    {
      type: "string",
      name: "strategy",
      label: "The Strategy",
      description: "Project detail section: The Strategy. This title is shown on the project detail page.",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "strategyImage",
      label: "The Strategy Image URL",
      description: "Optional image for The Strategy section. Paste a Dropbox share link with '?raw=1' or another image URL."
    },
    {
      type: "string",
      name: "solution",
      label: "The Solution",
      description: "Project detail section: The Solution. This title is shown on the project detail page.",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "solutionImage",
      label: "The Solution Image URL",
      description: "Optional image for The Solution section. Paste a Dropbox share link with '?raw=1' or another image URL."
    },
    {
      type: "string",
      name: "gallery",
      label: "Gallery Image URLs",
      description: "Paste Dropbox share links with '?raw=1' appended, one per entry (e.g. https://www.dropbox.com/s/xxx/image.jpg?raw=1). Do NOT use 'previews.dropbox.com' URLs.",
      list: true
    },
    {
      type: "string",
      name: "siteUrl",
      label: "Live Site URL",
      description: "Link to the live project (e.g. https://example.com)"
    }
  ]
};

// tina/collections/site-settings.ts
var siteSettingsCollection = {
  name: "siteSettings",
  label: "Site Settings",
  path: "content/site",
  format: "json",
  match: { include: "settings" },
  ui: {
    router: () => "/",
    allowedActions: { create: false, delete: false }
  },
  fields: [
    // ─── Contact ───
    { type: "string", name: "email", label: "Email", required: true },
    { type: "string", name: "phone", label: "Phone", required: true },
    text("phoneLink", "Phone Link", "e.g. tel:+23057099969"),
    textarea("address", "Address"),
    text("copyright", "Copyright Text"),
    text("contactHeadingLine1", "Footer Heading Line 1"),
    text("contactHeadingLine2", "Footer Heading Line 2 (muted)"),
    text("scrollText", "Scroll Circle Text"),
    text("loaderMotto", "Loader Motto"),
    {
      type: "object",
      name: "socials",
      label: "Social Links",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.name || "Social link" }) },
      fields: [
        { type: "string", name: "name", label: "Name", required: true },
        { type: "string", name: "url", label: "URL", required: true },
        { type: "boolean", name: "openInNewTab", label: "Open in new tab" }
      ]
    },
    // ─── Newsletter ───
    text("newsletterLabel", "Newsletter Label"),
    text("newsletterHeading", "Newsletter Popup Heading"),
    textarea("newsletterDescription", "Newsletter Popup Description"),
    text("newsletterButtonLabel", "Newsletter Button Label"),
    text("newsletterConsent", "Newsletter Consent Copy"),
    text("footerNewsletterHeading", "Footer Newsletter Heading"),
    textarea("footerNewsletterDescription", "Footer Newsletter Description"),
    text("newsletterSuccessHeading", "Newsletter Success Heading"),
    textarea("newsletterSuccessDescription", "Newsletter Success Description"),
    // ─── Navigation ───
    {
      type: "object",
      name: "navigation",
      label: "Navigation",
      fields: [
        text("ctaLabel", "Booking Button Label"),
        text("ctaShortLabel", "Booking Button Label (tablet)"),
        {
          type: "object",
          name: "links",
          label: "Menu Links",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label || "Link" }) },
          fields: [
            { type: "string", name: "label", label: "Label", required: true },
            { type: "string", name: "href", label: "URL", required: true },
            {
              type: "string",
              name: "activePaths",
              label: "Also Active On",
              description: "Extra path prefixes that highlight this link, e.g. /project.",
              list: true
            },
            {
              type: "boolean",
              name: "hasServicesMenu",
              label: "Opens Services Menu"
            },
            { type: "boolean", name: "showOnDesktop", label: "Show on Desktop" },
            { type: "boolean", name: "showOnMobile", label: "Show in Mobile Menu" }
          ]
        },
        {
          type: "object",
          name: "servicesMenu",
          label: "Services Menu",
          fields: [
            text("label", "Label"),
            text("heading", "Heading"),
            textarea("description", "Description"),
            text("overviewLabel", "Overview Link Label"),
            text("overviewDescription", "Overview Link Description"),
            {
              type: "object",
              name: "items",
              label: "Services",
              list: true,
              ui: { itemProps: (item) => ({ label: item?.label || "Service" }) },
              fields: [
                { type: "string", name: "label", label: "Label", required: true },
                { type: "string", name: "href", label: "URL", required: true },
                text("description", "Description"),
                iconField()
              ]
            }
          ]
        },
        text("mobileTranslateLabel", "Mobile Menu Translate Label"),
        text("mobileConnectLabel", "Mobile Menu Connect Label")
      ]
    },
    // ─── Footer ───
    {
      type: "object",
      name: "footer",
      label: "Footer",
      fields: [
        text("label", "Label"),
        text("ctaLabel", "Booking Button Label"),
        text("reachUsLabel", "Reach Us Heading"),
        text("exploreLabel", "Explore Heading"),
        linkListField("exploreLinks", "Explore Links"),
        text("servicesLabel", "Services Heading"),
        linkListField("serviceLinks", "Service Links"),
        text("followLabel", "Follow Heading")
      ]
    },
    linkListField("footerLinks", "Legal Links"),
    // ─── Open Slot CTA ───
    {
      type: "object",
      name: "projectCta",
      label: "Open Slot CTA",
      description: "The booking banner repeated on the home, about, and projects pages.",
      fields: [
        text("imageLabel", "Image Caption"),
        text("slotLabel", "Slot Label", "Shown before the slot number, e.g. Open Slot 01."),
        textarea("heading", "Heading"),
        textarea("description", "Description"),
        text("ctaLabel", "Button Label")
      ]
    },
    // ─── Team ───
    {
      type: "object",
      name: "team",
      label: "Team",
      description: "Shown on the home and about pages.",
      fields: [
        text("heading", "Heading"),
        textarea("description", "Description"),
        {
          type: "object",
          name: "members",
          label: "Members",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name || "New Team Member" }) },
          fields: [
            { type: "string", name: "name", label: "Name", required: true },
            { type: "string", name: "role", label: "Role", required: true },
            text("image", "Photo URL", "Local path such as /assets/img/team/name.jpg or a full image URL."),
            textarea("bio", "Bio"),
            { type: "number", name: "order", label: "Display Order" }
          ]
        }
      ]
    },
    // ─── Cookies ───
    {
      type: "object",
      name: "cookies",
      label: "Cookie Banner & Settings",
      fields: [
        text("bannerLabel", "Banner Label"),
        text("bannerHeading", "Banner Heading"),
        textarea("bannerDescription", "Banner Description"),
        text("settingsButtonLabel", "Banner Settings Button"),
        text("rejectButtonLabel", "Banner Reject Button"),
        text("acceptButtonLabel", "Banner Accept Button"),
        text("triggerLabel", "Footer Cookie Settings Link"),
        text("panelLabel", "Panel Label"),
        text("panelHeading", "Panel Heading"),
        textarea("panelDescription", "Panel Description"),
        text("necessaryTitle", "Necessary Cookies Title"),
        textarea("necessaryDescription", "Necessary Cookies Description"),
        text("alwaysOnLabel", "Always On Badge"),
        text("analyticsTitle", "Analytics Cookies Title"),
        textarea("analyticsDescription", "Analytics Cookies Description"),
        text("analyticsOnLabel", "Analytics On Button"),
        text("analyticsOffLabel", "Analytics Off Button"),
        text("cancelLabel", "Cancel Button"),
        text("rejectOptionalLabel", "Reject Optional Button"),
        text("saveLabel", "Save Button")
      ]
    },
    // ─── Partners ───
    {
      type: "object",
      name: "partners",
      label: "Trusted Partners",
      description: "Partner strip on the home page and the partner section on the about page.",
      fields: [
        text("partnersLabel", "Section Label"),
        text("trustHeading", "Heading"),
        textarea("trustDescription", "Description"),
        text("ctaLabel", "Button Label"),
        {
          type: "object",
          name: "proofPoints",
          label: "Proof Points",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label || "Proof point" }) },
          fields: [text("value", "Value"), text("label", "Label")]
        },
        {
          type: "object",
          name: "partners",
          label: "Partners",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name || "Partner" }) },
          fields: [
            { type: "string", name: "name", label: "Name", required: true },
            text("url", "Website URL", "Link to the partner's website (e.g. https://example.com)")
          ]
        }
      ]
    }
  ]
};

// tina/config.ts
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || "94cff29e-b158-496c-b456-9850440a0fb9",
  token: process.env.TINA_TOKEN || "effdd5b419c83677e081c08c90c3a1dee3d7b399",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    // Sidebar order: every page, then global settings, then case studies.
    collections: [pagesCollection, siteSettingsCollection, projectCollection]
  }
});
export {
  config_default as default
};
