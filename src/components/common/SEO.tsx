import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = "MBBS Abroad, MBBS in Uzbekistan, MBBS in Kyrgyzstan, Study MBBS Abroad, NMC Approved Medical Colleges, Low Cost MBBS Abroad", 
  image = "/og-image.jpg", 
  url = "https://abroadmbbs.com" 
}) => {
  return (
    <Helmet>
      <title>{title} | Abroad MBBS</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Abroad MBBS Consultancy",
            "url": "${url}",
            "logo": "${url}/logo.png",
            "description": "${description}",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "New Delhi",
              "addressCountry": "India"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-85211-23304",
              "contactType": "Admissions"
            }
          }
        `}
      </script>
    </Helmet>
  );
};
