import { useState } from "react";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { homeservicesarchitecture, homeservicesinterior, homeserviceslandscape, homeservicesplotting, homeservicespremium_villa, homeservicesturnkey_execution, } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
const services = [
    { title: "ARCHITECTURE", image: homeservicesarchitecture },
    { title: "INTERIOR", image: homeservicesinterior },
    { title: "PLOTTING", image: homeservicesplotting },
    { title: "LANDSCAPE", image: homeserviceslandscape },
    { title: "PREMIUM VILLAS", image: homeservicespremium_villa },
    { title: "TURNKEY", image: homeservicesturnkey_execution },
];


const Services = () => {
    const [active, setActive] = useState<number | null>(null);

    const shouldDisplay = (currentIndex: number) => {
        if (active === null) return true;

        if (active <= 1) {
            return currentIndex <= 2;
        }

        if (active >= services.length - 2) {
            return currentIndex >= services.length - 3;
        }

        return (
            currentIndex >= active - 1 &&
            currentIndex <= active + 1
        );
    };

    return (
        <Box bg="#1C1B1A" color="white" h={{ base: "auto", lg: "100%" }}>
            <Flex
                maxW="1500px"
                // mx="auto"
                px={{
                    base: 6,
                    md: 10,
                    lg: 20,
                }}
                h={{ base: "auto", lg: "30%" }}
               
                py={{ base: 7, lg: 7 }}
                alignItems="center"
            >
                <Box>
                    <Text
                     pt={{base:8, md:6, lg:8}}
                        fontSize={{ base: "38px", lg: "50px" }}
                        fontWeight="700"
                    >
                        Services
                    </Text>

                    <Text
                        mt={2}
                        fontSize={{ base: "22px", lg: "30px" }}
                    >
                        Tailored to
                    </Text>

                    <Text
                        fontSize={{ base: "38px", lg: "50px" }}
                        fontWeight="700"
                    >
                        Your Needs
                    </Text>
                </Box>
            </Flex>

            <Flex display={{ base: "none", lg: "flex" }} h={{ lg: "100%" }} overflow="hidden" onMouseLeave={() => setActive(null)}>
                {services.map((service, index) => (
                    <Flex
                    h='700px'
                        key={service.title}
                        flex={
                            active === null
                                ? 1
                                : active === index
                                    ? 4
                                    : shouldDisplay(index)
                                        ? 1
                                        : 0
                        }
                        minW={
                            active === null
                                ? "0"
                                : shouldDisplay(index)
                                    ? "140px"
                                    : "0px"
                        }
                        opacity={
                            active === null
                                ? 1
                                : shouldDisplay(index)
                                    ? 1
                                    : 0
                        }
                        pointerEvents={
                            active === null
                                ? "auto"
                                : shouldDisplay(index)
                                    ? "auto"
                                    : "none"
                        }
                        transition="all 1.7s cubic-bezier(.22,1,.36,1)"
                        position="relative"
                        cursor="pointer"
                        overflow="hidden"
                        onMouseEnter={() => setActive(index)}
                    >
                        <Image
                            src={service.image}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            transition="transform .6s cubic-bezier(.22,1,.36,1)"
                            transform={
                                active === index
                                    ? "scale(1.08)"
                                    : "scale(1)"
                            }
                        />

                        <Box
                            position="absolute"
                            inset={0}
                            bg={
                                active === index
                                    ? "rgba(0,0,0,.20)"
                                    : "rgba(0,0,0,.45)"
                            }
                            transition="background .45s ease"
                        />

                        <Flex
                            position="absolute"
                            inset={0}
                            align="center"
                            justify="center"
                        >
                            <Text
                                letterSpacing="3px"
                                fontWeight="600"
                                whiteSpace="nowrap"
                                transform={
                                    active === index
                                        ? "translateY(-8px)"
                                        : "translateY(0)"
                                }
                                opacity={
                                    active === null || active === index
                                        ? 1
                                        : 0.7
                                }
                                transition="all .35s ease"
                            >
                                {service.title}
                            </Text>
                        </Flex>
                    </Flex>
                ))}
            </Flex>

            <Grid display={{ base: "none", md: "grid", lg: "none" }} templateColumns="repeat(2,1fr)">
                {services.map((service) => (
                    <Box key={service.title} h="320px" position="relative">
                        <Image
                            src={service.image}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                        />

                        <Box
                            position="absolute"
                            inset={0}
                            bg="rgba(0,0,0,.35)"
                        />

                        <Flex
                            position="absolute"
                            inset={0}
                            align="center"
                            justify="center"
                        >
                            <Text fontWeight="600">
                                {service.title}
                            </Text>
                        </Flex>
                    </Box>
                ))}
            </Grid>

            <Box display={{ base: "block", md: "none" }} h='290px'>
                <Swiper
                    // modules={[Pagination]}
                    className="servicesMobileSwiper"
                    slidesPerView="auto"
                    centeredSlides
                    loop
                    spaceBetween={18}
                    pagination={{
                        clickable: true,
                    }}
                >
                    {services.map((service) => (
                        <SwiperSlide
                            key={service.title}
                            style={{
                                width: "88%",
                            }}
                        >
                            <Box
                                h="240px"
                                display={'flex'}
                                justifyContent={'center'}
                                // position="relative"
                                overflow="hidden"
                                bgImage={`url(${service.image})`}
                                backgroundPosition={'center'}
                                bgSize={'cover  '}
                                bgRepeat={'no-repeat'}
                            >
                                {/* <Image
                                    src={service.image}
                                    w="100%"
                                    h="240px"
                                    objectFit="cover"
                                /> */}

                                {/* <Box
                                    position="absolute"
                                    inset={0}
                                    bg="rgba(0,0,0,.35)"
                                /> */}

                                <Flex
                                    // position="absolute"
                                    // inset={0}
                                    align="center"
                                    justify="center"
                                    justifyContent={'flex-start'}
                                    alignItems={'flex-start'}
                                    mt={2}
                                >
                                    <Text
                                        color="#fff"
                                        fontSize="13px"
                                        fontWeight="400"
                                        letterSpacing="1px"

                                        // boxShadow={'2px 3px 4px 0px #0000007D'}
                                        dropShadow={'2px 3px 4px 0px #0000007D'}
                                    >
                                        {service.title}
                                    </Text>
                                </Flex>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    )
}

export default Services