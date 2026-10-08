import React, { useEffect } from 'react';
import { ClinicLocation, Doctor, MedicalService } from '../types';
import {
  SEO_CONFIG,
  ROUTE_SEO_REGISTRY,
  generateMedicalClinicSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateDoctorSchema,
  generateServiceSchema,
  generateFaqSchema
} from '../data/seoConfig';

interface SeoHeadProps {
  activeTab: string;
  currentLocation: ClinicLocation;
  selectedDoctor?: Doctor | null;
  selectedService?: MedicalService | null;
}

/**
 * Helper to update or create a <meta> tag by name or property
 */
function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link> tag by rel
 */
function setLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  activeTab,
  currentLocation,
  selectedDoctor,
  selectedService,
}) => {
  useEffect(() => {
    // 1. Determine active page metadata
    const pageMeta = ROUTE_SEO_REGISTRY[activeTab] || ROUTE_SEO_REGISTRY.home;

    let pageTitle = pageMeta.title;
    let pageDescription = pageMeta.description;
    let canonicalUrl = `${SEO_CONFIG.SITE_URL}${pageMeta.canonicalPath === '/' ? '' : pageMeta.canonicalPath}`;
    let ogImage = pageMeta.ogImage || SEO_CONFIG.DEFAULT_OG_IMAGE;
    let ogType = pageMeta.ogType || 'website';
    let breadcrumbs = [...pageMeta.breadcrumbs];

    // If a specific doctor is highlighted
    if (selectedDoctor) {
      pageTitle = `${selectedDoctor.name} | ${selectedDoctor.title} | Kynexis Health Kolkata`;
      pageDescription = `Consult with ${selectedDoctor.name}, ${selectedDoctor.title} at Kynexis Health Kolkata. Board-certified with ${selectedDoctor.experienceYears}+ years clinical experience.`;
      canonicalUrl = `${SEO_CONFIG.SITE_URL}/doctors#${selectedDoctor.id}`;
      if (selectedDoctor.image) ogImage = selectedDoctor.image;
      ogType = 'profile';
      breadcrumbs.push({ name: selectedDoctor.name, path: `/doctors#${selectedDoctor.id}` });
    }
    // If a specific service is highlighted
    else if (selectedService) {
      pageTitle = `${selectedService.name} | Diagnostics & Treatment | Kynexis Health`;
      pageDescription = `${selectedService.shortDesc} Provided in quiet clinical suites at Kynexis Health Kolkata.`;
      canonicalUrl = `${SEO_CONFIG.SITE_URL}/services#${selectedService.id}`;
      breadcrumbs.push({ name: selectedService.name, path: `/services#${selectedService.id}` });
    }

    // 2. Set Document Title
    document.title = pageTitle;

    // 3. Set Standard Meta Tags
    setMetaTag('name', 'description', pageDescription);
    setMetaTag('name', 'keywords', pageMeta.keywords.join(', '));
    setMetaTag('name', 'author', SEO_CONFIG.CLINIC_LEGAL_NAME);
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('name', 'theme-color', SEO_CONFIG.DEFAULT_THEME_COLOR);

    // 4. Set Canonical Link
    setLinkTag('canonical', canonicalUrl);

    // 5. Set Open Graph (Facebook / LinkedIn / WhatsApp)
    setMetaTag('property', 'og:site_name', SEO_CONFIG.SITE_NAME);
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:image:alt', `${pageTitle} - ${SEO_CONFIG.SITE_NAME}`);
    setMetaTag('property', 'og:locale', SEO_CONFIG.DEFAULT_LOCALE);

    // 6. Set Twitter Cards (X)
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@kynexishealth');
    setMetaTag('name', 'twitter:creator', '@kynexishealth');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', pageDescription);
    setMetaTag('name', 'twitter:image', ogImage);
    setMetaTag('name', 'twitter:image:alt', `${pageTitle} - ${SEO_CONFIG.SITE_NAME}`);

    // 7. Set Geo Meta Tags for Kolkata Location
    setMetaTag('name', 'geo.region', 'IN-WB');
    setMetaTag('name', 'geo.placename', `${currentLocation.city}, West Bengal, India`);
    setMetaTag('name', 'geo.position', `${currentLocation.coordinates.lat};${currentLocation.coordinates.lng}`);
    setMetaTag('name', 'ICBM', `${currentLocation.coordinates.lat}, ${currentLocation.coordinates.lng}`);

    // 8. Build JSON-LD Graph
    const graph: any[] = [
      generateMedicalClinicSchema(currentLocation),
      generateOrganizationSchema(),
      generateBreadcrumbSchema(breadcrumbs)
    ];

    if (selectedDoctor) {
      graph.push(generateDoctorSchema(selectedDoctor, currentLocation));
    }

    if (selectedService) {
      graph.push(generateServiceSchema(selectedService, currentLocation));
      if (selectedService.faqs && selectedService.faqs.length > 0) {
        graph.push(generateFaqSchema(selectedService.faqs));
      }
    }

    const schemaGraph = {
      '@context': 'https://schema.org',
      '@graph': graph
    };

    // Inject or update JSON-LD <script> in head
    let scriptElem = document.getElementById('kynexis-jsonld-schema') as HTMLScriptElement | null;
    if (!scriptElem) {
      scriptElem = document.createElement('script');
      scriptElem.id = 'kynexis-jsonld-schema';
      scriptElem.type = 'application/ld+json';
      document.head.appendChild(scriptElem);
    }
    scriptElem.textContent = JSON.stringify(schemaGraph, null, 2);

  }, [activeTab, currentLocation, selectedDoctor, selectedService]);

  return null; // Head-only side-effect component
};
