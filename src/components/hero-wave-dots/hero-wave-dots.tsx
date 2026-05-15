'use client';
import { useEffect, useRef } from 'react';

type Dot = {
  baseX: number;
  baseY: number;
  row: number;
  col: number;
  size: number;
  speed: number;
  phase: number;
  opacity: number;
};

export const HeroWaveDots = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, px: 0.5, py: 0.5 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const createDots = () => {
      const dots: Dot[] = [];
      const spacing = width < 768 ? 28 : 34;
      const cols = Math.ceil(width / spacing) + 6;
      const rows = Math.ceil(height / spacing) + 8;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const jitterX = ((row % 2) * spacing) / 2;
          const baseX = offsetX + col * spacing + jitterX;
          const baseY = offsetY + row * spacing;
          const vertical = baseY / Math.max(height, 1);
          const centerFade = Math.max(0, 1 - Math.abs(baseX / Math.max(width, 1) - 0.5) * 1.25);

          dots.push({
            baseX,
            baseY,
            row,
            col,
            size: 0.8 + Math.random() * 0.9,
            speed: 0.65 + Math.random() * 0.65,
            phase: Math.random() * Math.PI * 2,
            opacity: (0.045 + vertical * 0.08) * centerFade,
          });
        }
      }

      dotsRef.current = dots;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createDots();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width;
      const normalizedY = (event.clientY - rect.top) / rect.height;
      pointerRef.current.px = normalizedX;
      pointerRef.current.py = normalizedY;
      pointerRef.current.targetX = (normalizedX - 0.5) * 2;
      pointerRef.current.targetY = (normalizedY - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY;
    };

    const draw = (time: number) => {
      const pointer = pointerRef.current;
      const scroll = scrollRef.current;
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;
      scroll.y += (scroll.targetY - scroll.y) * 0.08;

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = 'screen';

      const pointerX = pointer.px * width;
      const pointerY = pointer.py * height;
      const parallaxY = -scroll.y * 0.16;
      const breathe = mediaQuery.matches ? 0 : Math.sin(time * 0.001) * 3;

      dotsRef.current.forEach((dot) => {
        const vertical = dot.baseY / Math.max(height, 1);
        const bottomWaveMask = Math.max(0, Math.min(1, (vertical - 0.42) / 0.5));
        const lowerHeaderMask = Math.exp(-Math.pow((vertical - 0.76) / 0.26, 2));
        const waveA = Math.sin(dot.col * 0.42 + time * 0.0011 * dot.speed + dot.phase) * 28;
        const waveB = Math.sin(dot.col * 0.18 + dot.row * 0.38 - time * 0.0008) * 15;
        const waveY = mediaQuery.matches ? 0 : (waveA + waveB) * bottomWaveMask;
        const waveX = mediaQuery.matches ? 0 : Math.sin(dot.row * 0.38 + time * 0.00065 + dot.phase) * 8 * lowerHeaderMask;
        const x = dot.baseX + waveX + pointer.x * 14;
        const y = dot.baseY + waveY + pointer.y * 8 + parallaxY + breathe;
        const distanceX = x - pointerX;
        const distanceY = y - pointerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const ripple = Math.max(0, 1 - distance / 190);
        const rippleWave = mediaQuery.matches ? 0 : Math.sin(distance * 0.09 - time * 0.008) * ripple;
        const push = rippleWave * 13;
        const safeDistance = distance || 1;
        const drawX = x + (distanceX / safeDistance) * push;
        const drawY = y + (distanceY / safeDistance) * push;
        const size = dot.size + lowerHeaderMask * 0.35 + ripple * 0.85;
        const alpha = dot.opacity + lowerHeaderMask * 0.055 + ripple * 0.11;

        context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        context.beginPath();
        context.arc(drawX, drawY, size, 0, Math.PI * 2);
        context.fill();
      });

      context.restore();
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    handleScroll();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="hero-wave-dots absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/[0.025]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-radial-[ellipse_at_50%_100%] from-white/[0.055] via-transparent to-transparent opacity-70" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};
