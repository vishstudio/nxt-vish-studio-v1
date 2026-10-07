'use client';

import { Cookie } from 'lucide-react';
import { Button } from '../ui/button/button';
import { COOKIE_SETTINGS_OPEN_EVENT } from '@/src/lib/cookie-consent';
import { getSiteSettings } from '@/src/lib/content';

export function openCookieSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(COOKIE_SETTINGS_OPEN_EVENT));
}

interface CookieSettingsTriggerProps {
  compact?: boolean;
  className?: string;
  label?: string;
  tinaField?: string;
}

export const CookieSettingsTrigger = ({
  compact = false,
  className,
  label = getSiteSettings().cookies.triggerLabel,
  tinaField,
}: CookieSettingsTriggerProps) => {
  return (
    <Button
      variant="secondary"
      size={compact ? 'icon' : 'sm'}
      onClick={openCookieSettings}
      ariaLabel="Open cookie settings"
      tinaField={compact ? undefined : tinaField}
      className={className}
      icon={!compact ? <Cookie className="h-4 w-4" /> : undefined}
      iconPosition="left"
    >
      {compact ? <Cookie className="h-4 w-4" /> : label}
    </Button>
  );
}
