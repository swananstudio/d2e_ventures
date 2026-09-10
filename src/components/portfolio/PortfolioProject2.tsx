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
    KV_ProjectOverview1,
    KV_ProjectOverview2,
    KV_ProjectOverview3,
    KV_ClientVision1,
    KV_ClientVision2,
    KV_ClientVision3,
    KV_DesignandDevelopment,
    KV_PlanningandStrategy,
    KV_MainPageImg,
    KV_ExecutionandDelivery1,
    KV_ExecutionandDelivery2,
    KV_ExecutionandDelivery3,
    KV_ExecutionandDelivery4,
    KV_ExecutionandDelivery5,

} from "../../assets/assets";

const MotionBox = motion.create(Box);

type Thumbnail = {
    section: string;
    images?: string[];
    video?: string;
};

const projectThumbnails: Thumbnail[] = [
    {
        images: [KV_ProjectOverview1, KV_ProjectOverview2, KV_ProjectOverview3],
        section: "section1",
    },
    {
        images: [KV_ClientVision1, KV_ClientVision2, KV_ClientVision3],
        section: "section2",
    },
    {
        video: KV_PlanningandStrategy,
        section: "section3",
    },
    {
        video: KV_DesignandDevelopment,
        section: "section4",
    },
    {
        images: [
            KV_ExecutionandDelivery1,
            KV_ExecutionandDelivery2,
            KV_ExecutionandDelivery3,
            KV_ExecutionandDelivery4,
            KV_ExecutionandDelivery5,
        ],
        section: "section5",
    },
];

const sectionOrder = [
    "section1",
    "section2",
    "section3",
    "section4",
    "section5",
];

const tallImageSections = new Set(["section1", "section2", "section5"]);

const morphTransition: Transition = {
    type: "spring",
    stiffness: 190,
    damping: 26,
    mass: 0.9,
};

const ease = [0.22, 1, 0.36, 1] as const;

// Smooth 3D card flip timing shared by every project.
const CARD_FLIP_DURATION = 0.7;
const CARD_FLIP_EASE = [0.65, 0, 0.35, 1] as const;
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
        image: [KV_ProjectOverview1, KV_ProjectOverview2, KV_ProjectOverview3],
        imageAlt: "Project overview",
        isCarousel: true,
    },
    section2: {
        title: "CLIENT",
        subtitle: "Vision",
        image: [KV_ClientVision1, KV_ClientVision2, KV_ClientVision3],
        imageAlt: "Client vision",
        isCarousel: true,
    },
    section3: {
        title: "PLANNING &",
        subtitle: "STRATEGY",
        image: KV_PlanningandStrategy,
        imageAlt: "Planning and strategy",
        isVideo: true,
    },
    section4: {
        title: "DESIGN",
        subtitle: "Development",
        image: KV_DesignandDevelopment,
        imageAlt: "Design development",
        isVideo: true,
    },
    section5: {
        title: "Execution",
        subtitle: "& Delivery",
        image: [
            KV_ExecutionandDelivery1,
            KV_ExecutionandDelivery2,
            KV_ExecutionandDelivery3,
            KV_ExecutionandDelivery4,
            KV_ExecutionandDelivery5,
        ],
        imageAlt: "Execution and delivery",
        isCarousel: true,
    },
};

type PortfolioProject3Props = {
  isActive?: boolean;
  direction?: 1 | -1;
};

export default function PortfolioProject2({
  isActive = true,
  direction = 1,
}: PortfolioProject3Props) {
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
  const touchStartXRef = useRef<number | null>(null);
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
      // Vertical wheel/trackpad input must continue to the outer Portfolio
      // scroller. Only a genuinely horizontal wheel gesture belongs to cards.
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      if (mobileWheelGestureLockedRef.current || isCardAnimatingRef.current) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      wheelAccum += event.deltaX;

      if (resetTimer !== null) {
        window.clearTimeout(resetTimer);
      }

      resetTimer = window.setTimeout(() => {
        wheelAccum = 0;
      }, 100);

      if (Math.abs(wheelAccum) < 30) return;

      const step: 1 | -1 = wheelAccum > 0 ? 1 : -1;
      wheelAccum = 0;

      mobileWheelGestureLockedRef.current = true;
      armWheelGestureUnlock();
      moveCardRef.current(step);
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartYRef.current = touch.clientY;
      touchStartXRef.current = touch.clientX;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) return;

      const touch = event.touches[0];
      if (!touch) return;

      const dx = touch.clientX - touchStartXRef.current;
      const dy = touch.clientY - touchStartYRef.current;

      // Let native/outer scrolling handle vertical gestures.
      if (Math.abs(dx) <= Math.abs(dy) || Math.abs(dx) < 10) return;

      // Once the gesture is clearly horizontal, prevent the browser from
      // trying to perform horizontal page movement as well.
      event.preventDefault();
      event.stopPropagation();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const dx = touch.clientX - touchStartXRef.current;
      const dy = touch.clientY - touchStartYRef.current;

      touchStartXRef.current = null;
      touchStartYRef.current = null;

      // Cards own horizontal swipes; Portfolio owns vertical swipes.
      if (Math.abs(dx) < 35 || Math.abs(dx) <= Math.abs(dy) || isCardAnimatingRef.current) return;

      event.preventDefault();
      event.stopPropagation();
      moveCardRef.current(dx < 0 ? 1 : -1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
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
                <Box
          position="absolute"
          top="-6%"
          left="-6%"
          w="112%"
          h="112%"
          bgImage={`url(${KV_MainPageImg})`}
          bgSize="cover"
          backgroundPosition="center"
          bgRepeat="no-repeat"
          zIndex={0}
        />
        <Box position="absolute" inset={0} bg="rgba(0,0,0,.35)" zIndex={1} />
        <Flex
                    minH={{ base: "100dvh", md: "100dvh", lg: "100vh" }}
          h={{ base: "100dvh", md: "100dvh", lg: "100vh" }}
                    w="100%"
                    position="relative"
                    overflow="hidden"
                    py={{ base: 2, sm: 3, md: 4, lg: 0 }}
                >

                    <Flex
                        position="relative"
                        zIndex={2}
                        direction="column"
                        w="100%"
                        h="100%"
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
                
  gap={{ base: 3, md: 4, lg: "6%" }}
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
                                    overflow="visible"
                                    isolation="isolate"
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
                          touchAction={{ base: "pan-y", lg: "auto" }}
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
                          rotateY: 0,
                        }}
                        animate={{
                          ...base,
                          rotateY: isMobile ? (isActive ? 0 : 90) : isActive ? 0 : (direction >= 0 ? -82 : 82),
                        }}
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
                            duration: CARD_FLIP_DURATION,
                            delay: Math.abs(distance) * 0.08,
                            ease: CARD_FLIP_EASE,
                          },
                        }}
                        style={{
                          transformPerspective: 1400,
                          transformStyle: "preserve-3d",
                          transformOrigin: "50% 50%",
                          backfaceVisibility: "visible",
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
                                                        autoPlay={isActive || !isMobile}
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
                                    mt={{ base: 2, md: 2, lg: 5 }}
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
                                        <GoArrowLeft size={isMobile ? 18 : 22} />
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
                                        <GoArrowRight size={isMobile ? 18 : 22} />
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
                        isActive={isActive}
                        isMobile={isMobile}
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
                                    {currentSection === "section5" && <Section5Content />}
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
  isActive: boolean;
  isMobile: boolean;
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

  // Same timing and fade behaviour across every project carousel.
  const SLIDE_DURATION = 3000;
  const FADE_DURATION = 1.5;

  useEffect(() => {
    let cancelled = false;

    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;

      if (img.complete && img.naturalWidth > 0) {
        if (!cancelled) {
          setLoaded((prev) => {
            if (prev.has(src)) return prev;
            const next = new Set(prev);
            next.add(src);
            return next;
          });
        }
        return;
      }

      img.onload = () => {
        if (cancelled) return;

        setLoaded((prev) => {
          if (prev.has(src)) return prev;
          const next = new Set(prev);
          next.add(src);
          return next;
        });
      };
    });

    return () => {
      cancelled = true;
    };
  }, [images]);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
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
              transition: `opacity ${FADE_DURATION}s ease-in-out`,
              willChange: "opacity",
            }}
          >
            <motion.img
              src={src}
              alt={`${alt} ${i + 1}`}
              animate={isActive ? { scale: 1.08 } : { scale: 1 }}
              transition={{
                duration: SLIDE_DURATION / 1000 + FADE_DURATION,
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
  isActive,
  isMobile,
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
                    order={{ base: 2, md: 1 }}
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
                                autoPlay={isActive || !isMobile}
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
                            h={{ base: "auto", lg: "100%" }}
                            w="100%"
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
                                            objectFit: "contain",
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
                "Resort Planning & Development",
                "Turnkey Execution",
            ],
        },
        {
            title: "Key Spaces",
            content: [
                "Guest Rooms & Suites",
                "Swimming Pool & Deck",
                "Landscaped Courtyards",
                "Outdoor Dining Areas",
                "Recreational Spaces",
                "Garden & Leisure Areas",
                "Lounge & Common Areas",
                "Outdoor Seating Spaces",
            ],
        },
    ];

    return (
        <PlainContent>
            <Grid
                templateColumns="repeat(2, 1fr)"
                gapX={{ base: 4, md: 8 }}
                gapY={{ base: 2, md: 3 }}
                mb={{ base: 2, md: 3 }}
            >
                <Detail label="Project Type" value="Luxury Resort" />
                <Detail label="Completion Year" value="2024" />
                <Detail label="Project Duration" value="3 Months" />
                <Detail label="Site Area" value="3,800 sq.ft." />
                <Detail label="Built-up Area" value="2,500 sq.ft." />
                <Detail label="Status" value="Completed" />
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
                "Create a distinctive resort experience that combines comfortable hospitality, recreation, and a strong connection with the surrounding natural setting.",
        },
        {
            title: "Requirements",
            content: [
                "Resort accommodation designed for comfort and relaxation",
                "Distinctive tropical-inspired interiors with vibrant, nature-led elements",
                "Swimming pool and dedicated leisure areas for guests",
                "Landscaped outdoor spaces with recreational and social zones",
                "Outdoor dining and seating areas for relaxed guest experiences",
                "A mix of private and shared spaces with smooth circulation",
                "Strong visual connection between indoor spaces, courtyards, and the landscape",
                "Functional spaces designed to support a memorable resort experience",
            ],
        },
    ];
    return <AccordionContent items={items} />;
}

function Section3Content() {
    const items: AccordionItem[] = [
        {
            title: "Contextual Planning",
            content:
                "Planned the resort in response to its natural surroundings, existing site conditions, terrain, climate, and expansive views, ensuring the built environment complements rather than overwhelms the landscape.",
        },
        {
            title: "Spatial Zoning",
            content:
                "Organized guest rooms, recreational areas, pool spaces, dining zones, and common facilities into clearly defined areas while maintaining seamless movement and visual connections throughout the resort.",
        },
        {
            title: "Experiential Design",
            content:
                "Developed spaces around the guest experience, balancing private retreats with vibrant social areas to create opportunities for relaxation, recreation, interaction, and immersive indoor-outdoor living.",
        },
        {
            title: "Landscape Integration",
            content:
                "Integrated landscaped gardens, courtyards, outdoor seating, pool decks, and recreational spaces as an extension of the architecture, creating a cohesive relationship between the resort's built and open areas.",
        },
    ];
    return <AccordionContent items={items} />;
}

function Section4Content() {
    const items: AccordionItem[] = [
        {
            title: "Roofscape",
            content:
                "Developed distinctive pitched and sloping roof forms that give the resort a strong architectural identity while creating generous volumes, shaded spaces, and a comfortable response to the local climate.",
        },
        {
            title: "Materiality",
            content:
                "Established a warm material palette combining natural wood, textured finishes, exposed brick, stone, bamboo, and earthy tones to create a tactile and visually cohesive resort environment.",
        },
        {
            title: "Architectural Detailing",
            content:
                "Introduced refined details through arches, columns, crafted screens, custom furniture, and patterned elements, adding depth and character while reinforcing the resort's design language.",
        },
        {
            title: "Interior Character",
            content:
                "Created individually expressive interiors through botanical patterns, natural textures, handcrafted furniture, warm lighting, and carefully selected accents that give each guest space its own character.",
        },
    ];
    return <AccordionContent items={items} />;
}

function Section5Content() {
    const items: AccordionItem[] = [
        {
            title: "End-to-End Execution",
            content:
                "Transformed the design concept into a complete resort experience, overseeing construction, interiors, landscape, and outdoor amenities through to completion.",
        },
        {
            title: "Integrated Site Coordination",
            content:
                "Brought together contractors, craftsmen, vendors, and specialist teams to execute the resort's diverse architectural and hospitality requirements cohesively.",
        },
        {
            title: "Material & Craftsmanship Control",
            content:
                "Focused on the detailing and workmanship of natural materials, warm textures, traditional architectural elements, and resort-specific interiors.",
        },
        {
            title: "Quality & Timely Delivery",
            content:
                "Maintained rigorous site supervision and quality checks to ensure every space, from guest rooms and courtyards to pools and recreational areas, met the project's design standards.",
        },
    ];
    return <AccordionContent items={items} />;
}