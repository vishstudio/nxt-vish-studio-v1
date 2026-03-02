import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useTinaSettings } from '../hooks/useTinaVisualEditing';

export const ScrollCircular = () => {
  const { data: settings } = useTinaSettings();
  const { scrollY } = useScroll();
  const rawRotate = useTransform(scrollY, [0, 50000], [0, 18000]);
  const rotate = useSpring(rawRotate, { stiffness: 100, damping: 30 });

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
                {settings.scrollText}
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
