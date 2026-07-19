import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Image,
    List,
    Text,
} from "@chakra-ui/react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Navbar from "../../layout/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

import "swiper/css";
import {
    portfolioherosection,
    portfolio_hero_section_swiper1, portfolio_hero_section_swiper2, portfolio_hero_section_swiper3, portfolio_hero_section_swiper4, portfolio_hero_section_swiper5,
    maps,
    areasize,
} from "../../assets/assets";
import { useState, type Dispatch, type SetStateAction } from "react";

const PortfolioHeroSection = () => {
    const [currentSection, setCurrentSection] = useState<string>("main");
    const [swiper, setSwiper] = useState<any>(null);
    const projectThumbnails = [
        { image: portfolio_hero_section_swiper1, section: "section1" },
        { image: portfolio_hero_section_swiper2, section: "section2" },
        { image: portfolio_hero_section_swiper3, section: "section3" },
        { image: portfolio_hero_section_swiper4, section: "section4" },
        { image: portfolio_hero_section_swiper5, section: "section5" },
    ];

    return (
        <>
            <Flex
                minH={{ base: "900px", md: "1000px", lg: "100vh" }}
                h={{ base: "auto", lg: "100vh" }}
                w="100%"
                bgImage={`url(${portfolioherosection})`}
                bgSize="cover"
                bgPos="center"
                bgRepeat="no-repeat"
                position="relative"
                overflow="hidden"
                display={currentSection === "main" ? "flex" : "none"}
            >
                {/* Overlay */}
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
                        {/* LEFT */}
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
                                onClick={() => setCurrentSection("section1")}
                            >
                                <Flex align="center" gap={3}>
                                    Explore Gallery
                                    <GoArrowRight />
                                </Flex>
                            </Button>
                        </Box>

                        <Flex
                            direction="column"
                            w={{ base: "100%", lg: "50%" }}
                            maxW={{ base: "100%", lg: "50%" }}
                            overflow="hidden"
                            gap={{ base: "5%", lg: "6%" }}
                        >
                            <Swiper
                                className="portfolioThumbSwiper"
                                onSwiper={setSwiper}
                                slidesPerView="auto"
                                spaceBetween={16}
                            >
                                {projectThumbnails.map((img) => (
                                    <SwiperSlide
                                        key={img.section}
                                        style={{
                                            width: "42%",
                                        }}
                                    >
                                        <Box
                                            w="100%"
                                            h="42vh"
                                            minH="220px"
                                            maxH="290px"
                                            cursor="pointer"
                                            onClick={() => setCurrentSection(img.section)}
                                            overflow="hidden"
                                            borderRadius="20px"
                                            bg="rgba(255,255,255,.25)"
                                            backdropFilter="blur(12px)"
                                            border="1px solid rgba(255,255,255,.2)"
                                        >
                                            <Image
                                                src={img.image}
                                                w="100%"
                                                h="100%"
                                                objectFit="cover"
                                            />
                                        </Box>
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
                                    onClick={() => swiper?.slidePrev()}
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
                                    onClick={() => swiper?.slideNext()}
                                    _hover={{ bg: "#C8A96B", color: "#000" }}
                                >
                                    <GoArrowRight size={22} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <FirstSection
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                onBack={() => setCurrentSection("main")}
                onNext={() => setCurrentSection("section2")}
            />
            <SecondSection
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                onBack={() => setCurrentSection("main")}
                onNext={() => setCurrentSection("section3")}
            />
            <ThirdSection
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                onBack={() => setCurrentSection("main")}
                onNext={() => setCurrentSection("section1")}
            />
        </>
    );
};

export default PortfolioHeroSection;

// ---- Shared props type for the three detail sections ----
type SectionProps = {
    currentSection: string;
    onBack: () => void;
    onNext: () => void;
    setCurrentSection: Dispatch<SetStateAction<string>>;
};

const FirstSection = ({ currentSection, setCurrentSection }: SectionProps) => {
    return (
        <Flex
            // position="relative"
            w="100%"
            minH={{ base: "auto", lg: "100vh" }}
            h={{ base: "auto", lg: "100vh" }}
            bgImage={`url(${portfolioherosection})`}
            bgSize="cover"
            backgroundPosition="center"
            bgRepeat="no-repeat"
            overflow="auto"
            display={currentSection === "section1" ? "flex" : "none"}
        >
            {/* Overlay */}
            <Box position="absolute" inset={0} bg="rgba(0,0,0,.15)" />



            <Grid
                position="relative"
                zIndex={2}
                w="100%"
                h="100%"
                templateColumns={{ base: "1fr", lg: "34% 66%" }}
            >
                {/* Left Panel */}
                <GridItem>
                    <Flex
                        direction="column"
                        justify="center"
                        h="100%"
                        px={{ base: "6%", md: "5%", lg: "12%" }}
                        py={{ base: "120px", lg: "80px" }}
                        bg="rgba(0,0,0,.72)"
                        backdropFilter="blur(16px)"
                    >
                        {/* Heading */}
                        <Text color="white" fontWeight="700" lineHeight="1" fontSize={{ base: "42px", lg: "54px" }}>
                            PROJECT 1
                        </Text>

                        <Text color="white" fontWeight="300" fontSize={{ base: "26px", lg: "36px" }}>
                            Overview
                        </Text>

                        <Box mt={3} w="70px" h="2px" bg="#E7C37B" />

                        {/* Details */}
                        <Grid mt={10} templateColumns="repeat(2,1fr)" gapX={8} gapY={8}>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Project Type</Text>
                                <Text color="white">Luxury Farmhouse</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Completion Year</Text>
                                <Text color="white">2024</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Project Duration</Text>
                                <Text color="white">14 Months</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Site Area</Text>
                                <Text color="white">1.5 Acres</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Built-up Area</Text>
                                <Text color="white">8,200 sq.ft.</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Status</Text>
                                <Text color="white">Completed</Text>
                            </Box>
                        </Grid>

                        {/* Services */}
                        <Box mt={10}>
                            <Text color="#D6B46A" mb={2}>Services</Text>
                            <Text color="white" lineHeight="1.7">
                                • Architecture
                                <br />
                                • Interior Design
                                <br />
                                • Landscape
                                <br />
                                • Turnkey Execution
                            </Text>
                        </Box>

                        {/* Key Spaces */}
                        <Box mt={8}>
                            <Text color="#D6B46A" mb={2}>Key Spaces</Text>
                            <Text color="#EAEAEA" lineHeight="1.8" fontSize="15px">
                                The farmhouse features four ensuite bedrooms, a double-height
                                living area, private swimming pool, open courtyard, outdoor
                                dining deck, entertainment lounge, and landscaped gardens
                                thoughtfully designed for seamless indoor and outdoor living.
                            </Text>
                        </Box>


                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex justify="center" h='100%' alignItems={'center'} w="100%" gap={5}>
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
                            onClick={() => setCurrentSection("main")}
                            _hover={{ bg: "#C8A96B", color: "#000" }}
                        >
                            <GoArrowLeft size={22} />
                        </Flex>

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
                            onClick={() => setCurrentSection("section2")}
                            _hover={{ bg: "#C8A96B", color: "#000" }}
                        >
                            <GoArrowRight size={22} />
                        </Flex>
                    </Flex>
                </GridItem>
                {/* Right Empty Section */}
                <GridItem />
            </Grid>
        </Flex>
    );
};

const SecondSection = ({ currentSection, setCurrentSection }: SectionProps) => {
    return (
        <Flex
            // position="relative"
            w="100%"
            minH={{ base: "auto", lg: "100vh" }}
            h={{ base: "auto", lg: "100vh" }}
            bgImage={`url(${portfolioherosection})`}
            bgSize="cover"
            backgroundPosition="center"
            bgRepeat="no-repeat"
            overflow="hidden"
            display={currentSection === "section2" ? "flex" : "none"}
        >
            {/* Overlay */}
            <Box position="absolute" inset={0} bg="rgba(0,0,0,.15)" />

            {/* Navbar */}
            <Box position="absolute" top={0} left={0} right={0} zIndex={5}>
                <Navbar />
            </Box>

            <Grid
                position="relative"
                zIndex={2}
                w="100%"
                h="100%"
                templateColumns={{ base: "1fr", lg: "34% 66%" }}
            >
                {/* Left Panel */}
                <GridItem>
                    <Flex
                        direction="column"
                        justify="center"
                        h="100%"
                        px={{ base: "6%", md: "5%", lg: "12%" }}
                        py={{ base: "120px", lg: "80px" }}
                        bg="rgba(0,0,0,.72)"
                        backdropFilter="blur(16px)"
                    >
                        <Text color="white" fontWeight="700" lineHeight="1" fontSize={{ base: "42px", lg: "54px" }}>
                            CLIENT
                        </Text>

                        <Text color="white" fontWeight="300" fontSize={{ base: "26px", lg: "36px" }}>
                            Vision
                        </Text>

                        <Box mt={0} w="70px" h="2px" bg="#fff" />
                        <Flex pt={5} gap={2} flexDirection={'column'}>
                            <Box >
                                <Text color="#D6B46A" fontSize="14px">Project Goal</Text>
                                <Text color="white">To develop a farmhouse that serves as a weekend retreat, preserving the openness and character of the agricultural landscape.</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Requirements</Text>
                                <List.Root color={'#fff'}>
                                    <List.Item>
                                        Traditional Indian architecture with contemporary planning
                                    </List.Item>

                                    <List.Item>
                                        Vernacular sloping roofs, natural materials, and earthy finishes
                                    </List.Item>

                                    <List.Item>
                                        Personalized family retreat with integrated indoor–outdoor living
                                    </List.Item>

                                    <List.Item>
                                        Private pool, verandahs, and rooftop sit-out overlooking the farmland
                                    </List.Item>

                                    <List.Item>
                                        Distinct private and recreational zones with seamless circulation
                                    </List.Item>

                                    <List.Item>
                                        Optimized for panoramic views, natural daylight, and cross ventilation
                                    </List.Item>
                                </List.Root>

                            </Box>
                        </Flex>



                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex justify="center" h='100%' alignItems={'center'} w="100%" gap={5}>
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
                            onClick={() => setCurrentSection("section1")}
                            _hover={{ bg: "#C8A96B", color: "#000" }}
                        >
                            <GoArrowLeft size={22} />
                        </Flex>

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
                            onClick={() => setCurrentSection("section3")}
                            _hover={{ bg: "#C8A96B", color: "#000" }}
                        >
                            <GoArrowRight size={22} />
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem />
            </Grid>
        </Flex>
    );
};

const ThirdSection = ({ currentSection, setCurrentSection }: SectionProps) => {
    return (
        <Flex
            position="relative"
            w="100%"
            minH={{ base: "auto", lg: "100vh" }}
            h={{ base: "auto", lg: "100vh" }}
            bgImage={`url(${portfolioherosection})`}
            bgSize="cover"
            backgroundPosition="center"
            bgRepeat="no-repeat"
            // overflow="hidden"
            display={currentSection === "section3" ? "flex" : "none"}
        >
            {/* Overlay */}
            <Box position="absolute" inset={0} bg="rgba(0,0,0,.15)" />


            <Grid
                // position="relative"
                zIndex={2}
                w="100%"
                h="100%"
                templateColumns={{ base: "1fr", lg: "34% 66%" }}
            >
                {/* Left Panel */}
                <GridItem>
                    <Flex
                        direction="column"
                        justify="center"
                        h="100%"
                        px={{ base: "6%", md: "5%", lg: "12%" }}
                        py={{ base: "120px", lg: "80px" }}
                        bg="rgba(0,0,0,.72)"
                        backdropFilter="blur(16px)"
                    >

                        {/* Heading */}
                        <Text color="white" fontWeight="700" lineHeight="1" fontSize={{ base: "42px", lg: "54px" }}>
                            PROJECT 3
                        </Text>

                        <Text color="white" fontWeight="300" fontSize={{ base: "26px", lg: "36px" }}>
                            Overview
                        </Text>

                        <Box mt={3} w="70px" h="2px" bg="#E7C37B" />

                        {/* Details */}
                        <Grid mt={10} templateColumns="repeat(2,1fr)" gapX={8} gapY={8}>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Project Type</Text>
                                <Text color="white">Luxury Farmhouse</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Completion Year</Text>
                                <Text color="white">2024</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Project Duration</Text>
                                <Text color="white">14 Months</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Site Area</Text>
                                <Text color="white">1.5 Acres</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Built-up Area</Text>
                                <Text color="white">8,200 sq.ft.</Text>
                            </Box>
                            <Box>
                                <Text color="#D6B46A" fontSize="14px">Status</Text>
                                <Text color="white">Completed</Text>
                            </Box>
                        </Grid>

                        {/* Services */}
                        <Box mt={10}>
                            <Text color="#D6B46A" mb={2}>Services</Text>
                            <Text color="white" lineHeight="1.7">
                                • Architecture
                                <br />
                                • Interior Design
                                <br />
                                • Landscape
                                <br />
                                • Turnkey Execution
                            </Text>
                        </Box>

                        {/* Key Spaces */}
                        <Box mt={8}>
                            <Text color="#D6B46A" mb={2}>Key Spaces</Text>
                            <Text color="#EAEAEA" lineHeight="1.8" fontSize="15px">
                                The farmhouse features four ensuite bedrooms, a double-height
                                living area, private swimming pool, open courtyard, outdoor
                                dining deck, entertainment lounge, and landscaped gardens
                                thoughtfully designed for seamless indoor and outdoor living.
                            </Text>
                        </Box>

                    </Flex>
                </GridItem>

                <GridItem>
                    <Flex justify="center" h='100%' alignItems={'center'} w="100%" gap={5}>
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
                            onClick={() => setCurrentSection("section2")}
                            _hover={{ bg: "#C8A96B", color: "#000" }}
                        >
                            <GoArrowLeft size={22} />
                        </Flex>

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
                            onClick={() => setCurrentSection("main")}
                            _hover={{ bg: "#C8A96B", color: "#000" }}
                        >
                            <GoArrowRight size={22} />
                        </Flex>
                    </Flex>
                </GridItem>
                {/* Right Empty Section */}
                <GridItem />
            </Grid>
        </Flex>
    );
};