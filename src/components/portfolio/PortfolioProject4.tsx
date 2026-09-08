import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  List,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Transition,
} from "framer-motion";
import {
  GoArrowLeft,
  GoArrowRight,
  GoChevronLeft,
  GoChevronRight,
} from "react-icons/go";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import {
  MB_ClientVision,
  MB_MainPageImg,
  MB_PlanningandStrategy,
  MB_ProjectOverview1,
  MB_ProjectOverview2,
  MB_ProjectOverview3,
  MB_ProjectOverview4,

} from "../../assets/assets";

const MotionBox = motion.create(Box);

type Thumbnail = {
  section: string;
  images?: string[];
  video?: string;
};

const projectThumbnails: Thumbnail[] = [
  {
    images: [
      MB_ProjectOverview1,
      MB_ProjectOverview2,
      MB_ProjectOverview3,
      MB_ProjectOverview4,
    ],
    section: "section1",
  },
  {
    video: MB_ClientVision,
    section: "section2",
  },
  {
    video: MB_PlanningandStrategy,
    section: "section3",
  },
  {
    images: [MB_ProjectOverview4],
    section: "section4",
  },
];

const sectionOrder = ["section1", "section2", "section3", "section4"];

const tallImageSections = new Set(["section1"]);

const morphTransition: Transition = {
  type: "spring",
  stiffness: 190,
  damping: 26,
  mass: 0.9,
};

const ease = [0.22, 1, 0.36, 1] as const;

// Unified motion timing so background, cards, and text move as one coordinated scene.
const SCENE_DURATION = 1.1;
const SCENE_EASE = [0.65, 0, 0.35, 1] as const;

// Card-slide timing (matches the horizontal-scroll feel from the original hero cards).
const CARD_SLIDE_DURATION = 0.4;
const CARD_SLIDE_EASE = [0.22, 1, 0.36, 1] as const;
// Input lock should match the actual slide duration, not the (much longer)
// outer scene-transition duration — otherwise clicks get silently ignored
// for a few hundred ms after the cards have already finished moving.
const CARD_SLIDE_LOCK_MS = Math.round(CARD_SLIDE_DURATION * 1000);

type SectionProps = {
  layoutId: string;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  tallImageMobile?: boolean;
};

const sectionDetailsMap: Record<
  string,
  {
    title: string;
    subtitle: string;
    image: string | string[];
    imageAlt: string;
    isVideo?: boolean;
    isCarousel?: boolean;
  }
> = {
  section1: {
    title: "PROJECT",
    subtitle: "Overview",
    image: [
      MB_ProjectOverview1,
      MB_ProjectOverview2,
      MB_ProjectOverview3,
      MB_ProjectOverview4,
    ],
    imageAlt: "Project overview",
    isCarousel: true,
  },
  section2: {
    title: "CLIENT",
    subtitle: "Vision",
    image: MB_ClientVision,
    imageAlt: "Client vision",
    isVideo: true,
  },
  section3: {
    title: "PLANNING &",
    subtitle: "STRATEGY",
    image: MB_PlanningandStrategy,
    imageAlt: "Planning and strategy",
    isVideo: true,
  },
  section4: {
    title: "DESIGN, DEVELOPMENT",
    subtitle: "& Execution",
    image: MB_ProjectOverview4,
    imageAlt: "Design, development and execution",
  },
};

type PortfolioProject4Props = {
  isActive?: boolean;
  direction?: 1 | -1;
};

export default function PortfolioProject4({
  isActive = true,
  direction = 1,
}: PortfolioProject4Props) {
  const [currentSection, setCurrentSection] = useState("main");
  const [activeIndex, setActiveIndex] = useState(1);
  const [openedCardIndex, setOpenedCardIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const isCardAnimatingRef = useRef(false);
  const cardAnimationTimerRef = useRef<number | null>(null);
  const [mobileExitingIndex, setMobileExitingIndex] = useState<number | null>(null);
  const [mobileResetIndex, setMobileResetIndex] = useState<number | null>(null);
  const [mobileHiddenIndex, setMobileHiddenIndex] = useState<number | null>(null);
  const mobileExitTimerRef = useRef<number | null>(null);
  const heroCardsRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const mobileWheelGestureLockedRef = useRef(false);
  const mobileWheelUnlockTimerRef = useRef<number | null>(null);
  const moveCardRef = useRef<(step: 1 | -1) => void>(() => {});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (cardAnimationTimerRef.current !== null) {
        window.clearTimeout(cardAnimationTimerRef.current);
      }
      if (mobileExitTimerRef.current !== null) {
        window.clearTimeout(mobileExitTimerRef.current);
      }
      if (mobileWheelUnlockTimerRef.current !== null) {
        window.clearTimeout(mobileWheelUnlockTimerRef.current);
      }
    };
  }, []);

  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? true;

  useEffect(() => {
    setActiveIndex(isMobile ? 0 : 1);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setActiveIndex(0);
    } else {
      setActiveIndex(1);
    }
  }, [isMobile]);

  const lockCardAnimation = () => {
    isCardAnimatingRef.current = true;
    if (cardAnimationTimerRef.current !== null) {
      window.clearTimeout(cardAnimationTimerRef.current);
    }
    cardAnimationTimerRef.current = window.setTimeout(() => {
      isCardAnimatingRef.current = false;
      cardAnimationTimerRef.current = null;
    }, CARD_SLIDE_LOCK_MS);
  };

  const moveCard = (step: 1 | -1) => {
    if (isCardAnimatingRef.current || !isActive) return;

    if (isMobile) {
      const previousIndex = activeIndex;
      const nextIndex =
        (activeIndex + step + projectThumbnails.length) %
        projectThumbnails.length;

      if (mobileExitTimerRef.current !== null) {
        window.clearTimeout(mobileExitTimerRef.current);
      }

      setMobileResetIndex(null);
      setMobileHiddenIndex(null);
      setMobileExitingIndex(previousIndex);
      setActiveIndex(nextIndex);
      lockCardAnimation();

      // Finish the visible exit first.
      mobileExitTimerRef.current = window.setTimeout(() => {
        // Hide the old card before it is allowed to change position.
        setMobileHiddenIndex(previousIndex);
        setMobileResetIndex(previousIndex);

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setMobileResetIndex(null);

            window.requestAnimationFrame(() => {
              setMobileExitingIndex(null);
              setMobileHiddenIndex(null);
            });
          });
        });
      }, CARD_SLIDE_DURATION * 1000);

      return;
    }

    lockCardAnimation();
    setActiveIndex(
      (previous) =>
        (previous + step + projectThumbnails.length) %
        projectThumbnails.length
    );
  };

  moveCardRef.current = moveCard;

  const goNext = () => moveCard(1);

  const goPrevious = () => moveCard(-1);

  useEffect(() => {
    const el = heroCardsRef.current;
    if (!el || !isMobile) return;

    let wheelAccum = 0;
    let resetTimer: number | null = null;

    const armWheelGestureUnlock = () => {
      if (mobileWheelUnlockTimerRef.current !== null) {
        window.clearTimeout(mobileWheelUnlockTimerRef.current);
      }

      mobileWheelUnlockTimerRef.current = window.setTimeout(() => {
        mobileWheelGestureLockedRef.current = false;
        mobileWheelUnlockTimerRef.current = null;
      }, 300);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.stopImmediatePropagation();

      // One wheel/swipe gesture advances exactly one card. Trackpad/mouse
      // momentum is ignored until the stream has been quiet for 300ms.
      if (mobileWheelGestureLockedRef.current) {
        return;
      }

      if (isCardAnimatingRef.current) return;

      wheelAccum += event.deltaY;

      if (resetTimer !== null) {
        window.clearTimeout(resetTimer);
      }

      resetTimer = window.setTimeout(() => {
        wheelAccum = 0;
      }, 120);

      if (Math.abs(wheelAccum) < 30) return;

      const step: 1 | -1 = wheelAccum > 0 ? 1 : -1;
      wheelAccum = 0;

      mobileWheelGestureLockedRef.current = true;
      armWheelGestureUnlock();

      moveCardRef.current(step);
    };

    const onTouchStart = (event: TouchEvent) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.stopImmediatePropagation();
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.stopImmediatePropagation();
      if (touchStartYRef.current === null) return;

      const dy =
        touchStartYRef.current -
        (event.changedTouches[0]?.clientY ?? touchStartYRef.current);

      touchStartYRef.current = null;

      if (Math.abs(dy) < 35 || isCardAnimatingRef.current) return;

      moveCardRef.current(dy > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);

      if (resetTimer !== null) {
        window.clearTimeout(resetTimer);
      }
    };
  }, [isMobile]);

  const openCard = (index: number) => {
    if (!isActive || isCardAnimatingRef.current) return;
    setActiveIndex(index);
    setOpenedCardIndex(index);
    setCurrentSection(projectThumbnails[index].section);
  };

  const closeSection = () => {
    setCurrentSection("main");
  };

  const getRelativePosition = (index: number) => {
    const total = projectThumbnails.length;
    let distance = index - activeIndex;

    if (distance > total / 2) {
      distance -= total;
    }
    if (distance < -total / 2) {
      distance += total;
    }

    return distance;
  };

  const goToPreviousSection = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);

    if (currentIndex <= 0) {
      return;
    }

    const prevIndex = currentIndex - 1;
    setActiveIndex(prevIndex);
    setCurrentSection(sectionOrder[prevIndex]);
  };

  const goToNextSection = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);

    if (currentIndex === -1 || currentIndex === sectionOrder.length - 1) {
      return;
    }

    const nextIndex = currentIndex + 1;
    setActiveIndex(nextIndex);
    setCurrentSection(sectionOrder[nextIndex]);
  };

  const activeSharedLayoutId = `project-card-${openedCardIndex ?? activeIndex}`;
  const isSectionActive = currentSection !== "main";
  const currentSectionIndex = sectionOrder.indexOf(currentSection);

  return (
    <LayoutGroup>
      <Box position="relative" minH={{ base: "100dvh", md: "100dvh", lg: "100%" }}
         h={{ base: "100dvh", md: "100dvh", lg: "100%" }}
         w="100%"
         overflow="hidden">
        <MotionBox
          position="absolute"
          top="-6%"
          left="-6%"
          w="112%"
          h="112%"
          bgImage={`url(${MB_MainPageImg})`}
          bgSize="cover"
          backgroundPosition="center"
          bgRepeat="no-repeat"
          zIndex={0}
          initial={false}
          animate={{ rotate: isActive ? 0 : direction >= 0 ? 4 : -4 }}
         transition={{
  duration: SCENE_DURATION,
  ease: SCENE_EASE,
}}
        />
        <Box position="absolute" inset={0} bg="rgba(0,0,0,.35)" zIndex={1} />
        <Flex
          minH={{ base: "100dvh", md: "100dvh", lg: "100vh" }}
          h={{ base: "100dvh", md: "100dvh", lg: "100vh" }}
          w="100%"
          position="relative"
          overflow="hidden"
          py={0}
        >

          <Flex
            position="relative"
            zIndex={2}
            direction="column"
            w="100%"
            minH={{ base: "100dvh", md: "100dvh", lg: "100%" }}
             h={{ base: "100dvh", md: "100dvh", lg: "100%" }}
          >
            <Flex
              flex={1}
              pl={{ base: "6%", md: "6%", lg: "3%" }}
              pr={{ base: "6%", md: "6%", lg: "0%" }}
              pb={{ base: "0%", md: "0%", lg: "4%" }}
              pt={{ base: "88px", md: 0, lg: 0 }}
              direction={{ base: "column", lg: "row" }}
              justify={{ base: "flex-end", lg: "flex-end" }}
              align={{ base: "stretch", lg: "flex-end" }}
              gap={{ base: 3, md: 3, lg: "3%" }}
            >
              

              <Flex
                
                zIndex={10}
                direction="column"
                  className="hero-cards"
                                ref={heroCardsRef} 
                w={{ base: "100%", lg: "50%" }}
                maxW={{ base: "100%", lg: "50%" }}
                ml={{ lg: "auto" }}
                gap={{ base: 3, md: 4, lg: "6%" }}
              
                                mt={{ base: 0, lg: 0 }}
                position={{ base: "absolute", lg: "relative" }}
                left={{ base: 0, lg: "auto" }}
                right={{ base: 0, lg: "auto" }}
                bottom={{ base: "6%", sm: "5%", md: "4%", lg: "auto" }}
                css={{
                  "@media (max-width: 991px) and (max-height: 800px)": {
                    bottom: "5%",
                  },
                  
                  "@media (max-width: 767px) and (min-height: 900px)": {
                    bottom: "18%",
                  },
                }}
                
  flexShrink={0}>
                <Box
                  position="relative"
                  w="100%"
                  height={{
                    base: "300px",
                    sm: "300px",
                    md: "300px",
                    lg: "300px",
                  }}
                  css={{
                    /* Short mobile/tablet viewports get a smaller frame only
                       when the viewport itself is genuinely short. */
                    "@media (max-width: 991px) and (max-height: 800px)": {
                      height: "260px",
                    },
                    "@media (max-width: 479px) and (max-height: 800px)": {
                      height: "245px",
                    },
                  }}
                  mt={{ base: 1, md: 2, lg: 0 }}
                >
                  {projectThumbnails.map((project, index) => {
                    const distance = getRelativePosition(index);
                    const isActiveDesktop = distance === 0;
                    const isVisibleDesktop = Math.abs(distance) <= 1;

                    const left =
                      distance === -1
                        ? "0%"
                        : distance === 0
                          ? "35%"
                          : distance === 1
                            ? "70%"
                            : distance < -1
                              ? "-28%"
                              : "98%";

                    const stackPosition =
                      ((index - activeIndex) % projectThumbnails.length +
                        projectThumbnails.length) %
                      projectThumbnails.length;
                    const isFrontMobile = stackPosition === 0;

                    const desktopAnimate = {
                      left,
                      top: 0,
                      x: "0%",
                      rotate: 0,
                      opacity: isVisibleDesktop ? 1 : 0,
                      scale: isActiveDesktop ? 1 : 0.95,
                    };

                    const isMobileExiting =
                      isMobile && mobileExitingIndex === index;
                    const isMobileResetting =
                      isMobile && mobileResetIndex === index;
                    const isMobileHidden =
                      isMobile && mobileHiddenIndex === index;

                    const stackDepth = Math.min(stackPosition, 3);

                    const mobileAnimate =
                      isMobileExiting && !isMobileHidden
                        ? {
                            left: "50%",
                            x: "125%",
                            top: 0,
                            rotate: 0,
                            opacity: 0,
                            scale: 1,
                          }
                        : {
                            left: `${50 - stackDepth * 3}%`,
                            x: "-50%",
                            top: 0,
                            rotate: 0,
                            opacity: isMobileHidden
                              ? 0
                              : stackDepth === 0
                                ? 1
                                : stackDepth === 1
                                  ? 0.95
                                  : stackDepth === 2
                                    ? 0.8
                                    : 0.6,
                            scale: 1 - stackDepth * 0.035,
                          };

                    const details = sectionDetailsMap[project.section];
                    const base = isMobile ? mobileAnimate : desktopAnimate;

                    const positionTransition =
                      isMobile && isMobileResetting
                        ? { duration: 0 }
                        : {
                            duration: CARD_SLIDE_DURATION,
                            ease: CARD_SLIDE_EASE,
                          };
                    const thumbnailImage = project.images?.[0];

                    return (
                      <MotionBox
                        key={index}
                        layoutId={
                          mounted ? `project-card-${index}` : undefined
                        }
                        layout={false}
                        position="absolute"
                        top={0}
                        w={{ base: "84%", sm: "68%", md: "48%", lg: "30%" }}
                        h="100%"
                        zIndex={
                          isMobile
                            ? isMobileHidden
                              ? 0
                              : isMobileExiting
                                ? 20
                                : 10 - stackDepth
                            : isActiveDesktop
                              ? 3
                              : 2
                        }
                        overflow="hidden"
                        borderRadius="20px"
                        cursor="pointer"
                        bg="rgba(255,255,255,.18)"
                        border="1px solid rgba(255,255,255,.2)"
                        boxShadow={
                          (isMobile ? isFrontMobile : isActiveDesktop)
                            ? "0 22px 50px rgba(0,0,0,.32)"
                            : "0 14px 32px rgba(0,0,0,.18)"
                        }
                        pointerEvents={
                          isMobile
                            ? isFrontMobile
                              ? "auto"
                              : "none"
                            : isVisibleDesktop
                              ? "auto"
                              : "none"
                        }
                         onClick={() => openCard(index)}
initial={{
  ...(isMobile ? mobileAnimate : desktopAnimate),
  opacity: 0,
  scale: 0.85,
  rotateY: index % 2 === 0 ? -110 : 110,
}}
animate={{ ...base, rotateY: isActive ? 0 : 100 }}
                                                transition={{
                          left: positionTransition,
                          top: positionTransition,
                          x: positionTransition,
                          scale: {
                            duration: CARD_SLIDE_DURATION,
                            ease: CARD_SLIDE_EASE,
                          },
                          opacity: {
                            duration: CARD_SLIDE_DURATION,
                            ease: CARD_SLIDE_EASE,
                          },
                          rotateY: {
                            duration: SCENE_DURATION * 0.8,
                            delay: Math.abs(distance) * 0.08,
                            ease: SCENE_EASE,
                          },
                        }}
                        style={{
                          transformPerspective: 1400,
                          willChange: "transform, opacity",
                          visibility:
                            isMobileHidden || isMobileResetting
                              ? "hidden"
                              : "visible",
                         
                        }}
>
                      
                        {project.video ? (
                          <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              position: "relative",
                              zIndex: 0,
                              display: "block",
                            }}
                          />
                        ) : (
                          <Image
                            src={thumbnailImage}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            draggable={false}
                            position="relative"
                            zIndex={0}
                            alt={details.title}
                          />
                        )}

                        <Box
                          position="absolute"
                          left={0}
                          right={0}
                          bottom={0}
                          h="75%"
                          background="linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0) 100%)"
                          pointerEvents="none"
                          zIndex={1}
                        />

                        <Box
                          position="absolute"
                          left={0}
                          right={0}
                          bottom={0}
                          px={{ base: 4, md: 5 }}
                          pb={{ base: 4, md: 5 }}
                          pointerEvents="none"
                          zIndex={2}
                        >
                          <Text
                            color="rgba(255,255,255,.9)"
                            fontSize={{ base: "11px", md: "12px" }}
                            letterSpacing="0.08em"
                            fontWeight="500"
                            mb="2px"
                            textTransform="uppercase"
                          >
                            {details.title}
                          </Text>
                          <Text
                            color="white"
                            fontSize={{ base: "18px", md: "20px" }}
                            fontWeight="600"
                            lineHeight="1.1"
                          >
                            {details.subtitle}
                          </Text>
                        </Box>
                      </MotionBox>
                    );
                  })}
                </Box>

                <Flex
                  display={{ base: "none", lg: "flex" }}
                  justify="center"
                  w="100%"
                  gap={4}
                  mt={{ base: 1, md: 1, lg: 5 }}
                   flexShrink={0}
                   position="relative"
                   zIndex={20}
                   pb={{ base: 1, md: 0 }}
                >
                  <Button
                    aria-label="Previous project"
                    onClick={goPrevious}
                    disabled={!isActive}
                    w={{ base: "40px", md: "44px", lg: "60px" }}
                    h={{ base: "40px", md: "44px", lg: "60px" }}
                    minW={{ base: "40px", md: "44px", lg: "60px" }}
                    borderRadius="full"
                    bg="rgba(255,255,255,.15)"
                    color="white"
                    _hover={{ bg: "#C8A96B", color: "#000" }}
                  >
                    <GoArrowLeft size={22} />
                  </Button>

                  <Button
                    aria-label="Next project"
                    onClick={goNext}
                    disabled={!isActive}
                    w={{ base: "40px", md: "44px", lg: "60px" }}
                    h={{ base: "40px", md: "44px", lg: "60px" }}
                    minW={{ base: "40px", md: "44px", lg: "60px" }}
                    borderRadius="full"
                    bg="rgba(255,255,255,.15)"
                    color="white"
                    _hover={{ bg: "#C8A96B", color: "#000" }}
                  >
                    <GoArrowRight size={22} />
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {isSectionActive && (
          <DetailLayout
            layoutId={activeSharedLayoutId}
            onClose={closeSection}
            onBack={goToPreviousSection}
            onNext={goToNextSection}
            isFirst={currentSectionIndex === 0}
            isLast={currentSectionIndex === sectionOrder.length - 1}
            tallImageMobile={tallImageSections.has(currentSection)}
            {...(sectionDetailsMap[currentSection] ||
              sectionDetailsMap.section1)}
          >
            <Box overflow="visible">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {currentSection === "section1" && <OverviewDetails />}
                  {currentSection === "section2" && <Section2Content />}
                  {currentSection === "section3" && <Section3Content />}
                  {currentSection === "section4" && <Section4Content />}
                </motion.div>
              </AnimatePresence>
            </Box>
          </DetailLayout>
        )}
      </Box>
    </LayoutGroup>
  );
}

type DetailLayoutProps = SectionProps & {
  title: string;
  subtitle: string;
  image: string | string[];
  imageAlt: string;
  isVideo?: boolean;
  isCarousel?: boolean;
  children: ReactNode;
};

type AccordionItem = { title: string; content: string | string[] };

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      if (img.complete && img.naturalWidth > 0) {
        initial.add(src);
      }
    });
    return initial;
  });
  const SLIDE_DURATION = 5000;

  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      if (img.complete && img.naturalWidth > 0) {
        setLoaded((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));
        return;
      }
      img.onload = () => {
        setLoaded((prev) => new Set(prev).add(src));
      };
    });
  }, [images]);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <Box position="relative" w="100%" h="100%" overflow="hidden" bg="black">
      {images.map((src, i) => {
        const isActive = i === currentIndex;
        const isReady = loaded.has(src);

        return (
          <motion.div
            key={src}
            style={{
              position: "absolute",
              inset: 0,
              opacity: isReady && isActive ? 1 : 0,
              zIndex: isActive ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              willChange: "opacity",
            }}
          >
            <motion.img
              src={src}
              alt={`${alt} ${i + 1}`}
              animate={isActive ? { scale: 1.08 } : { scale: 1 }}
              transition={{
                duration: SLIDE_DURATION / 1000 + 1.5,
                ease: "linear",
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                willChange: "transform",
                transform: "translateZ(0)",
              }}
            />
          </motion.div>
        );
      })}
    </Box>
  );
}

function DetailLayout({
  title,
  subtitle,
  image,
  imageAlt,
  isVideo,
  isCarousel,
  children,
  layoutId,
  onClose,
  onBack,
  onNext,
  isFirst,
  isLast,
  tallImageMobile,
}: DetailLayoutProps) {
  const content = (
    <MotionBox
      layoutId={layoutId}
      transition={morphTransition}
      position="fixed"
      inset={0}
      zIndex={50}
      bg="black"
      color="white"
      h="100vh"
      maxH="100vh"
      overflowY={{ base: "auto", lg: "hidden" }}
      overflowX="hidden"
      data-lenis-prevent
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
      px={{ base: 4, sm: 6, md: 8, lg: 12 }}
      pt={{ base: 4, sm: 6, md: 7, lg: 8 }}
      pb={{ base: 4, sm: 6, lg: 8 }}
      display="flex"
      flexDirection="column"
    >
      <Flex
        justify="space-between"
        align="center"
        mb={{ base: 2, md: 4 }}
        zIndex={2}
      >
        <Flex
          as="button"
          align="center"
          gap={{ base: 2, md: 3 }}
          color="#B8965A"
          cursor="pointer"
          _hover={{ color: "#d7b47d" }}
          onClick={onClose}
        >
          <GoArrowLeft size={24} />
          <Text
            fontSize={{ base: "14px", sm: "18px", md: "22px", lg: "24px" }}
            fontWeight="500"
          >
            Back to Projects
          </Text>
        </Flex>
        <Flex gap={{ base: 3, md: 5 }} color="#B8965A">
          <Box
            as="button"
            cursor={isFirst ? "default" : "pointer"}
            opacity={isFirst ? 0.3 : 1}
            _hover={isFirst ? {} : { color: "#d7b47d" }}
            onClick={isFirst ? undefined : onBack}
          >
            <GoChevronLeft size={30} />
          </Box>
          <Box
            as="button"
            cursor={isLast ? "default" : "pointer"}
            opacity={isLast ? 0.3 : 1}
            _hover={isLast ? {} : { color: "#d7b47d" }}
            onClick={isLast ? undefined : onNext}
          >
            <GoChevronRight size={30} />
          </Box>
        </Flex>
      </Flex>

      <Box display={{ base: "block", lg: "none" }} mb={2}>
        <Text fontSize={{ base: "24px", md: "34px" }} fontWeight="700" lineHeight=".95">
          {title}
        </Text>
        <Text fontSize={{ base: "18px", md: "24px" }} fontWeight="300">
          {subtitle}
        </Text>
      </Box>

      <Grid
        templateColumns={{
          base: "1fr",
          lg: "440px minmax(0, 1fr)",
        }}
        gap={{ base: 4, md: 5, lg: 12 }}
        alignItems="stretch"
        flex={{ base: "0 0 auto", lg: 1 }}
        overflow={{ base: "visible", lg: "hidden" }}
        minH={{ base: "auto", lg: 0 }}
      >
        <GridItem
          order={{ base: 2, lg: 1 }}
          display="flex"
          flexDirection="column"
          justifyContent={{ base: "flex-start", lg: "flex-end" }}
          overflowY={{ base: "visible", lg: "auto" }}
          data-lenis-prevent
          pr={{ base: 1, md: 2 }}
          pb={{ base: 2, lg: 0 }}
          h={{ base: "auto", lg: "100%" }}
          minH={{ base: "auto", lg: 0 }}
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <Box>
            <Box display={{ base: "none", lg: "block" }} mb={3}>
              <Text fontSize="52px" fontWeight="700" lineHeight=".95">
                {title}
              </Text>
              <Text fontSize="34px" fontWeight="300">
                {subtitle}
              </Text>
            </Box>
            {children}
          </Box>
        </GridItem>

        <GridItem
          order={{ base: 1, lg: 2 }}
          h={{ base: "auto", lg: "100%" }}
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", lg: "flex-end" }}
          overflow="hidden"
        >
          {isVideo && typeof image === "string" ? (
            <Box
              position="relative"
              w="100%"
              h={{ base: "auto", lg: "100%" }}
              maxH={{
                base: tallImageMobile ? "48vh" : "42vh",
                md: tallImageMobile ? "58vh" : "52vh",
                lg: "calc(100vh - 90px)",
              }}
              aspectRatio={{ base: "4 / 3", md: "16 / 9", lg: "auto" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="black"
              overflow="hidden"
            >
              <motion.video
                key={image}
                src={image}
                autoPlay
                loop
                muted
                playsInline
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>
          ) : (
            <Box
              position="relative"
              w="100%"
              h={{ base: "auto", lg: "100%" }}
              maxH={{
                base: tallImageMobile ? "48vh" : "42vh",
                md: tallImageMobile ? "58vh" : "52vh",
                lg: "calc(100vh - 90px)",
              }}
              aspectRatio={{ base: "4 / 3", md: "16 / 9", lg: "auto" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="black"
              overflow="hidden"
            >
              {isCarousel && Array.isArray(image) ? (
                <ImageCarousel images={image} alt={imageAlt} />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={image as string}
                    src={image as string}
                    alt={imageAlt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                    }}
                  />
                </AnimatePresence>
              )}
            </Box>
          )}
        </GridItem>
      </Grid>
    </MotionBox>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Text
        color="#D6B46A"
        fontSize={{ base: "13px", sm: "14px", md: "14px" }}
        fontWeight="500"
      >
        {label}
      </Text>
      <Text fontSize={{ base: "14px", sm: "15px", md: "16px" }}>{value}</Text>
    </Box>
  );
}

function PlainContent({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column">
      <Box w="60px" h="2px" bg="#E7C37B" mb={{ base: 2, md: 3 }} />
      {children}
    </Flex>
  );
}

function OverviewDetails() {
  const items: AccordionItem[] = [
    {
      title: "Services",
      content: [
        "Architecture & Planning",
        "Interior Design",
        "Landscape Design",
        "Turnkey Execution",
      ],
    },
    {
      title: "Key Spaces",
      content: [
        "Living & Dining",
        "Bedrooms & Suites",
        "Kitchen",
        "Private Terraces",
        "Outdoor Seating",
        "Landscaped Areas",
        "Pool / Leisure Area",
        "Parking",
      ],
    },
  ];

  return (
    <PlainContent>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gapX={{ base: 4, md: 6 }}
        gapY={{ base: 2, md: 3 }}
        mb={{ base: 2, md: 3 }}
      >
        <Detail label="Project Type" value="Luxury Private Villa" />
        <Detail label="Year of Commencement" value="2026" />
        <Detail label="Project Status" value="Ongoing" />
        <Detail label="Design Approach" value="Contemporary Modern Luxury" />
      </Grid>

      <AccordionContent items={items} />
    </PlainContent>
  );
}

function AccordionContent({ items }: { items: AccordionItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <LayoutGroup>
      <motion.div layout transition={{ duration: 0.7, ease }}>
        {items.map((item, index) => {
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
                py={{ base: 1.5, md: 2 }}
                justify="space-between"
                align="center"
                textAlign="left"
                cursor="pointer"
                onClick={() => setActive(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <Text
                  fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                  fontWeight="500"
                >
                  {item.title}
                </Text>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <Text
                    fontSize={{ base: "20px", md: "24px" }}
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
                                        transition={{ duration: 0.35, ease }}
                                        style={{ overflow: "hidden" }}
                  >
                    <Box
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.11)"
                      borderRadius="8px"
                      px={{ base: 2.5, md: 3 }}
                      py={{ base: 1.5, md: 2 }}
                      mb={{ base: 1.5, md: 2 }}
                    >
                      {Array.isArray(item.content) ? (
                        <List.Root
                          color="whiteAlpha.800"
                          fontSize={{ base: "13px", sm: "14px", md: "15px" }}
                          lineHeight="1.5"
                          ml="16px"
                        >
                          {item.content.map((line) => (
                            <List.Item key={line}>{line}</List.Item>
                          ))}
                        </List.Root>
                      ) : (
                        <Text
                          color="whiteAlpha.800"
                          fontSize={{ base: "13px", sm: "14px", md: "15px" }}
                          lineHeight="1.5"
                        >
                          {item.content}
                        </Text>
                      )}
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
  );
}

function Section2Content() {
  const items: AccordionItem[] = [
    {
      title: "Project Goal",
      content:
        "To create a modern luxury villa filled with natural light, offering a sense of openness, privacy, and refined comfort while providing an elevated setting for relaxed family living and leisure.",
    },
    {
      title: "Requirements",
      content: [
        "Modern architectural expression with a luxurious yet understated character",
        "Spacious interiors designed for comfort",
        "Large glazed openings to maximise daylight and outdoor views",
        "Generous terraces for leisure and social gatherings",
        "Premium materials and refined detailing throughout",
        "Spaces designed for both family living and private relaxation",
        "Architecture which thoughtfully complements the site's natural setting",
      ],
    },
  ];
  return <AccordionContent items={items} />;
}

function Section3Content() {
  const items: AccordionItem[] = [
    {
      title: "Site Planning",
      content:
        "The villa is positioned to work with Mahabaleshwar's sloping terrain, dense greenery, and changing site levels, allowing the built form to sit naturally within the existing setting.",
    },
    {
      title: "Functional Zoning",
      content:
        "The planning separates family spaces, guest areas, bedrooms, services, and leisure zones while keeping the villa practical for both private stays and larger gatherings.",
    },
    {
      title: "View Planning",
      content:
        "Key living spaces, bedrooms, and terraces are oriented towards the surrounding hills and greenery, using the site's natural views as an integral part of the planning.",
    },
    {
      title: "Climate Response",
      content:
        "The planning responds to Mahabaleshwar's cool, wet climate through sheltered outdoor areas, protected circulation, controlled openings, and carefully positioned spaces that remain comfortable across changing weather conditions.",
    },
  ];
  return <AccordionContent items={items} />;
}

function Section4Content() {
  const items: AccordionItem[] = [
    {
      title: "Architectural Composition",
      content:
        "The villa is developed through a controlled composition of solid and open elements, giving each elevation its own character while maintaining a consistent architectural language.",
    },
    {
      title: "Form Development",
      content:
        "The massing is refined through projections, recesses, horizontal planes, and varying volumes to create depth and visual hierarchy across the villa.",
    },
    {
      title: "Structural Integration",
      content:
        "Architectural and structural systems are developed together, allowing large openings, projecting elements, and complex volumes to be achieved without compromising the integrity of the design.",
    },
    {
      title: "Detail Development",
      content:
        "The character of the villa is carried through carefully resolved architectural details, from façade junctions and balcony edges to railings, frames, parapets, and transitions between different materials.",
    },
    {
      title: "On-Site Realisation",
      content:
        "As construction progresses, the design is continuously reviewed and refined on site, allowing architectural details to respond to actual conditions while preserving the overall design intent and visual consistency.",
    },
  ];
  return <AccordionContent items={items} />;
}