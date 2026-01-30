import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
}

export function SEOHead({
  title = 'Wojciech Bożemski - Terapeuta Energetyczny | Bioterapia & Terapia Kwantowa',
  description = 'Profesjonalna terapia energetyczna w Warszawie. Bioterapia, synchronizacja kwantowa, sesje online. Harmonizacja czakr, oczyszczanie aury i uzdrawianie na odległość.',
  keywords = 'terapeuta energetyczny, bioterapia, terapia kwantowa, uzdrawianie, harmonizacja czakr, oczyszczanie aury, sesje online, Warszawa, energia witalna, bioenergetyka',
  image = 'https://bozemski.pl/og-image.jpg',
  url = 'https://bozemski.pl',
  type = 'website',
  author = 'Wojciech Bożemski',
  publishedTime,
}: SEOProps) {
  const siteTitle = title.includes('Wojciech Bożemski') ? title : `${title} | Wojciech Bożemski`;

  useEffect(() => {
    // Update document title
    document.title = siteTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    updateMetaTag('title', siteTitle);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'Polish');
    updateMetaTag('revisit-after', '7 days');

    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', siteTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'Wojciech Bożemski - Terapia Energetyczna', true);
    updateMetaTag('og:locale', 'pl_PL', true);
    
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }
    
    if (type === 'article') {
      updateMetaTag('article:author', author, true);
    }

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', url);
    updateMetaTag('twitter:title', siteTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@WojciechBozemski');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Update or create structured data scripts
    const updateStructuredData = (id: string, data: any) => {
      let script = document.querySelector(`script[data-structured-data="${id}"]`);
      
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-structured-data', id);
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(data);
    };

    // LocalBusiness Structured Data
    updateStructuredData('local-business', {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://bozemski.pl/#localbusiness',
      name: 'Wojciech Bożemski - Terapia Energetyczna',
      description: description,
      url: 'https://bozemski.pl',
      telephone: '+48-XXX-XXX-XXX', // Update with actual phone
      email: 'wojciech@bozemski.pl',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Warszawa',
        addressRegion: 'Mazowieckie',
        addressCountry: 'PL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '52.2297',
        longitude: '21.0122',
      },
      image: image,
      priceRange: '$$',
      openingHours: 'Mo-Fr 09:00-18:00',
      sameAs: [
        'https://www.facebook.com/WojciechBozemski',
        'https://www.instagram.com/wojciech.bozemski',
      ],
    });

    // Person Structured Data
    updateStructuredData('person', {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Wojciech Bożemski',
      jobTitle: 'Terapeuta Energetyczny',
      description: 'Certyfikowany terapeuta energetyczny specjalizujący się w bioterapii i synchronizacji kwantowej.',
      url: 'https://bozemski.pl',
      email: 'wojciech@bozemski.pl',
      image: image,
      sameAs: [
        'https://www.facebook.com/WojciechBozemski',
        'https://www.instagram.com/wojciech.bozemski',
      ],
    });

    // Service Structured Data
    updateStructuredData('service', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Terapia Energetyczna',
      provider: {
        '@type': 'Person',
        name: 'Wojciech Bożemski',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Polska',
      },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: 'https://bozemski.pl',
        servicePhone: '+48-XXX-XXX-XXX',
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Bioterapia Energetyczna',
          description: 'Oczyszczanie i harmonizacja czakr oraz aury',
        },
        {
          '@type': 'Offer',
          name: 'Synchronizacja Kwantowa',
          description: 'Metoda Dwupunktowa i praca z intencją',
        },
        {
          '@type': 'Offer',
          name: 'Sesje na odległość',
          description: 'Pełna skuteczność bez kontaktu fizycznego',
        },
        {
          '@type': 'Offer',
          name: 'Oczyszczanie Przestrzeni',
          description: 'Energetyczne oczyszczanie mieszkań i relacji',
        },
      ],
    });

    // Breadcrumb Structured Data
    updateStructuredData('breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Strona główna',
          item: 'https://bozemski.pl',
        },
      ],
    });
  }, [siteTitle, description, keywords, image, url, type, author, publishedTime]);

  // This component doesn't render anything - it only updates head tags
  return null;
}
