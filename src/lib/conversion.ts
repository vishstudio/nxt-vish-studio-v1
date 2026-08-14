export const PROJECT_INQUIRY_HREF = '/book-call';
export const PROJECT_INQUIRY_ARIA_LABEL = 'Schedule a free call with VISH Studio';
export const PROJECT_INQUIRY_ACTION = 'book_free_call_start';
export const PROJECT_INQUIRY_MODAL_EVENT = 'vish:open-project-inquiry';

export function openProjectInquiryModal() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(PROJECT_INQUIRY_MODAL_EVENT));
}
