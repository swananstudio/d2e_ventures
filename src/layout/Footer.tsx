import {
    Box,
    Separator,
    Flex,
    Grid,
    GridItem,
    Image,
    Link,
    Text,
} from "@chakra-ui/react";

import PrivacyPolicy from "./PrivacyPolicy";
import TermsCondition from "./TermsCondition";

import {
    footerlogo,
    maps,
    phone,
    mail,
    timing,
    instagram,
    linkidin,
    // facebook,
    // twitter,
    youtube,
} from "../assets/assets";

const services = [
    "Architecture",
    "Landscape",
    "Interior",
    "Plotting",
    "Premium Villas",
    "Turnkey Execution",
];

const Footer = () => {
    return (

        <Box
            bg="#1A1A1A"
            color="white"
            borderTopRadius="40px"
            pb={0}
            px={{ base: 6, md: 10, lg: 14 }}
        // py={{ base: 5, lg: 7 }}
        >
            <Grid
                templateColumns={{
                    base: "1fr",
                    sm: "1fr 1fr",
                    lg: "1.2fr 1fr 1.5fr 1.2fr",
                }}
                gap={{ base: 10, lg: 6 }}
                py={{ base: '50px', lg: '90px' }}
            >


                <GridItem>
                    <Image
                        src={footerlogo}
                        w={{ base: "170px", md: "190px" }}
                    />
                </GridItem>

                {/* Services */}

                <GridItem>
                    <Text
                        fontWeight="700"
                        fontSize="20px"
                        mb={5}
                    >
                        Services
                    </Text>

                    <Flex
                        direction="column"
                        gap={2}
                        color="#D2D2D2"
                        fontSize="15px"
                    >
                        {services.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </GridItem>

                {/* Contact */}

                <GridItem>
                    <Text
                        fontWeight="700"
                        fontSize="20px"
                        mb={5}
                    >
                        Get in Touch
                    </Text>

                    <Flex direction="column" gap={5}>
                        <Flex gap={4} align="flex-start">
                            <Flex bgColor={'#FFFFFF0D'} p={2} border={'1px solid #FFFFFF1A'} borderRadius={'50%'}>
                                <Image
                                    src={maps}
                                    w='20px'
                                    h='20px'
                                    objectFit={'contain'}
                                />
                            </Flex>

                            <Text
                                color="#D2D2D2"
                                fontSize="14px"
                            >
                                Shop no.62, Classic Gloria,
                                <br />
                                Near MNGL CNG Pump,
                                <br />
                                Yewalewadi, Pune - 411048
                            </Text>
                        </Flex>

                        <Flex gap={4} align="center">

                            <Flex bgColor={'#FFFFFF0D'} p={2} border={'1px solid #FFFFFF1A'} borderRadius={'50%'}>
                                <Image
                                    src={phone}
                                    w='20px'
                                    h='20px'
                                    objectFit={'contain'}
                                />
                            </Flex>
                            <Flex direction="column">
                                <Text color="#D2D2D2">
                                    +91 82650 68887
                                </Text>
                                {/* 
                                <Text color="#D2D2D2">
                                    +91 80802 00814
                                </Text> */}
                            </Flex>
                        </Flex>

                        <Flex gap={4} align="center">

                            <Flex bgColor={'#FFFFFF0D'} p={2} border={'1px solid #FFFFFF1A'} borderRadius={'50%'}>
                                <Image
                                    src={mail}
                                    w='20px'
                                    h='20px'
                                    objectFit={'contain'}
                                />
                            </Flex>
                            <Flex justifyContent={'center'} direction="column">
                                <Text color="#D2D2D2">
                                    d2eventurespvtltd@gmail.com
                                </Text>

                                {/* <Text color="#D2D2D2">
                                    support@thetork.com
                                </Text> */}
                            </Flex>
                        </Flex>
                    </Flex>
                </GridItem>

                {/* Office */}

                <GridItem>
                    <Text
                        fontWeight="700"
                        fontSize="20px"
                        mb={5}
                    >
                        Office Time
                    </Text>

                    <Flex gap={4} align="flex-start">
                        <Flex bgColor={'#FFFFFF0D'} p={2} border={'1px solid #FFFFFF1A'} borderRadius={'50%'}>
                            <Image
                                src={timing}
                                w='20px'
                                h='20px'
                                objectFit={'contain'}
                            />
                        </Flex>

                        <Flex
                            direction="column"
                            color="#D2D2D2"
                            fontSize="14px"
                        >
                            <Text>
                                Monday to Friday 10.30 AM- 7.30 PM
                            </Text>
 
                            <Text mt={1}>
                                Saturday 10.30 AM - 2.00 PM
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex mt={8} gap={3}>
                        {[
                            { icon: instagram, link: 'https://www.instagram.com/d2e_ventures_designtoexecution/' },
                            { icon: linkidin, link: 'https://www.linkedin.com/company/d2eventures/' },
                            // { icon: facebook, link: '' },
                            // { icon: twitter, link: '' },
                            { icon: youtube, link: 'https://youtube.com/@d2eventuresprivatelimited?si=9c1OirBxoocuZURd' },
                        ].map((icon, index) => (

                            <Flex onClick={() => window.open(icon.link)} key={index} bgColor={'#FFFFFF0D'} p={2} border={'1px solid #FFFFFF1A'} borderRadius={'50%'}>
                                <Image
                                    src={icon.icon}
                                    w='20px'
                                    h='20px'
                                    objectFit={'contain'}
                                />
                            </Flex>

                        ))}
                    </Flex>
                </GridItem>
            </Grid>

            <Separator
                // mt={10}
                mb={2}
                // border={'1px solid #fff'}
                borderColor="#FFFFFF"
            />

            <Flex
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap={4}
            >
                <Text
                    color="#CCCCCC"
                    fontSize="14px"
                    textAlign={'center'}
                    w={{ base: '100%', md: 'max-content' }}

                >
                    © 2026 D2E Ventures PVT. LTD. All Rights Reserved.
                </Text>

                <Flex
                    justifyContent={'center'}
                    w={{ base: '100%', md: 'max-content' }}
                    alignItems={'center'}
                    gap={8}
                    fontSize="14px"
                >
                    <TermsCondition
                    trigger ={
                    <Link cursor={'pointer'} textDecoration={'underline'} color="#CCCCCC">
                        Terms & Condition
                    </Link>
                    }
                    />
                    
                    <PrivacyPolicy 
                    trigger={
                    <Link cursor={'pointer'} color="#CCCCCC" textDecoration={'underline'}>
                        Privacy Policy
                    </Link>
                    }
                    />
                    
                </Flex>
            </Flex>
            <Text textAlign={'center'} color={'#FCFBF8'} mt={4} fontWeight={200} pb={1} fontSize={'11px'}>Designed & Built by Swanan Studio.</Text>
        </Box>
    );
};

export default Footer;