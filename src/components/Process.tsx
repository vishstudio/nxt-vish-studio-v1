import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Discovery",
    description: "We dive deep into your business objectives, understanding your audience and challenges to build a solid foundation.",
    tags: ["Research", "Audit", "Insights"]
  },
  {
    num: "02",
    title: "Strategy",
    description: "Based on our findings, we develop a comprehensive roadmap that aligns with your business goals and user needs.",
    tags: ["Planning", "UX Arch", "Roadmap"]
  },
  {
    num: "03",
    title: "Design",
    description: "We craft visually stunning and intuitive interfaces that reflect your brand identity while maximizing user engagement.",
    tags: ["UI", "Interaction", "Motion"]
  },
  {
    num: "04",
    title: "Development",
    description: "Our engineering team brings the designs to life using cutting-edge technologies, ensuring performance and scalability.",
    tags: ["Frontend", "Backend", "QA"]
  },
  {
    num: "05",
    title: "Launch",
    description: "We handle the deployment process with precision, ensuring a smooth transition and providing ongoing support for growth.",
    tags: ["Deploy", "Monitor", "Scale"]
  }
];

export const Process = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateScrollRange = () => {
      if (contentRef.current && contentRef.current.parentElement) {
        const fullWidth = contentRef.current.scrollWidth;
        const visibleWidth = contentRef.current.parentElement.clientWidth;
        setViewportWidth(visibleWidth);
        const range = fullWidth - visibleWidth + visibleWidth * 0.1; // Add visual padding
        setScrollRange(range > 0 ? range : 0);
      }
    };

    updateScrollRange();
    // Allow time for layout to settle
    const tm = setTimeout(updateScrollRange, 100);
    window.addEventListener('resize', updateScrollRange);
    return () => {
      window.removeEventListener('resize', updateScrollRange);
      clearTimeout(tm);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 });
  const progressScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-vish-bg" id="process">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-vish-accent/5 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl opacity-10" />
        </div>

        {/* Container for Layout */}
        <div className="w-full h-full max-w-[1400px] mx-auto relative z-10">

          {/* Title Section - Fixed Layer */}
          <div className="absolute top-0 left-0 bottom-0 w-full md:w-[40%] flex flex-col justify-center px-6 md:px-12 z-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-4">
                Our Process<span className="text-vish-accent">.</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-400 font-mono tracking-widest uppercase">
                From concept to completion
              </p>
            </motion.div>
          </div>

          {/* Cards Section - Rolling Layer */}
          <div className="w-full h-full flex items-center relative z-20 pointer-events-none">
            <motion.div
              ref={contentRef}
              style={{ x: smoothX }}
              className="flex gap-6 md:gap-8 items-center pointer-events-auto pl-[85vw] md:pl-[45vw]"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ margin: "-100px" }}
                  className="group relative flex flex-col shrink-0 w-[85vw] sm:w-[60vw] md:w-[28vw] lg:w-[22vw] aspect-[4/5] md:aspect-[3/4] p-6 sm:p-8 md:p-10 bg-[#0A0A0A] border border-white/5 hover:border-vish-accent/40 rounded-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Decoration Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex justify-between items-start mb-auto relative z-10">
                    <span className="font-mono text-5xl sm:text-6xl md:text-7xl text-white/10 font-bold group-hover:text-vish-accent/20 transition-colors duration-500">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-vish-accent group-hover:border-vish-accent transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-black -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4 md:mb-6 group-hover:translate-x-2 transition-transform duration-500">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-6 md:mb-8 group-hover:text-gray-300 transition-colors">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {step.tags && step.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white/40 group-hover:border-vish-accent/30 group-hover:text-vish-accent transition-all duration-500 delay-75">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-12 left-0 right-0 px-6 md:px-12 z-20 pointer-events-none max-w-[1400px] mx-auto w-full">
          <div className="w-full h-px bg-white/10 relative">
            <motion.div
              style={{ scaleX: progressScale }}
              className="absolute inset-0 bg-vish-accent origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
