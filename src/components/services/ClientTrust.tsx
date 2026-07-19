import {
    Box,
    Flex,
    Grid,
    Image,
    Text,
} from "@chakra-ui/react";

import {
    service_client,
    design_execution,
    integrated_development,
    land_values,
    premium_project,
    transparent_coordination,
} from "../../assets/assets";

type TrustFeature = {
    icon: string;
    title: string;
    description: string;
};

const trustFeatures: TrustFeature[] = [
    {
        icon: integrated_development,
        title: "Integrated Development Approach",
        description:
            "A seamless process that brings planning, design, and execution under one roof.",
    },
    {
        icon: land_values,
        title: "Land Value Enhancement Strategy",
        description:
            "Maximizing the potential and long-term value of every parcel of land.",
    },
    {
        icon: design_execution,
        title: "Design + Execution Expertise",
        description:
            "Creative design backed by precise execution for exceptional project outcomes.",
    },
    {
        icon: premium_project,
        title: "Premium Project Positioning",
        description:
            "Thoughtfully crafted developments that stand out in quality and appeal.",
    },
    {
        icon: transparent_coordination,
        title: "Transparent Coordination System",
        description:
            "Clear communication and efficient coordination at every stage of the project.",
    },
    {
        icon: premium_project,
        title: "Premium Project Positioning",
        description:
            "Thoughtfully crafted developments that stand out in quality and appeal.",
    },
];

const ClientTrust = () => {
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
                md: "75px",
                lg: "80px",
            }}
        >
            <Box
                w="100%"
                maxW="1600px"
                mx="auto"
            >
                {/* HEADING */}
                <Flex
                    alignItems={{
                        base: "flex-start",
                        md: "flex-start",
                    }}
                    flexDirection={'column'}
                    flexWrap="nowrap"
                >
                    <Text
                        fontSize={{
                            base: "38px",
                            md: "46px",
                            lg: "52px",
                        }}
                        fontWeight="700"
                        lineHeight="1.1"
                        color="#080808"
                        flexShrink={0}
                    >
                        WHY CLIENTS

                    </Text>
                    <Flex alignItems={'flex-end'}>

                        <Text
                            fontSize={{
                                base: "38px",
                                md: "46px",
                                lg: "52px",
                            }}
                            fontWeight="700"
                            lineHeight="1.1"
                            color="#080808"
                            flexShrink={0}
                        >
                            TRUST US
                        </Text>

                        <Text
                            fontSize={{
                                base: "24px",
                                md: "30px",
                                lg: "34px",
                            }}
                            fontWeight="400"
                            lineHeight="1"
                            color="#1C1B1A"
                            mb={{
                                base: 0,
                                md: "4px",
                                lg: "5px",
                            }}
                            ml={{
                                base: 0,
                                md: 2,
                            }}
                            whiteSpace={{
                                base: "normal",
                                md: "nowrap",
                            }}
                        >
                            With Their Vision?
                        </Text>
                    </Flex>
                </Flex>

                <Box
                    mt={{
                        base: 8,
                        md: 10,
                    }}
                    w="100%"
                    h={{
                        base: "250px",
                        sm: "320px",
                        md: "400px",
                        lg: "460px",
                    }}
                    overflow="hidden"
                    borderRadius={{
                        base: "14px",
                        md: "18px",
                    }}
                >
                    <Image
                        src={service_client}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                    />
                </Box>

                {/* FEATURES */}

                <Grid
                    mt={{
                        base: 10,
                        md: 12,
                    }}
                    templateColumns={{
                        base: "1fr",
                        md: "repeat(2, 1fr)",
                    }}
                    columnGap={{
                        md: 12,
                        lg: 20,
                    }}
                    rowGap={{
                        base: 7,
                        md: 8,
                    }}
                >
                    {trustFeatures.map((feature, index) => (
                        <Flex
                            key={`${feature.title}-${index}`}
                            alignItems="flex-start"
                            gap={{
                                base: 4,
                                md: 5,
                            }}
                        >
                            <Flex
                                w={{
                                    base: "45px",
                                    md: "50px",
                                }}
                                h={{
                                    base: "45px",
                                    md: "50px",
                                }}
                                bg="#F3F2EF"
                                border="1px solid #DDDCD8"
                                borderRadius="50%"
                                alignItems="center"
                                justifyContent="center"
                                flexShrink={0}
                            >
                                <Image
                                    src={feature.icon}
                                    w={{
                                        base: "20px",
                                        md: "23px",
                                    }}
                                    h={{
                                        base: "20px",
                                        md: "23px",
                                    }}
                                    objectFit="contain"
                                />
                            </Flex>

                            <Box>
                                <Text
                                    fontSize={{
                                        base: "15px",
                                        md: "16px",
                                        lg: "17px",
                                    }}
                                    fontWeight="700"
                                    lineHeight="1.3"
                                    color="#080808"
                                >
                                    {feature.title}
                                </Text>

                                <Text
                                    mt={1}
                                    maxW="480px"
                                    fontSize={{
                                        base: "12px",
                                        md: "13px",
                                    }}
                                    lineHeight="1.45"
                                    color="#333333"
                                >
                                    {feature.description}
                                </Text>
                            </Box>
                        </Flex>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default ClientTrust;