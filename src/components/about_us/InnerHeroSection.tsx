import Navbar from "../../layout/Navbar";
import { about_hero_section } from "../../assets/assets";
import { Flex, Text } from "@chakra-ui/react";

const InnerHeroSection = () => {
    return (
        <Flex
            h="300px"
            w="100%"
            bgImage={`url(${about_hero_section})`}
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
                        mb={'2%'}
                    >
                        <Text
                            className="michroma_font"
                            fontSize={{ base: "42px", lg: "60px" }}
                            lineHeight="1.15"
                            color="white"
                            fontWeight="800"
                        >
                            About Us
                        </Text>

                      
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default InnerHeroSection