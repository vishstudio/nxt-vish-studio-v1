'use client';
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTinaHome } from '../hooks/useTinaVisualEditing';
import { SectionTitle } from './ui/SectionTitle';

export const Process = () => {
  const { data: content, tinaField } = useTinaHome();
  const steps = content.processSteps;

  const targetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // Use a ref (not state) so useTransform always reads the live value without
  // causing MotionValue recreation / stale-closure issues on re-render.
  const scrollRangeRef = useRef(0);

  useEffect(() => {
    const updateScrollRange = () => {
      if (contentRef.current && contentRef.current.parentElement) {
        const fullWidth = contentRef.current.scrollWidth;
        const visibleWidth = contentRef.current.parentElement.clientWidth;
        scrollRangeRef.current = Math.max(0, fullWidth - visibleWidth);
      }
    };

    updateScrollRange();
    const tm = setTimeout(updateScrollRange, 200);
    window.addEventListener('resize', updateScrollRange);
    return () => {
      window.removeEventListener('resize', updateScrollRange);
      clearTimeout(tm);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Reads scrollRangeRef.current at interpolation time — no stale closure.
  const x = useTransform(scrollYProgress, (v) => `${-v * scrollRangeRef.current}px`);
  const smoothX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 });
  const progressScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  // Card wrapper: no own animation — only orchestrates stagger timing for children
  const cardVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };
  const descVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  // Shared card content
  const cardInner = (step: typeof steps[number]) => (
    <>
      <div className="absolute inset-0 bg-linear-to-b from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex justify-between items-start mb-auto relative z-10">
        <motion.span
          variants={descVariants}
          className="font-mono text-6xl lg:text-7xl text-white/10 font-bold group-hover:text-vish-accent/20 transition-colors duration-500"
        >
          {step.num}
        </motion.span>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-vish-accent group-hover:border-vish-accent transition-all duration-300">
          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-black -rotate-45 group-hover:rotate-0 transition-all duration-300" />
        </div>
      </div>
      <div className="relative z-10">
        <motion.h3
          variants={textVariants}
          className="font-display text-4xl xl:text-5xl text-white mb-4 lg:mb-6 group-hover:translate-x-2 transition-transform duration-500"
        >
          {step.title}
        </motion.h3>
        <motion.p
          variants={descVariants}
          className="font-sans text-sm lg:text-base xl:text-lg text-gray-400 leading-relaxed mb-6 lg:mb-8 group-hover:text-gray-300 transition-colors"
        >
          {step.description}
        </motion.p>
        <motion.div variants={descVariants} className="flex flex-wrap gap-2">
          {step.tags && step.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white/40 group-hover:border-vish-accent/30 group-hover:text-vish-accent transition-all duration-500 delay-75">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </>
  );

  // Mobile: card is static, text animates in as card scrolls into view
  const renderMobileCard = (step: typeof steps[number], index: number) => (
    <motion.div
      key={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative flex flex-col w-full min-h-[340px] p-8 bg-[#0A0A0A] border border-white/5 hover:border-vish-accent/40 rounded-3xl transition-colors duration-500 overflow-hidden"
    >
      {cardInner(step)}
    </motion.div>
  );

  // Desktop: card is static, text animates in on mount with per-card delay offset
  const renderDesktopCard = (step: typeof steps[number], index: number) => (
    <motion.div
      key={index}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 + index * 0.15 } },
      }}
      initial="hidden"
      animate="visible"
      className="group relative flex flex-col shrink-0 w-[44vw] lg:w-[30vw] xl:w-[22vw] min-h-[420px] lg:aspect-[3/4] p-8 lg:p-10 bg-[#0A0A0A] border border-white/5 hover:border-vish-accent/40 rounded-3xl transition-colors duration-500 overflow-hidden"
    >
      {cardInner(step)}
    </motion.div>
  );

  return (
    <>
      {/* ── Mobile: vertical one-by-one cards ── */}
      <section className="md:hidden bg-vish-bg py-24 px-6" id="process">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <SectionTitle size="lg" className="mb-4" tinaField={tinaField('processHeading')}>
            {content.processHeading}
          </SectionTitle>
          <p className="font-sans text-xs text-gray-400 font-mono tracking-widest uppercase" data-tina-field={tinaField('processSubtext')}>
            {content.processSubtext}
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {steps.map((step, index) => renderMobileCard(step, index))}
        </div>
      </section>

      {/* ── Desktop: sticky horizontal scroll ── */}
      <section ref={targetRef} className="hidden md:block relative h-[300vh] bg-vish-bg" id="process-desktop">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-vish-accent/5 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl opacity-10" />
          </div>

          <div className="w-full h-full max-w-[1400px] mx-auto relative z-10">

            <div className="absolute top-0 left-0 bottom-0 w-[40%] flex flex-col justify-center px-12 z-10 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <SectionTitle size="lg" className="mb-4" tinaField={tinaField('processHeading')}>
                  {content.processHeading}
                </SectionTitle>
                <p className="font-sans text-sm text-gray-400 font-mono tracking-widest uppercase" data-tina-field={tinaField('processSubtext')}>
                  {content.processSubtext}
                </p>
              </motion.div>
            </div>

            <div className="w-full h-full flex items-center relative z-20 pointer-events-none">
              <motion.div
                ref={contentRef}
                style={{ x: smoothX }}
                className="flex gap-8 items-center pointer-events-auto pl-[48vw] lg:pl-[45vw]"
              >
                {steps.map((step, index) => renderDesktopCard(step, index))}
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-12 left-0 right-0 px-12 z-20 pointer-events-none max-w-[1400px] mx-auto w-full">
            <div className="w-full h-px bg-white/10 relative">
              <motion.div
                style={{ scaleX: progressScale }}
                className="absolute inset-0 bg-vish-accent origin-left"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
