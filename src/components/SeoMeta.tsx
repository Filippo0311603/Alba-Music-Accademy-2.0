import { useEffect } from 'react';

type BreadcrumbItem = {
  name: string;
  path: string;
};

type SeoMetaProps = {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  breadcrumbs?: BreadcrumbItem[];
};

const SITE_NAME = 'Alba Music Academy';
const DEFAULT_OG_IMAGE_PATH = '/og-image.png';
const SITE_BASE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://alba-music-academy.vercel.app';

function upsertMetaByName(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function toAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  const runtimeOrigin = typeof window !== 'undefined' ? window.location.origin : SITE_BASE_URL;
  return `${runtimeOrigin}${normalizedPath}`;
}

function upsertJsonLd(id: string, payload: Record<string, unknown> | Array<Record<string, unknown>>) {
  let script = document.querySelector(`script#${id}`) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(payload);
}

function removeJsonLd(id: string) {
  const script = document.querySelector(`script#${id}`);
  if (script?.parentNode) {
    script.parentNode.removeChild(script);
  }
}

export default function SeoMeta({
  title,
  description,
  path,
  imagePath,
  noIndex = false,
  structuredData,
  breadcrumbs,
}: SeoMetaProps) {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(path || window.location.pathname);
    const imageUrl = toAbsoluteUrl(imagePath || DEFAULT_OG_IMAGE_PATH);

    document.title = title;
    upsertCanonical(canonicalUrl);

    upsertMetaByName('description', description);
    upsertMetaByName('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    upsertMetaByProperty('og:type', 'website');
    upsertMetaByProperty('og:locale', 'it_IT');
    upsertMetaByProperty('og:site_name', SITE_NAME);
    upsertMetaByProperty('og:title', title);
    upsertMetaByProperty('og:description', description);
    upsertMetaByProperty('og:url', canonicalUrl);

    upsertMetaByName('twitter:card', 'summary_large_image');
    upsertMetaByName('twitter:title', title);
    upsertMetaByName('twitter:description', description);

    upsertMetaByProperty('og:image', imageUrl);
    upsertMetaByName('twitter:image', imageUrl);

    const jsonLdPayload: Array<Record<string, unknown>> = [];
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        jsonLdPayload.push(...structuredData);
      } else {
        jsonLdPayload.push(structuredData);
      }
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdPayload.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: toAbsoluteUrl(item.path),
        })),
      });
    }

    if (jsonLdPayload.length > 0) {
      upsertJsonLd('route-seo-jsonld', jsonLdPayload.length === 1 ? jsonLdPayload[0] : jsonLdPayload);
    } else {
      removeJsonLd('route-seo-jsonld');
    }
  }, [title, description, path, imagePath, noIndex, structuredData, breadcrumbs]);

  return null;
}
