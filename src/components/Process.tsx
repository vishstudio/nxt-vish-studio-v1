import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const steps = [
  {
    num: "01",
    title: "Discovery",
    description: "We dive deep into your business objectives, understanding your audience and challenges to build a solid foundation."
  },
  {
    num: "02",
    title: "Strategy",
    description: "Based on our findings, we develop a comprehensive roadmap that aligns with your business goals and user needs."
  },
  {
    num: "03",
    title: "Design",
    description: "We craft visually stunning and intuitive interfaces that reflect your brand identity while maximizing user engagement."
  },
  {
    num: "04",
    title: "Development",
    description: "Our engineering team brings the designs to life using cutting-edge technologies, ensuring performance and scalability."
  },
  {
    num: "05",
    title: "Launch",
    description: "We handle the deployment process with precision, ensuring a smooth transition and providing ongoing support for growth."
  }
];

export const Process = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    // Measure the total width of content vs the visible container width
    const updateScrollRange = () => {
      if (contentRef.current && contentRef.current.parentElement) {
        const fullWidth = contentRef.current.scrollWidth;
        const visibleWidth = contentRef.current.parentElement.clientWidth;
        // Scroll range is total content width minus visible area
        // Add padding to ensure the last item is fully viewable
        const range = fullWidth - visibleWidth + 48;
        setScrollRange(range > 0 ? range : 0);
      }
    };

    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Use a spring for smoother scrolling feel
  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.8 });

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-vish-bg" id="process">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Sticky Header - Fixed Position Background */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 pointer-events-none z-0">
          <div className="w-full md:w-[35%] lg:w-[30%]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 md:mb-8">
                Our <br />Process<span className="text-vish-accent">.</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-gray-400 leading-relaxed max-w-sm">
                We follow a proven methodology to deliver exceptional digital products, from initial concept to final launch.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scrolling Cards - Foreground Layer */}
        <div className="w-full h-full flex items-center overflow-hidden pointer-events-none">
          <motion.div
            ref={contentRef}
            style={{ x: smoothX }}
            className="flex gap-6 md:gap-8 items-center h-full relative z-10"
          >
            {/* Spacer to position start of cards correctly relative to header */}
            <div className="w-[85vw] md:w-[40vw] shrink-0" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative flex flex-col shrink-0 h-[40vh] min-h-[300px] w-[70vw] md:w-[30vw] lg:w-[22vw] p-6 md:p-8 bg-[#050505] border border-white/10 hover:border-vish-accent/50 transition-all duration-500 pointer-events-auto rounded-3xl"
              >
                <div className="w-full flex justify-between items-start border-b border-white/5 pb-4 mb-8">
                  <span className="font-mono text-xs md:text-sm text-vish-accent tracking-widest">
                    /{step.num}
                  </span>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-display text-3xl md:text-4xl text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {/* End spacing */}
            <div className="w-[5vw] shrink-0"></div>
          </motion.div>
        </div >
      </div >
    </section >
  );
};
