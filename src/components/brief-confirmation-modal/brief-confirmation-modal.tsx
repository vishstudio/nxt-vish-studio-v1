"use client";

import { getSiteSettings } from "@/src/lib/content";
import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { Button } from "../ui/button/button";

interface BriefConfirmationModalProps {
  isOpen: boolean;
  briefId: string;
  onClose: () => void;
}

const settings = getSiteSettings();

export const BriefConfirmationModal = ({
  isOpen,
  briefId,
  onClose,
}: BriefConfirmationModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

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
            aria-labelledby="brief-confirmation-title"
            className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-vish-bg shadow-2xl shadow-black/60"
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
              ariaLabel="Close brief confirmation"
              className="absolute right-5 top-5 z-10 border border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="max-h-[92vh] overflow-y-auto p-6 md:p-8">
              <div className="py-10">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-vish-accent text-black">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-vish-accent">
                  Brief submitted
                </p>
                <h2
                  id="brief-confirmation-title"
                  className="font-display text-4xl font-medium leading-tight text-white md:text-5xl"
                >
                  Your project brief has been submitted
                  <span className="text-vish-accent">.</span>
                </h2>
                <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                  We’ll review the questionnaire and contact you with the next
                  steps. Your reference is{" "}
                  <span className="text-white">{briefId}</span>.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="font-sans text-sm leading-relaxed text-gray-400">
                    Need to add more information or make a request? Contact us
                    directly:
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button
                      href={`mailto:${settings.email}`}
                      variant="outline"
                      size="sm"
                    >
                      <span className="notranslate" translate="no">
                        {settings.email}
                      </span>
                    </Button>
                    <Button
                      href={settings.phoneLink}
                      variant="outline"
                      size="sm"
                    >
                      {settings.phone}
                    </Button>
                  </div>
                </div>

                <Button href="/" variant="cta" size="md" className="mt-8">
                  Back to home
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
