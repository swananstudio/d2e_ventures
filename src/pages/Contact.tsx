
import { Flex } from '@chakra-ui/react';
import Contact_info from '../components/contact/Contact_info';
import ContactHeroSection from './../components/contact/ContactHeroSection';
import ContactMap from '../components/contact/ContactMap';
import Footer from '../layout/Footer';
import { useEffect } from 'react';
import { useSEO } from '../custom/useSEO';

const Contact = () => {

    useSEO({
        title: "Contact D2E Ventures | Book a Free Consultation, Pune",
        description: "Have land or a vision? Talk to our team in Yewalewadi, Pune. Call +91 82650 68887 or book your free consultation online.",
        canonical: "https://www.d2eventures.com/contact-us",
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "D2E Ventures",
            "url": "https://www.d2eventures.com/contact",
            "telephone": "+91-82650-68887",
            "email": "info@d2eventures.com",
            "logo": "https://d2eventures.com/favicon-48.png",
            "image": "https://d2eventures.com/favicon-48.png",
            "description": "D2E Ventures delivers architecture, interiors, plotting, landscape design, premium villas and turnkey construction projects across Maharashtra.",
            "areaServed": ["Pune", "Mumbai", "Nagpur", "Konkan", "Jalgaon", "Chandrapur"],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shop no. G2, Classic Gloria, Near MNGL CNG Pump, Yewalewadi",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "postalCode": "411048",
                "addressCountry": "IN"
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "10:30",
                    "closes": "19:30"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Saturday"],
                    "opens": "10:30",
                    "closes": "14:00"
                }
            ]
        });
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);
    return (
        <Flex w='100%' flexDirection={'column'} bgGradient={' linear-gradient(261deg, rgba(200, 169, 107, 0.1) 0%, rgba(200, 169, 107, 0.05) 30%, rgba(200, 169, 107, 0.05) 70%, rgba(200, 169, 107, 0.1) 100%)'}>
            <ContactHeroSection />
            <Contact_info />
            <ContactMap />
            <Footer />
        </Flex>
    )
}

export default Contact