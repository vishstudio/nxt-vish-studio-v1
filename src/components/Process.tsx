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
    // Measure the total width of content and subtract viewport width
    const updateScrollRange = () => {
      if (contentRef.current) {
        const fullWidth = contentRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Scroll enough to see the last item comfortably, plus a bit of padding
        const range = fullWidth - viewportWidth + (viewportWidth * 0.1);
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
    <section ref={targetRef} className="relative h-[400vh] bg-vish-bg">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={contentRef}
          style={{ x: smoothX }}
          className="flex gap-8 md:gap-12 px-6 md:px-12"
        >
          {/* Header Card */}
          <div className="flex flex-col justify-center shrink-0 w-[85vw] md:w-[40vw] lg:w-[30vw] pr-8 md:pr-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-8"
            >
              Our <br />Process<span className="text-vish-accent">.</span>
            </motion.h2>
            <p className="font-sans text-lg md:text-xl text-gray-400 leading-relaxed max-w-sm">
              We follow a proven methodology to deliver exceptional digital products, from initial concept to final launch.
            </p>
          </div>

          {/* Step Cards */}
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between shrink-0 h-[55vh] w-[80vw] md:w-[45vw] lg:w-[30vw] p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-mono text-sm text-gray-400 group-hover:border-vish-accent/50 group-hover:text-vish-accent transition-colors duration-500">
                  {step.num}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-display text-4xl md:text-5xl font-medium text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {step.title}
                </h3>
              </div>

              <div className="relative">
                <div className="w-full h-px bg-white/10 mb-6 group-hover:bg-vish-accent/30 transition-colors duration-500"></div>
                <p className="font-sans text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {step.description}
                </p>
              </div>

              {/* Decorative gradient blob */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-vish-accent/5 rounded-full blur-3xl group-hover:bg-vish-accent/10 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}

          {/* End spacing */}
          <div className="w-[5vw] shrink-0"></div>
        </motion.div>
      </div>
    </section>
  );
};
