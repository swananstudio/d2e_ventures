import { useEffect, useState } from "react";
import { Box, Image} from "@chakra-ui/react";
import { motion } from "framer-motion";

import {
  aboutoverview1,
  aboutoverview2,
  aboutoverview3,
  aboutoverview4,
} from "../../assets/assets";

const MotionBox = motion(Box);

const images = [
  aboutoverview1,
  aboutoverview2,
  aboutoverview3,
  aboutoverview4,
];

const INTERVAL_MS = 4200;

const bloomVariants = {
  enter: {
    opacity: 0,
    scale: 0.6,
    rotate: -20,
  },
  center: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.0,
      ease: "easeOut",
    } as const,
  },
};

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

 {/*const goTo = (i: number) => {
    if (i === current) return;
    setPrevious(current);
    setCurrent(i);
  };*/}

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setPrevious(current);
      setCurrent((current + 1) % images.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [paused, current]);

  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* Image */}
      <Box
        position="relative"
        w="100%"
        h="100%"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
       
        {previous !== null && (
          <Box
            position="absolute"
            left="0"
            top={{
              base: "15px",
              sm: "20px",
              md: "25px",
              lg: "50px",
            }}
            w="100%"
            h="100%"
          >
            <Image
              src={images[previous]}
              w="100%"
              h="100%"
              objectFit="cover"
              borderRadius="15px"
            />
          </Box>
        )}

        <MotionBox
          key={current}
          variants={bloomVariants}
          initial="enter"
          animate="center"
          position="absolute"
          left="0"
          top={{
            base: "15px",
            sm: "20px",
            md: "25px",
            lg: "50px",
          }}
          w="100%"
          h="100%"
        >
          <Image
            src={images[current]}
            w="100%"
            h="100%"
            objectFit="cover"
            borderRadius="15px"
          />
        </MotionBox>
      </Box>

      {/* Dots */}
    {/*<HStack mt={6} gap={2}>
        {images.map((_, i) => (
          <Button
            key={i}
            onClick={() => goTo(i)}
            p={0}
            minW="0"
            w={i === current ? "22px" : "7px"}
            h="6px"
            borderRadius="full"
            bg={
              i === current
                ? "#f2f0ea"
                : "rgba(242,240,234,0.3)"
            }
            _hover={{
              bg:
                i === current
                  ? "#f2f0ea"
                  : "rgba(242,240,234,0.5)",
            }}
          />
        ))}
      </HStack> */}
    </Box>
  );
};

export default Carousel;