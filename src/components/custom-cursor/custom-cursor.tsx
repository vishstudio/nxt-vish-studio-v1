'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CursorVariant = 'default' | 'hover' | 'project';

export const CustomCursor = () => {
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const variantRef = useRef<CursorVariant>('default');
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 520, damping: 32, mass: 0.45 });
  const springY = useSpring(cursorY, { stiffness: 520, damping: 32, mass: 0.45 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const updatePointerMode = () => {
      const active = mediaQuery.matches;
      setIsDesktopPointer(active);
      if (!active) {
        visibleRef.current = false;
        setVisible(false);
      }
    };

    updatePointerMode();
    mediaQuery.addEventListener('change', updatePointerMode);

    return () => mediaQuery.removeEventListener('change', updatePointerMode);
  }, []);

  useEffect(() => {
    if (!isDesktopPointer) return;

    const updatePointerPosition = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const setVariant = (nextVariant: CursorVariant) => {
      if (variantRef.current === nextVariant) return;

      variantRef.current = nextVariant;
      setCursorVariant(nextVariant);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      const element = target instanceof Element ? target : null;

      if (element?.closest('[data-cursor="project"]')) {
        setVariant('project');
      } else if (
        element?.tagName === 'A' ||
        element?.tagName === 'BUTTON' ||
        element?.closest('a') ||
        element?.closest('button')
      ) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };

    const handlePointerLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const handlePointerEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener('pointermove', updatePointerPosition, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    document.documentElement.addEventListener('pointerenter', handlePointerEnter);

    return () => {
      window.removeEventListener('pointermove', updatePointerPosition);
      window.removeEventListener('pointerover', handlePointerOver);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      document.documentElement.removeEventListener('pointerenter', handlePointerEnter);
    };
  }, [cursorX, cursorY, isDesktopPointer]);

  if (!isDesktopPointer) {
    return null;
  }

  const sizeMap: Record<CursorVariant, { w: number; h: number }> = {
    default: { w: 12, h: 12 },
    hover: { w: 36, h: 36 },
    project: { w: 80, h: 80 },
  };

  const bgMap: Record<CursorVariant, string> = {
    default: 'var(--color-vish-accent)',
    hover: 'rgba(0,0,0,0)',
    project: '#ffffff',
  };

  const borderMap: Record<CursorVariant, string> = {
    default: 'rgba(0,0,0,0)',
    hover: 'var(--color-vish-accent)',
    project: 'rgba(0,0,0,0)',
  };

  const { w, h } = sizeMap[cursorVariant];

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border-2 pointer-events-none"
      animate={{
        width: w,
        height: h,
        opacity: visible ? 1 : 0,
        backgroundColor: bgMap[cursorVariant],
        borderColor: borderMap[cursorVariant],
      }}
      transition={{
        width: { type: 'spring', stiffness: 300, damping: 25 },
        height: { type: 'spring', stiffness: 300, damping: 25 },
        opacity: { duration: 0.15 },
      }}
      style={{
        x: springX,
        y: springY,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        willChange: 'transform, width, height, opacity',
      }}
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
