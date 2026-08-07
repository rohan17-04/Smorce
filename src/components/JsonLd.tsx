import React from 'react';

export default function JsonLd() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SMORCE',
    url: 'https://www.smorce.com',
    logo: 'https://www.smorce.com/favicon.svg',
    image: 'https://www.smorce.com/images/og-image.jpg',
    description: 'Premium software, intelligent automations and high-converting digital products for startups and enterprises.',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Global',
    },
    sameAs: [
      'https://www.instagram.com/smorce1?igsh=OGlsNWZ1N2x0dzF3',
    ],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SMORCE',
    url: 'https://www.smorce.com',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}
