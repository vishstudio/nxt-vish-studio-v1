"use client";
import { trackEmailClick, trackSocialLinkClick } from "@/src/lib/analytics";
import {
  ArrowRight,
  Bot,
  Box,
  ChevronDown,
  LayoutTemplate,
  Megaphone,
  Menu,
  Monitor,
  Palette,
  Smartphone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTinaSettings } from "../../hooks/useTinaVisualEditing";
import {
  PROJECT_INQUIRY_HREF,
  PROJECT_INQUIRY_ACTION,
  PROJECT_INQUIRY_ARIA_LABEL,
} from "../../lib/conversion";
import { LanguageSelector } from "../language-selector/language-selector";
import { LogoText } from "../logo-text/logo-text";
import { Button } from "../ui/button/button";

export const Navbar = () => {
  const { data: settings } = useTinaSettings();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isDesktopSubmenuOpen, setIsDesktopSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const scrollRaf = useRef<number | null>(null);

  const serviceSubItems = [
    {
      name: "Social Media Marketing",
      href: "/services/social-media-marketing",
      description: "Strategy, campaigns, and creative direction",
      icon: Megaphone,
    },
    {
      name: "SaaS Products",
      href: "/services/saas-products",
      description: "Client-ready applications",
      icon: Box,
    },
    {
      name: "Websites",
      href: "/services/websites",
      description: "High-converting digital experiences",
      icon: Monitor,
    },
    {
      name: "Website Templates",
      href: "/services/templates",
      description: "Launch-ready website foundations",
      icon: LayoutTemplate,
    },
    {
      name: "Softwares",
      href: "/services/softwares",
      description: "Custom tools and operational systems",
      icon: Box,
    },
    {
      name: "Mobile Apps",
      href: "/services/mobile-apps",
      description: "Customer and team mobile experiences",
      icon: Smartphone,
    },
    {
      name: "Branding",
      href: "/services/branding",
      description: "Identity systems built to be remembered",
      icon: Palette,
    },
    {
      name: "AI Integrations & Automations",
      href: "/services/ai-automations",
      description: "Connected workflow systems",
      icon: Bot,
    },
  ];

  const serviceMenuItems = [
    ...serviceSubItems,
    {
      name: "See all services",
      href: "/services",
      description: "Full service overview",
      icon: ArrowRight,
    },
  ];

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects", activePaths: ["/project"] },
    { name: "Services", href: "/services", children: serviceMenuItems },
    // { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const mobileNavItems = [
    { name: "Projects", href: "/projects", id: "01" },
    { name: "Services", id: "02", children: serviceMenuItems },
    // { name: "Pricing", href: "/pricing", id: "03" },
    { name: "About", href: "/about", id: "04" },
    { name: "Testimonials", href: "/testimonials", id: "05" },
    { name: "Contact", href: "/contact", id: "06" },
  ];

  const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";
  const currentPath = normalizePath(pathname || "/");
  const effectiveIsScrolled = isScrolled && !isDesktopSubmenuOpen;
  const openMobileMenu = () => {
    setIsMobileServicesOpen(false);
    setIsMobileMenuOpen(true);
  };
  const closeMobileMenu = () => {
    setIsMobileServicesOpen(false);
    setIsMobileMenuOpen(false);
  };
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
    const syncScrollState = () => {
      scrollRaf.current = null;

      const nextIsScrolled = window.scrollY > 20;
      if (isScrolledRef.current !== nextIsScrolled) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }
    };

    const queueScrollState = () => {
      if (scrollRaf.current === null) {
        scrollRaf.current = window.requestAnimationFrame(syncScrollState);
      }
    };

    syncScrollState();
    window.addEventListener("scroll", queueScrollState, { passive: true });
    window.addEventListener("resize", queueScrollState);

    return () => {
      window.removeEventListener("scroll", queueScrollState);
      window.removeEventListener("resize", queueScrollState);
      if (scrollRaf.current !== null) {
        window.cancelAnimationFrame(scrollRaf.current);
      }
    };
  }, [currentPath]);

  return (
    <div className="navbar contents">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6 md:px-12"
      >
        <div
          className={`pointer-events-auto relative flex w-full max-w-[1400px] items-center justify-between transition-all duration-300 ${effectiveIsScrolled
            ? "pl-4 pr-2 py-2 md:pl-4 md:pr-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
            : "px-0 py-6 rounded-none bg-transparent border-transparent"
            }`}
        >
          {effectiveIsScrolled && (
            <Button
              variant="secondary"
              size="icon"
              onClick={openMobileMenu}
              ariaLabel="Open menu"
              className="flex shrink-0"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}

          <div className={`flex items-center ${effectiveIsScrolled ? "absolute left-1/2 -translate-x-1/2 gap-3" : "gap-0"}`}>
            <div
              className={`grid h-5 shrink-0 transition-[opacity,width,transform] duration-200 ease-out ${effectiveIsScrolled ? "w-5 scale-100 opacity-100" : "w-0 scale-95 opacity-0"
                }`}
              aria-hidden="true"
            >
              <img src="/assets/icon.svg" alt="" className="h-5 w-5" />
            </div>
            <a href="/" className="relative z-50 flex items-center justify-center">
              <LogoText />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`absolute left-1/2 hidden select-none -translate-x-1/2 items-center gap-1 rounded-full border border-white/5 bg-white/5 p-1 transition-[opacity,transform] duration-200 ease-out lg:flex ${effectiveIsScrolled
              ? "pointer-events-none scale-95 opacity-0"
              : "pointer-events-auto scale-100 opacity-100"
              }`}
            aria-hidden={effectiveIsScrolled}
          >
            <ol className="flex items-center">
              {navItems.map((item) => {
                const isActive = isActiveLink(item.href, item.activePaths);

                return (
                  <li
                    key={item.name}
                    className="group relative flex items-center justify-center"
                    onMouseEnter={
                      item.children ? () => setIsDesktopSubmenuOpen(true) : undefined
                    }
                    onMouseLeave={
                      item.children ? () => setIsDesktopSubmenuOpen(false) : undefined
                    }
                    onFocus={
                      item.children ? () => setIsDesktopSubmenuOpen(true) : undefined
                    }
                    onBlur={
                      item.children
                        ? (event) => {
                          if (
                            !event.currentTarget.contains(
                              event.relatedTarget as Node | null,
                            )
                          ) {
                            setIsDesktopSubmenuOpen(false);
                          }
                        }
                        : undefined
                    }
                  >
                    {item.children ? (
                      <button
                        type="button"
                        data-nav-link
                        aria-current={isActive ? "page" : undefined}
                        aria-expanded={isDesktopSubmenuOpen}
                        aria-haspopup="menu"
                        tabIndex={effectiveIsScrolled ? -1 : undefined}
                        className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full font-sans text-sm font-medium transition-all ${isActive
                          ? "text-white bg-white/10"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        onClick={() =>
                          setIsDesktopSubmenuOpen((isOpen) => !isOpen)
                        }
                      >
                        {item.name}
                        <ChevronDown
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        data-nav-link
                        aria-current={isActive ? "page" : undefined}
                        tabIndex={effectiveIsScrolled ? -1 : undefined}
                        className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full font-sans text-sm font-medium transition-all ${isActive
                          ? "text-white bg-white/10"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                      >
                        {item.name}
                      </a>
                    )}
                    {item.children ? (
                      <div
                        className="pointer-events-none absolute left-1/2 top-full z-50 w-[min(1400px,calc(100vw-6rem))] -translate-x-1/2 pt-3 group-hover:pointer-events-auto group-focus-within:pointer-events-auto"
                        role="menu"
                      >
                        <div className="translate-y-2 rounded-3xl border border-white/10 bg-black/95 p-4 opacity-0 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                          <div className="mb-3 flex items-center justify-between px-2 pt-1">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-vish-accent">
                              Our services
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                              Strategy, design & technology
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                          {item.children.slice(0, 8).map((child) => {
                            const Icon = child.icon;

                            return (
                            <a
                              key={child.name}
                              href={child.href}
                              role="menuitem"
                              tabIndex={effectiveIsScrolled ? -1 : undefined}
                              className="group/item rounded-2xl border border-white/6 bg-white/[0.025] px-4 py-4 transition-colors hover:border-white/15 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vish-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            >
                              <span className="flex items-start justify-between gap-3">
                                <Icon className="h-5 w-5 shrink-0 text-vish-accent" aria-hidden="true" />
                                <ArrowRight className="h-3.5 w-3.5 text-vish-accent opacity-0 transition-all group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
                              </span>
                              <span className="mt-5 block font-sans text-sm font-medium text-white">
                                  {child.name}
                              </span>
                              <span className="mt-1 block font-sans text-xs leading-relaxed text-gray-500">
                                {child.description}
                              </span>
                            </a>
                            );
                          })}
                          </div>
                          <a
                            href="/services"
                            role="menuitem"
                            tabIndex={effectiveIsScrolled ? -1 : undefined}
                            className="mt-2 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 transition-colors hover:border-vish-accent/60 hover:bg-vish-accent/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vish-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                          >
                            <span className="font-sans text-sm font-medium text-white">See all services</span>
                            <ArrowRight className="h-4 w-4 text-vish-accent" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="flex items-center gap-3">
            <div
              className={effectiveIsScrolled
                ? "hidden"
                : "hidden items-center gap-4 transition-[opacity,transform] duration-200 ease-out lg:flex pointer-events-auto translate-x-0 opacity-100"}
              aria-hidden={effectiveIsScrolled}
            >
              <LanguageSelector />
            </div>

            <Button
              variant="cta"
              size="sm"
              href={PROJECT_INQUIRY_HREF}
              icon={
                <ArrowRight className="w-4 h-4 transition-transform group-hover:-rotate-45" />
              }
              iconPosition="right"
              ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
              dataConversionAction={PROJECT_INQUIRY_ACTION}
              className="hidden font-sans lg:inline-flex"
            >
              Schedule a Free Call
            </Button>

            {!effectiveIsScrolled && (
              <Button
                variant="secondary"
                size="icon"
                onClick={openMobileMenu}
                ariaLabel="Open menu"
                className="flex lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </motion.header>

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
              onClick={closeMobileMenu}
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 bottom-0 left-0 z-[70] flex w-full select-none flex-col overflow-hidden border-r border-white/10 bg-[#050505] shadow-2xl sm:w-[420px]"
            >
              <div className="flex justify-between items-center p-8">
                <span className="font-display text-2xl font-semibold text-white tracking-tight">
                  Menu<span className="text-vish-accent">.</span>
                </span>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={closeMobileMenu}
                  ariaLabel="Close menu"
                  className="w-12 h-12"
                >
                  <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-8 flex flex-col gap-2">
                {mobileNavItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="group block py-3"
                  >
                    {item.children ? (
                      <button
                        type="button"
                        data-nav-link
                        aria-expanded={isMobileServicesOpen}
                        aria-controls="mobile-services-submenu"
                        onClick={() =>
                          setIsMobileServicesOpen((isOpen) => !isOpen)
                        }
                        className="block w-full text-left"
                      >
                        <div className="flex items-baseline justify-between gap-4 transition-transform duration-300 ease-out group-hover:translate-x-2">
                          <span className="flex items-baseline gap-4">
                            <span className="font-mono text-sm text-white/20 transition-colors group-hover:text-vish-accent">
                              {item.id}
                            </span>
                            <span className="font-display text-4xl font-medium tracking-tight text-white transition-colors group-hover:text-white/80 sm:text-5xl">
                              {item.name}
                            </span>
                          </span>
                          <ChevronDown
                            className={`mt-1 h-6 w-6 shrink-0 text-vish-accent transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""
                              }`}
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        data-nav-link
                        onClick={closeMobileMenu}
                        className="block"
                      >
                        <div className="flex items-baseline gap-4 transition-transform duration-300 ease-out group-hover:translate-x-2">
                          <span className="font-mono text-sm text-white/20 transition-colors group-hover:text-vish-accent">
                            {item.id}
                          </span>
                          <span className="font-display text-4xl font-medium tracking-tight text-white transition-colors group-hover:text-white/80 sm:text-5xl">
                            {item.name}
                          </span>
                        </div>
                      </a>
                    )}
                    {item.children ? (
                      <AnimatePresence initial={false}>
                        {isMobileServicesOpen ? (
                          <motion.div
                            id="mobile-services-submenu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.24,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="ml-10 mt-4 grid gap-2 border-l border-white/10 pl-4 sm:ml-12">
                              {item.children.map((child) => {
                                const Icon = child.icon;

                                return (
                                <a
                                  key={child.name}
                                  href={child.href}
                                  onClick={closeMobileMenu}
                                  className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vish-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                >
                                  <span className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-3 font-sans text-base font-medium text-white">
                                      <Icon className="h-4 w-4 shrink-0 text-vish-accent" aria-hidden="true" />
                                      {child.name}
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-vish-accent" />
                                  </span>
                                  <span className="mt-1 block font-sans text-sm leading-relaxed text-gray-500">
                                    {child.description}
                                  </span>
                                </a>
                                );
                              })}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    ) : null}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="mt-8"
                >
                  <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/30">
                    Translate
                  </p>
                  <LanguageSelector compact />
                </motion.div>

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
                    className="notranslate block font-display text-2xl text-white hover:text-vish-accent transition-colors mb-8"
                    translate="no"
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
