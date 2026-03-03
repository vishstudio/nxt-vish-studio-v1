import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useTinaSettings } from '../hooks/useTinaVisualEditing';

export const Navbar = () => {
  const { data: settings } = useTinaSettings();
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
          className={`pointer-events-auto flex items-center justify-between transition-all duration-300 w-full max-w-[1400px] ${isScrolled
            ? 'pl-4 pr-2 py-2 md:pl-4 md:pr-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50'
            : 'px-6 md:px-12 py-6 rounded-none bg-transparent border-transparent'
            }`}
        >
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, width: 0 }}
                  animate={{ scale: 1, opacity: 1, width: 'auto' }}
                  exit={{ scale: 0, opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/assets/icon.svg" alt="" className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
            <a href="/" className="relative z-50" style={{ fontFamily: 'var(--font-logo)', fontSize: '1.2rem', letterSpacing: '-0.01em' }}>
              <span className="text-white" style={{ fontWeight: 800 }}>VISH</span><span className="text-vish-accent" style={{ fontWeight: 500 }}> Studio</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 absolute left-1/2 -translate-x-1/2"
              >
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Projects', href: '/projects' },
                  { name: 'Services', href: '/services' },
                  { name: 'About', href: '/about' }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-5 py-2 rounded-full font-sans text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {item.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:flex"
                >
                  <Button
                    href="/contact"
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:-rotate-45" />}
                    iconPosition="right"
                    className="font-sans"
                  >
                    Start Project
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className={isScrolled ? 'flex' : 'flex md:hidden'}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] z-[70] bg-[#050505] border-l border-white/10 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center p-8">
                <span className="font-display text-2xl font-semibold text-white tracking-tight">
                  Menu<span className="text-vish-accent">.</span>
                </span>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12"
                >
                  <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-8 flex flex-col gap-2">
                {[
                  { name: 'Home', href: '/', id: '01' },
                  { name: 'Projects', href: '/projects', id: '02' },
                  { name: 'Services', href: '/services', id: '03' },
                  { name: 'About', href: '/about', id: '04' },
                  { name: 'Contact', href: '/contact', id: '05' }
                ].map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                    className="group block py-4"
                  >
                    <div className="flex items-baseline gap-6 group-hover:translate-x-4 transition-transform duration-300 ease-out">
                      <span className="font-mono text-sm text-white/20 group-hover:text-vish-accent transition-colors">
                        {item.id}
                      </span>
                      <span className="font-display text-6xl font-medium text-white group-hover:text-white/80 transition-colors tracking-tight">
                        {item.name}
                      </span>
                    </div>
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-auto pt-12 pb-8"
                >
                  <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">Connect</p>
                  <a href="mailto:hello@vish.studio" className="block font-display text-2xl text-white hover:text-vish-accent transition-colors mb-8">
                    hello@vish.studio
                  </a>

                  <div className="flex gap-6">
                    {settings.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target={social.openInNewTab ? '_blank' : undefined}
                        rel={social.openInNewTab ? 'noopener noreferrer' : undefined}
                        className="text-white/40 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
