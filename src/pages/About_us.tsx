import { useEffect, useState } from 'react';
import Footer from '../layout/Footer';
import MeetTeam from '../components/about_us/MeetTeam';
import Overview from '../components/about_us/Overview';
import InnerHeroSection from './../components/about_us/InnerHeroSection';
// import Quality from "./../components/about_us/Quality";
import { Flex } from "@chakra-ui/react"
import { QualitySectionImg, QualitySectionImg_mobile } from '../assets/assets';

// Detects actual Safari browser (desktop Safari + Mobile Safari on iOS/iPadOS)
// Excludes Chrome, Firefox, Edge, and other browsers — even those running on iOS,
// since Chrome-on-iOS (CriOS), Firefox-on-iOS (FxIOS), etc. all include "Safari"
// in their UA string too and must be explicitly excluded.
const isSafari = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

    const ua = navigator.userAgent;

    const isSafariUA = /^((?!chrome|android|crios|fxios|edgios|opios|opr|edg).)*safari/i.test(ua);

    // Extra check: Safari's vendor is always "Apple Computer, Inc."
    const isAppleVendor = /apple/i.test(navigator.vendor || '');

    return isSafariUA && isAppleVendor;
};

const About_us = () => {
    const [bgAttachment, setBgAttachment] = useState<'fixed' | 'scroll'>('fixed');

    useEffect(() => {
        if (isSafari()) {
            setBgAttachment('scroll');
        }
    }, []);

    return (
        <>
            <InnerHeroSection />

            <Flex flexDirection={'column'}>
                <Flex>
                    <Overview />
                </Flex>
                <Flex
                    h="100dvh"
                    w="100%"
                    bgImage={{ base: `url(${QualitySectionImg_mobile})`, md: `url(${QualitySectionImg})` }}
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    backgroundPosition={{ base: 'right', lg: "center" }}
                    bgAttachment={bgAttachment}
                    justifyContent="center"
                    position="relative"
                >
                </Flex>
                <Flex>
                    <MeetTeam />
                </Flex>
            </Flex>

            <Footer />
        </>
    )
}

export default About_us