import {
    Box,
    Button,
    Checkbox,
    Field,
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
import { useForm } from "react-hook-form";
type ContactFormValues = {
    fullName: string;
    email: string;
    phone: string;
    message: string;
    acceptTerms: boolean;
};


const Contact_info = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormValues>({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            message: "",
            acceptTerms: true,
        },
    });
    const contactDetails = [
        {
            icon: blackcolormaps,
            title: "Location",
            value: (
                <>
                    Shop no.G2, Classic Gloria, Near MNGL
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
                    {/* <br />
                +91 80802 00814 */}
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
            title: "Hours of Operation",
            value: (
                <>
                    Monday - Friday: 09:00 AM - 08:00 PM
                    <br />
                    Sunday & Saturday: 10:30 AM - 10:30 PM
                </>
            ),
        },
    ];

    const onSubmit = (data: ContactFormValues) => {
        const businessPhone = ["8265068887"];
        // const businessPhone = ["8265068887", "8080200814"];

        const message = `Hello D2E Team,

My name is ${data.fullName}, and I would like to connect with you.

Contact Information:
• Email: ${data.email}
• Phone Number: ${data.phone}

Message:
${data.message || "Not provided"}

I look forward to hearing from you at your earliest convenience.

Thank you!`;

        businessPhone.forEach((bp) => {
            window.open(
                `https://wa.me/${bp}?text=${encodeURIComponent(message)}`,
                "_blank"
            );
        });

        reset();
    };
    return (
        <Box
            py={{ base: 14, lg: '110px' }}
            px={{ base: "5%", lg: "8%" }}
            bg="#FAF9F6"
        >
            <Grid
                maxW="1600px"
                // mx="auto"
                templateColumns={{
                    base: "1fr",
                    lg: "1fr 0.95fr",
                }}
                gap={{
                    base: 14,
                    lg: 16,
                }}
                alignItems="flex-start"
            >
                {/* LEFT */}

                <Box
                  pt={{
                        base: 6,
                        md: 8,
                    }}
                >
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
                                align="center"
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
                                        fontSize="20px"
                                        fontWeight="700"
                                    >
                                        {item.title}
                                    </Text>

                                    <Text
                                        mt={1}
                                        fontSize={'15px'}
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
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    bg="white"
                    borderRadius="24px"
                    p={{
                        base: 6,
                        md: 8,
                    }}
                    w="100%"
                    boxShadow="0 5px 25px rgba(0,0,0,.06)"
                >
                    <Text
                        fontSize={{
                            base: "32px",
                            md: "42px",
                        }}
                        fontWeight="700"
                    >
                        Ready to get Started?
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
                        {/* Full Name */}
                        <Field.Root invalid={!!errors.fullName}>
                            <Field.Label>Full Name</Field.Label>

                            <Input
                                placeholder="Enter Full Name"
                                h="55px"
                                borderRadius="10px"
                                {...register("fullName", {
                                    required: "Full Name is required",
                                })}
                            />

                            <Field.ErrorText>
                                {errors.fullName?.message}
                            </Field.ErrorText>
                        </Field.Root>

                        {/* Email */}
                        <Field.Root invalid={!!errors.email}>
                            <Field.Label>Email Address</Field.Label>

                            <Input
                                type="email"
                                placeholder="Enter Email Address"
                                h="55px"
                                borderRadius="10px"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                            />

                            <Field.ErrorText>
                                {errors.email?.message}
                            </Field.ErrorText>
                        </Field.Root>

                        {/* Phone */}
                        <Field.Root invalid={!!errors.phone}>
                            <Field.Label>Phone Number</Field.Label>

                            <Input
                                type="tel"
                                placeholder="Enter Phone Number"
                                h="55px"
                                borderRadius="10px"
                                {...register("phone", {
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter a valid 10-digit mobile number",
                                    },
                                })}
                            />

                            <Field.ErrorText>
                                {errors.phone?.message}
                            </Field.ErrorText>
                        </Field.Root>

                        {/* Message */}
                        <Field.Root invalid={!!errors.message}>
                            <Field.Label>Message</Field.Label>

                            <Textarea
                                placeholder="Write your message..."
                                minH="160px"
                                borderRadius="10px"
                                resize="none"
                                {...register("message", {
                                    required: "Message is required",
                                })}
                            />

                            <Field.ErrorText>
                                {errors.message?.message}
                            </Field.ErrorText>
                        </Field.Root>

                        {/* Terms */}
                        <Field.Root  invalid={!!errors.acceptTerms}>
                            <Checkbox.Root checked>
                                <Checkbox.HiddenInput
                                    {...register("acceptTerms", {
                                        required: "Please accept the terms and privacy policy.",
                                    })}
                                />

                                <Checkbox.Control />

                                <Checkbox.Label
                                    fontSize="13px"
                                    color="#333333"
                                >
                                    Accept terms and privacy policy.
                                </Checkbox.Label>
                            </Checkbox.Root>

                            <Field.ErrorText>
                                {errors.acceptTerms?.message}
                            </Field.ErrorText>
                        </Field.Root>

                        <Button
                            type="submit"
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