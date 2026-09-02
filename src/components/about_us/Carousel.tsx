import { useEffect,  useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  About_Us_Carousel1,
  About_Us_Carousel2,
  About_Us_Carousel3,
  About_Us_Carousel4
} from "../../assets/assets";

const MotionBox = motion(Box);

const images = [
  About_Us_Carousel1,
  About_Us_Carousel2,
  About_Us_Carousel3,
  About_Us_Carousel4
];

// Continuous interval tuned to the bloom speed
const INTERVAL_MS = 2400;

const bloomVariants = {
  enter: {
    opacity: 0,
    scale: 0.8,
    rotate: -8,
  },
  center: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Very smooth easing curve like the video
    } as const,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    } as const,
  },
};

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
      <Box position="relative" w="100%" h="100%">
        <AnimatePresence initial={false}>
          <MotionBox
            key={current}
            variants={bloomVariants}
            initial={hasMounted ? "enter" : false}
            animate="center"
            exit="exit"
            position="absolute"
            left="0"
            top={{ base: "15px", sm: "20px", md: "25px", lg: "50px" }}
            w="100%"
            h="100%"
            zIndex={2}
          >
            <Image
              src={images[current]}
              w="100%"
              h="100%"
              objectFit="cover"
              borderRadius="15px"
            />
          </MotionBox>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Carousel;