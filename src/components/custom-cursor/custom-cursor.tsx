'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type CursorVariant = 'default' | 'hover' | 'project';

export const CustomCursor = () => {
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const updatePointerMode = () => {
      const active = mediaQuery.matches;
      setIsDesktopPointer(active);
      if (!active) {
        setVisible(false);
      }
    };

    updatePointerMode();
    mediaQuery.addEventListener('change', updatePointerMode);

    return () => mediaQuery.removeEventListener('change', updatePointerMode);
  }, []);

  useEffect(() => {
    if (!isDesktopPointer) return;

    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      const element = target instanceof Element ? target : null;

      if (element?.closest('[data-cursor="project"]')) {
        setCursorVariant('project');
      } else if (
        element?.tagName === 'A' ||
        element?.tagName === 'BUTTON' ||
        element?.closest('a') ||
        element?.closest('button')
      ) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDesktopPointer]);

  if (!isDesktopPointer) {
    return null;
  }

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
      aria-hidden="true"
      className="custom-cursor fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border-2 pointer-events-none"
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
            <ArrowUpRight className="h-8 w-8 text-black" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
