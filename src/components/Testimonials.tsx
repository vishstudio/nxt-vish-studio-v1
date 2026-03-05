'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useTinaTestimonials } from '../hooks/useTinaVisualEditing';
import { SectionTitle } from './ui/SectionTitle';

export const Testimonials = () => {
  const { data: content, tinaField } = useTinaTestimonials();
  const testimonials = content.testimonials ?? [];
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const dragStart = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setActive(i => (i + dir + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Reset and restart the 5-second auto-advance timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (testimonials.length > 1) {
      timerRef.current = setInterval(() => go(1), 5000);
    }
  }, [go, testimonials.length]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  if (!testimonials.length) return null;

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.3 } }),
  };

  const t = testimonials[active];

  return (
    <section className="py-32 px-6 md:px-12 bg-vish-bg overflow-hidden" id="testimonials">
      <div className="max-w-350 mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle size="lg" tinaField={tinaField('heading')}>
              {content.heading || 'Client Testimonials'}
            </SectionTitle>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mt-3" data-tina-field={tinaField('subtext')}>
              {content.subtext}
            </p>
          </motion.div>

          {/* Nav arrows */}
          {testimonials.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => { go(-1); resetTimer(); }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-vish-accent hover:text-vish-accent transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => { go(1); resetTimer(); }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-vish-accent hover:text-vish-accent transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 ml-2 font-mono text-sm text-gray-400 hover:text-vish-accent transition-colors duration-300 group"
              >
                View All
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          )}
        </div>

        {/* Card */}
        <div
          className="relative overflow-hidden"
          onPointerDown={e => { dragStart.current = e.clientX; }}
          onPointerUp={e => {
            const delta = dragStart.current - e.clientX;
            if (Math.abs(delta) > 50) { go(delta > 0 ? 1 : -1); resetTimer(); }
          }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start"
            >
              {/* Quote block */}
              <div className="lg:col-span-8">
                <Quote className="w-10 h-10 text-vish-accent mb-8 opacity-80" />
                <blockquote
                  className="font-display text-2xl md:text-3xl lg:text-4xl text-white leading-snug"
                  data-tina-field={tinaField('testimonials')}
                >
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Author block */}
              <div className="lg:col-span-4 flex flex-col justify-end lg:pt-24">
                <div className="border-t border-white/10 pt-6">
                  <p className="font-display text-xl text-white mb-1">{t.name}</p>
                  <p className="font-mono text-sm text-vish-accent">{t.role}</p>
                  {t.company && (
                    <p className="font-mono text-sm text-gray-500 mt-0.5">{t.company}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="flex gap-2 mt-14">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); resetTimer(); }}
                className={`h-px transition-all duration-300 ${i === active ? 'w-10 bg-vish-accent' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
