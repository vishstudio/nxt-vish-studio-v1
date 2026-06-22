export const PROJECT_INQUIRY_HREF = '/start-project';
export const PROJECT_INQUIRY_ARIA_LABEL = 'Start a project inquiry with VISH Studio';
export const PROJECT_INQUIRY_ACTION = 'project_inquiry_start';
export const PROJECT_INQUIRY_MODAL_EVENT = 'vish:open-project-inquiry';

export function openProjectInquiryModal() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(PROJECT_INQUIRY_MODAL_EVENT));
}
