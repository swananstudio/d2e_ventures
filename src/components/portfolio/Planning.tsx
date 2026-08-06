import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import {
  GoArrowLeft,
  GoChevronLeft,
  GoChevronRight,
} from "react-icons/go";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

const planningItems = [
  {
    title: "Contextual Planning",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Spatial Strategy",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
  {
    title: "Integrated Design",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit.",
  },
  {
    title: "Execution Planning",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const Planning = () => {
  const [active, setActive] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActive((current) => (current === index ? null : index));
  };

  return (
    <Box bg="black" color="white" minH="750px" px={{ base: 6, lg: 16 }} py={20}>
      <Flex justify="space-between" align="center" mb={{ base: 12, lg: 16 }}>
        <Flex
          as="button"
          align="center"
          gap={3}
          color="#B8965A"
          cursor="pointer"
          _hover={{ color: "#d7b47d" }}
        >
          <GoArrowLeft size={26} />
          <Text fontSize={{ base: "18px", md: "26px" }}>
            Back to Projects
          </Text>
        </Flex>

        <Flex gap={6} color="#B8965A">
          <Box as="button" _hover={{ color: "#d7b47d" }}>
            <GoChevronLeft size={28} />
          </Box>

          <Box as="button" _hover={{ color: "#d7b47d" }}>
            <GoChevronRight size={28} />
          </Box>
        </Flex>
      </Flex>


      <Box display={{ base: "block", lg: "none" }} mb={8}>
        <Text fontSize="50px" fontWeight="700" lineHeight="0.95" mb={2}>
          Planning
        </Text>

        <Text fontSize="36px" fontWeight="300" lineHeight="1">
          &amp; Strategy
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", lg: "420px minmax(0, 1fr)" }}
        gap={{ base: 12, lg: 20 }}
        alignItems="end"
      >

        <GridItem order={{ base: 2, lg: 1 }}>
          <Flex
            direction="column"
            h={{ base: "auto", lg: "550px" }}
            minH={{ base: "auto", lg: "550px" }}
          >
            <Box mt="auto">
              <LayoutGroup>
                <motion.div
                  layout
                  transition={{ duration: 0.7, ease }}
                  style={{ willChange: "transform" }}
                >

                  <Box display={{ base: "none", lg: "block" }} mb={8}>
                    <Text
                      fontSize={{ base: "50px", lg: "72px" }}
                      fontWeight="700"
                      lineHeight="0.95"
                      mb={2}
                    >
                      Planning
                    </Text>

                    <Text
                      fontSize={{ base: "36px", lg: "48px" }}
                      fontWeight="300"
                      lineHeight="1"
                    >
                      &amp; Strategy
                    </Text>
                  </Box>

                  {planningItems.map((item, index) => {
                    const isOpen = active === index;

                    return (
                      <motion.div
                        key={item.title}
                        layout
                        transition={{ duration: 0.7, ease }}
                      >
                        <Flex
                          as="button"
                          w="100%"
                          py={4}
                          justify="space-between"
                          align="center"
                          textAlign="left"
                          cursor="pointer"
                          onClick={() => toggleItem(index)}
                          aria-expanded={isOpen}
                        >
                          <Text fontSize={{ base: "19px", md: "23px" }} fontWeight="500">
                            {item.title}
                          </Text>

                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.35, ease }}
                          >
                            <Text
                              fontSize="34px"
                              lineHeight="1"
                              color={isOpen ? "#C7A46C" : "white"}
                            >
                              {isOpen ? "−" : "+"}
                            </Text>
                          </motion.div>
                        </Flex>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                height: { duration: 0.6, ease },
                                opacity: { duration: 0.25, ease: "easeOut" },
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <Box
                                border="1px solid"
                                borderColor="whiteAlpha.700"
                                borderRadius="10px"
                                px={4}
                                py={3}
                                mb={4}
                              >
                                <Text
                                  color="whiteAlpha.700"
                                  fontSize="16px"
                                  lineHeight="1.8"
                                >
                                  {item.content}
                                </Text>
                              </Box>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {!isOpen && <Box h="1px" bg="whiteAlpha.300" />}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </LayoutGroup>
            </Box>
          </Flex>
        </GridItem>


        <GridItem order={{ base: 1, lg: 2 }}>
          <Box h={{ base: "350px", lg: "550px" }} overflow="hidden" bg="gray.700">
            <Image
              src="/planning.jpg"
              alt="Planning and strategy project"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Planning;