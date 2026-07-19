import Navbar from "../../layout/Navbar";
import { services } from "../../assets/assets";
import { Flex, Text } from "@chakra-ui/react";

const InnerHeroSection = () => {
    return (
        <Flex
            h="50vh"
            w="100%"
            bgImage={`url(${services})`}
            bgSize="cover"
            backgroundPosition="center"
            bgRepeat="no-repeat"
        >
            <Flex
                flexDir="column"
                w="100%"
                h="100%"
                bg="rgba(0,0,0,0.55)"
            >
                <Navbar />

                <Flex
                    flex="1"
                    justify="center"
                    align="center"
                    textAlign="center"
                    px={4}
                >
                    <Flex
                        direction="column"
                        align="center"
                        gap={5}
                        maxW="900px"
                    >
                        <Text
                            className="michroma_font"
                            fontSize={{ base: "42px", lg: "72px" }}
                            lineHeight="1.15"
                            color="white"
                            fontWeight="800"
                        >
                            About Us
                        </Text>

                        <Text
                            color="whiteAlpha.900"
                            // fontSize="20px"
                            fontWeight="400"
                        >
                            At D2E Ventures, we transform land into high-value developments through innovative design, strategic planning, and seamless execution. From concept to completion, we deliver premium projects that combine quality, functionality, and long-term value.
                        </Text>

                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default InnerHeroSection