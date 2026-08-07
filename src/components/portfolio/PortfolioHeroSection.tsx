import {
    // Box,
    // Button,
    // chakra,
    Flex,
    Image,
    // Text,
} from "@chakra-ui/react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import Navbar from "../../layout/Navbar";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

import "swiper/css";
import {
    portfolio_hero_section_swiper1, portfolio_hero_section_swiper2, portfolio_hero_section_swiper3, portfolio_hero_section_swiper4, portfolio_hero_section_swiper5,
    // maps,
    // areasize,
} from "../../assets/assets";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const PortfolioHeroSection = () => {
    // const MotionBox = chakra(motion(Box))
    const MotionImage = motion(Image);
    // const [swiper, setSwiper] = useState<any>(null);
    // const [leavingIndex, setLeavingIndex] = useState<number | null>(null);

    type projectthumnail = {
        image: string,
        section: string
    }

    const projectThumbnails: projectthumnail[] = [
        { image: portfolio_hero_section_swiper1, section: "section1" },
        { image: portfolio_hero_section_swiper2, section: "section2" },
        { image: portfolio_hero_section_swiper3, section: "section3" },
        { image: portfolio_hero_section_swiper4, section: "section4" },
        { image: portfolio_hero_section_swiper5, section: "section5" },
        { image: portfolio_hero_section_swiper1, section: "section1" },
        { image: portfolio_hero_section_swiper2, section: "section2" },
        { image: portfolio_hero_section_swiper3, section: "section3" },
        { image: portfolio_hero_section_swiper4, section: "section4" },
        { image: portfolio_hero_section_swiper5, section: "section5" },
    ];

    const [currentImage, setcurrentImage] = useState(0)
    const [direction, setDirection] = useState(1);
    // const lastimage = projectThumbnails.length + 1
    // const containerVariants = {
    //     hidden: {},
    //     visible: {
    //         transition: {
    //             staggerChildren: 0.25, // delay between cards
    //         },
    //     },
    // };

    // const cardVariants = {
    //     hidden: {
    //         rotateY: 180,
    //         opacity: 0,
    //     },
    //     visible: {
    //         rotateY: 0,
    //         opacity: 1,
    //         transition: {
    //             duration: 0.8,
    //             ease: "easeInOut",
    //         },
    //     },
    // };

    const imageVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.95,
        }),

        center: {
            x: "0%",
            opacity: 1,
            scale: 1,
        },

        exit: (direction: number) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
            scale: 0.95,
        }),
    };

    // const visibleImages = [
    //     currentImage,
    //     (currentImage + 1) % projectThumbnails.length,
    //     (currentImage + 2) % projectThumbnails.length,
    // ];

    return (
        <>
            {/* <Flex
                minH={{ base: "900px", md: "1000px", lg: "100vh" }}
                h={{ base: "auto", lg: "100vh" }}
                w="100%"
                // bgImage={`url(${portfolioherosection})`}
                bgSize="cover"
                bgPos="center"
                bgRepeat="no-repeat"
                position="relative"
                overflow="hidden"
            >
                <Box position="absolute" inset={0} bg="rgba(0,0,0,.35)" />

                <Flex position="relative" zIndex={2} direction="column" w="100%" h="100%">
                    <Navbar />

                    <Flex
                        flex={1}
                        pl={{ base: "6%", md: "5%", lg: "3%" }}
                        pr={{ base: "6%", md: "4%", lg: "0%" }}
                        pb={{ base: "8%", lg: "4%" }}
                        direction={{ base: "column", lg: "row" }}
                        justify="space-between"
                        align={{ base: "flex-start", lg: "flex-end" }}
                        gap={{ base: "8%", md: "6%", lg: "3%" }}
                    >
                        <Box
                            color="white"
                            w={{ base: "100%", lg: "45%" }}
                            maxW="45%"
                        >
                            <Text
                                fontSize={{ base: "42px", sm: "54px", md: "68px", lg: "82px" }}
                                lineHeight="0.95"
                                fontWeight="700"
                            >
                                KALPADHAN
                            </Text>

                            <Text
                                mt={2}
                                fontSize={{ base: "30px", sm: "38px", md: "46px", lg: "58px" }}
                                fontWeight="300"
                            >
                                FARM
                            </Text>

                            <Flex mt={6} gap={6} flexWrap="wrap" color="#F5F5F5" fontSize="14px">
                                <Flex align="center" gap={2}>
                                    <Image src={maps} w="18px" />
                                    <Text>Pune, Maharashtra</Text>
                                </Flex>

                                <Flex align="center" gap={2}>
                                    <Image src={areasize} w="18px" />
                                    <Text>18,000 Sq.ft.</Text>
                                </Flex>
                            </Flex>

                            <Text mt={7} color="#F4F4F4" lineHeight="1.8" fontSize={{ base: "14px", md: "16px" }}>
                                A farm development project thoughtfully designed to reflect
                                the essence of Indian culture through its architecture,
                                materials, and spatial experience.
                            </Text>

                            <Text mt={4} color="#F4F4F4" lineHeight="1.8" fontSize={{ base: "14px", md: "16px" }}>
                                Nestled amidst lush farmland, it features a personalized
                                residence with curated interiors and a private swimming
                                pool, seamlessly blending contemporary comfort with the
                                warmth, simplicity, and timeless character of traditional
                                Indian living.
                            </Text>

                            <Button
                                mt={5}
                                bg="#FFFFFF25"
                                backdropFilter="blur(12px)"
                                color="white"
                                w={{ base: "100%", sm: "260px", lg: "fit-content" }}
                                border="1px solid rgba(255,255,255,.35)"
                                borderRadius="10px"
                                fontSize={"16px"}
                                px={7}
                                _hover={{ bg: "#C8A96B", color: "#000" }}
                            >
                                <Flex align="center" gap={3}>
                                    Explore Gallery
                                    <GoArrowRight />
                                </Flex>
                            </Button>
                        </Box>

                        <Flex
                            direction="column"
                            w={{ base: "100%", lg: "55%" }}
                            maxW={{ base: "100%", lg: "55%" }}
                            overflow="hidden"
                            gap={{ base: "5%", lg: "6%" }}
                            position={'relative'}
                        >
                            <Swiper
                                className="portfolioThumbSwiper"
                                onSwiper={setSwiper}
                                slidesPerView="auto"
                                loop={true}
                                spaceBetween={12}
                                watchSlidesProgress
                            >
                                {projectThumbnails.map((img, index) => (
                                    <SwiperSlide
                                        key={index}
                                        style={{
                                            width: "42%",
                                        }}
                                    >
                                        <MotionBox
                                            w="100%"
                                            h="42vh"
                                            minH="220px"
                                            maxH="290px"
                                            borderRadius="20px"
                                            bg="#2B2B2B"
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            color="white"
                                            fontSize="32px"
                                            fontWeight="700"
                                            animate={{
                                                opacity: leavingIndex === index ? 0 : 1,
                                                scale: leavingIndex === index ? 0.96 : 1,
                                                transition: {
                                                    duration: 0.4,
                                                    ease: "easeInOut",
                                                }
                                            }}
                                        >
                                            <Image
                                                src={img.image}
                                                w="100%"
                                                h="100%"
                                                objectFit="cover"
                                                borderRadius="20px"
                                            />
                                        </MotionBox>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Flex
                                justify="center"
                                w="100%"
                                gap={4}
                                mt={5}
                            >
                                <Flex
                                    w="60px"
                                    h="60px"
                                    borderRadius="50%"
                                    bg="rgba(255,255,255,.15)"
                                    backdropFilter="blur(8px)"
                                    justify="center"
                                    align="center"
                                    cursor="pointer"
                                    transition=".3s"



                                    onClick={() => {
                                        if (!swiper) return;

                                        setLeavingIndex(swiper.activeIndex);

                                        swiper.slidePrev();

                                        setTimeout(() => {
                                            setLeavingIndex(null);
                                        }, 400);
                                    }}
                                    _hover={{ bg: "#C8A96B", color: "#000" }}
                                    color={'#fff'}
                                >
                                    <GoArrowLeft size={22} />
                                </Flex>

                                <Flex
                                    w="60px"
                                    h="60px"
                                    color={'#fff'}
                                    borderRadius="50%"
                                    bg="rgba(255,255,255,.15)"
                                    backdropFilter="blur(8px)"
                                    justify="center"
                                    align="center"
                                    cursor="pointer"
                                    transition=".3s"
                                    // onClick={() => swiper?.slideNext()}
                                    onClick={() => {
                                        if (!swiper) return;

                                        setLeavingIndex(swiper.activeIndex);

                                        swiper.slideNext();

                                        setTimeout(() => {
                                            setLeavingIndex(null);
                                        }, 400);
                                    }}
                                    _hover={{ bg: "#C8A96B", color: "#000" }}
                                >
                                    <GoArrowRight size={22} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex >
            </Flex > */}

            <Flex w='100%' h='100%'>
                <Flex flexDirection={'column'} w='100%' h='100%' justifyContent={'center'} alignItems={'center'}>
                    <Flex
                        w="100%"
                        h="50vh"
                        justifyContent="flex-end"
                        overflow="hidden"
                        position="relative"
                    >
                        <AnimatePresence
                            mode="sync"
                            initial={false}
                            custom={direction}
                        >
                            <MotionImage
                                key={currentImage}
                                custom={direction}
                                variants={imageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: 1,
                                    ease: [0.32, 0.72, 0, 1],
                                }}
                                src={projectThumbnails[currentImage].image}
                                position="absolute"
                                right={0}
                                w="45%"
                                h="100%"
                                objectFit="cover"
                                borderRadius="20px"
                            />
                        </AnimatePresence>
                    </Flex>
                    <Flex
                        justify="center"
                        w="100%"
                        gap={4}
                        mt={5}
                    >
                        <Flex
                            w="60px"
                            h="60px"
                            borderRadius="50%"
                            bg="rgba(255,255,255,.15)"
                            backdropFilter="blur(8px)"
                            justify="center"
                            align="center"
                            cursor="pointer"
                            transition=".3s"
                            onClick={() => {
                                setDirection(-1);

                                setcurrentImage((prev) =>
                                    prev === 0
                                        ? projectThumbnails.length - 1
                                        : prev - 1
                                );
                            }}
                            _hover={{ bg: "#C8A96B", color: "#000" }}
                            color={'#fff'}
                        >
                            <GoArrowLeft size={22} />
                        </Flex>

                        <Flex
                            w="60px"
                            h="60px"
                            color={'#fff'}
                            borderRadius="50%"
                            bg="rgba(255,255,255,.15)"
                            backdropFilter="blur(8px)"
                            justify="center"
                            align="center"
                            cursor="pointer"
                            transition=".3s"
                            onClick={() => {
                                setDirection(1);

                                setcurrentImage((prev) =>
                                    prev === projectThumbnails.length - 1
                                        ? 0
                                        : prev + 1
                                );
                            }}

                            _hover={{ bg: "#C8A96B", color: "#000" }}
                        >
                            <GoArrowRight size={22} />
                        </Flex>
                    </Flex>
                </Flex >
            </Flex >

        </>
    );
};

export default PortfolioHeroSection;

