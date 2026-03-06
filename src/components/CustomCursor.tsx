'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

type CursorVariant = 'default' | 'hover' | 'project';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="project"]')) {
        setCursorVariant('project');
      } else if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  const sizeMap: Record<CursorVariant, { w: number; h: number }> = {
    default: { w: 12, h: 12 },
    hover: { w: 36, h: 36 },
    project: { w: 80, h: 80 },
  };

  const bgMap: Record<CursorVariant, string> = {
    default: '#FFD600',
    hover: 'rgba(0,0,0,0)',
    project: '#ffffff',
  };

  const borderMap: Record<CursorVariant, string> = {
    default: 'rgba(0,0,0,0)',
    hover: '#FFD600',
    project: 'rgba(0,0,0,0)',
  };

  const { w, h } = sizeMap[cursorVariant];

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center border-2"
      animate={{
        x: mousePosition.x - w / 2,
        y: mousePosition.y - h / 2,
        width: w,
        height: h,
        opacity: visible ? 1 : 0,
        backgroundColor: bgMap[cursorVariant],
        borderColor: borderMap[cursorVariant],
      }}
      transition={{
        x: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
        y: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
        width: { type: 'spring', stiffness: 300, damping: 25 },
        height: { type: 'spring', stiffness: 300, damping: 25 },
        opacity: { duration: 0.15 },
      }}
      style={{ willChange: 'transform' }}
    >
      <AnimatePresence>
        {cursorVariant === 'project' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="w-8 h-8 text-black" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

