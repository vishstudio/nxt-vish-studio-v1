import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export const ScrollCircular = () => {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:flex items-center justify-center pointer-events-none mix-blend-difference">
      <div className="relative flex items-center justify-center">
        {/* Rotating Text Ring */}
        <motion.div
          style={{ rotate }}
          className="w-28 h-28"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              <path
                id="circle"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="font-mono text-[10.5px] font-bold uppercase tracking-[0.25em] fill-white">
              <textPath href="#circle" startOffset="0%">
                Scroll to explore • Scroll to explore •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Static Center Arrow */}
        <div className="absolute inset-0 flex items-center justify-center">
            <ArrowDown className="w-5 h-5 text-vish-accent" />
        </div>
      </div>
    </div>
  );
};
