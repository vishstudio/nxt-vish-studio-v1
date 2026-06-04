'use client';

interface CarouselProgressProps {
  count: number;
  activeIndex: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const CarouselProgress = ({
  count,
  activeIndex,
  orientation = 'horizontal',
  className = '',
}: CarouselProgressProps) => {
  if (count <= 1) {
    return null;
  }

  return (
    <div
      className={`${orientation === 'vertical' ? 'flex-col items-center gap-3' : 'items-center gap-2'} ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`rounded-full transition-all duration-300 ${
            orientation === 'vertical'
              ? index === activeIndex
                ? 'h-8 w-1.5 bg-vish-accent'
                : 'h-1.5 w-1.5 bg-white/15'
              : index === activeIndex
                ? 'h-1.5 w-8 bg-vish-accent'
                : 'h-1.5 w-1.5 bg-white/15'
          }`}
        />
      ))}
    </div>
  );
};
