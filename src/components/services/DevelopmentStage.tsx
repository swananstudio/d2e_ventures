import {
    Box,
    Flex,
    Grid,
    Image,
    Text,
} from "@chakra-ui/react";
import { GoArrowUpRight } from "react-icons/go";

import {
    architecture,
} from "../../assets/assets";

type ServiceType = {
    title: string;
    description: string;
    image: string;
};

const services: ServiceType[] = [
    {
        title: "Architecture",
        description:
            "Detailed architecture that balances design, functionality, and compliance.",
        image: architecture,
    },
    {
        title: "Landscape",
        description:
            "Crafting outdoor environments that enhance beauty and usability.",
        image: architecture,
    },
    {
        title: "Interior",
        description:
            "Creating elegant interiors tailored to your lifestyle and needs.",
        image: architecture,
    },
    {
        title: "Plotting",
        description:
            "Strategic land planning for optimized layouts and maximum value.",
        image: architecture,
    },
    {
        title: "Premium Villas",
        description:
            "Designing and building bespoke villas with refined craftsmanship.",
        image: architecture,
    },
    {
        title: "Turnkey Execution",
        description:
            "End-to-end project delivery with quality, precision, and accountability.",
        image: architecture,
    },
];

const DevelopmentStage = () => {
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
                md: "80px",
                lg: "70px",
            }}
        >
            <Box
                w="100%"
                maxW="1600px"
                mx="auto"
            >
                {/* HEADING */}

                <Box
                    maxW={{
                        base: "100%",
                        md: "700px",
                        lg: "850px",
                    }}
                    mx={{
                        base: 0,
                        lg: "auto",
                    }}
                >
                    <Text
                        fontSize={{
                            base: "24px",
                            md: "30px",
                            lg: "34px",
                        }}
                        fontWeight="400"
                        lineHeight="1"
                        color="#1C1B1A"
                    >
                        Expert Services
                    </Text>

                    <Text
                        mt={3}
                        fontSize={{
                            base: "42px",
                            md: "54px",
                            lg: "62px",
                        }}
                        fontWeight="700"
                        lineHeight="1"
                        color="#080808"
                    >
                        FOR EVERY
                    </Text>

                    <Flex
                        mt={2}
                        alignItems="flex-end"
                        justifyContent={{
                            base: "flex-start",
                            md: "center",
                        }}
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Text
                            fontSize={{
                                base: "42px",
                                md: "54px",
                                lg: "62px",
                            }}
                            fontWeight="700"
                            lineHeight="1"
                            color="#080808"
                        >
                            STAGE
                        </Text>

                        <Text
                            mb={{
                                base: "3px",
                                md: "5px",
                            }}
                            fontSize={{
                                base: "22px",
                                md: "28px",
                                lg: "32px",
                            }}
                            fontWeight="400"
                            lineHeight="1"
                            color="#1C1B1A"
                        >
                            of Development
                        </Text>
                    </Flex>
                </Box>

                {/* SERVICES GRID */}

                <Grid
                    mt={{
                        base: 10,
                        md: 12,
                        lg: 14,
                    }}
                    maxW="1000px"
                    mx="auto"
                    templateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap={{
                        base: 6,
                        md: 7,
                        lg: 8,
                    }}
                >
                    {services.map((service) => (
                        <Box
                            key={service.title}
                            bg="#FFFFFF"
                            p={{
                                base: 3,
                                md: 4,
                            }}
                            borderRadius="18px"
                            boxShadow="0px 5px 14px rgba(0, 0, 0, 0.15)"
                            transition="transform 0.35s ease, box-shadow 0.35s ease"
                            cursor="pointer"
                            _hover={{
                                transform: "translateY(-6px)",
                                boxShadow:
                                    "0px 12px 25px rgba(0, 0, 0, 0.18)",
                            }}
                        >
                            {/* CARD CONTENT */}

                            <Flex
                                minH={{
                                    base: "95px",
                                    md: "105px",
                                }}
                                justifyContent="space-between"
                                alignItems="flex-start"
                                gap={3}
                            >
                                <Box>
                                    <Text
                                        fontSize={{
                                            base: "15px",
                                            md: "16px",
                                        }}
                                        fontWeight="700"
                                        lineHeight="1.2"
                                        color="#080808"
                                    >
                                        {service.title}
                                    </Text>

                                    <Text
                                        mt={2}
                                        maxW="220px"
                                        fontSize={{
                                            base: "11px",
                                            md: "12px",
                                        }}
                                        lineHeight="1.3"
                                        color="#333333"
                                    >
                                        {service.description}
                                    </Text>
                                </Box>

                                {/* ARROW */}

                                <Flex
                                    w="34px"
                                    h="34px"
                                    bg="#F1F1EF"
                                    border="1px solid #E0E0DD"
                                    borderRadius="50%"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexShrink={0}
                                    transition="all 0.3s ease"
                                    _groupHover={{
                                        bg: "#1C1B1A",
                                        color: "#FFFFFF",
                                    }}
                                >
                                    <GoArrowUpRight size={18} />
                                </Flex>
                            </Flex>

                            {/* IMAGE */}

                            <Box
                                mt={2}
                                w="100%"
                                h={{
                                    base: "250px",
                                    sm: "220px",
                                    md: "250px",
                                    lg: "260px",
                                }}
                                overflow="hidden"
                                borderRadius="14px"
                            >
                                <Image
                                    src={service.image}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    transition="transform 0.5s ease"
                                    _hover={{
                                        transform: "scale(1.05)",
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default DevelopmentStage;