import { useEffect, useRef, useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Box, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react"

import Navbar from "../layout/Navbar"
import PortfolioProject1 from "../components/portfolio/PortfolioProject1"
import PortfolioProject2 from "../components/portfolio/PortfolioProject2"
import PortfolioProject3 from "../components/portfolio/PortfolioProject3"
import PortfolioProject4 from "../components/portfolio/PortfolioProject4"
import PortfolioProject5 from "../components/portfolio/PortfolioProject5"
import { maps, areasize } from "../assets/assets"

const projectsData = [
  {
    Component: PortfolioProject1,
    titleLine1: "KALPADHAN",
    titleLine2: "FARM",
    location: "Pune, Maharashtra",
    area: "22,000 Sq.ft.",
    description:
      "      A farm development project thoughtfully designed to reflect Indian culture through its architecture, materials, and spatial experience. Nestled amidst lush farmland, it features a personalized residence with curated interiors and a private swimming pool. ",
  },
  {
    Component: PortfolioProject2,
    titleLine1: "GOODWILL",
    titleLine2: "CRESCENT",
    location: "Pune, Maharashtra",
    area: "22,000 Sq.ft.",
    description:
      "A vibrant resort concept shaped around leisure, recreation, and immersive guest experiences. The project combines expressive interiors, landscaped courtyards, private pool spaces, and playful outdoor amenities to create a destination that feels relaxed, engaging, and distinctly memorable.",
  },
  {
    Component: PortfolioProject3,
    titleLine1: "KOLVAN",
    titleLine2: "RESORT",
    location: "Pune, Maharashtra",
    area: "3,800 Sq.ft.",
    description:
      "A contemporary villa envisioned as a luxurious escape that embraces Mahabaleshwar's natural character. The design aims to merge seamlessly with its surroundings while maintaining a distinctly modern identity through clean forms, large glass openings, and carefully crafted outdoor spaces.",
  },
  {
    Component: PortfolioProject4,
    titleLine1: "MAHABALESHWAR",
    titleLine2: "VILLA",
    location: "Mahabaleshwar, Maharashtra",
    area: "Ongoing",
    description:
      "A contemporary villa envisioned as a luxurious escape that embraces Mahabaleshwar's natural character. The design aims to merge seamlessly with its surroundings while maintaining a distinctly modern identity through clean forms, large glass openings, and carefully crafted outdoor spaces.",
  },
  {
    Component: PortfolioProject5,
    titleLine1: "URLI KANCHAN",
    titleLine2: "OLD AGE HOME",
    location: "Urli Kanchan, Maharashtra",
    area: "Completed",
    description:
      "A thoughtfully planned senior living environment shaped around safety, familiarity, and everyday comfort. Set within a quiet agricultural landscape, the old age home uses a simple and practical architectural language, generous semi-open spaces, natural light, and familiar domestic-scale interiors to create a place that feels welcoming rather than institutional.",
  },
]

const TRANSITION_MS = 1300

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const isSmallMedium =
    useBreakpointValue({ base: true, lg: false }) ?? true
  const [direction, setDirection] = useState<1 | -1>(1)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const isAnimatingRef = useRef(false)
  const touchStartY = useRef<number | null>(null)
  const animationTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    const prevHeight = document.body.style.height

    document.body.style.overflow = "hidden"
    document.body.style.height = "100%"

    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.height = prevHeight

      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  const goToIndex = useCallback(
    (target: number, dir: 1 | -1) => {
      if (
        isAnimatingRef.current ||
        target === activeIndex
      ) {
        return
      }

      isAnimatingRef.current = true

      setDirection(dir)
      setActiveIndex(target)

      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current)
      }

      animationTimeoutRef.current = window.setTimeout(() => {
        isAnimatingRef.current = false
        animationTimeoutRef.current = null
      }, TRANSITION_MS)
    },
    [activeIndex]
  )

  const goDelta = useCallback(
    (dir: 1 | -1) => {
      const next =
        (activeIndex + dir + projectsData.length) %
        projectsData.length

      goToIndex(next, dir)
    },
    [activeIndex, goToIndex]
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let wheelAccum = 0
    let resetTimer: number | null = null

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isAnimatingRef.current) return

      wheelAccum += e.deltaY

      if (resetTimer !== null) window.clearTimeout(resetTimer)
      resetTimer = window.setTimeout(() => {
        wheelAccum = 0
      }, 150)

      const THRESHOLD = 40
      if (Math.abs(wheelAccum) < THRESHOLD) return

      const dir = wheelAccum > 0 ? 1 : -1
      wheelAccum = 0
      goDelta(dir as 1 | -1)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return
      const dy = touchStartY.current - e.changedTouches[0].clientY
      touchStartY.current = null
      if (Math.abs(dy) < 45 || isAnimatingRef.current) return
      goDelta(dy > 0 ? 1 : -1)
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchend", onTouchEnd)
      if (resetTimer !== null) window.clearTimeout(resetTimer)
    }
  }, [goDelta, isSmallMedium])

  const active = projectsData[activeIndex]


  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        zIndex={30}
      >
        <Navbar />
      </Box>

      <Box
        ref={containerRef}
        position="fixed"
        inset={0}
        overflow="hidden"
        bg="black"
      >
        {/* Every project's background + cards stay mounted */}
        {projectsData.map(({ Component }, i) => (
          <Box
            key={i}
            position="absolute"
            inset={0}
            bg="black"
            zIndex={i === activeIndex ? 2 : 1}
            pointerEvents={
              i === activeIndex ? "auto" : "none"
            }
          >
            <Component
              isActive={i === activeIndex}
              direction={direction}
            />
          </Box>
        ))}

        {/* Shared text carousel */}
    
<Box
  position="absolute"
  zIndex={5}
  color="white"
  left={{ base: "6%", md: "6%", lg: "3%" }}
  top={{ base: "80px", sm: "88px", md: "96px", lg: "auto" }}
  bottom={{ base: "auto", lg: "8%" }}
  w={{ base: "88%", md: "78%", lg: "42%" }}
  maxH={{ base: "none", md: "none", lg: "none" }}
  pointerEvents="none"
  overflow="visible"
  css={{
    "@media (max-width: 767px) and (min-height: 900px)": {
      "& .portfolio-responsive-title": {
        fontSize: "36px",
      },
      "& .portfolio-responsive-subtitle": {
        fontSize: "24px",
      },
      "& .portfolio-responsive-description": {
        fontSize: "14px",
      },
    },
  }}
>
          <AnimatePresence
            mode="sync"
            initial={false}
          >
            <motion.div
              key={activeIndex}
              initial={{
                y: 0,
                opacity: isSmallMedium ? 1 : 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 0,
                opacity: isSmallMedium ? 1 : 0,
              }}
              transition={{
                duration: isSmallMedium ? 0 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                willChange: isSmallMedium ? "auto" : "transform, opacity",
              }}
            >
              <Text
              mt={{base: 6}}
              fontSize={{
                  base: activeIndex === 3 ? "26px" : "32px",
                  sm: activeIndex === 3 ? "34px" : "42px",
                  md: activeIndex === 3 ? "44px" : "52px",
                  lg: activeIndex === 3 ? "64px" : "79px",
                }}
lineHeight="0.95"
                fontWeight="700"
              >
                {active.titleLine1}
              </Text>

              <Text
                mt={{ base: 1, md: 2, lg: 2 }}
                fontSize={{
                  base: "22px",
                  sm: "28px",
                  md: "34px",
                  lg: "45px",
                }}
                fontWeight="300"
              >
                {active.titleLine2}
              </Text>

              <Flex
               
               mt={{ base: 3, md: 3, lg: 8 }}
                gap={{ base: 3, md: 5, lg: 6 }}
                fontSize={{ base: "14px", md: "15px", lg: "16px" }}

                flexWrap="wrap"
                color="#F5F5F5"
               
              >
                <Flex align="center" gap={2}>
                  <Image src={maps} w="14px" />
                  <Text fontWeight="700">
                    {active.location}
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Image src={areasize} w="18px" />
                  <Text fontWeight="700">
                    {active.area}
                  </Text>
                </Flex>
              </Flex>

              <Text
                
                color="#F4F4F4"
              
               mt={{ base: 2, md: 3, lg: 5 }}
                fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "15.5px" }}
                lineHeight="1.8"

                letterSpacing="0.02em"
              >
                {active.description}
              </Text>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Position dots */}
        <Box
          position="absolute"
          right="20px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={15}
          display={{ base: "none", lg: "flex" }}
          flexDirection="column"
          gap="10px"
        >
          {projectsData.map((_, i) => (
            <Box
              key={i}
              as="button"
              onClick={() => {
                if (
                  i === activeIndex ||
                  isAnimatingRef.current
                ) {
                  return
                }

                goToIndex(
                  i,
                  i > activeIndex ? 1 : -1
                )
              }}
              w={
                i === activeIndex
                  ? "10px"
                  : "6px"
              }
              h={
                i === activeIndex
                  ? "10px"
                  : "6px"
              }
              borderRadius="full"
              bg={
                i === activeIndex
                  ? "white"
                  : "whiteAlpha.500"
              }
              transition="all 0.3s ease"
              cursor="pointer"
            />
          ))}
        </Box>
      </Box>
    </>
  )
}

export default Portfolio