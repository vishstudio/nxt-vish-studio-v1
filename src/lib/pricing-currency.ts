import type { PricingCarePlan, PricingPlan } from './pricing';

export type PricingCurrency = 'MUR' | 'GBP';

const mauritiusTimeZone = 'Indian/Mauritius';

const getLocaleRegion = (locale: string) => {
  try {
    return new Intl.Locale(locale).region?.toUpperCase();
  } catch {
    const region = locale.split('-')[1];
    return region?.toUpperCase();
  }
};

export const getVisitorPricingCurrency = (): PricingCurrency => {
  if (typeof window === 'undefined') {
    return 'MUR';
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean);
  const hasMauritiusLocale = languages.some(
    (locale) => getLocaleRegion(locale) === 'MU',
  );

  return timeZone === mauritiusTimeZone || hasMauritiusLocale ? 'MUR' : 'GBP';
};

export const getLocalizedPlanPrice = (
  plan: PricingPlan,
  currency: PricingCurrency,
) => {
  const useGbpPrice = currency === 'GBP' && Boolean(plan.priceGbp);
  const useGbpDiscount = currency === 'GBP' && Boolean(plan.discountedPriceGbp);

  return {
    price: useGbpPrice ? plan.priceGbp : plan.price,
    discountedPrice: useGbpDiscount
      ? plan.discountedPriceGbp
      : plan.discountedPrice,
    priceField: useGbpPrice ? 'priceGbp' : 'price',
    discountedPriceField: useGbpDiscount
      ? 'discountedPriceGbp'
      : 'discountedPrice',
  };
};

export const getLocalizedCarePlanPrice = (
  carePlan: PricingCarePlan,
  currency: PricingCurrency,
) =>
  currency === 'GBP' && carePlan.priceGbp
    ? carePlan.priceGbp
    : carePlan.price;
