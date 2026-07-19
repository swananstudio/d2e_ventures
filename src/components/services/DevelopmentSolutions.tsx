import { Box, Grid, Text } from "@chakra-ui/react";

const DevelopmentSolutions = () => {
    return (
        <Box
            w="100%"
            bg="#FAF9F6"
            px={{
                base: "6%",
                md: "5%",
                lg: "3%",
            }}
            py={{
                base: "60px",
                md: "70px",
                lg: "55px",
            }}
        >
            <Grid
                w="100%"
                maxW="1600px"
                mx="auto"
                templateColumns={{
                    base: "1fr",
                    lg: "0.8fr 1.7fr",
                }}
                gap={{
                    base: 10,
                    md: 12,
                    lg: 20,
                }}
                alignItems="flex-start"
            >
                {/* LEFT CONTENT */}

                <Box>
                    <Text
                        fontSize={{
                            base: "26px",
                            md: "32px",
                            lg: "36px",
                        }}
                        fontWeight="400"
                        lineHeight="1.1"
                        color="#1C1B1A"
                    >
                        End-to-End
                    </Text>

                    <Text
                        mt={2}
                        fontSize={{
                            base: "42px",
                            md: "52px",
                            lg: "58px",
                        }}
                        fontWeight="700"
                        lineHeight="1.05"
                        color="#080808"
                    >
                        Development
                        <br />
                        Solutions
                    </Text>
                </Box>

                {/* RIGHT CONTENT */}

                <Box
                    maxW={{
                        base: "100%",
                        lg: "720px",
                    }}
                >
                    <Text
                        fontSize={{
                            base: "14px",
                            md: "16px",
                            lg: "17px",
                        }}
                        lineHeight="1.35"
                        letterSpacing="0.5px"
                        color="#1C1B1A"
                    >
                        We bring together strategic planning, innovative design,
                        and seamless execution to deliver premium developments
                        that stand the test of time.
                    </Text>

                    <Text
                        mt={{
                            base: 6,
                            lg: 5,
                        }}
                        fontSize={{
                            base: "14px",
                            md: "16px",
                            lg: "17px",
                        }}
                        lineHeight="1.35"
                        letterSpacing="0.5px"
                        color="#1C1B1A"
                    >
                        From plotting and luxury villas to architecture,
                        interiors, landscaping, and turnkey execution, our
                        integrated services ensure every project is thoughtfully
                        designed, expertly managed, and built for lasting value.
                    </Text>
                </Box>
            </Grid>
        </Box>
    );
};

export default DevelopmentSolutions;