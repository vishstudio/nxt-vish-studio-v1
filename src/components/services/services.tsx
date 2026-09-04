'use client';

import { useTinaServices } from '../../hooks/useTinaVisualEditing';
import { ServiceCatalogue } from '../service-catalogue/service-catalogue';

export const Services = () => {
  const { data: content, tinaField, rawServicesPage } = useTinaServices();

  return (
    <ServiceCatalogue
      id="services"
      services={content.categories}
      rawCategories={rawServicesPage?.categories}
      tinaField={tinaField}
      variant="showcase"
    />
  );
};
