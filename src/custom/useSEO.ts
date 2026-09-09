// src/hooks/useSEO.ts
import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
}

export function useSEO({ title, description, canonical, ogImage }: SEOProps) {
    useEffect(() => {
        document.title = title;

        const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
            let el = document.querySelector(`meta[${attr}="${key}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        setMeta('name', 'description', description);
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:url', canonical);
        if (ogImage) setMeta('property', 'og:image', ogImage);

        let canonicalEl = document.querySelector('link[rel="canonical"]');
        if (!canonicalEl) {
            canonicalEl = document.createElement('link');
            canonicalEl.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalEl);
        }
        canonicalEl.setAttribute('href', canonical);
    }, [title, description, canonical, ogImage]);
}