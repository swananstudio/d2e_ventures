import Footer from "../../layout/Footer"
import HeroSection from "../../components/home/HeroSection"
import IntroSection from "../../components/home/IntroSection"
import ProjectLocations from "../../components/home/ProjectLocations"
import Projects from "../../components/home/Projects"
import Services from "../../components/home/Services"
import Review from "../../components/home/Review"
import Faq from "../../components/home/Faq"
import ChooseUs from "../../components/home/ChooseUs"
import { Flex } from "@chakra-ui/react"
import { useSEO } from "../../custom/useSEO"

const Home = () => {
    useSEO({
        title: "D2E Ventures | Luxury Villas & Turnkey Homes in Pune, Mumbai, Nagpur",
        description: "From land to livable - D2E Ventures delivers architecture, interiors, plotting & turnkey projects across Maharashtra. Book a free consultation today.",
        canonical: "https://www.d2eventures.com/",
        // ogImage: "https://www.d2eventures.com/images/home-hero.jpg",
    });
    return (
        <>
            <Flex flexDirection={'column'} w='100%'>
                <Flex zIndex={0} position={'sticky'} top={0}>
                    <HeroSection />
                </Flex>
                <Flex zIndex={11} w='100%' h='100%'>
                    <IntroSection />
                </Flex>
            </Flex>

            <ProjectLocations />
            <Projects />
            <Services />
            <Review />
            <Faq />
            <ChooseUs />
            <Footer />
        </>
    )
}

export default Home