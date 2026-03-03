/**
 * TinaCMS Visual Editing Hooks — barrel re-export
 *
 * Each hook lives in its own file under ./tina/.
 * Import from this file as before:
 *   import { useTinaHome, useTinaAbout } from '../hooks/useTinaVisualEditing';
 */

export { useTinaHome } from "./tina/useTinaHome";
export { useTinaAbout } from "./tina/useTinaAbout";
export { useTinaServices } from "./tina/useTinaServices";
export { useTinaContact } from "./tina/useTinaContact";
export { useTinaSettings } from "./tina/useTinaSettings";
export { useTinaPartners } from "./tina/useTinaPartners";
export { useTinaPricing } from "./tina/useTinaPricing";
export {
  useTinaProjectDetail,
  useTinaProjectsList,
} from "./tina/useTinaProjects";
export { rawTinaField as tinaField } from "./tina/core";
