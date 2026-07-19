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

const Home = () => {

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