'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'motion/react';

interface TextRevealProps {
  children: string;
  className?: string;
  tinaField?: string;
}

export const TextReveal = ({ children, className, tinaField }: TextRevealProps) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.5']
  });

  const words = children.split(' ');

  return (
    <p
      ref={element}
      className={`flex flex-wrap ${className}`}
      data-tina-field={tinaField}
    >
      {words.map((word, i) => {
        // Distribute the animation of words across the scroll progress
        // We ensure a slight overlap so it feels fluid
        const start = i / words.length;
        const end = start + (1 / words.length);

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-[0.25em] inline-block leading-tight">
      <span className="absolute opacity-20 text-white">{children}</span>
      <motion.span style={{ opacity }} className="text-white relative z-10">
        {children}
      </motion.span>
    </span>
  );
};
