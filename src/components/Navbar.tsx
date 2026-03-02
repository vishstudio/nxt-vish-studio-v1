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
              { name: 'Home', href: '/' },
              { name: 'Projects', href: '/projects' },
              { name: 'Services', href: '/#services' },
              { name: 'About', href: '/about' },
              { name: 'Team', href: '/team' }
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
            initial={{ height: 0 }}
            animate={{ height: "100dvh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-[60] bg-[#050505] flex flex-col overflow-hidden"
          >
            {/* Header - Replicating Navbar Position */}
            <div className="absolute top-6 left-0 right-0 flex justify-center px-4 pointer-events-none z-[70]">
              <div
                className="pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 w-full max-w-5xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
              >
                <span className="font-display text-xl font-bold tracking-tight text-white mr-8">
                  VISH<span className="text-vish-accent">.</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                </button>
              </div>
            </div>

            {/* Links Container */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.2 }
                },
                exit: { opacity: 0 }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col justify-center px-6 mt-24"
            >
              {[
                { name: 'Projects', href: '/projects', subtitle: 'Our Work' },
                { name: 'Services', href: '/#services', subtitle: 'What We Do' },
                { name: 'About', href: '/about', subtitle: 'Our Story' },
                { name: 'Team', href: '/team', subtitle: 'Our People' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                    },
                    exit: { opacity: 0 }
                  }}
                  className="group py-5 border-b border-white/5 last:border-0 flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="font-display text-4xl md:text-5xl font-medium text-white transition-colors duration-300 group-active:text-vish-accent">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-widest group-hover:text-vish-accent/70 transition-colors">
                      {item.subtitle}
                    </span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/20 -rotate-45 group-hover:rotate-0 group-hover:text-vish-accent transition-all duration-300" />
                </motion.a>
              ))}
              <motion.a
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                variants={{
                  hidden: { x: -20, opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                  },
                  exit: { opacity: 0 }
                }}
                className="mt-8 bg-white text-black font-display text-xl px-6 py-4 rounded-full text-center hover:bg-vish-accent transition-colors"
              >
                Start A Project
              </motion.a>
            </motion.div>

            {/* Footer */}
            <div className="p-8 bg-white/[0.02] border-t border-white/5">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-white/40 text-xs font-mono tracking-widest uppercase mb-2">Say Hello</p>
                  <a href="mailto:hello@vish.studio" className="font-display text-2xl text-vish-accent hover:text-white transition-colors">
                    hello@vish.studio
                  </a>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-white/5">
                  <div className="flex gap-4">
                    {['LI', 'TW', 'IG'].map((social) => (
                      <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs text-gray-400 hover:text-black hover:bg-white hover:border-white transition-all font-mono">
                        {social}
                      </a>
                    ))}
                  </div>
                  <span className="text-[10px] text-white/20 font-mono">©2026 VISH.</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
