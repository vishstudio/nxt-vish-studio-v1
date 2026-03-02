import { motion, animate } from 'motion/react';
import { useEffect, useState } from 'react';

export const Loader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setProgress(Math.round(value)),
      onComplete: () => {
        setTimeout(onLoadingComplete, 500);
      }
    });

    return () => controls.stop();
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between p-8 md:p-12 cursor-wait"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Top Row */}
      <div className="flex justify-between items-start w-full">
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-xl tracking-tight"
        >
            VISH.
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs opacity-50 uppercase tracking-widest"
        >
            Portfolio ©2026
        </motion.div>
      </div>

      {/* Center - Huge Counter */}
      <div className="flex-1 flex items-center justify-center relative">
          <motion.div 
            className="font-display text-[25vw] md:text-[20vw] font-bold leading-none tracking-tighter tabular-nums"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {progress}
          </motion.div>
          <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] h-[1px] bg-white/20"
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
          />
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-end w-full">
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs opacity-50 uppercase tracking-widest"
        >
            Mauritius
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs opacity-50 uppercase tracking-widest"
        >
            Loading Experience
        </motion.div>
      </div>
    </motion.div>
  );
};
