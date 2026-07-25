import Footer from '../layout/Footer';
import MeetTeam from '../components/about_us/MeetTeam';
import Overview from '../components/about_us/Overview';
import InnerHeroSection from './../components/about_us/InnerHeroSection';
import Quality from "./../components/about_us/Quality";
import { Flex } from "@chakra-ui/react"

const About_us = () => {
    return (
        <>
            <InnerHeroSection />
            <Flex flexDirection={'column'} w='100%'>
                <Flex zIndex={11}  w='100% '>
                    <Overview />
                </Flex>



                <Flex zIndex={-11} position={'sticky'} top={0}>
                    <Quality />
                </Flex>
                <Flex zIndex={11} w='100%' h='100%'>
                    <MeetTeam />
                </Flex>
            </Flex>

            <Footer />
        </>
    )
}

export default About_us


























































































































































































