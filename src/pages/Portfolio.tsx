import { memo, useEffect, useRef, useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Box, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react"

import Navbar from "../layout/Navbar"
import { useLocation } from "react-router"
import PortfolioProject1 from "../components/portfolio/PortfolioProject1"
import PortfolioProject2 from "../components/portfolio/PortfolioProject2"
import PortfolioProject3 from "../components/portfolio/PortfolioProject3"
import PortfolioProject4 from "../components/portfolio/PortfolioProject4"
import PortfolioProject5 from "../components/portfolio/PortfolioProject5"
import { maps, areasize } from "../assets/assets"
import { useSEO } from "../custom/useSEO"

type ProjectSceneProps = { isActive?: boolean; direction?: 1 | -1 }

const areProjectScenePropsEqual = (
  previous: ProjectSceneProps,
  next: ProjectSceneProps,
) =>
  previous.isActive === next.isActive &&
  (!next.isActive || previous.direction === next.direction)

const Project1Scene = memo(PortfolioProject1, areProjectScenePropsEqual)
const Project2Scene = memo(PortfolioProject2, areProjectScenePropsEqual)
const Project3Scene = memo(PortfolioProject3, areProjectScenePropsEqual)
const Project4Scene = memo(PortfolioProject4, areProjectScenePropsEqual)
const Project5Scene = memo(PortfolioProject5, areProjectScenePropsEqual)

const projectsData = [
  {
    Component: Project1Scene,
    titleLine1: "KALPADHAN",
    titleLine2: "FARM",
    location: "Pune, Maharashtra",
    area: "22,000 Sq.ft.",
    description:
      "      A farm development project thoughtfully designed to reflect Indian culture through its architecture, materials, and spatial experience. Nestled amidst lush farmland, it features a personalized residence with curated interiors and a private swimming pool. ",
  },
  {
    Component: Project2Scene,
    titleLine1: "KOLVAN",
    titleLine2: "RESORT",
    location: "Pune, Maharashtra",
    area: "3,800 Sq.ft.",
    description:
      "A contemporary villa envisioned as a luxurious escape that embraces Mahabaleshwar's natural character. The design aims to merge seamlessly with its surroundings while maintaining a distinctly modern identity through clean forms, large glass openings, and carefully crafted outdoor spaces.",
  },
  {
    Component: Project3Scene,
    titleLine1: "GOODWILL",
    titleLine2: "CRESCENT",
    location: "Pune, Maharashtra",
    area: "22,000 Sq.ft.",
    description:
      "A vibrant resort concept shaped around leisure, recreation, and immersive guest experiences. The project combines expressive interiors, landscaped courtyards, private pool spaces, and playful outdoor amenities to create a destination that feels relaxed, engaging, and distinctly memorable.",
  },
   {
    Component: Project4Scene,
    titleLine1: "URLI KANCHAN",
    titleLine2: "OLD AGE HOME",
    location: "Urli Kanchan, Maharashtra",
    area: "Completed",
    description:
      "A thoughtfully planned senior living environment shaped around safety, familiarity, and everyday comfort. Set within a quiet agricultural landscape, the old age home uses a simple and practical architectural language, generous semi-open spaces, natural light, and familiar domestic-scale interiors to create a place that feels welcoming rather than institutional.",
  },
  {
    Component: Project5Scene,
    titleLine1: "MAHABALESHWAR",
    titleLine2: "VILLA",
    location: "Mahabaleshwar, Maharashtra",
    area: "Ongoing",
    description:
      "A contemporary villa envisioned as a luxurious escape that embraces Mahabaleshwar's natural character. The design aims to merge seamlessly with its surroundings while maintaining a distinctly modern identity through clean forms, large glass openings, and carefully crafted outdoor spaces.",
  },
 
]

const TRANSITION_MS = 1000
const TEXT_TRANSITION_DURATION = 1.0

const Portfolio = () => {

useSEO({
    title: "Our Projects | 50+ Projects Completed Across Maharashtra",
    description: "Explore 50+ completed projects - premium villas, farmhouses & plotted developments in Pune, Mumbai, Konkan & beyond. See the vision. See it built.",
    canonical: "https://www.d2eventures.com/portfolio",
    ogImage: "https://www.d2eventures.com/images/portfolio-hero.jpg",
  });

  const [activeIndex, setActiveIndex] = useState(0)
  const isSmallMedium =
    useBreakpointValue({ base: true, lg: false }) ?? true
  const [direction, setDirection] = useState<1 | -1>(1)
  const [transitioningFromIndex, setTransitioningFromIndex] = useState<number | null>(null)
  const location = useLocation()

  // Keep the first-project text hidden until the portfolio route has actually
  // mounted/settled, then trigger the same entrance motion as the Home hero.
  // This guarantees the animation is visible instead of being painted at its
  // final position before Framer Motion gets a chance to animate it.
  const [isDesktopEntry] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 992
  )
  const [entryReady, setEntryReady] = useState(false)
  const [entryAnimationKey, setEntryAnimationKey] = useState(0)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const isAnimatingRef = useRef(false)
  const touchStartY = useRef<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const animationTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (location.pathname !== "/portfolio") return

    setEntryReady(false)
    setEntryAnimationKey((key) => key + 1)

    let secondFrame: number | null = null
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setEntryReady(true)
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      if (secondFrame !== null) {
        window.cancelAnimationFrame(secondFrame)
      }
    }
  }, [location.pathname])

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
      setTransitioningFromIndex(activeIndex)
      setActiveIndex(target)

      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current)
      }

      animationTimeoutRef.current = window.setTimeout(() => {
        isAnimatingRef.current = false
        setTransitioningFromIndex(null)
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
      const touch = e.touches[0]
      if (!touch) return
      touchStartY.current = touch.clientY
      touchStartX.current = touch.clientX
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || touchStartX.current === null) return
      const touch = e.changedTouches[0]
      if (!touch) return

      const dy = touchStartY.current - touch.clientY
      const dx = touch.clientX - touchStartX.current
      touchStartY.current = null
      touchStartX.current = null

      // Project navigation owns vertical gestures only. Horizontal gestures
      // are reserved for the project-card carousel.
      if (Math.abs(dy) < 45 || Math.abs(dy) <= Math.abs(dx) || isAnimatingRef.current) return
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
            zIndex={i === activeIndex ? 3 : i === transitioningFromIndex ? 2 : 1}
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
          <AnimatePresence mode="sync" initial>
            <motion.div
              key={isSmallMedium ? "portfolio-text-static" : `${activeIndex}-${entryAnimationKey}`}
              initial={
                isSmallMedium
                  ? false
                  : isDesktopEntry
                    ? { y: 1000, opacity: 0, scale: 0.5 }
                    : { y: 0, opacity: 1, scale: 1 }
              }
              animate={
                isSmallMedium
                  ? { y: 0, opacity: 1, scale: 1 }
                  : isDesktopEntry && !entryReady
                    ? { y: 1000, opacity: 0, scale: 0.5 }
                    : { y: 0, opacity: 1, scale: 1 }
              }
              exit={
                isSmallMedium
                  ? undefined
                  : {
                      y: -100,
                      opacity: 0,
                      scale: 1,
                      transition: {
                        duration: TEXT_TRANSITION_DURATION,
                        ease: "easeInOut",
                      },
                    }
              }
              transition={
                isSmallMedium
                  ? { duration: 0 }
                  : {
                      duration: TEXT_TRANSITION_DURATION,
                      ease: "easeInOut",
                    }
              }
              style={{
                willChange: isSmallMedium ? "auto" : "transform, opacity",
              }}
            >
              <Text
              mt={{base: 6}}
              fontSize={{
                  base: activeIndex === 4 ? "26px" : "32px",
                  sm: activeIndex === 4 ? "34px" : "42px",
                  md: activeIndex === 4 ? "44px" : "52px",
                  lg: activeIndex === 4 ? "64px" : "79px",
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
