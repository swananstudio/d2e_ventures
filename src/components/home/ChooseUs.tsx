import CustomCombobox from "../../custom/CustomCombobox";
import {
    Box,
    Button,
    // createListCollection,
    Field,
    Flex,
    Input,
    // Portal,
    // Select,
    Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormValues = {
    fullName: string;
    phone: string;
    city: string;
    requirement: string[];
    otherRequirement: string;
};
const ChooseUs = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            fullName: "",
            phone: "",
            city: "",
            requirement: [],
            otherRequirement: "",
        },
    });
    const selectedRequirements = watch("requirement");
    const showOther =
        selectedRequirements?.includes("others") ?? false;
    const onSubmit = (data: FormValues) => {
        // console.log(data);

        const businessPhone = ["8265068887"];
        // const businessPhone = ["8265068887", "8080200814"];

        const requirement =
            data.requirement
                .map((item) =>
                    item === "others"
                        ? data.otherRequirement
                        : frameworks.find(f => f.value === item)?.label ?? item
                )
                .filter(Boolean)
                .join(", ") || "Not specified";

        const message = `Hello D2E Team,

I would like to book a free consultation to discuss my land and explore its development potential.

My details are as follows:

 Full Name: ${data.fullName}
 Phone Number: ${data.phone}
 City of Land: ${data.city}
 Consultation Requirement: ${requirement}

I look forward to connecting with you. Please get in touch at your earliest convenience.

Thank you!`;

        businessPhone.forEach((bp) => {
            window.open(
                `https://wa.me/${bp}?text=${encodeURIComponent(message)}`,
                "_blank"
            );
        });

        reset({
            fullName: "",
            phone: "",
            city: "",
            requirement: [],
        });
    };

    const frameworks = [
        { label: "Architecture", value: "architecture" },
        { label: "Landscape", value: "landscape" },
        { label: "Interior", value: "interior" },
        { label: "Plotting", value: "plotting" },
        { label: "Premium Villas", value: "villas" },
        { label: "Turnkey Execution", value: "turnkey" },
        { label: "Others", value: "others" },
    ]
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
                        Building a home or commercial space should be exciting, notoverwhelming. At D2E Venture, we bring together architecture,interior design, landscape planning, plotting, premium villas,and turnkey execution to provide a complete, hassle-freeexperience. With expert planning, transparent communication,and quality craftsmanship, we transform your vision intospaces that are timeless, functional, and built to exceedexpectations.
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
                    onSubmit={handleSubmit(
                        onSubmit,
                        (errors) => {
                            console.log(errors);
                        }
                    )}
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
                        Book Your Free Consultation
                    </Text>

                    <Text
                        mt={3}
                        fontSize={{
                            base: "13px",
                            md: "14px",
                        }}
                        lineHeight="1.4"
                        color="#666666"
                    >
                        Connect with our experts to explore the potential of your land.
                    </Text>

                    <Box
                        mt={3}
                        borderTop="1px dashed #777777"
                    />


                    <Field.Root mt={3} invalid={!!errors.fullName}>
                        <Field.Label
                            fontSize="14px"
                            fontWeight="500"
                            color="#1E1E1E"
                        >
                            Full Name
                        </Field.Label>

                        <Input
                            placeholder="Enter Full Name"
                            h={{
                                base: "45px",
                                md: "48px",
                            }}
                            border="1px solid #1C1B1A"
                            borderRadius="30px"
                            px={5}
                            fontSize="13px"
                            color="#1E1E1E"
                            _placeholder={{
                                color: "#777777",
                            }}
                            // _focus={{
                            //     borderColor: "#C8A96B",
                            //     boxShadow: "none",
                            // }}
                            {...register("fullName", {
                                required: "Full Name is required",
                            })}
                        />
                        <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
                    </Field.Root>


                    <Field.Root mt={4} invalid={!!errors.phone}>
                        <Text
                            // mb={2}
                            fontSize="14px"
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
                            border="1px solid #1C1B1A"
                            borderRadius="30px"
                            px={5}
                            fontSize="13px"
                            color="#1E1E1E"
                            _placeholder={{
                                color: "#777777",
                            }}
                            // _focus={{
                            //     borderColor: "#C8A96B",
                            //     boxShadow: "none",
                            // }}
                            {...register("phone", {
                                required: "Phone Number is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message:
                                        "Enter a valid 10-digit mobile number",
                                },
                            })}
                        />
                        <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root mt={4} invalid={!!errors.city}>
                        <Text
                            // mb={2}
                            fontSize="14px"
                            fontWeight="500"
                            color="#1E1E1E"
                        >
                            City of Your Land
                        </Text>

                        <Input
                            placeholder="E.g. Pune, Mumbai, Konkan"
                            h={{
                                base: "45px",
                                md: "48px",
                            }}
                            border="1px solid #1C1B1A"
                            borderRadius="30px"
                            px={5}
                            fontSize="13px"
                            color="#1E1E1E"
                            _placeholder={{
                                color: "#777777",
                            }}
                            // _focus={{
                            //     borderColor: "#C8A96B",
                            //     boxShadow: "none",
                            // }}
                            {...register("city", {
                                required: "City of your land is required",
                            })}
                        />
                        <Field.ErrorText>{errors.city?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root mt={4} invalid={!!errors.requirement}>
                        <Text
                            // mb={2}
                            fontSize="14px"
                            fontWeight="500"
                            color="#1E1E1E"
                        >
                            Tell Us About Your Requirement <Text as={'span'} color={'#666666'}> (Optional)</Text>
                        </Text>

                        <CustomCombobox
                            values={frameworks}
                            control={control}
                            multiple
                            name="requirement"
                        />

                        {/* <Select.Root collection={frameworks} w='100%' >
                            <Select.HiddenSelect />
                            <Select.Control >
                                <Select.Trigger
                                    border="1px solid #1C1B1A"
                                    h={{
                                        base: "45px",
                                        md: "48px",
                                    }}

                                    borderRadius="30px"
                                    px={5}
                                    fontSize="13px"
                                    color="#1E1E1E"
                                    _placeholder={{
                                        color: "#666666",
                                    }}
                                // _focus={{
                                //     borderColor: "#C8A96B",
                                //     boxShadow: "none",
                                // }}
                                >
                                    <Select.ValueText
                                        placeholder="Select Your Requirement"
                                        _placeholder={{ color: '#666666' }}

                                    />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.ClearTrigger />
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {frameworks.items.map((framework) => (
                                            <Select.Item item={framework} key={framework.value}>
                                                {framework.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root> */}

                        <Field.ErrorText>{errors.requirement?.message}</Field.ErrorText>
                    </Field.Root>

                    {showOther && (
                        <Field.Root mt={4} invalid={!!errors.otherRequirement}>
                            <Field.Label
                                fontSize="14px"
                                fontWeight="500"
                            >
                                Please specify
                            </Field.Label>

                            <Input
                                placeholder="Enter your requirement"
                                h={{
                                    base: "45px",
                                    md: "48px",
                                }}
                                border="1px solid #1C1B1A"
                                borderRadius="30px"
                                px={5}
                                fontSize="13px"
                                {...register("otherRequirement", {
                                    validate: (value) =>
                                        !showOther ||
                                        value.trim() !== "" ||
                                        "Please specify your requirement",
                                })}
                            />

                            <Field.ErrorText>
                                {errors.otherRequirement?.message}
                            </Field.ErrorText>
                        </Field.Root>
                    )}

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
                            bg="#1C1B1A"
                            color="#FFFFFF"
                            h="45px"
                            px={7}
                            borderRadius="10px"
                            fontSize="13px"
                            fontWeight="500"
                            // _hover={{
                            //     bg: "#C8A96B",
                            //     color: "#1C1B1A",
                            // }}
                            transition="all 0.3s ease"
                        >
                            Book Now
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default ChooseUs;