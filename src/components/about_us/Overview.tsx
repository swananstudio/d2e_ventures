import {
    Box,
    Flex,
    Grid,

    SimpleGrid,
    Text,
} from "@chakra-ui/react";

import Carousel from "./Carousel";

import CountUp from "../../utlis/CountUp";

const Overview = () => {
    const stats = [
        {
            key: "builtup",
            end: 50,
            suffix: "K+",
            label: "Total Built-up\nArea Designed",
        },
        {
            key: "clientsatisfaction",
            end: 5,

            suffix: "+",
            label: "Years of\nExperience",
        },
        {
            key: "ProjectDesigned",
            end: 50,
            suffix: "+",
            label: "Projects Designed",
        },
        {
            key: "SiteVisits",
            end: 500,
            suffix: "+",
            label: "Site Visits\nConducted",
        },
        {
            key: "HappyClients",
            end: 25,
            suffix: "+",
            label: "Happy Clients",
        },
        {
            key: "Approach",
            end: 100,
            suffix: "%",
            label: "Client - Centric\nApproach",
        },
    ];

    return (
        <Box
            w="100%"
            //bg="linear-gradient(140deg, #d9d9db 5%, #ffffff 50%, #c9c9ca 100%)"
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
            height="750p"


        >
            <Grid
                maxW="1600px"
                mx="auto"
                templateColumns={{
                    base: "1fr",

                    lg: "1fr 1.3fr 1fr",
                    xl: "1fr 1fr 1fr",
                }}
                justifyContent="space-between"
                columnGap={{
                    base: 12,
                    md: 16,
                    lg: 20,
                    xl: 24,
                }}
                alignItems="center"
            >
                {/* LEFT CONTENT */}

                <Flex
                    flexDirection="column"
                    alignItems={{
                        base: "center",
                        md: "stretch",
                        lg: "flex-start",
                    }}
                    textAlign={{
                        base: "center",
                        md: "left",
                    }}

                    mr="0"
                >
                    <Text
                        className="montserrat"
                        fontSize={{
                            base: "45px",
                            md: "36px",
                            lg: "38px",
                            xl: "45px",
                        }}
                        fontWeight="700"
                        lineHeight="1.2"
                        color="#080808"

                    >
                        Building More
                        <br />
                        Than Spaces
                    </Text>

                    <Text
                        mt={6}
                        maxW={{
                            base: "100%",
                            md: "100%",
                            lg: "380px",
                        }}
                        fontSize={{
                            base: "14px",
                            sm: "16px",
                            md: "18px",
                            lg: "15px",   // restore desktop
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
                        columns={{
                            base: 2,
                            md: 3,
                            lg: 2,
                        }}
                        gapX={{
                            base: 8,
                            md: 16,
                            lg: 10,
                        }}
                        gapY={{
                            base: 8,
                            md: 12,
                            lg: 10,
                        }}
                        mt={10}
                        w="100%"
                        maxW={{
                            base: "350px",
                            md: "100%",
                            lg: "350px",   // restore desktop
                        }}
                    >

                        {stats.map((stat) => (
                            <Box key={stat.key}>
                                <Text
                                    fontSize={{
                                        base: "22px",
                                        md: "28px",
                                        lg: "26px",   // restore
                                    }}
                                    fontWeight="700"
                                    color="#080808"
                                >
                                    <CountUp
                                        end={stat.end}
                                        suffix={stat.suffix}
                                    />
                                </Text>

                                <Text
                                    mt={1}
                                    fontSize={{
                                        base: "14px",
                                        sm: "16px",
                                        md: "18px",
                                        lg: "13px",   // restore
                                    }}
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
                    w={{
                        base: "300px",
                        md: "550px",
                        lg: "450px",
                    }}

                    h={{
                        base: "260px",
                        md: "450px",
                        lg: "450px",
                    }}
                    mt={{
                        base: "20px",
                        sm: "30px",
                        md: "40px",
                        lg: "20px",
                    }}

                    mb={{
                        base: "60px",
                        md: "70px",
                        lg: "0",
                    }}
                    mx="auto"
                    mr={{
                        base: "auto",
                        lg: "0",
                    }}
                >
                    <Carousel />
                </Box>

                {/* RIGHT CONTENT */}

                <Flex
                    direction="column"
                    h={{
                        base: "auto",
                        md: "auto",
                        lg: "300px",
                    }}
                    mb={{
                        base: "0",
                        md: "30px",
                        lg: "55px",
                    }}
                    justifyContent="space-between"
                    alignItems={{
                        base: "center",
                        md: "stretch",
                        lg: "flex-start",
                    }}
                    textAlign={{
                        base: "center",
                        md: "left",
                    }}
                    maxW={{
                        base: "100%",
                        md: "100%",
                        lg: "380px",
                    }}
                    mx={{
                        base: "auto",
                        md: "0",
                    }}

                >
                    <Box>
                        <Text

                            fontSize={{
                                base: "28px",
                                sm: "30px",
                                md: "34px",
                                lg: "36px",
                                xl: "38px",
                            }}
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
                            mt={4}
                            mb={6}
                            fontSize={{
                                base: "14px",
                                sm: "16px",
                                md: "18px",
                                lg: "15px",   // restore
                            }}

                            maxW={{
                                base: "100%",
                                md: "100%",
                                lg: "380px",   // restore
                            }}
                            lineHeight="1.4"
                            color="#444"

                        >
                            Every successful project is built on trust, precision, and collaboration.
                            From the first sketch to the final handover,
                            our integrated team ensures quality, transparency,
                            and timely execution at every stage.
                        </Text>
                    </Box>

                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 3,
                            lg: 1,
                        }}
                        gapX={{
                            base: 4,
                            md: 12,
                            lg: 4,
                        }}
                        gapY={{
                            base: 4,
                            md: 8,
                            lg: 4,
                        }}
                        w="100%"
                        maxW={{
                            base: "100%",
                            md: "100%",
                            lg: "380px",
                        }}
                        fontSize={{
                            base: "14px",
                            sm: "16px",
                            md: "18px",
                            lg: "14px",   // restore
                        }}
                        textAlign={{
                            base: "center",
                            md: "center",
                            lg: "left",   // restore desktop
                        }}
                        fontWeight={500}

                    >
                        <Text>• Personalized Design Consultation.</Text>
                        <Text>• Architectural Planning & Approvals</Text>
                        <Text>• Interior & Landscape Design</Text>
                        <Text>• End-to-End Turnkey Execution</Text>
                        <Text>• Dedicated Site Supervision</Text>
                        <Text>• Transparent Project Supervision</Text>
                    </SimpleGrid>
                </Flex>
            </Grid>
        </Box>
    );
};

export default Overview;