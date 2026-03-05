'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  onClick,
  type = "button",
  disabled = false,
  icon,
  iconPosition = 'right'
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none group";

  const variants = {
    primary: "bg-vish-accent text-black hover:bg-white border border-transparent shadow-[0_0_15px_rgba(255,214,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/5 backdrop-blur-sm",
    outline: "bg-transparent border border-white/20 text-white hover:border-vish-accent hover:text-vish-accent",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
    link: "bg-transparent text-vish-accent hover:text-white underline-offset-4 hover:underline p-0 h-auto",
    white: "bg-white text-black hover:bg-vish-accent hover:text-black border border-transparent shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,214,0,0.4)]"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "w-10 h-10 p-0 flex items-center justify-center rounded-full"
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2 transform group-hover:translate-x-1 transition-transform">{icon}</span>}
    </>
  );

  // If href is provided, render appropriate link
  if (href) {
    const isExternal = href.startsWith('http');
    const isAnchor = href.startsWith('#');

    if (isExternal) {
      return (
        <motion.a
          whileTap={{ scale: 0.98 }}
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {content}
        </motion.a>
      );
    }

    if (isAnchor) {
      return (
        <motion.a
          whileTap={{ scale: 0.98 }}
          href={href}
          className={classes}
          onClick={onClick}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
};
