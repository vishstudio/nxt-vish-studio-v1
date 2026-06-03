'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '../ui/button/button';
import { PROJECT_INQUIRY_MODAL_EVENT } from '../../lib/conversion';

export type ProjectType =
  | 'Custom Web Application'
  | 'High-Performance Website'
  | 'Brand Architecture & Design';

export type Timeline = 'Urgent: Under 1 Month' | 'Standard: 2-3 Months' | 'Flexible';

export type BudgetTier = '$5,000 - $10,000' | '$10,000 - $25,000' | '$25,000+';

export interface ProjectInquiryFormState {
  projectType: ProjectType | '';
  timeline: Timeline | '';
  budgetTier: BudgetTier | '';
  name: string;
  companyName: string;
  contactEmail: string;
  projectDescription: string;
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const initialFormState: ProjectInquiryFormState = {
  projectType: '',
  timeline: '',
  budgetTier: '',
  name: '',
  companyName: '',
  contactEmail: '',
  projectDescription: '',
};

const projectTypes: ProjectType[] = [
  'Custom Web Application',
  'High-Performance Website',
  'Brand Architecture & Design',
];

const timelines: Timeline[] = ['Urgent: Under 1 Month', 'Standard: 2-3 Months', 'Flexible'];

const budgetTiers: BudgetTier[] = ['$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'];

const steps = ['Project Type', 'Timeline', 'Budget', 'Client Info'];

const inputClassName =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-vish-accent/60 focus:bg-white/[0.05]';

function formatInquiryMessage(form: ProjectInquiryFormState) {
  return [
    'New project inquiry received via vish.studio',
    '',
    `Project Type: ${form.projectType}`,
    `Timeline: ${form.timeline}`,
    `Budget Tier: ${form.budgetTier}`,
    '',
    `Name: ${form.name}`,
    `Company Name: ${form.companyName}`,
    `Contact Email: ${form.contactEmail}`,
    '',
    'Brief Project Description:',
    form.projectDescription,
  ].join('\n');
}

async function submitProjectInquiry(form: ProjectInquiryFormState) {
  const subject = `New Project Inquiry - ${form.companyName}`;
  const message = formatInquiryMessage(form);
  const endpoint = process.env.NEXT_PUBLIC_PROJECT_INQUIRY_ENDPOINT;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'hello@vish.studio',
        subject,
        form,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error('Project inquiry endpoint failed.');
    }

    return;
  }

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Email service is not configured.');
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: 'hello@vish.studio',
        subject,
        company_name: form.companyName,
        client_name: form.name,
        contact_email: form.contactEmail,
        project_type: form.projectType,
        timeline: form.timeline,
        budget_tier: form.budgetTier,
        project_description: form.projectDescription,
        message,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('EmailJS submission failed.');
  }
}

export const ProjectInquiryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<ProjectInquiryFormState>(initialFormState);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isFinalStep = currentStep === steps.length - 1;

  const canProceed = useMemo(() => {
    if (currentStep === 0) return Boolean(form.projectType);
    if (currentStep === 1) return Boolean(form.timeline);
    if (currentStep === 2) return Boolean(form.budgetTier);
    return (
      form.name.trim().length > 1 &&
      form.companyName.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(form.contactEmail) &&
      form.projectDescription.trim().length > 10
    );
  }, [currentStep, form]);

  useEffect(() => {
    const openModal = () => setIsOpen(true);
    window.addEventListener(PROJECT_INQUIRY_MODAL_EVENT, openModal);
    return () => window.removeEventListener(PROJECT_INQUIRY_MODAL_EVENT, openModal);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    window.setTimeout(() => {
      setCurrentStep(0);
      setSubmissionState('idle');
      setErrorMessage('');
      setForm(initialFormState);
    }, 250);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFinalStep) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
      return;
    }

    if (!canProceed) return;

    setSubmissionState('submitting');
    setErrorMessage('');

    try {
      await submitProjectInquiry(form);
      setSubmissionState('success');
    } catch (error) {
      setSubmissionState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit inquiry.');
    }
  };

  const updateField = <Field extends keyof ProjectInquiryFormState>(
    field: Field,
    value: ProjectInquiryFormState[Field],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const renderChoiceGroup = <Value extends string>(
    field: keyof Pick<ProjectInquiryFormState, 'projectType' | 'timeline' | 'budgetTier'>,
    options: Value[],
  ) => (
    <div className="grid grid-cols-1 gap-3">
      {options.map((option) => {
        const isSelected = form[field] === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => updateField(field, option as ProjectInquiryFormState[typeof field])}
            className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
              isSelected
                ? 'border-vish-accent bg-vish-accent text-black shadow-[0_0_24px_rgba(255,214,0,0.18)]'
                : 'border-white/10 bg-white/[0.03] text-white hover:border-white/25 hover:bg-white/[0.055]'
            }`}
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-widest">
              {option}
            </span>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                isSelected ? 'border-black/20 bg-black text-vish-accent' : 'border-white/10 text-white/30'
              }`}
            >
              {isSelected && <Check className="h-3.5 w-3.5" />}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/75 px-4 py-4 backdrop-blur-sm md:items-center md:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-inquiry-title"
            className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#050505] shadow-2xl shadow-black/60"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-vish-accent/50 to-transparent" />

            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-colors hover:border-white/25 hover:text-white"
              aria-label="Close project inquiry form"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="max-h-[92vh] overflow-y-auto p-6 md:p-8">
              {submissionState === 'success' ? (
                <div className="py-12">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-vish-accent text-black">
                    <Check className="h-6 w-6" />
                  </div>
                  <h2 id="project-inquiry-title" className="font-display text-4xl leading-tight text-white md:text-5xl">
                    Inquiry Sent Successfully<span className="text-vish-accent">.</span>
                  </h2>
                  <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-gray-400">
                    We will review your project parameters within 24 hours.
                  </p>
                  <Button onClick={closeModal} variant="navigation" size="md" className="mt-10">
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-8 pr-12">
                    <p className="mb-4 font-mono text-xs uppercase tracking-widest text-vish-accent">
                      Project Inquiry / 0{currentStep + 1}
                    </p>
                    <h2 id="project-inquiry-title" className="font-display text-4xl leading-tight text-white md:text-5xl">
                      {steps[currentStep]}<span className="text-vish-accent">.</span>
                    </h2>
                    <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-gray-400 md:text-base">
                      Help us understand the project parameters so we can respond with the right strategic direction.
                    </p>
                  </div>

                  <div className="mb-8 grid grid-cols-4 gap-2" aria-hidden="true">
                    {steps.map((step, index) => (
                      <div
                        key={step}
                        className={`h-1 rounded-full transition-colors ${
                          index <= currentStep ? 'bg-vish-accent' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.25 }}
                      className="min-h-[260px]"
                    >
                      {currentStep === 0 && renderChoiceGroup('projectType', projectTypes)}
                      {currentStep === 1 && renderChoiceGroup('timeline', timelines)}
                      {currentStep === 2 && renderChoiceGroup('budgetTier', budgetTiers)}
                      {currentStep === 3 && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <input
                            className={inputClassName}
                            value={form.name}
                            onChange={(event) => updateField('name', event.target.value)}
                            placeholder="Name"
                            autoComplete="name"
                          />
                          <input
                            className={inputClassName}
                            value={form.companyName}
                            onChange={(event) => updateField('companyName', event.target.value)}
                            placeholder="Company Name"
                            autoComplete="organization"
                          />
                          <input
                            className={`${inputClassName} md:col-span-2`}
                            type="email"
                            value={form.contactEmail}
                            onChange={(event) => updateField('contactEmail', event.target.value)}
                            placeholder="Contact Email"
                            autoComplete="email"
                          />
                          <textarea
                            className={`${inputClassName} min-h-36 resize-none md:col-span-2`}
                            value={form.projectDescription}
                            onChange={(event) => updateField('projectDescription', event.target.value)}
                            placeholder="Brief Project Description"
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {submissionState === 'error' && (
                    <p className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-200">
                      {errorMessage}
                    </p>
                  )}

                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}
                      disabled={currentStep === 0 || submissionState === 'submitting'}
                      className="font-mono text-xs uppercase tracking-widest text-white/45 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30"
                    >
                      Back
                    </button>

                    <Button
                      type="submit"
                      variant="cta"
                      size="md"
                      disabled={!canProceed || submissionState === 'submitting'}
                      icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />}
                      iconPosition="right"
                      className="px-6 py-4 font-mono text-xs font-semibold uppercase tracking-widest"
                    >
                      {submissionState === 'submitting'
                        ? 'Sending'
                        : isFinalStep
                          ? 'Submit Inquiry'
                          : 'Continue'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
