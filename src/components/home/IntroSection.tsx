
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Image,
    Text,
} from "@chakra-ui/react";
import {
    home, premium, strategy, concept, transparent,
} from '../../assets/assets'

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

const IntroSection = () => {
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
                        mt={2}
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

                    <Text
                        mt={8}
                        color="#555"
                        fontSize="17px"
                        lineHeight="1.9"
                        maxW="760px"
                    >
                        D2E Ventures Private Limited is an integrated
                        development consultancy specializing in premium
                        land development, luxury residences,
                        farmhouse projects, plotted developments,
                        and turnkey execution.

                        <br />
                        <br />

                        By bringing architecture, planning,
                        engineering, and construction under one roof,
                        <Text
                            as="span"
                            fontWeight="700"
                            color="#222"
                        >
                            {" "}
                            we transform ideas into
                            high-value developments{" "}
                        </Text>
                        with precision,
                        transparency,
                        and lasting quality.
                    </Text>

                    <Grid
                        mt={14}
                        templateColumns={{
                            base: "1fr",
                            sm: "repeat(2,1fr)",
                        }}
                        gap={8}
                    >
                        {features.map((item) => (
                            <GridItem key={item.title}>
                                <Flex gap={5}>
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
                                </Flex>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            </Grid>
        </Flex>
    )
}

export default IntroSection