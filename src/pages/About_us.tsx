import Footer from '../layout/Footer';
import MeetTeam from '../components/about_us/MeetTeam';
import Overview from '../components/about_us/Overview';
import InnerHeroSection from './../components/about_us/InnerHeroSection';
// import Quality from "./../components/about_us/Quality";
import { Flex, } from "@chakra-ui/react"
import { QualitySectionImg, QualitySectionImg_mobile } from '../assets/assets';

const About_us = () => {
    return (
        <>
            <InnerHeroSection />

            <Flex flexDirection={'column'}>
                <Flex  >
                    <Overview />
                </Flex>
                <Flex
                    h="100vh"
                    w="100%"
                    bgImage={{base:`url(${QualitySectionImg_mobile})`, md:`url(${QualitySectionImg})`}}
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    backgroundPosition={{ base: 'right', lg: "center" }}
                    bgAttachment="fixed"
                    justifyContent="center"
                    position="relative"
                >
                    <Flex
                        position="sticky"
                        top="0"
                        h="100vh"
                        w="100%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {/* <Text
                            className="montserrat"
                            color="white"
                            fontSize={{
                                base: "24px",
                                md: "36px",
                                lg: "30px",
                            }}
                            fontWeight="500"
                            textAlign="center"
                        >
                            Quality You Can Trust. Homes You'll Love.
                        </Text> */}
                    </Flex>
                </Flex>
                <Flex >
                    <MeetTeam />
                </Flex>
            </Flex>

            <Footer />
        </>
    )
}

export default About_us
