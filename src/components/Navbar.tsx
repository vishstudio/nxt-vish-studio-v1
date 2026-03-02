import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 w-full max-w-5xl ${isScrolled
              ? 'bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50'
              : 'bg-black/40 backdrop-blur-md border border-white/5'
            }`}
        >
          <a href="/" className="font-display text-xl font-bold tracking-tight text-white mr-8">
            VISH<span className="text-vish-accent">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {[
              { name: 'Work', href: '/#work' },
              { name: 'Services', href: '/#services' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/#contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-5 py-2 rounded-full font-sans text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className="hidden md:flex group px-5 py-2.5 bg-vish-accent text-black font-sans font-medium text-sm rounded-full hover:bg-white transition-colors items-center gap-2"
            >
              Start Project <ArrowRight className="w-4 h-4 transition-transform group-hover:-rotate-45" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <span className="font-display font-bold text-xl text-white">VISH<span className="text-vish-accent">.</span></span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                },
                exit: { opacity: 0 }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col justify-center px-8 gap-6"
            >
              {[
                { name: 'Work', href: '/#work' },
                { name: 'Services', href: '/#services' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/#contact' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
                    },
                    exit: { y: 20, opacity: 0 }
                  }}
                  whileHover="hover"
                  className="group flex items-baseline gap-6 cursor-pointer"
                >
                  <motion.span
                    variants={{
                      hover: { color: "#FFD600", x: 5 }
                    }}
                    className="font-mono text-sm text-white/30 transition-colors duration-300"
                  >
                    0{index + 1}
                  </motion.span>
                  <motion.span
                    variants={{
                      hover: { x: 20, color: "#FFFFFF" }
                    }}
                    className="font-display text-6xl font-medium text-white/50 transition-colors duration-300 tracking-tighter"
                  >
                    {item.name}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>

            <div className="p-8 border-t border-white/5 bg-white/[0.02]">
              <div className="flex flex-col gap-2">
                <p className="text-white/40 text-xs font-mono tracking-widest uppercase">Get in touch</p>
                <a href="mailto:vishseenarain@gmail.com" className="text-lg text-white hover:text-gray-300 transition-colors font-sans">
                  vishseenarain@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
