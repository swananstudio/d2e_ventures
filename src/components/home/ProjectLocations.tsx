import {
    Box,
    chakra,
    Flex,
    Grid,
    Image,
    Text,
} from "@chakra-ui/react";

import {
    maharashtraMap,
    projectCompleted,
    // locationIcon,
    clientsIcon,
    areaIcon,
} from "../../assets/assets";
import CountUp from "../../utlis/CountUp";
import { keyframes } from "@emotion/react";
import { motion } from "motion/react";

const stats = [
    {
        icon: projectCompleted,
        end: 50,
        suffix: "+",
        label: "Projects Completed",
    },
    // {
    //     icon: locationIcon,
    //     end: 12,
    //     suffix: "+",
    //     label: "Cities\nTouched",
    // },
    {
        icon: clientsIcon,
        end: 50,
        suffix: "+",
        label: "Happy Clients",
    },
    {
        icon: areaIcon,
        end: 50,
        suffix: "K+",
        label: "Sq. Ft. Developed & Delivered",
        // label: "Sq. Ft. Developed\n& Delivered",
    },
];
const pulse = keyframes`
    0% {
        transform: scale(0.7);
    }

    50% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.7);
    }
`;
const ProjectLocations = () => {

    const MotionImage = chakra(motion(Image))
    const MotionBox = chakra(motion(Box))
    const MotionText = chakra(motion(Text))
    return (
        <Box
            bg="#1F1D1C"
            color="white"
            mt={{
                base: "-20px",
                md: "-35px",
                lg: "-55px",
            }}
            pt={{
                base: "90px",
                md: "120px",
                lg: "150px",
            }}
            pb={{
                base: "70px",
                lg: "90px",
            }}
            px={{
                base: "5%",
                xl: "7%",
            }}
            position="relative"
            zIndex={0}
        >
            <Grid
                maxW="1500px"
                mx="auto"
                templateColumns={{
                    base: "1fr",
                    lg: "0.9fr 1.1fr",
                }}
                gap={{
                    base: 12,
                    lg: 10,
                }}
                alignItems="center"
            >
                {/* Left */}

                <Flex
                    direction="column"
                    align={{
                        base: "center",
                        lg: "flex-start",
                    }}
                    textAlign={{
                        base: "center",
                        lg: "left",
                    }}
                >
                    <Text

                        fontSize="28px"
                        mb={2}
                    >
                        Rooted in
                    </Text>

                    <Text
                        fontSize={{
                            base: "42px",
                            md: "52px",
                            lg: "58px",
                        }}
                        lineHeight="1.05"
                        fontWeight="700"
                    >
                        Maharashtra,
                        <br />
                        Growing
                        <br />
                        Nationwide.
                    </Text>

                    <Text
                        mt={8}
                        lineHeight="1.9"
                        maxW="600px"
                    >
                        From Pune to Mumbai, Nagpur to Konkan & Chandrapur, D2E Ventures is shaping premium developments across Maharashtra with a commitment to quality, thoughtful planning, and exceptional execution. As our footprint continues to grow, we're extending the same integrated expertise to landmark developments across India.
                    </Text>
                </Flex>

                <Flex justify="center">
                    <Box
                        position="relative"
                        w={{
                            base: "100%",
                            md: "80%",
                            lg: "90%",
                        }}
                        maxW="650px"
                    >
                        <MotionImage
                            initial={{
                                scale: 0,
                                opacity: 0
                            }}
                            whileInView={{
                                scale: 1,
                                opacity: 1,
                                transition: { duration: 0.7 }
                            }}
                            viewport={{ once: true }}

                            src={maharashtraMap}
                            w="100%"
                            display="block"
                        />

                        {/* Mumbai */}
                        {/* Mumbai */}
                        <Box
                            position="absolute"
                            left={{ base: "4%", md: "4%" }}
                            top={{ base: "36%", md: "36%" }}
                        >
                            <MotionBox
                                initial={{
                                    scale: 0,
                                    rotate: -180,
                                    opacity: 0,
                                }}
                                whileInView={{
                                    scale: 1,
                                    rotate: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeOut",
                                        delay: 4
                                    },
                                }}
                                viewport={{ once: true }}
                                w={{ base: "10px", md: "14px" }}
                                h={{ base: "10px", md: "14px" }}
                                bg="#C8A96B"
                                borderRadius="full"
                                animation={`${pulse} 1.2s ease-in-out infinite`}
                            />

                            <MotionText
                                initial={{
                                    opacity: 0,
                                    x: -25,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.6,
                                        delay: 4
                                    },
                                }}
                                viewport={{ once: true }}
                                position="absolute"
                                left={{ base: "14px", md: "18px" }}
                                top="-8px"
                                whiteSpace="nowrap"
                                fontSize={{
                                    base: "11px",
                                    md: "13px",
                                }}
                                color="#1E1E1E"
                                fontWeight="500"
                            >
                                Mumbai
                            </MotionText>
                        </Box>

                        {/* Nashik */}
                        {/* <Box
                            position="absolute"
                            left={{ base: "16%", md: "16%" }}
                            top={{ base: "20%", md: "20%" }}
                        >
                            <MotionBox
                                initial={{
                                    y: -60,
                                    opacity: 0,
                                }}
                                whileInView={{
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 180,
                                        damping: 10,
                                        delay: 3
                                    },
                                }}
                                viewport={{ once: true }}
                                w={{ base: "8px", md: "10px" }}
                                h={{ base: "8px", md: "10px" }}
                                bg="#C8A96B"
                                borderRadius="full"
                                animation={`${pulse} 1.2s ease-in-out infinite`}
                            />

                            <MotionText
                                initial={{
                                    opacity: 0,
                                    y: -15,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 3,
                                    },
                                }}
                                viewport={{ once: true }}
                                position="absolute"
                                left={{ base: "12px", md: "16px" }}
                                top="-10px"
                                whiteSpace="nowrap"
                                fontSize={{
                                    base: "11px",
                                    md: "13px",
                                }}
                                color="#1E1E1E"
                                fontWeight="500"
                            >
                                Nashik
                            </MotionText>
                        </Box> */}

                        {/* Konkan */}
                        <Box
                            position="absolute"
                            left={{ base: "5%", md: "5%" }}
                            top={{ base: "45%", md: "45%" }}
                        >
                            <MotionBox
                                initial={{
                                    x: -60,
                                    opacity: 0,
                                }}
                                whileInView={{
                                    x: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.7,
                                        ease: "easeOut",
                                        delay: 2
                                    },
                                }}
                                viewport={{ once: true }}
                                w={{ base: "8px", md: "10px" }}
                                h={{ base: "8px", md: "10px" }}
                                bg="#C8A96B"
                                borderRadius="full"
                                animation={`${pulse} 1.2s ease-in-out infinite`}
                            />

                            <MotionText
                                initial={{
                                    opacity: 0,
                                    x: -30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 2,
                                    },
                                }}
                                viewport={{ once: true }}
                                position="absolute"
                                left={{ base: "12px", md: "16px" }}
                                top="-10px"
                                whiteSpace="nowrap"
                                fontSize={{
                                    base: "11px",
                                    md: "13px",
                                }}
                                color="#1E1E1E"
                                fontWeight="500"
                            >
                                Konkan
                            </MotionText>
                        </Box>

                        {/* Pune */}
                        <Box
                            position="absolute"
                            left={{ base: "18%", md: "18%" }}
                            top={{ base: "48%", md: "48%" }}
                        >
                            <MotionBox
                                initial={{
                                    scale: 0,
                                    y: 30,
                                    opacity: 0,
                                }}
                                whileInView={{
                                    scale: [0, 1.25, 1],
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.9,
                                        delay: 1
                                    },
                                }}
                                viewport={{ once: true }}
                                w={{ base: "14px", md: "20px" }}
                                h={{ base: "14px", md: "20px" }}
                                bg="#C8A96B"
                                borderRadius="full"
                                animation={`${pulse} 1.2s ease-in-out infinite`}
                            />

                            <MotionText
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                    x: 30
                                }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 1,
                                    },
                                }}
                                viewport={{ once: true }}
                                position="absolute"
                                left={{ base: "18px", md: "24px" }}
                                top="-6px"
                                whiteSpace="nowrap"
                                fontSize={{
                                    base: "11px",
                                    md: "13px",
                                }}
                                color="#1E1E1E"
                                fontWeight="500"
                            >
                                Pune
                            </MotionText>
                        </Box>

                        {/* Jalgaon */}
                        <Box
                            position="absolute"
                            left={{ base: "33%", md: "33%" }}
                            top={{ base: "18%", md: "18%" }}
                        >
                            <MotionBox
                                initial={{
                                    scale: 0,
                                    opacity: 0,
                                }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.7,
                                        delay: 2.5,
                                    },
                                }}
                                viewport={{ once: true }}
                                w={{ base: "10px", md: "14px" }}
                                h={{ base: "10px", md: "14px" }}
                                bg="#C8A96B"
                                borderRadius="full"
                                animation={`${pulse} 1.2s ease-in-out infinite`}
                            />

                            <MotionText
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 2.5,
                                    },
                                }}
                                viewport={{ once: true }}
                                position="absolute"
                                left={{ base: "16px", md: "20px" }}
                                top="-8px"
                                whiteSpace="nowrap"
                                fontSize={{ base: "11px", md: "13px" }}
                                color="#1E1E1E"
                                fontWeight="500"
                            >
                                Jalgaon
                            </MotionText>
                        </Box>

                        {/* Nagpur */}
                        <Box
                            position="absolute"
                            left={{ base: "75%", md: "75%" }}
                            top={{ base: "13%", md: "13%" }}
                        >
                            <MotionBox
                                initial={{
                                    scale: 0,
                                    opacity: 0,
                                }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.7,
                                        delay: 3,
                                    },
                                }}
                                viewport={{ once: true }}
                                w={{ base: "10px", md: "14px" }}
                                h={{ base: "10px", md: "14px" }}
                                bg="#C8A96B"
                                borderRadius="full"
                                animation={`${pulse} 1.2s ease-in-out infinite`}
                            />

                            <MotionText
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 3,
                                    },
                                }}
                                viewport={{ once: true }}
                                position="absolute"
                                left={{ base: "16px", md: "20px" }}
                                top="-8px"
                                whiteSpace="nowrap"
                                fontSize={{ base: "11px", md: "13px" }}
                                color="#1E1E1E"
                                fontWeight="500"
                            >
                                Nagpur
                            </MotionText>
                        </Box>

                        {/* Chandrapur */}
                        <Box
                            position="absolute"
                            left={{ base: "76%", md: "76%" }}
                            top={{ base: "30%", md: "30%" }}
                        >
                            <MotionBox
                                initial={{
                                    scale: 0,
                                    opacity: 0,
                                }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.7,
                                        delay: 3.5,
                                    },
                                }}
                                viewport={{ once: true }}
                                w={{ base: "10px", md: "14px" }}
                                h={{ base: "10px", md: "14px" }}
                                bg="#C8A96B"
                                borderRadius="full"
                                animation={`${pulse} 1.2s ease-in-out infinite`}
                            />

                            <MotionText
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 3.5,
                                    },
                                }}
                                viewport={{ once: true }}
                                position="absolute"
                                left={{ base: "16px", md: "20px" }}
                                top="-8px"
                                whiteSpace="nowrap"
                                fontSize={{ base: "11px", md: "13px" }}
                                color="#1E1E1E"
                                fontWeight="500"
                            >
                                Chandrapur
                            </MotionText>
                        </Box>
                    </Box>
                </Flex>
            </Grid>


            <Grid
                maxW="1400px"
                mx="auto"
                mt={{
                    base: 10,
                    md: 14,
                    lg: 20,
                }}
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                }}
                gap={{
                    base: 8,
                    md: 0,
                }}

                gapX={{
                    base: 4,
                    md: 0,
                }}

                pt={8}
            >
                {stats.map((item, i) => (
                    <Flex
                        key={i}
                        justify="center"
                        align="center"
                        gap={{
                            base: 3,
                            md: 6,
                        }}
                        py={{
                            base: 2,
                            md: 5,
                        }}
                        px={{
                            base: 2,
                            md: 4,
                        }}
                        borderRight={{
                            base: "none",
                            md:
                                i !== stats.length - 1
                                    ? "1px solid #C8A96B80"
                                    : "none",
                        }}
                    >
                        {/* Icon */}
                        <Flex
                            w={{
                                base: "42px",
                                md: "52px",
                                lg: "60px",
                            }}
                            justify="center"
                            align="flex-start"
                            flexShrink={0}
                            pt="4px"
                        >
                            <Image
                                src={item.icon}
                                w={{
                                    base: "28px",
                                    md: "34px",
                                    lg: "42px",
                                }}
                                h="auto"
                            />
                        </Flex>

                        {/* Text */}
                        <Box
                            flex={{ base: 1, md: 0 }}
                            textAlign="left"
                        >
                            <Text
                                color="#C8A96B"
                                fontWeight="700"
                                lineHeight="1"
                                fontSize={{
                                    base: "24px",
                                    sm: "28px",
                                    md: "30px",
                                    lg: "36px",
                                }}
                            >
                                <CountUp
                                    end={item.end}
                                    suffix={item.suffix}
                                />
                            </Text>

                            <Text
                                mt={2}
                                color="#D9D9D9"
                                lineHeight="1.5"
                                whiteSpace="pre-line"
                                fontSize={{
                                    base: "13px",
                                    sm: "13px",
                                    md: "14px",
                                    lg: "15px",
                                }}
                                w='max-content'
                            >
                                {item.label}
                            </Text>
                        </Box>
                    </Flex>
                ))}
            </Grid>
        </Box>
    );
};

export default ProjectLocations;