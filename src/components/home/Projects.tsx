import {
    Box,
    Button,
    chakra,
    Flex,
    Grid,
    // Image,
    Text,
} from "@chakra-ui/react";
import { GoArrowRight } from "react-icons/go";
import {
    // entrance, outerarea,
    servicebeforehouse, serviceafterhouse, before_home_service_mobile, after_home_service_mobile,
} from '../../assets/assets'
import ReactCompareImage from "react-compare-image";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Projects = () => {
    const MotionText = chakra(motion(Text))
    const [showHint, setShowHint] = useState(true);
    const navigate = useNavigate()
    return (
        <Box
            w="100%"
            bg="white"
            // minH={{
            //     base: "auto",
            //     lg: "100vh",
            // }}
            h='100%'
        >
            <Grid

                templateColumns={{
                    base: "1fr",
                    lg: "1fr",
                }}
            >
                {/* Left Image */}
                <Box
                    position="relative"
                    w="100%"
                    h={{
                        base: "280px",
                        md: "420px",
                        lg: "520px",
                    }}
                    overflow="hidden"
                >
                    <Box
                        h="100%"
                        w="100%"
                        css={{
                            "& > div": {
                                height: "100% !important",
                            },
                            "& img": {
                                height: "100% !important",
                                width: "100% !important",
                                objectFit: "cover",
                            },
                        }}
                    >

                        <Flex display={{ base: 'none', md: 'flex' }}>
                            <ReactCompareImage
                                leftImage={servicebeforehouse}
                                rightImage={serviceafterhouse}
                                sliderLineColor="#FFFFFF"
                                handleSize={42}
                                aspectRatio="taller"
                            // rightImageCss={{
                            //     objectPosition: 'right center'
                            // }}
                            />
                        </Flex>

                        <Flex display={{ base: 'flex', md: 'none' }}>
                            <ReactCompareImage
                                leftImage={before_home_service_mobile}
                                rightImage={after_home_service_mobile}
                                sliderLineColor="#FFFFFF"
                                handleSize={42}
                                aspectRatio="taller"
                            // rightImageCss={{
                            //     objectPosition: 'right center'
                            // }}
                            />

                        </Flex>
                    </Box>

                    {showHint && (
                        <MotionText
                            initial={{ opacity: 0 }}
                            whileInView={{
                                opacity: [0, 1, 0, 1, 0, 1, 0],
                                transition: {
                                    duration: 4,
                                    times: [
                                        0,
                                        1 / 6,
                                        2 / 6,
                                        3 / 6,
                                        4 / 6,
                                        5 / 6,
                                        1,
                                    ],
                                }


                            }}
                            viewport={{
                                once: true,
                                amount: 0.5,
                            }}
                            onAnimationComplete={() => setShowHint(false)}
                            position="absolute"
                            bottom={{
                                base: "18px",
                                md: "30px",
                            }}
                            left="50%"
                            transform="translateX(-50%)"
                            color="white"
                            fontWeight="300"
                            fontSize={{
                                base: "12px",
                                md: "16px",
                            }}
                            textShadow="0px 2px 6px rgba(0,0,0,.5)"
                            zIndex={5}
                            whiteSpace="nowrap"
                            pointerEvents="none"
                        >
                            Slide To See The Transformation
                        </MotionText>
                    )}
                </Box>


                <Flex
                    px={{
                        base: 6,
                        md: 10,
                        lg: 20,
                    }}
                    py={{
                        base: 10,
                        md: 14,
                    }}
                    direction={{
                        base: "column",
                        lg: "row",
                    }}
                    justify="space-between"
                    align="center"
                    gap={{
                        base: 10,
                        lg: 16,
                    }}
                    h='100%'
                >
                    {/* Left */}

                    <Box
                        flex={1}
                        maxW="520px"
                        color='#1C1B1A'
                    >
                        <Text
                            color="#444"
                            fontWeight="400"
                            fontSize={{
                                base: "26px",
                                md: "30px",
                            }}
                        >
                            A Contemporary
                        </Text>

                        <Text
                            mt={3}
                            fontWeight="700"
                            lineHeight="1"
                            color="#1C1B1A"
                            fontSize={{
                                base: "38px",
                                md: "50px",
                            }}
                        >
                            Farmhouse
                        </Text>

                        <Flex
                            align="flex-end"
                            gap={2}
                            wrap="wrap"
                        >
                            <Text
                                color='#1C1B1A'
                                fontWeight="700"
                                lineHeight="1"
                                fontSize={{
                                    base: "38px",
                                    md: "50px",
                                }}
                            >
                                Rooted
                            </Text>

                            <Text
                                // mb="8px"
                                lineHeight={'1.2'}
                                color="#444"
                                fontSize={{
                                    base: "22px",
                                    md: "30px",
                                }}
                            >
                                in Indian Heritage
                            </Text>
                        </Flex>


                    </Box>

                    {/* Right */}

                    <Flex
                        flexDirection={'column'}
                        justifyContent={'center'}
                        w={{
                            base: "100%",
                            md: "420px",
                        }}
                    >
                        {/* <Flex gap={4}>
                            <Image
                                src={entrance}
                                flex={1}
                                h={{
                                    base: "120px",
                                    md: "140px",
                                }}
                                borderRadius="14px"
                                objectFit="cover"
                            />

                            <Image
                                src={outerarea}
                                flex={1}
                                h={{
                                    base: "120px",
                                    md: "140px",
                                }}
                                borderRadius="14px"
                                objectFit="cover"
                            />
                        </Flex> */}
                        <Text
                            // mt={7}
                            color="#555"
                            lineHeight="1.8"
                            fontSize={{
                                base: "15px",
                                md: "16px",
                            }}
                        >
                            Kalpadhan Farm, a thoughtfully designed weekend
                            and holiday retreat where modern design,
                            vernacular architecture and Indian craftsmanship
                            come together in harmony with the landscape.
                        </Text>
                        <Button
                            mt={4}
                            w="100%"
                            h="56px"
                            bg="#1F1F1F"
                            color="white"
                            borderRadius="10px"
                            _hover={{
                                bg: "#000",
                            }}
                        >
                            <Flex
                                align="center"
                                gap={3}
                                cursor={'pointer'}
                                onClick={() => navigate('/portfolio')}
                            >
                                Explore Project
                                <GoArrowRight size={20} />
                            </Flex>
                        </Button>
                    </Flex>
                </Flex>
            </Grid >
        </Box >
    )
}

export default Projects