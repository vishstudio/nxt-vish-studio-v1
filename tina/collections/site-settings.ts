import type { Collection } from "tinacms";
import { iconField, linkListField, text, textarea } from "../fields";

/**
 * Global values shared across every page: contact details, navigation,
 * footer, newsletter, team, partners, and the reusable "Open Slot" CTA.
 */
export const siteSettingsCollection: Collection = {
  name: "siteSettings",
  label: "Site Settings",
  path: "content/site",
  format: "json",
  match: { include: "settings" },
  ui: {
    router: () => "/",
    allowedActions: { create: false, delete: false },
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
        { type: "boolean", name: "openInNewTab", label: "Open in new tab" },
      ],
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
              list: true,
            },
            {
              type: "boolean",
              name: "hasServicesMenu",
              label: "Opens Services Menu",
            },
            { type: "boolean", name: "showOnDesktop", label: "Show on Desktop" },
            { type: "boolean", name: "showOnMobile", label: "Show in Mobile Menu" },
          ],
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
                iconField(),
              ],
            },
          ],
        },
        text("mobileTranslateLabel", "Mobile Menu Translate Label"),
        text("mobileConnectLabel", "Mobile Menu Connect Label"),
      ],
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
        text("followLabel", "Follow Heading"),
      ],
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
        text("ctaLabel", "Button Label"),
      ],
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
            { type: "number", name: "order", label: "Display Order" },
          ],
        },
      ],
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
        text("saveLabel", "Save Button"),
      ],
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
          fields: [text("value", "Value"), text("label", "Label")],
        },
        {
          type: "object",
          name: "partners",
          label: "Partners",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name || "Partner" }) },
          fields: [
            { type: "string", name: "name", label: "Name", required: true },
            text("url", "Website URL", "Link to the partner's website (e.g. https://example.com)"),
          ],
        },
      ],
    },
  ],
};
