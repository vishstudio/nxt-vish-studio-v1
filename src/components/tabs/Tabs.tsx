'use client';

import { Button } from '../ui/button/button';

export interface TabItem {
  id: string;
  label: string;
  tinaField?: string;
}

interface TabsProps {
  items: TabItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  ariaLabel: string;
  className?: string;
}

export const Tabs = ({
  items,
  activeIndex,
  onChange,
  ariaLabel,
  className = '',
}: TabsProps) => {
  if (items.length <= 1) {
    return null;
  }

  return (
    <div
      className={`inline-flex max-w-full flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-white/[0.035] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:flex-nowrap sm:overflow-x-auto sm:rounded-full sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden ${className}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <Button
            key={item.id}
            id={`${item.id}-tab`}
            role="tab"
            ariaSelected={isActive}
            ariaControls={`${item.id}-panel`}
            tabIndex={isActive ? 0 : -1}
            variant={isActive ? 'cta' : 'ghost'}
            size="sm"
            onClick={() => onChange(index)}
            className={`min-w-0 flex-1 basis-[calc(50%-0.1875rem)] px-3 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-widest sm:flex-none sm:basis-auto sm:px-5 sm:py-3 sm:text-xs ${
              isActive ? 'shadow-[0_0_24px_rgba(255,214,0,0.24)]' : 'text-white/55 hover:text-white'
            }`}
            ariaLabel={`View ${item.label}`}
          >
            <span data-tina-field={item.tinaField}>{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
};
