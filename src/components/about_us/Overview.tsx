import {
    Box,
    Flex,
    Grid,
    Image,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";

import {
    aboutoverview1,
    aboutoverview2,
    aboutoverview3,
    aboutoverview4,
} from "../../assets/assets";
import CountUp from "../../utlis/CountUp";

const Overview = () => {
    const stats = [
        {
            key: "builtup",
            end: 10000,
            suffix: "+",
            label: "Total Built-up\nArea Designed",
        },
        {
            key: "clientsatisfaction",
            end: 4.7,
            decimals: 1,
            suffix: "/5",
            label: "Client Satisfaction\nScore",
        },
        {
            key: "yearsexperience",
            end: 4,
            suffix: "+",
            label: "Years of\nExperience",
        },
        {
            key: "visitsconducted",
            end: 500,
            suffix: "+",
            label: "Site Visits\nConducted",
        },
    ];

    return (
        <Box
            w="100%"
            bg="#0000001A"
            px={{
                base: "5%",
                md: "6%",
                lg: "3%",
            }}
            py={{
                base: "50px",
                md: "70px",
                lg: "100px",
            }}
        >
            <Grid
                maxW="1600px"
                mx="auto"
                templateColumns={{
                    base: "1fr",
                    md: "1fr",
                    lg: "1fr 1.3fr",
                    xl: "1fr 1.3fr 1fr",
                }}
                gap={{
                    base: 12,
                    md: 16,
                    lg: 10,
                    xl: 8,
                }}
                alignItems="center"
            >
                {/* LEFT CONTENT */}

                <Flex
                    flexDirection="column"
                    alignItems={{
                        base: "center",
                        md: "flex-start",
                    }}
                    textAlign={{
                        base: "center",
                        md: "left",
                    }}
                >
                    <Text
                        fontSize={{
                            base: "30px",
                            md: "36px",
                            lg: "38px",
                            xl: "42px",
                        }}
                        fontWeight="600"
                        lineHeight="1.1"
                        color="#080808"
                    >
                        Building More
                        <br />
                        Than Spaces
                    </Text>

                    <Text
                        mt={6}
                        maxW="380px"
                        fontSize={{
                            base: "14px",
                            md: "15px",
                        }}
                        lineHeight="1.4"
                        color="#444"
                    >
                        We believe every space should reflect the people it's
                        built for. By understanding your vision and paying
                        attention to every detail, we create places that are
                        thoughtful, functional, and enduring.
                    </Text>

                    <SimpleGrid
                        columns={2}
                        gapX={{
                            base: 8,
                            md: 10,
                        }}
                        gapY={10}
                        mt={10}
                        w="100%"
                        maxW="350px"
                    >
                        {stats.map((stat) => (
                            <Box >
                                <Text
                                    fontSize={{
                                        base: "22px",
                                        md: "26px",
                                    }}
                                    fontWeight="700"
                                    color="#080808"
                                >
                                    {stat.key === "builtup" && (
                                        <CountUp
                                            end={10000}
                                            suffix="+"
                                        />
                                    )}

                                    {stat.key === "clientsatisfaction" && (
                                        <CountUp
                                            end={4.7}
                                            decimals={1}
                                            suffix="/5"
                                        />
                                    )}

                                    {stat.key === "yearsexperience" && (
                                        <CountUp
                                            end={4}
                                            suffix="+"
                                        />
                                    )}

                                    {stat.key === "visitsconducted" && (
                                        <CountUp
                                            end={500}
                                            suffix="+"
                                        />
                                    )}
                                </Text>

                                <Text
                                    mt={1}
                                    fontSize="13px"
                                    lineHeight="1.2"
                                    color="#555"
                                    whiteSpace="pre-line"
                                >
                                    {stat.label}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Flex>

                {/* IMAGE COLLAGE */}

                <Box
                    position="relative"
                    h={{
                        base: "350px",
                        sm: "420px",
                        md: "500px",
                        lg: "450px",
                        xl: "500px",
                    }}
                    w="100%"
                    maxW="600px"
                    mx="auto"
                >
                    <Image
                        src={aboutoverview1}
                        position="absolute"
                        top="0"
                        left="0"
                        w="55%"
                        h={{
                            base: "100px",
                            sm: "120px",
                            md: "140px",
                        }}
                        objectFit="cover"
                        border={{
                            base: "5px solid #fff",
                            md: "8px solid #fff",
                        }}
                        borderRadius={{
                            base: "14px",
                            md: "20px",
                        }}
                        zIndex={2}
                    />

                    <Image
                        src={aboutoverview2}
                        position="absolute"
                        top={{
                            base: "80px",
                            sm: "100px",
                            md: "120px",
                        }}
                        left="15%"
                        w="70%"
                        h={{
                            base: "210px",
                            sm: "250px",
                            md: "280px",
                        }}
                        objectFit="cover"
                        borderRadius="15px"
                        zIndex={1}
                    />

                    <Image
                        src={aboutoverview3}
                        position="absolute"
                        top={{
                            base: "115px",
                            sm: "140px",
                            md: "165px",
                        }}
                        right="0"
                        w="38%"
                        h={{
                            base: "100px",
                            sm: "120px",
                            md: "140px",
                        }}
                        objectFit="cover"
                        border={{
                            base: "5px solid #fff",
                            md: "8px solid #fff",
                        }}
                        borderRadius={{
                            base: "14px",
                            md: "20px",
                        }}
                        zIndex={3}
                    />

                    <Image
                        src={aboutoverview4}
                        position="absolute"
                        bottom="0"
                        left="0"
                        w="55%"
                        h={{
                            base: "100px",
                            sm: "120px",
                            md: "140px",
                        }}
                        objectFit="cover"
                        border={{
                            base: "5px solid #fff",
                            md: "8px solid #fff",
                        }}
                        borderRadius={{
                            base: "14px",
                            md: "20px",
                        }}
                        zIndex={3}
                    />
                </Box>

                {/* RIGHT CONTENT */}

                <Flex
                    flexDirection="column"
                    gridColumn={{
                        base: "auto",
                        lg: "1 / -1",
                        xl: "auto",
                    }}
                    alignItems={{
                        base: "center",
                        md: "flex-start",
                    }}
                    textAlign={{
                        base: "center",
                        md: "left",
                    }}
                    maxW={{
                        base: "500px",
                        xl: "100%",
                    }}
                    mx={{
                        base: "auto",
                        xl: "0",
                    }}
                >
                    <Text
                        fontSize={{
                            base: "30px",
                            md: "34px",
                            lg: "36px",
                            xl: "38px",
                        }}
                        fontWeight="600"
                        lineHeight="1.15"
                        color="#080808"
                    >
                        A Commitment
                        <br />
                        That Goes Beyond
                        <br />
                        Completion
                    </Text>

                    <Text
                        mt={6}
                        fontSize={{
                            base: "14px",
                            md: "15px",
                        }}
                        lineHeight="1.4"
                        color="#444"
                        maxW="380px"
                    >
                        Every project we complete becomes a part of someone's
                        story. That's why our commitment doesn't end at
                        handover, it lives on in the spaces where people create
                        memories, grow, and thrive.
                    </Text>

                    <Flex
                        mt={6}
                        flexDirection="column"
                        gap={3}
                        fontSize="14px"
                        fontWeight="600"
                        color="#222"
                        textAlign="left"
                        maxW="380px"
                    >
                        <Text>• &nbsp;It starts with your vision.</Text>

                        <Text>
                            • &nbsp;It is brought to life through our integrated
                            process.
                        </Text>

                        <Text>
                            • &nbsp;It becomes a meaningful space.
                        </Text>

                        <Text>
                            • &nbsp;Its impact continues long after completion.
                        </Text>
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    );
};

export default Overview;