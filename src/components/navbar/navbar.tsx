"use client";
import { trackEmailClick, trackSocialLinkClick } from "@/src/lib/analytics";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTinaSettings } from "../../hooks/useTinaVisualEditing";
import {
  openProjectInquiryModal,
  PROJECT_INQUIRY_ACTION,
  PROJECT_INQUIRY_ARIA_LABEL,
} from "../../lib/conversion";
import { CookieSettingsTrigger } from "../cookie-settings/cookie-settings";
import { LogoText } from "../logo-text/logo-text";
import { Button } from "../ui/button/button";

const bottomBarDelayMs = 2000;
const scrollIdleMs = 160;

export const Navbar = () => {
  const { data: settings } = useTinaSettings();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [isInSelectedProjects, setIsInSelectedProjects] = useState(false);
  const scrollStopTimer = useRef<number | null>(null);
  const bottomBarHideTimer = useRef<number | null>(null);
  const bottomBarShowTimer = useRef<number | null>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects", activePaths: ["/project"] },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";
  const currentPath = normalizePath(pathname || "/");
  const isActiveLink = (href: string, activePaths: string[] = []) => {
    const normalizedHref = normalizePath(href);

    if (normalizedHref === "/") {
      return currentPath === "/";
    }

    return (
      currentPath === normalizedHref ||
      currentPath.startsWith(`${normalizedHref}/`) ||
      activePaths.some((path) => {
        const normalizedPath = normalizePath(path);
        return (
          currentPath === normalizedPath ||
          currentPath.startsWith(`${normalizedPath}/`)
        );
      })
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollActivity = () => {
      if (bottomBarShowTimer.current) {
        window.clearTimeout(bottomBarShowTimer.current);
        bottomBarShowTimer.current = null;
      }

      if (!bottomBarHideTimer.current) {
        bottomBarHideTimer.current = window.setTimeout(() => {
          setIsBottomBarVisible(false);
          bottomBarHideTimer.current = null;
        }, bottomBarDelayMs);
      }

      if (scrollStopTimer.current) {
        window.clearTimeout(scrollStopTimer.current);
      }

      scrollStopTimer.current = window.setTimeout(() => {
        if (bottomBarShowTimer.current) {
          window.clearTimeout(bottomBarShowTimer.current);
        }

        bottomBarShowTimer.current = window.setTimeout(() => {
          setIsBottomBarVisible(true);
          bottomBarShowTimer.current = null;
        }, bottomBarDelayMs);
      }, scrollIdleMs);
    };

    window.addEventListener("scroll", handleScrollActivity, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollActivity);
      if (scrollStopTimer.current) {
        window.clearTimeout(scrollStopTimer.current);
      }
      if (bottomBarHideTimer.current) {
        window.clearTimeout(bottomBarHideTimer.current);
      }
      if (bottomBarShowTimer.current) {
        window.clearTimeout(bottomBarShowTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (currentPath !== "/") {
      setIsInSelectedProjects(false);
      return undefined;
    }

    const selectedProjectsSection = document.getElementById("work");
    if (!selectedProjectsSection) {
      setIsInSelectedProjects(false);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInSelectedProjects(entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsBottomBarVisible(true);

          if (bottomBarHideTimer.current) {
            window.clearTimeout(bottomBarHideTimer.current);
            bottomBarHideTimer.current = null;
          }
          if (bottomBarShowTimer.current) {
            window.clearTimeout(bottomBarShowTimer.current);
            bottomBarShowTimer.current = null;
          }
        }
      },
      {
        threshold: 0.08,
      },
    );

    observer.observe(selectedProjectsSection);

    return () => observer.disconnect();
  }, [currentPath]);

  const shouldShowBottomBar =
    currentPath !== "/pricing" &&
    !isMobileMenuOpen &&
    (isInSelectedProjects || isBottomBarVisible);

  return (
    <div className="navbar contents">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-300 w-full max-w-[1400px] ${
            isScrolled
              ? "pl-4 pr-2 py-2 md:pl-4 md:pr-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
              : "px-6 md:px-12 py-6 rounded-none bg-transparent border-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, width: 0 }}
                  animate={{ scale: 1, opacity: 1, width: "auto" }}
                  exit={{ scale: 0, opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/assets/icon.svg" alt="" className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
            <a href="/" className="relative z-50">
              <LogoText />
            </a>
          </div>

          {/* Desktop Navigation */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.nav
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 absolute left-1/2 -translate-x-1/2"
              >
                <ol className="flex items-center">
                  {navItems.map((item) => {
                    const isActive = isActiveLink(item.href, item.activePaths);

                    return (
                      <li
                        key={item.name}
                        className="flex items-center justify-center"
                      >
                        <a
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition-all ${
                            isActive
                              ? "text-white bg-white/10"
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </motion.nav>
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
                  className="hidden lg:flex"
                >
                  <Button
                    variant="cta"
                    size="sm"
                    onClick={openProjectInquiryModal}
                    icon={
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:-rotate-45" />
                    }
                    iconPosition="right"
                    ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
                    dataConversionAction={PROJECT_INQUIRY_ACTION}
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
              className={isScrolled ? "flex" : "flex lg:hidden"}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {shouldShowBottomBar && (
          <motion.div
            initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 32, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto flex w-full max-w-[420px] items-center justify-between gap-3 rounded-full border border-white/10 bg-black/80 py-2.5 pl-2.5 pr-2 shadow-2xl shadow-black/50 backdrop-blur-xl sm:max-w-[460px]">
              <div className="flex min-w-0 items-center gap-2">
                <CookieSettingsTrigger compact className="h-10 w-10 shrink-0" />
                <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40 sm:inline">
                  Ready?
                </span>
              </div>
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(255,214,0,0)",
                    "0 0 22px 0 rgba(255,214,0,0.28)",
                    "0 0 0 0 rgba(255,214,0,0)",
                  ],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full"
              >
                <Button
                  variant="cta"
                  size="sm"
                  onClick={openProjectInquiryModal}
                  icon={
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:-rotate-45" />
                  }
                  iconPosition="right"
                  ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
                  dataConversionAction={PROJECT_INQUIRY_ACTION}
                  className="py-3 font-mono text-[10px] font-semibold uppercase tracking-widest"
                >
                  Start a Project
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] z-[70] bg-[#050505] border-l border-white/10 flex flex-col shadow-2xl overflow-hidden"
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
                  { name: "Projects", href: "/projects", id: "01" },
                  { name: "Services", href: "/services", id: "02" },
                  { name: "Pricing", href: "/pricing", id: "03" },
                  { name: "About", href: "/about", id: "04" },
                  { name: "Testimonials", href: "/testimonials", id: "05" },
                  { name: "Contact", href: "/contact", id: "06" },
                ].map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="group block py-4"
                  >
                    <div className="flex items-baseline gap-4 group-hover:translate-x-2 transition-transform duration-300 ease-out">
                      <span className="font-mono text-sm text-white/20 group-hover:text-vish-accent transition-colors">
                        {item.id}
                      </span>
                      <span className="font-display text-4xl sm:text-5xl font-medium text-white group-hover:text-white/80 transition-colors tracking-tight">
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
                  <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">
                    Connect
                  </p>
                  <a
                    href="mailto:hello@vish.studio"
                    onClick={trackEmailClick}
                    className="block font-display text-2xl text-white hover:text-vish-accent transition-colors mb-8"
                  >
                    hello@vish.studio
                  </a>

                  <div className="flex gap-6">
                    {settings.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target={social.openInNewTab ? "_blank" : undefined}
                        rel={
                          social.openInNewTab
                            ? "noopener noreferrer"
                            : undefined
                        }
                        onClick={() =>
                          trackSocialLinkClick(social.name, "mobile_menu")
                        }
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
    </div>
  );
};
