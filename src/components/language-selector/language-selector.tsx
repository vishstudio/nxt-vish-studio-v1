'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../ui/button/button';

const LANGUAGE_STORAGE_KEY = 'vish_language';
const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script';
const GOOGLE_TRANSLATE_ELEMENT_ID = 'google_translate_element';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'hi', label: 'Hindi' },
  { code: 'zh-CN', label: 'Chinese' },
  { code: 'ar', label: 'Arabic' },
];

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string,
        ) => void;
      };
    };
    __vishGoogleTranslateInitialized?: boolean;
    googleTranslateElementInit?: () => void;
  }
}

function getStoredLanguage() {
  if (typeof window === 'undefined') return 'en';
  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
}

function setTranslateCookie(languageCode: string) {
  const value = languageCode === 'en' ? '/en/en' : `/en/${languageCode}`;
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  document.cookie = `googtrans=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

  if (window.location.hostname.includes('.')) {
    document.cookie = `googtrans=${value}; expires=${expires.toUTCString()}; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
  }
}

function applyGoogleTranslate(languageCode: string) {
  setTranslateCookie(languageCode);

  const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (!combo) return false;

  combo.value = languageCode;
  combo.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

function loadGoogleTranslate() {
  if (typeof window === 'undefined') return;

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;
    if (!document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID)) {
      const element = document.createElement('div');
      element.id = GOOGLE_TRANSLATE_ELEMENT_ID;
      element.setAttribute('aria-hidden', 'true');
      element.className = 'hidden';
      document.body.appendChild(element);
    }

    if (!window.__vishGoogleTranslateInitialized) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: languages.map((language) => language.code).join(','),
          autoDisplay: false,
        },
        GOOGLE_TRANSLATE_ELEMENT_ID,
      );
      window.__vishGoogleTranslateInitialized = true;
    }

    window.setTimeout(() => {
      applyGoogleTranslate(getStoredLanguage());
    }, 250);
  };

  if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
    window.googleTranslateElementInit();
    return;
  }

  const script = document.createElement('script');
  script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

interface LanguageSelectorProps {
  compact?: boolean;
}

export const LanguageSelector = ({ compact = false }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const selected = languages.find((language) => language.code === selectedLanguage) ?? languages[0];

  useEffect(() => {
    setSelectedLanguage(getStoredLanguage());
    loadGoogleTranslate();
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    applyGoogleTranslate(languageCode);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={compact ? 'relative w-full' : 'relative'}>
      <Button
        variant="secondary"
        size={compact ? 'md' : 'icon'}
        onClick={() => setIsOpen((current) => !current)}
        ariaLabel={`Translate website. Current language: ${selected.label}`}
        ariaExpanded={isOpen}
        ariaControls={menuId}
        className={
          compact
            ? 'w-full justify-between rounded-2xl border-white/10 bg-white/5 px-5 py-4 font-mono text-xs uppercase tracking-widest'
            : 'h-10 w-10 border-white/10 bg-white/10'
        }
        icon={compact ? <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} /> : undefined}
      >
        {compact ? (
          <span className="flex items-center gap-3">
            <Languages className="h-4 w-4 text-vish-accent" />
            {selected.label}
          </span>
        ) : (
          <Languages className="h-4 w-4" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: compact ? 8 : -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: compact ? 8 : -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={
              compact
                ? 'mt-3 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-1 shadow-2xl shadow-black/50'
                : 'absolute right-0 top-[calc(100%+0.75rem)] w-52 overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-1 shadow-2xl shadow-black/50 backdrop-blur-xl'
            }
          >
            {languages.map((language) => {
              const isSelected = language.code === selectedLanguage;
              return (
                <button
                  key={language.code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vish-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isSelected
                      ? 'bg-vish-accent text-black'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{language.label}</span>
                  {isSelected ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
