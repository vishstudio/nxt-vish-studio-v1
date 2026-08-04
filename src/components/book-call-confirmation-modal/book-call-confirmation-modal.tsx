"use client";

import { ArrowRight, CalendarDays, Check, Mail, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { Button } from "../ui/button/button";

interface BookCallConfirmationModalProps {
  isOpen: boolean;
  bookingId: string;
  selectedDate: string;
  selectedTime: string;
  email: string;
  onClose: () => void;
}

function formatDisplayTime(value: string) {
  const [hour, minute] = value.split(":");
  return minute === "00" ? `${Number(hour)}h` : `${Number(hour)}h${minute}`;
}

export const BookCallConfirmationModal = ({
  isOpen,
  bookingId,
  selectedDate,
  selectedTime,
  email,
  onClose,
}: BookCallConfirmationModalProps) => {
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
            aria-labelledby="book-call-confirmation-title"
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
              ariaLabel="Close call booking confirmation"
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
                  Booking request received
                </p>
                <h2
                  id="book-call-confirmation-title"
                  className="font-display text-4xl font-medium leading-tight text-white md:text-5xl"
                >
                  Your free call request has been received
                  <span className="text-vish-accent">.</span>
                </h2>
                <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                  We received your selected slot and will email the calendar invite with the
                  Google Meet link to <span className="text-white">{email}</span>{" "}
                  shortly.
                </p>

                <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                        Selected slot
                      </p>
                      <p className="mt-2 font-sans text-sm font-medium text-white">
                        {selectedDate} at {formatDisplayTime(selectedTime)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="mt-1 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                        Reference
                      </p>
                      <p className="mt-2 break-all font-mono text-xs text-white">
                        {bookingId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/" variant="cta" size="md">
                    Back to home
                  </Button>
                  <Button
                    href="/start-project"
                    variant="outline"
                    size="md"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Start a Project
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
