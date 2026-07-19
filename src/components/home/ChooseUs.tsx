import {
    Box,
    Button,
    Flex,
    Input,
    Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormValues = {
    fullName: string;
    phone: string;
};
const ChooseUs = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
        reset,
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        const businessPhone = ["8265068887"];
        // const businessPhone = ["8265068887", '8080200814'];

        const message = `Hello D2E Ventures,

I would like to receive complete project details.

Name: ${data.fullName}
Phone: ${data.phone}

Please share the floor plans, brochure, pricing and site visit details.

Thank you.`;

        businessPhone.map(bp =>

            window.open(
                `https://wa.me/${bp}?text=${encodeURIComponent(
                    message
                )}`,
                "_blank"
            )
        )

        reset();
    };
    return (
        <Box
            w="100%"
            // bg="#FAF9F6"
            bgGradient={'linear-gradient(261deg, rgba(200, 169, 107, 0.1) 0%, rgba(200, 169, 107, 0.05) 30%, rgba(200, 169, 107, 0.05) 70%, rgba(200, 169, 107, 0.1) 100%)'}
            px={{
                base: 6,
                md: 10,
                lg: 20,
            }}
            py={{
                base: "70px",
                md: "90px",
                lg: "100px",
            }}
        >
            <Flex
                w="100%"
                maxW="1600px"
                mx="auto"
                direction={{
                    base: "column",
                    lg: "row",
                }}
                alignItems={{
                    base: "stretch",
                    lg: "center",
                }}
                justifyContent="space-between"
                gap={{
                    base: 14,
                    md: 16,
                    lg: 24,
                }}
            >
                {/* LEFT CONTENT */}

                <Box
                    w={{
                        base: "100%",
                        lg: "45%",
                    }}
                >
                    <Text
                        fontSize={{
                            base: "32px",
                            md: "38px",
                            lg: "42px",
                        }}
                        fontWeight="400"
                        lineHeight="1"
                        color="#1E1E1E"
                    >
                        Why
                    </Text>

                    <Text
                        mt={2}
                        fontSize={{
                            base: "42px",
                            md: "50px",
                            lg: "54px",
                        }}
                        fontWeight="700"
                        lineHeight="1"
                        color="#1E1E1E"
                    >
                        Choose Us?
                    </Text>

                    <Text
                        mt={{
                            base: 6,
                            lg: 8,
                        }}
                        maxW="600px"
                        fontSize={{
                            base: "14px",
                            md: "15px",
                            lg: "16px",
                        }}
                        lineHeight="1.7"
                        letterSpacing="0.2px"
                        color="#333333"
                    >
                        Building a home or commercial space should be exciting,
                        not overwhelming. At D2E Venture, we bring together
                        architecture, interior design, landscape planning,
                        plotting, premium villas, and turnkey execution to
                        provide a complete, hassle-free experience. With expert
                        planning, transparent communication, and quality
                        craftsmanship, we transform your vision into spaces that
                        are timeless, functional, and built to exceed
                        expectations.
                    </Text>
                </Box>


                <Box
                    w={{
                        base: "100%",
                        md: "600px",
                        lg: "45%",
                        xl: "500px",
                    }}
                    mx={{
                        base: "0",
                        md: "auto",
                        lg: "0",
                    }}
                    border="1px solid #1E1E1E"
                    borderRadius="20px"
                    px={{
                        base: 5,
                        md: 7,
                    }}
                    py={{
                        base: 6,
                        md: 7,
                    }}
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Text
                        fontSize={{
                            base: "30px",
                            md: "36px",
                            lg: "40px",
                        }}
                        fontWeight="700"
                        lineHeight="1.05"
                        color="#1E1E1E"
                    >
                        Get Complete Project
                        <br />
                        Details
                    </Text>

                    <Text
                        mt={3}
                        fontSize={{
                            base: "13px",
                            md: "14px",
                        }}
                        lineHeight="1.4"
                        color="#444444"
                    >
                        Fill In Your Details To Receive{" "}
                        <Text
                            as="span"
                            color="#C8A96B"
                        >
                            Floor Plans Details,
                            <br />
                            E Brochure, And Site Visit Assistance.
                        </Text>
                    </Text>

                    <Box
                        mt={5}
                        borderTop="1px dashed #777777"
                    />

                    {/* FULL NAME */}

                    <Box mt={5}>
                        <Text
                            mb={2}
                            fontSize="12px"
                            fontWeight="500"
                            color="#1E1E1E"
                        >
                            Full Name
                        </Text>

                        <Input
                            placeholder="Enter Full Name"
                            h={{
                                base: "45px",
                                md: "48px",
                            }}
                            border="1px solid #555555"
                            borderRadius="30px"
                            px={5}
                            fontSize="13px"
                            color="#1E1E1E"
                            _placeholder={{
                                color: "#777777",
                            }}
                            _focus={{
                                borderColor: "#C8A96B",
                                boxShadow: "none",
                            }}
                            {...register("fullName", {
                                required: "Full Name is required",
                            })}
                        />
                    </Box>

                    {/* PHONE */}

                    <Box mt={4}>
                        <Text
                            mb={2}
                            fontSize="12px"
                            fontWeight="500"
                            color="#1E1E1E"
                        >
                            Phone Number
                        </Text>

                        <Input
                            type="tel"
                            placeholder="Enter Phone Number"
                            h={{
                                base: "45px",
                                md: "48px",
                            }}
                            border="1px solid #555555"
                            borderRadius="30px"
                            px={5}
                            fontSize="13px"
                            color="#1E1E1E"
                            _placeholder={{
                                color: "#777777",
                            }}
                            _focus={{
                                borderColor: "#C8A96B",
                                boxShadow: "none",
                            }}
                            {...register("phone", {
                                required: "Phone Number is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message:
                                        "Enter a valid 10-digit mobile number",
                                },
                            })}
                        />
                    </Box>

                    {/* BUTTON */}

                    <Flex
                        mt={5}
                        justifyContent={{
                            base: "stretch",
                            sm: "flex-end",
                        }}
                    >
                        <Button
                            w={{
                                base: "100%",
                                sm: "auto",
                            }}
                            type="submit"
                            bg="#1E1E1E"
                            color="#FFFFFF"
                            h="45px"
                            px={7}
                            borderRadius="10px"
                            fontSize="13px"
                            fontWeight="500"
                            _hover={{
                                bg: "#C8A96B",
                                color: "#1E1E1E",
                            }}
                            transition="all 0.3s ease"
                        >
                            Request Details Now
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default ChooseUs;