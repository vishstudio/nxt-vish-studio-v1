/**
 * Icon names editors can choose in TinaCMS. Kept free of React imports so
 * `tina/config.ts` can share the same list; `src/lib/icons.ts` maps each name
 * to its Lucide component.
 */
export const ICON_NAMES = [
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
  "chart",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
