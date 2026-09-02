import Navbar from "../../layout/Navbar";
import { homeherosectionvideo } from "../../assets/assets";
import { Button, chakra, Flex, Text } from "@chakra-ui/react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const HeroSection = () => {

    const MotionFlex = chakra(motion(Flex))
    // const START_TIME = 7; // seconds

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const handleLoadedMetadata = () => {
            video.currentTime = 5.5;
            video.play();
        };

        if (video.readyState >= 1) {
            handleLoadedMetadata();
        } else {
            video.addEventListener("loadedmetadata", handleLoadedMetadata);
        }

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);
    const navigate = useNavigate()
    return (
        <Flex
            h="100vh"
            w="100%"
            // bgImage={`url(${herosectiongif})`}
            // bgSize="cover"
            // backgroundPosition="center"
            // bgRepeat="no-repeat"
            position={'relative'}


        >
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                <source src={homeherosectionvideo} type="video/mp4" />
            </video>
            <Flex
                flexDir="column"
                w="100%"
                h="100%"
                bg="#00000080"
                zIndex={1111}
            >
                <Navbar />

                <Flex
                    flex="1"
                    justify="center"
                    align="center"
                    textAlign="center"
                    px={4}
                >
                    <MotionFlex
                        initial={{
                            y: 1000,
                            opacity: 0,
                            scale: 0.5,
                            transition: {
                                duration: 1,
                                ease: "easeInOut",
                            }
                        }}
                        animate={{
                            y: 0,
                            scale: 1,
                            opacity: 2,
                            transition: {
                                duration: 2,
                                ease: "easeInOut",
                            }
                        }}
                        exit={{
                            y: -100,
                            opacity: 0,
                            transition: {
                                duration: 3,
                                ease: "easeInOut",
                            }
                        }}
                        flexDirection="column"
                        align="center"
                        gap={5}
                        maxW="900px"
                    >
                        <Text
                            className="michroma_font"
                            fontSize={{ base: "42px", lg: "72px" }}
                            lineHeight="1.15"
                            color="white"
                            fontWeight="800"
                        >
                            Your Vision.
                            <br />
                            <Text className="michroma_font" as="span" color="#C8A96B">
                                Expertly
                            </Text>{" "}
                            Built.
                        </Text>

                        <Text
                            color="whiteAlpha.900"
                            fontSize={{base:'17px',lg:"20px"}}
                            fontWeight="400"
                        >
                            Integrated Land, Luxury & Development Consultancy.
                        </Text>

                        <Flex flexDirection={{ base: 'column', md: 'row' }} mt={2} gap={5}>
                            <Button
                                bg="#C8A96B"
                                color="black"
                                size="lg"
                                px={8}
                                borderRadius="6px"
                                _hover={{
                                    bg: "#b89558",
                                }}
                                onClick={() => navigate('/portfolio')}
                            >
                                EXPLORE PROJECTS
                            </Button>

                            <Button
                            
                                variant="outline"
                                color="white"
                                borderColor="#C8A96B"
                                borderWidth="1px"
                                size="lg"
                                px={8}
                                borderRadius="6px"
                                onClick={() => navigate('/contact-us')}
                                _hover={{
                                    bg: "#C8A96B",
                                    color: "black",
                                }}
                            >
                                ENQUIRE NOW
                            </Button>
                        </Flex> 
                    </MotionFlex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default HeroSection;