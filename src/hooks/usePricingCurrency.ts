'use client';

import { useEffect, useState } from 'react';
import {
  getVisitorPricingCurrency,
  type PricingCurrency,
} from '../lib/pricing-currency';

export const usePricingCurrency = (): PricingCurrency => {
  const [currency, setCurrency] = useState<PricingCurrency>('MUR');

  useEffect(() => {
    setCurrency(getVisitorPricingCurrency());
  }, []);

  return currency;
};
