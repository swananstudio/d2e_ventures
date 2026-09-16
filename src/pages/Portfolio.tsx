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
    titleLine1: "KALPDHAN",
    titleLine2: "FARM",
    location: "Pune, Maharashtra",
    type: "Luxury Farmhouse",
    description:
      "      A farm development project thoughtfully designed to reflect Indian culture through its architecture, materials, and spatial experience. Nestled amidst lush farmland, it features a personalized residence with curated interiors and a private swimming pool. ",
  },
  {
    Component: Project2Scene,
    titleLine1: "KOLVAN",
    titleLine2: "RESORT",
    location: "Pune, Maharashtra",
    type: "Luxury Resort",
    description:
      "A contemporary villa envisioned as a luxurious escape that embraces Mahabaleshwar's natural character. The design aims to merge seamlessly with its surroundings while maintaining a distinctly modern identity through clean forms, large glass openings, and carefully crafted outdoor spaces.",
  },
  {
    Component: Project3Scene,
    titleLine1: "GOODWILL",
    titleLine2: "CRESCENT",
    location: "Pune, Maharashtra",
    type: "Residential Interior",
    description:
      "A vibrant resort concept shaped around leisure, recreation, and immersive guest experiences. The project combines expressive interiors, landscaped courtyards, private pool spaces, and playful outdoor amenities to create a destination that feels relaxed, engaging, and distinctly memorable.",
  },
   {
    Component: Project4Scene,
    titleLine1: "URLI KANCHAN",
    titleLine2: "OLD AGE HOME",
    location: "Urli Kanchan, Maharashtra",
    type: "Senior Care Facility",
    description:
      "A thoughtfully planned senior living environment shaped around safety, familiarity, and everyday comfort. Set within a quiet agricultural landscape, the old age home uses a simple and practical architectural language, generous semi-open spaces, natural light, and familiar domestic-scale interiors to create a place that feels welcoming rather than institutional.",
  },
  {
    Component: Project5Scene,
    titleLine1: "MAHABALESHWAR",
    titleLine2: "VILLA",
    location: "Mahabaleshwar, Maharashtra",
    type: "Luxury Private Villa",
    description:
      "A contemporary villa envisioned as a luxurious escape that embraces Mahabaleshwar's natural character. The design aims to merge seamlessly with its surroundings while maintaining a distinctly modern identity through clean forms, large glass openings, and carefully crafted outdoor spaces.",
  },
 
]

// Shared clamp style for the visible description AND its hidden measuring
// clone below — they must always match exactly, or overflow detection
// (isDescClamped) will be wrong. On very small / short phones (e.g. the
// 340x690 case) we drop to a 3-line clamp so there's more room left for
// the "See more" toggle and the hero card underneath to not collide.
const descriptionClampCss = {
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  "@media (max-width: 380px) and (max-height: 700px)": {
    WebkitLineClamp: 3,
  },
} as const

// Shared font metrics for the description text and its hidden measuring
// clone, and for the collapsed "See more" button so it can sit on the
// same baseline as the last visible line of text. Bumped up for mobile /
// medium breakpoints for readability.
const descriptionFontSize = {
  base: "15px",
  sm: "16px",
  md: "17px",
  lg: "15.5px",
} as const
const descriptionLineHeight = "1.8"
const descriptionLetterSpacing = "0.02em"

// Horizontal space reserved at the right edge of the description (and its
// measuring clone) for the absolutely-positioned See more / See less
// toggle. Without this the toggle simply paints on top of whatever word
// happens to sit under it. Reserving the gutter means the text wraps /
// ellipsises before it, so the button always lands in empty space on the
// same baseline as the last line. Roughly the rendered width of the
// widest label at the matching font size, plus a little breathing room.
const toggleGutter = {
  base: "84px",
  sm: "88px",
  md: "94px",
  lg: "86px",
} as const

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

  // --- Description "See more / See less" handling ---
  // The description is clamped to 4 lines by default. Because users can
  // bump up their browser/OS font size, or view on very small screens,
  // a description that fits in 4 lines at one size may overflow at
  // another. Rather than guessing based on character count, we measure
  // the actual rendered element and only show the toggle when the text
  // is genuinely being cut off.
  const [isDescExpanded, setIsDescExpanded] = useState(false)
  const [isDescClamped, setIsDescClamped] = useState(false)
  const descRef = useRef<HTMLParagraphElement | null>(null)
  // Hidden clone of the description, always rendered in the clamped (4-line)
  // state. We measure THIS element rather than the visible one, so overflow
  // detection never depends on whether the user has expanded the text —
  // avoids the button flickering/disappearing on toggle, and avoids relying
  // on the visible element's css switching on/off.
  const descMeasureRef = useRef<HTMLParagraphElement | null>(null)

  // Measure the complete visible text stack so the hero cards can respond to
  // real rendered text height (including larger font sizes / browser zoom),
  // instead of relying only on viewport-size guesses.
  const textStackRef = useRef<HTMLDivElement | null>(null)
  const [textStackHeight, setTextStackHeight] = useState(0)

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

  // Collapse the description back down whenever the active project changes,
  // so the next project always opens in the clamped state.
  useEffect(() => {
    setIsDescExpanded(false)
  }, [activeIndex])

  // Measure the full text stack. ResizeObserver catches width/font/zoom
  // changes, while the font promise catches late-loading web fonts.
  useEffect(() => {
    const el = textStackRef.current
    if (!el) return

    const measure = () => setTextStackHeight(el.scrollHeight)

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(el)

    const fontsReady = (document as any).fonts?.ready as Promise<unknown> | undefined
    fontsReady?.then(measure).catch(() => {})

    return () => resizeObserver.disconnect()
  }, [activeIndex, isDescExpanded])

  // Detect whether the description text actually overflows 4 lines. We
  // measure the hidden always-clamped clone (descMeasureRef), not the
  // visible text, so this is independent of isDescExpanded. Uses
  // ResizeObserver (catches width/font/zoom changes), a resize/orientation
  // fallback for devices that don't reliably fire ResizeObserver/font-ready
  // callbacks in time, and waits for web fonts to finish loading before the
  // first measurement, since measuring against a fallback font can under-
  // or over-report line count. The extra fallback timer + window resize /
  // orientationchange listeners fix cases where the toggle silently never
  // appeared on some smaller devices because the very first measurement
  // ran before layout had actually settled.
  useEffect(() => {
    const el = descMeasureRef.current
    if (!el) return

    const checkClamp = () => {
      const node = descMeasureRef.current
      if (!node) return
      setIsDescClamped(node.scrollHeight > node.clientHeight + 2)
    }

    // Double rAF: wait for the browser to actually paint the current
    // layout before measuring, so we're not reading stale/zero sizes.
    let raf1 = 0
    let raf2 = 0
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(checkClamp)
    })

    // Fallback in case the rAF pair or ResizeObserver's first callback
    // fires before layout has truly settled (seen on some smaller/older
    // mobile devices) — re-check a moment later just in case.
    const fallbackTimer = window.setTimeout(checkClamp, 300)

    const fontsReady = (document as any).fonts?.ready as Promise<unknown> | undefined
    fontsReady?.then(checkClamp).catch(() => {})

    const resizeObserver = new ResizeObserver(checkClamp)
    resizeObserver.observe(el)
    window.addEventListener("resize", checkClamp)
    window.addEventListener("orientationchange", checkClamp)

    return () => {
      window.cancelAnimationFrame(raf1)
      window.cancelAnimationFrame(raf2)
      window.clearTimeout(fallbackTimer)
      resizeObserver.disconnect()
      window.removeEventListener("resize", checkClamp)
      window.removeEventListener("orientationchange", checkClamp)
    }
  }, [activeIndex])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        style={{ ["--portfolio-text-h" as any]: `${textStackHeight}px` }}
      >
        {/* Keep only the active project and the project currently transitioning out mounted. */}
        {projectsData.map(({ Component }, i) => {
          const shouldMount =
            i === activeIndex || i === transitioningFromIndex

          if (!shouldMount) return null

          // The project we're LEAVING needs to render ON TOP during the
          // transition — its cards are the ones playing the flip-away
          // animation, and every project's background is a fully opaque,
          // full-bleed image. If the incoming project (which mounts
          // instantly at full opacity, no fade-in) were stacked above it,
          // that opaque background would paint directly over the outgoing
          // project from the very first frame — the flip would still be
          // running under the hood, just permanently hidden. Putting the
          // outgoing project on top lets its flip actually be seen; the
          // incoming one only becomes visible once the outgoing one
          // finishes and unmounts (transitioningFromIndex -> null).
          const zIndex =
            i === transitioningFromIndex ? 4 : i === activeIndex ? 3 : 2

          return (
            <Box
              key={i}
              position="absolute"
              inset={0}
              bg="black"
              zIndex={zIndex}
              pointerEvents={i === activeIndex ? "auto" : "none"}
            >
              <Component
                isActive={i === activeIndex}
                direction={direction}
              />
            </Box>
          )
        })}

        {/* Shared text carousel */}
    
<Box
  ref={textStackRef}
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
    // Tall/narrow phones (e.g. tall-screen mid-size devices): shrink the
    // title/subtitle/description a touch so the whole text stack takes up
    // less vertical room, leaving more space above the hero card.
    "@media (max-width: 767px) and (min-height: 900px)": {
      "& .portfolio-responsive-title": {
        fontSize: "36px",
      },
      "& .portfolio-responsive-subtitle": {
        fontSize: "24px",
      },
      "& .portfolio-responsive-description": {
        fontSize: "16px",
      },
    },
    // Small AND short phones (~360x690 and similar). This is the case that
    // was overlapping the hero card in testing: pull the whole stack up,
    // tighten the vertical rhythm between title / location row /
    // description, and shrink the title/subtitle further so there's enough
    // headroom above the card even when the description text is running at
    // the larger mobile font size.
    "@media (max-width: 380px) and (max-height: 700px)": {
      top: "66px",
      "& .portfolio-responsive-title": {
        fontSize: "24px",
        lineHeight: "1",
        marginTop: "4px !important",
      },
      "& .portfolio-responsive-subtitle": {
        fontSize: "18px",
      },
      "& .portfolio-responsive-description": {
        fontSize: "14.5px",
      },
      "& .portfolio-location-row": {
        marginTop: "8px !important",
      },
      "& .description-wrapper": {
        marginTop: "6px !important",
        position: "relative",
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
              className="portfolio-responsive-title"
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
                className="portfolio-responsive-subtitle"
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
                className="portfolio-location-row"
                mt={{ base: 3, md: 3, lg: 8 }}
                gap={{ base: 3, md: 5, lg: 6 }}
                fontSize={{ base: "14px", md: "15px", lg: "16px" }}

                flexWrap="wrap"
                color="#F5F5F5"
               
              >
                <Flex align="center" gap={2}>
                  <Image src={maps} w="14px" loading="lazy" />
                  <Text fontWeight="700">
                    {active.location}
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Image src={areasize} w="18px" loading="lazy" />
                  <Text fontWeight="700">
                    {active.type}
                  </Text>
                </Flex>
              </Flex>

              {/* Description + toggle.

                  Expanded: "See less" is rendered inline, as the last thing
                  in the text flow. It naturally lands after the final word
                  on that line's baseline, and the paragraph keeps its full
                  width — nothing is narrowed.

                  Collapsed: -webkit-line-clamp would swallow an inline
                  element, so the toggle is absolutely positioned at the
                  bottom-right instead, and the paragraph reserves
                  `toggleGutter` on its right edge for exactly that state so
                  the clamped text ellipsises before the button rather than
                  running underneath it. */}
              <Box
                className="description-wrapper"
                position="relative"
                mt={{ base: 2, md: 3, lg: 5 }}
              >
                <Text
                  ref={descRef}
                  className="portfolio-responsive-description"
                  color="#F4F4F4"
                  fontSize={descriptionFontSize}
                  lineHeight={descriptionLineHeight}
                  letterSpacing={descriptionLetterSpacing}
                  pr={isDescClamped && !isDescExpanded ? toggleGutter : undefined}
                  css={isDescExpanded ? undefined : descriptionClampCss}
                >
                  {active.description}

                  {isDescClamped && isDescExpanded && (
                    <Text
                      as="button"
                      className="see-more-toggle"
                      data-expanded="true"
                      onClick={() => setIsDescExpanded(false)}
                      display="inline"
                      ml="8px"
                      whiteSpace="nowrap"
                      verticalAlign="baseline"
                      fontSize={descriptionFontSize}
                      lineHeight={descriptionLineHeight}
                      fontWeight="700"
                      textDecoration="underline"
                      color="white"
                      cursor="pointer"
                      pointerEvents="auto"
                    >
                      See less
                    </Text>
                  )}
                </Text>

                {isDescClamped && !isDescExpanded && (
                  <Text
                    as="button"
                    className="see-more-toggle"
                    data-expanded="false"
                    onClick={() => setIsDescExpanded(true)}
                    position="absolute"
                    right={0}
                    bottom={0}
                    whiteSpace="nowrap"
                    fontSize={descriptionFontSize}
                    lineHeight={descriptionLineHeight}
                    fontWeight="700"
                    textDecoration="underline"
                    color="white"
                    cursor="pointer"
                    pointerEvents="auto"
                  >
                    See more
                  </Text>
                )}
              </Box>

              {/* Hidden measurement clone — always clamped, never visible.
                  Its only job is to let us detect overflow independent of
                  the visible text's expanded state. Must share the same
                  width, font size, line height, letter spacing and clamp
                  breakpoints as the visible text above. */}
              <Text
                ref={descMeasureRef}
                className="portfolio-responsive-description"
                aria-hidden="true"
                position="absolute"
                top={0}
                left={0}
                w="full"
                visibility="hidden"
                pointerEvents="none"
                mt={{ base: 2, md: 3, lg: 5 }}
                fontSize={descriptionFontSize}
                lineHeight={descriptionLineHeight}
                letterSpacing={descriptionLetterSpacing}
                pr={toggleGutter}
                css={descriptionClampCss}
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