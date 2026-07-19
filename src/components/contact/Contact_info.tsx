import {
    Box,
    Button,
    Checkbox,
    Flex,
    Grid,
    Image,
    Input,
    Text,
    Textarea,
} from "@chakra-ui/react";

import {
    blackcolormaps,
    blackcolorphone,
    blackcolormail,
    blackcolortiming,
} from "../../assets/assets";

const contactDetails = [
    {
        icon: blackcolormaps,
        title: "Location",
        value: (
            <>
                Shop no.62, Classic Gloria, Near MNGL
                <br />
                CNG Pump, Yewalewadi, Pune - 411048
            </>
        ),
    },
    {
        icon: blackcolorphone,
        title: "Contact",
        value: (
            <>
                +91 82650 68887
                <br />
                +91 80802 00814
            </>
        ),
    },
    {
        icon: blackcolormail,
        title: "Email",
        value: (
            <>
                d2eventurespvtltd@gmail.com
            </>
        ),
    },
    {
        icon: blackcolortiming,
        title: "Hours of operation",
        value: (
            <>
                Monday - Friday: 09:00 AM - 08:00 PM
                <br />
                Sunday & Saturday: 10:30 AM - 10:30 PM
            </>
        ),
    },
];

const Contact_info = () => {
    return (
        <Box
            py={{ base: 14, lg: 24 }}
            px={{ base: "5%", lg: "8%" }}
            bg="#FAF9F6"
        >
            <Grid
                maxW="1400px"
                mx="auto"
                templateColumns={{
                    base: "1fr",
                    lg: "1fr 0.95fr",
                }}
                gap={{
                    base: 14,
                    lg: 16,
                }}
                alignItems="start"
            >
                {/* LEFT */}

                <Box>
                    <Text
                        fontSize={{
                            base: "34px",
                            md: "44px",
                        }}
                        fontWeight="700"
                        lineHeight="1.1"
                    >
                        Always Here to Help You
                    </Text>

                    <Text
                        mt={4}
                        color="#555"
                        maxW="550px"
                        lineHeight="1.6"
                    >
                        Have a question, need assistance, or want to learn more
                        about our services? We are here to help. Reach out to us,
                        and we'll get back to you as soon as possible.
                    </Text>

                    <Flex
                        mt={12}
                        direction="column"
                        gap={10}
                    >
                        {contactDetails.map((item) => (
                            <Flex
                                key={item.title}
                                gap={5}
                                align="flex-start"
                            >
                                <Flex
                                    // minW="60px"
                                    minW={{ base: "45px", md: "60px" }}
                                    h={{ base: "45px", md: "60px" }}
                                    // h="60px"
                                    borderRadius="full"
                                    bg="#F4F4F4"
                                    justify="center"
                                    align="center"
                                    boxShadow="sm"
                                >
                                    <Image
                                        src={item.icon}
                                        boxSize={{ base: "20px", md: "25px" }}
                                        objectFit={'contain'}
                                    />
                                </Flex>

                                <Box>
                                    <Text
                                        fontSize="24px"
                                        fontWeight="600"
                                    >
                                        {item.title}
                                    </Text>

                                    <Text
                                        mt={2}
                                        color="#555"
                                        lineHeight="1.6"
                                    >
                                        {item.value}
                                    </Text>
                                </Box>
                            </Flex>
                        ))}
                    </Flex>
                </Box>

                {/* RIGHT */}

                <Box
                    bg="white"
                    borderRadius="24px"
                    p={{
                        base: 6,
                        md: 8,
                    }}
                    boxShadow="0 5px 25px rgba(0,0,0,.06)"
                >
                    <Text
                        fontSize={{
                            base: "32px",
                            md: "42px",
                        }}
                        fontWeight="700"
                    >
                        Ready To get Started?
                    </Text>

                    <Text
                        mt={2}
                        color="#666"
                        fontSize="14px"
                    >
                        Your email address will not be published. Required fields are marked.
                    </Text>

                    <Flex
                        mt={8}
                        direction="column"
                        gap={5}
                    >
                        <Input
                            placeholder="Full Name"
                            h="55px"
                            borderRadius="10px"
                        />

                        <Input
                            placeholder="Email"
                            h="55px"
                            borderRadius="10px"
                        />

                        <Input
                            placeholder="Phone Number"
                            h="55px"
                            borderRadius="10px"
                        />

                        <Textarea
                            placeholder="Write a message..."
                            minH="160px"
                            borderRadius="10px"
                            resize="none"
                        />

                        <Checkbox.Root>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label
                                fontSize="13px"
                                color="#333333"
                            >
                                Accept terms and privacy policy.
                            </Checkbox.Label>
                        </Checkbox.Root>

                        <Button
                            alignSelf="flex-start"
                            bg="#0E2035"
                            color="white"
                            px={8}
                            h="48px"
                            borderRadius="full"
                            _hover={{
                                bg: "#091C2A",
                            }}
                        >
                            Send Message
                        </Button>
                    </Flex>
                </Box>
            </Grid>
        </Box>
    );
};

export default Contact_info;