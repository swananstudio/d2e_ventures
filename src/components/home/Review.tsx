import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Mousewheel } from "swiper/modules";

import "swiper/css";

import { homereview1, homereview2, homereview3, homereview4 } from "../../assets/assets";

type ReviewType = {
    review: string;
    name: string;
    location: string;
    image: string;
    dark?: boolean;
};

const reviews: ReviewType[] = [
    {
        review:
            "From our very first consultation, we knew we were in safe hands. D2E team handled everything, from architectural planning to interiors and final execution for our bungalow in Pune. The final outcome exceeded our expectations.",
        name: "Rohit & Pooja Kulkarni",
        location: "Pune",
        image: homereview1,
    },
    {
        review:
            "I approached D2E Ventures for my office in Nashik. Every phase of the project was managed professionally, from planning to execution. Their project management, regular updates, and quality control gave me complete confidence. Delivered on time, exactly as I envisioned.",
        name: "Shreyas Deshmukh",
        location: "Nashik",
        image: homereview2,
        dark: true,
    },
    {
        review:
            "Designing our first home was a big decision, and the whole team made the entire journey effortless. They understood our lifestyle, suggested practical solutions, and created interiors that matched our vision. They took care of everything while we focused on our family.",
        name: "Neha & Aditya Patil",
        location: "Kolhapur",
        image: homereview3,
    },
    {
        review:
            "After consulting multiple firms across Maharashtra, we chose D2E Ventures for their complete end-to-end solutions. Their team guided us from plot planning and design consultation to construction and interiors. We highly recommend D2E Venture to anyone looking for a reliable architecture and construction partner.",
        name: "Dr. Akshay & Dr. Rutuja Joshi",
        location: "Sangli",
        image: homereview4,
        dark: true,
    },
];

const Review = () => {
    return (
        <Box
            w="100%"
            h={{ base: "auto", lg: "700px" }}
            minH={{ base: "auto", lg: "700px" }}
            bg="#FAF9F6"
            overflow="hidden"
        >
            <Flex
                h="100%"
                // maxW="1500px"
                // mx="auto"
                px={{
                    base: 6,
                    md: 10,
                    lg: 20,
                }}
                // pl={{
                //     base: "6%",
                //     md: "8%",
                //     lg: "20px",
                // }}
                py={{
                    base: "50px",
                    md: "80px",
                    lg: "0",
                }}
                // pt={{
                //     base: "25px",
                //     md: "80px",
                //     lg: "0",
                // }}
                direction={{
                    base: "column",
                    lg: "row",
                }}
                alignItems={{
                    base: "flex-start",
                    lg: "center",
                }}
                justifyContent="space-between"
                gap={{
                    base: 8,
                    lg: 20,
                }}

            >

                <Box
                    w={{
                        base: "100%",
                        lg: "42%",
                    }}
                >
                    <Text
                        fontSize={{
                            base: "30px",
                            md: "38px",
                            lg: "40px",
                        }}
                        lineHeight="1.2"
                        color="#000000"
                        fontWeight="400"
                    >
                        Why people
                        <br />
                        keep
                    </Text>

                    <Text
                        mt={3}
                        fontSize={{
                            base: "48px",
                            md: "58px",
                            lg: "60px",
                        }}
                        lineHeight="1"
                        color="#000000"
                        fontWeight="700"
                    >
                        Coming
                        <br />
                        Back?
                    </Text>
                </Box>

                <Flex
                    display={{ base: "none", lg: "flex" }}
                    w={{ base: "100%", lg: "32%", }}
                    // boxShadow=' rgba(0, 0, 0, 0.45) 0px -25px 20px -20px'
                    alignItems={'flex-end'}
                    h='90%'
                    position={'relative'}
                >
                    {/* <Box position={'absolute'} top={0} w='100%' left={0} bgColor={'red'} filter={'blur(5px)'}></Box> */}
                    <Flex


                        h="100%"
                        w="100%"
                        overflow="hidden"

                    >
                        <Swiper
                            direction="vertical"
                            slidesPerView="auto"
                            spaceBetween={18}
                            loop={true}
                            speed={5000}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            mousewheel={{
                                forceToAxis: true,
                                releaseOnEdges: false,
                            }}
                            modules={[Mousewheel, Autoplay]}
                            style={{
                                width: "100%",
                                height: "700px",
                            }}
                        >
                            {reviews.map((review, index) => (
                                <SwiperSlide
                                    key={index}
                                    style={{
                                        height: "auto",
                                    }}
                                >
                                    <Box
                                        bg={review.dark ? "#1C1B1A" : "#FFFFFF"}
                                        color={review.dark ? "#FFFFFF" : "#1C1B1A"}
                                        border="1px solid"
                                        borderColor="#E6E6E6"
                                        borderRadius="18px"
                                        px={{
                                            base: 5,
                                            md: 7,
                                        }}
                                        py={{
                                            base: 5,
                                            md: 6,
                                        }}
                                        // boxShadow={
                                        //     review.dark
                                        //         ? "none"
                                        //         : "0px 4px 5px rgba(0,0,0,0.18)"
                                        // }
                                    >
                                        <Text
                                            fontSize={{
                                                base: "14px",
                                                md: "18px",
                                            }}
                                            lineHeight="1.55"
                                            letterSpacing="0.2px"
                                        >
                                            {review.review}
                                        </Text>

                                        <Flex
                                            mt={4}
                                            alignItems="center"
                                            gap={4}
                                        >
                                            <Image
                                                src={review.image}
                                                w={{
                                                    base: "45px",
                                                    md: "55px",
                                                }}
                                                h={{
                                                    base: "45px",
                                                    md: "55px",
                                                }}
                                                borderRadius="50%"
                                                objectFit="cover"
                                            />

                                            <Box>
                                                <Text
                                                    fontSize={{
                                                        base: "13px",
                                                        md: "15px",
                                                    }}
                                                    fontWeight="600"
                                                >
                                                    {review.name}
                                                </Text>

                                                <Flex
                                                    mt={1}
                                                    w="max-content"
                                                    px={3}
                                                    py="1px"
                                                    border="1px solid"
                                                    borderColor={
                                                        review.dark
                                                            ? "#777"
                                                            : "#CCC"
                                                    }
                                                    borderRadius="20px"
                                                >
                                                    <Text
                                                        fontSize="11px"
                                                        lineHeight="1.2"
                                                    >
                                                        {review.location}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Flex>
                </Flex>
                <Box
                    display={{ base: "block", lg: "none" }}
                    w="100%"
                // mt={10}
                >
                    <Swiper
                        className="reviewCreativeSwiper"
                        grabCursor
                        effect="creative"
                        // loop
                        centeredSlides
                        loop={true}
                        speed={2000}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                            stopOnLastSlide: false,
                        }}
                        mousewheel={{
                            forceToAxis: true,
                            releaseOnEdges: false,
                        }}

                        modules={[EffectCreative, Autoplay, Mousewheel]}
                        creativeEffect={{
                            prev: {
                                shadow: true,
                                translate: [0, 0, -400],
                            },
                            next: {
                                translate: ["100%", 0, 0],
                            },
                        }}
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    h="340px"
                                    bg={review.dark ? "#1C1B1A" : "#FFFFFF"}
                                    color={review.dark ? "#FFFFFF" : "#1C1B1A"}
                                    border="1px solid"
                                    borderColor="#E6E6E6"
                                    borderRadius="18px"
                                    p={5}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="space-between"
                                    // boxShadow={
                                    //     review.dark
                                    //         ? "none"
                                    //         : "0px 8px 24px rgba(0,0,0,.15)"
                                    // }
                                >
                                    <Text
                                        fontSize="14px"
                                        lineHeight="1.7"
                                        // overflow="hidden"
                                        css={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 9,
                                            WebkitBoxOrient: "vertical",
                                        }}
                                    >
                                        {review.review}
                                    </Text>

                                    <Flex
                                        mt={6}
                                        align="center"
                                        gap={4}
                                    >
                                        <Image
                                            src={review.image}
                                            w="50px"
                                            h="50px"
                                            borderRadius="full"
                                            objectFit="cover"
                                        />

                                        <Box>
                                            <Text
                                                fontWeight="600"
                                                fontSize="14px"
                                            >
                                                {review.name}
                                            </Text>

                                            <Flex
                                                mt={1}
                                                px={3}
                                                py="2px"
                                                borderRadius="20px"
                                                border="1px solid"
                                                borderColor={
                                                    review.dark ? "#666" : "#DDD"
                                                }
                                                w="fit-content"
                                            >
                                                <Text fontSize="11px">
                                                    {review.location}
                                                </Text>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Flex>
        </Box>
    );
};

export default Review;