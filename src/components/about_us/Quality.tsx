import { QualitySectionImg } from "../../assets/assets"

import {
    Box,
    Image,
     Text,
     Flex
} from "@chakra-ui/react";

const Quality = () => {
    return (
       <Box position="relative">
  <Image
    src={QualitySectionImg}
    w="100%"
  />

  <Flex
    position="absolute"
    inset="0"
    justify="center"
    align="center"
  >
    <Text
      className="montserrat"
      color="white"
      fontSize={{
        base: "24px",
        md: "36px",
        lg: "30px",
      }}
      fontWeight="500"
      textAlign="center"
    >
      Quality You Can Trust. Homes You'll Love.
    </Text>
  </Flex>
</Box>
    )
}

export default Quality