import { Accordion, Box, Flex, Text } from "@chakra-ui/react";

const faqData = [
    {
        value: "services",
        question: "What services do you offer?",
        answer:
            "Architecture, interiors, landscape, plotting, premium villas, turnkey execution, and consultancy.",
    },
    {
        value: "complete-projects",
        question: "Do you handle complete projects?",
        answer:
            "Yes, from planning and design to construction and final handover.",
    },
    {
        value: "project-types",
        question: "Do you work on residential or commercial projects?",
        answer:
            "We undertake both residential and commercial developments.",
    },
    {
        value: "consultancy",
        question: "Can I hire you only for design or consultancy?",
        answer:
            "Yes, you can opt for architecture, interiors, landscaping, or consultancy as standalone services.",
    },
    {
        value: "areas",
        question: "Which areas do you serve?",
        answer:
            "We currently serve clients across Maharashtra and are open to projects across India.",
    },
];

const Faq = () => {
    return (
        <Flex
            w="100%"
            h={{
                base: "auto",
                lg: "100%",
            }}
            // minH={{
            //     base: "auto",
            //     lg: "650px",
            // }}
            py={{ base: 3, md: 8, lg: '100px' }}
            bg="#1C1B1A"
            color="#FFFFFF"
            px={{
                base: 6,
                md: 10,
                lg: 20,
            }}
            flexDirection={'column'}
            justifyContent={'center'}
        >
            <Flex
                w="100%"
                h="100%"
                // maxW="1600px"
                // mx="auto"
                // px={{
                //     base: 6,
                //     md: 10,
                //     lg: 20,
                // }}
                py={{
                    base: "70px",
                    md: "90px",
                    lg: "0",
                }}
                // pl={{
                //     base: "6%",
                //     md: "8%",
                //     lg: "20px",
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
                    base: 14,
                    lg: 20,
                }}
            >
                {/* LEFT CONTENT */}

                <Box
                    w={{
                        base: "100%",
                        lg: "42%",
                    }}
                >
                    <Text
                        fontSize={{
                            base: "54px",
                            md: "70px",
                            lg: "82px",
                        }}
                        fontWeight="700"
                        lineHeight="1"
                        color="#FFFFFF"
                    >
                        FAQ
                    </Text>

                    <Text
                        mt={{
                            base: 3,
                            lg: 4,
                        }}
                        fontSize={{
                            base: "24px",
                            md: "30px",
                            lg: "34px",
                        }}
                        fontWeight="400"
                        color="#F1F1F1"
                    >
                        Frequently Asked Questions
                    </Text>
                </Box>

                {/* RIGHT ACCORDION */}

                <Box
                    w={{
                        base: "100%",
                        lg: "45%",
                    }}
                >
                    <Accordion.Root
                        multiple
                        collapsible
                        w="100%"
                    >
                        {faqData.map((faq) => (
                            <Accordion.Item
                                key={faq.value}
                                value={faq.value}
                                borderBottom="1px solid #FFFFFF80"
                            >
                                <Accordion.ItemTrigger
                                    py={{
                                        base: 5,
                                        md: 6,
                                    }}
                                    cursor="pointer"
                                    _hover={{
                                        color: "#C8A96B",
                                    }}
                                >
                                    <Text
                                        flex="1"
                                        textAlign="left"
                                        fontSize={{
                                            base: "15px",
                                            md: "17px",
                                            lg: "18px",
                                        }}
                                        fontWeight="400"
                                        transition="color 0.3s ease"
                                    >
                                        {faq.question}
                                    </Text>

                                    <Accordion.ItemIndicator
                                        color="#FFFFFF"
                                        fontSize="20px"
                                    />
                                </Accordion.ItemTrigger>

                                <Accordion.ItemContent>
                                    <Accordion.ItemBody
                                        pb={{
                                            base: 5,
                                            md: 6,
                                        }}
                                    >
                                        <Text
                                            maxW="90%"
                                            color="#CFCFCF"
                                            fontSize={{
                                                base: "14px",
                                                md: "15px",
                                            }}
                                            lineHeight="1.7"
                                        >
                                            {faq.answer}
                                        </Text>
                                    </Accordion.ItemBody>
                                </Accordion.ItemContent>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Faq;