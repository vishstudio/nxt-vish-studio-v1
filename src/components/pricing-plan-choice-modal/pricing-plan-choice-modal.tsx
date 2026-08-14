'use client';

import { ArrowRight, CalendarDays, FileText, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { trackButtonClick, trackPricingPlanChoice } from '@/src/lib/analytics';
import { PROJECT_INQUIRY_ACTION, PROJECT_INQUIRY_HREF } from '@/src/lib/conversion';
import { Button } from '../ui/button/button';

interface PricingPlanChoiceModalProps {
  isOpen: boolean;
  planName: string;
  onClose: () => void;
}

export const PricingPlanChoiceModal = ({
  isOpen,
  planName,
  onClose,
}: PricingPlanChoiceModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBookCall = () => {
    trackPricingPlanChoice(planName, 'book_free_call');
    trackButtonClick(PROJECT_INQUIRY_ACTION, `pricing_${planName}_book_free_call`);
  };

  const handleStartProject = () => {
    trackPricingPlanChoice(planName, 'start_project');
    trackButtonClick('pricing_start_project', `pricing_${planName}_start_project`);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/75 px-4 py-4 backdrop-blur-sm md:items-center md:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-plan-choice-title"
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-vish-bg shadow-2xl shadow-black/60"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-vish-accent/50 to-transparent" />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              ariaLabel="Close pricing choice"
              className="absolute right-5 top-5 z-10 border border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="p-6 md:p-8">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-vish-accent">
                Choose next step
              </p>
              <h2
                id="pricing-plan-choice-title"
                className="max-w-xl font-display text-4xl font-medium leading-tight text-white md:text-5xl"
              >
                How would you like to continue
                <span className="text-vish-accent">?</span>
              </h2>
              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-gray-400">
                You selected the {planName} plan. Schedule a quick strategy call if you want guidance, or start the full project brief if you already know the scope.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Button
                  href={PROJECT_INQUIRY_HREF}
                  variant="cta"
                  size="lg"
                  onClick={handleBookCall}
                  icon={<CalendarDays className="h-4 w-4" />}
                  className="min-h-16 justify-between rounded-2xl font-mono text-xs font-semibold uppercase tracking-widest"
                  ariaLabel={`Schedule a free strategy call for the ${planName} plan`}
                >
                  Schedule a Free Call
                </Button>
                <Button
                  href="/start-project"
                  variant="outline"
                  size="lg"
                  onClick={handleStartProject}
                  icon={<FileText className="h-4 w-4" />}
                  className="min-h-16 justify-between rounded-2xl font-mono text-xs font-semibold uppercase tracking-widest"
                  ariaLabel={`Start a project brief for the ${planName} plan`}
                >
                  Start a Project
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                icon={<ArrowRight className="h-4 w-4 rotate-180" />}
                iconPosition="left"
                className="mt-6 text-gray-400"
              >
                Back to pricing
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
