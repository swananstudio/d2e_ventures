
import {
    Box,
    chakra,
    Flex,
    Grid,
    GridItem,
    Image,
    Text,
} from "@chakra-ui/react";
import {
    home, premium, strategy, concept, transparent,
} from '../../assets/assets'
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import TextReveal from "../../custom/TextReveal";

const features = [
    {
        icon: concept,
        title: "Concept to completion",
        subtitle: "development solutions",
    },
    {
        icon: premium,
        title: "Premium architecture",
        subtitle: "& design excellence",
    },
    {
        icon: strategy,
        title: "Strategic land development",
        subtitle: "for maximum value",
    },
    {
        icon: transparent,
        title: "Transparent execution",
        subtitle: "with quality assurance",
    },
];
const animationDelay = [
    0.5, // Feature 1
    0.5, // Feature 2
    0.9, // Feature 3
    0.9, // Feature 4
];
const IntroSection = () => {

    const MotionText = chakra(motion(Text))
    const MotionFlex = chakra(motion(Flex))
    // const MotionText = chakra(motion.p);
    const headingRef = useRef(null);

    const isInView = useInView(headingRef, {
        once: true,
        amount: 0.4,
    });


    // const revealVariant = {
    //     hidden: {
    //         y: 60,
    //         opacity: 0,
    //     },
    //     visible: {
    //         y: 0,
    //         opacity: 1,
    //         transition: {
    //             duration: 0.8,
    //             ease: [0.22, 1, 0.36, 1],
    //         },
    //     },
    // };

    return (
        <Flex
            py={{ base: "70px", lg: "110px" }}
            px={{ base: "5%", xl: "7%" }}
            bg="white"
            mb={'2.47%'}
            w='100%'
        >
            <Grid
                maxW="1500px"
                mx="auto"
                templateColumns={{
                    base: "1fr",
                    lg: "480px 1fr",
                }}
                gap={{
                    base: 16,
                    lg: 20,
                }}
                alignItems="center"
            >

                <Flex
                    justify="center"
                    position="relative"
                >
                    <Box
                        border="2px solid #444"
                        borderRadius="22px"
                        pt="18px"
                        pr="18px"
                        position="relative"
                        bgColor={'#E7E7E7'}
                    >
                        <Image
                            src={home}
                            w={{
                                base: "300px",
                                sm: "360px",
                                lg: "420px",
                            }}
                            h={{
                                base: "430px",
                                sm: "500px",
                                lg: "650px",
                            }}
                            objectFit="cover"
                            borderRadius="18px"
                        />
                        {/* <Image
                            src={introline}
                            objectFit="cover"
                            borderRadius="18px"
                            bottom={{
                                base: "-100px",
                                lg: "-110px",
                            }}
                            right={{
                                base: "45px",
                                lg: "25px",
                            }}
                            position={'absolute'}
                            zIndex={2222}
                        /> */}

                        {/* Badge */}

                        <Flex
                            position="absolute"
                            bottom={{
                                base: "-30px",
                                lg: "-40px",
                            }}
                            right={{
                                base: "-15px",
                                lg: "-35px",
                            }}
                            bg="#1E1E1E"
                            color="white"
                            borderRadius="18px"
                            px={8}
                            py={6}
                            direction="column"
                            align="center"
                            boxShadow="xl"
                        >
                            <Text
                                fontSize="58px"
                                fontWeight="700"
                                lineHeight="1"
                            >
                                5+
                            </Text>

                            <Text
                                mt={1}
                                letterSpacing="4px"
                                fontWeight="700"
                            >
                                YEARS
                            </Text>

                            <Text
                                mt={3}
                                fontSize="14px"
                                textAlign="center"
                            >
                                of Building
                                <br />
                                Maharashtra
                            </Text>
                        </Flex>
                    </Box>
                </Flex>

                {/* RIGHT */}

                <Box>
                    <Flex ref={headingRef} direction="column">
                        {/* <Box overflow="hidden"> */}
                            {/* <MotionText
                                initial={{ y: "100%" }}
                                animate={isInView ? {
                                    y: 0,
                                    transition: {
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1],
                                    }
                                } : {}}
                                fontSize={{
                                    base: "24px",
                                    lg: "34px",
                                }}
                                fontWeight="400"
                            >
                                Not Just Building Spaces.
                            </MotionText> */}
                            <TextReveal
                                baseColor="#5A5A5A"
                                revealColor="#000"
                                gap={2}
                                w='100%'
                            >
                                <Text
                                    fontSize={{
                                        base: "24px",
                                        lg: "34px",
                                    }}
                                    fontWeight="400"
                                >
                                    Not Just Building Spaces.
                                </Text>

                                <Text
                                    // mt={2}
                                    fontSize={{
                                        base: "42px",
                                        md: "56px",
                                        lg: "64px",
                                    }}
                                    fontWeight="700"
                                    lineHeight={1.2}
                                >
                                    Crafting Places
                                    <br />
                                    to Belong.
                                </Text>
                            </TextReveal>
                            
                            {/* <TextReveal
                                baseColor="#5A5A5A"
                                revealColor="#000000"
                            >
                                <>
                                    <Text
                                        className="montserrat"
                                        fontWeight="400"
                                        lineHeight="1.1"
                                        fontSize={{
                                            base: "24px",
                                            lg: "34px",
                                        }}
                                    >
                                        Not Just Building Spaces.
                                    </Text>

                                    <Text
                                        mt={2}
                                        className="montserrat"
                                        fontWeight="700"
                                        lineHeight="1.1"
                                        fontSize={{
                                            base: "42px",
                                            md: "56px",
                                            lg: "64px",
                                        }}
                                    >
                                        Crafting Places
                                        <br />
                                        to Belong.
                                    </Text>
                                </>
                            </TextReveal> */}
                        {/* </Box> */}

                        {/* <Box overflow="hidden" mt={2}>
                            <MotionText
                                initial={{ y: "100%" }}
                                animate={isInView ? {
                                    y: 0,
                                    transition: {
                                        duration: 0.8,
                                        delay: 0.2,
                                        ease: [0.22, 1, 0.36, 1],
                                    }
                                } : {}}
                                fontWeight="700"
                                lineHeight="1.1"
                                fontSize={{
                                    base: "42px",
                                    md: "56px",
                                    lg: "64px",
                                }}
                            >
                                Crafting Places
                                <br />
                                to Belong.
                            </MotionText>
                        </Box> */}

                    </Flex>

                    <MotionText
                        mt={8}
                        color="#555"
                        fontSize="17px"
                        lineHeight="1.9"
                        maxW="750px"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={isInView ? {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 1,
                                delay: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                            }
                        } : {}}
                    >
                        D2E Ventures Private Limited is an integrated
                        development consultancy specializing in premium
                        land development, luxury residences,
                        farmhouse projects, plotted developments,
                        and turnkey execution.By bringing architecture, planning,
                        engineering, and construction under one roof,
                        <Text
                            as="span"
                            fontWeight="700"
                            color="#222"

                        >
                            {" "}{" "}
                            we transform ideas into
                            high-value developments{" "}
                        </Text>
                        with precision,
                        transparency,
                        and lasting quality.
                    </MotionText>

                    <Grid
                        mt={14}
                        templateColumns={{
                            base: "1fr",
                            sm: "repeat(2,1fr)",
                        }}
                        gap={8}
                    >
                        {features.map((item, index) => (
                            <GridItem key={item.title}>
                                <MotionFlex
                                    initial={{
                                        y: '100%',
                                        opacity: 0,
                                    }}
                                    whileInView={{
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            duration: 0.8,
                                            delay: animationDelay[index],
                                            ease: "easeInOut",
                                        },
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.3,
                                    }}
                                    gap={5}
                                >
                                    <Flex
                                        w="62px"
                                        h="62px"
                                        bg="#F4F4F4"
                                        borderRadius="12px"
                                        justify="center"
                                        align="center"
                                        flexShrink={0}
                                    >
                                        <Image
                                            src={item.icon}
                                            w="28px"
                                        />
                                    </Flex>

                                    <Box>
                                        <Text
                                            fontWeight="600"
                                            fontSize="19px"
                                        >
                                            {item.title}
                                        </Text>

                                        <Text
                                            color="#555"
                                            mt={1}
                                            lineHeight="1.6"
                                        >
                                            {item.subtitle}
                                        </Text>
                                    </Box>
                                </MotionFlex>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            </Grid >
        </Flex >
    )
}

export default IntroSection