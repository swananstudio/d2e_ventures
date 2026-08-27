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
import { useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

import {
  UK_MainPageImg,
  UK_ProjectOverview,
  UK_ClientVision1,
  UK_ClientVision2,
  UK_ClientVision3,
  UK_DeliveryandExecution,
  UK_DesignandDevelopment1,
  UK_DesignandDevelopment2,
  UK_DesignandDevelopment3,
  UK_DesignandDevelopment4,
  UK_PlanningandStrategy,
  maps,
  areasize,
} from "../../assets/assets";

const MotionBox = motion.create(Box);

// Grouped arrays for sections that use a carousel of multiple images
const clientVisionImages = [UK_ClientVision1, UK_ClientVision2, UK_ClientVision3];
const designDevelopmentImages = [
  UK_DesignandDevelopment1,
  UK_DesignandDevelopment2,
  UK_DesignandDevelopment3,
  UK_DesignandDevelopment4,
];

type Thumbnail = {
  section: string;
  images?: string[];
  video?: string;
};

const projectThumbnails: Thumbnail[] = [
  {
    video: UK_ProjectOverview,
    section: "section1",
  },
  {
    images: clientVisionImages,
    section: "section2",
  },
  {
    video: UK_PlanningandStrategy,
    section: "section3",
  },
  {
    images: designDevelopmentImages,
    section: "section4",
  },
  {
    video: UK_DeliveryandExecution,
    section: "section5",
  },
];

const sectionOrder = ["section1", "section2", "section3", "section4", "section5"];

const tallImageSections = new Set(["section1", "section3", "section5"]);

const morphTransition: Transition = {
  type: "spring",
  stiffness: 190,
  damping: 26,
  mass: 0.9,
};

const ease = [0.22, 1, 0.36, 1] as const;

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
    image: UK_ProjectOverview,
    imageAlt: "Project overview",
    isVideo: true,
  },
  section2: {
    title: "CLIENT",
    subtitle: "Vision",
    image: clientVisionImages,
    imageAlt: "Client vision",
    isCarousel: true,
  },
  section3: {
    title: "PLANNING &",
    subtitle: "STRATEGY",
    image: UK_PlanningandStrategy,
    imageAlt: "Planning and strategy",
    isVideo: true,
  },
  section4: {
    title: "DESIGN &",
    subtitle: "Development",
    image: designDevelopmentImages,
    imageAlt: "Design and development",
    isCarousel: true,
  },
  section5: {
    title: "EXECUTION &",
    subtitle: "Delivery",
    image: UK_DeliveryandExecution,
    imageAlt: "Execution and delivery",
    isVideo: true,
  },
};

export default function PortfolioProject5() {
  const [currentSection, setCurrentSection] = useState("main");
  const [activeIndex, setActiveIndex] = useState(1);
  const [openedCardIndex, setOpenedCardIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? true;

  const goNext = () => {
    setActiveIndex((previous) => (previous + 1) % projectThumbnails.length);
  };

  const goPrevious = () => {
    setActiveIndex(
      (previous) =>
        (previous - 1 + projectThumbnails.length) % projectThumbnails.length
    );
  };

  const openCard = (index: number) => {
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
      <Box position="relative">
        <Flex
          minH={{ base: "100svh", md: "100svh", lg: "100vh" }}
          h={{ base: "auto", md: "auto", lg: "100vh" }}
          overflow="hidden"
          w="100%"
          bgImage={`url(${UK_MainPageImg})`}
          bgSize="cover"
          backgroundPosition="center"
          bgRepeat="no-repeat"
          position="relative"
          py={0}
        >
          <Box position="absolute" inset={0} bg="rgba(0,0,0,.35)" />

          <Flex
            position="relative"
            zIndex={2}
            direction="column"
            w="100%"
            minH={{ base: "100svh", md: "100svh", lg: "100%" }}
            h={{ base: "auto", md: "auto", lg: "100%" }}
          >
            <Flex
              flex={1}
              pl={{ base: "6%", md: "6%", lg: "3%" }}
              pr={{ base: "6%", md: "6%", lg: "0%" }}
              pb={{ base: 3, sm: 3, md: 2, lg: "4%" }}
              pt={{ base: "94px", sm: "100px", md: "106px", lg: 0 }}
              direction={{ base: "column", lg: "row" }}
              justify={{ base: "flex-end", lg: "space-between" }}
              align={{ base: "stretch", lg: "flex-end" }}
              gap={{ base: 2, sm: 2, md: 2, lg: "3%" }}
            >
              <Box
                position="relative"
                zIndex={1}
                color="white"
                w={{ base: "100%", lg: "45%" }}
                mb={{ base: 0, lg: 18 }}
              >
                <Text
                  fontSize={{
                    base: "32px",
                    sm: "38px",
                    md: "44px",
                    lg: "72px",
                  }}
                  lineHeight="0.95"
                  fontWeight="700"
                >
                  URLI KANCHAN
                </Text>

                <Text
                  mt={{ base: 1, md: 2, lg: 2 }}
                  fontSize={{
                    base: "22px",
                    sm: "26px",
                    md: "28px",
                    lg: "50px",
                  }}
                  fontWeight="300"
                >
                  OLD AGE HOME
                </Text>

                <Flex
                  mt={{ base: 2, md: 2, lg: 8 }}
                  gap={{ base: 3, md: 4, lg: 6 }}
                  flexWrap="wrap"
                  color="#F5F5F5"
                  fontSize={{ base: "13px", md: "15px", lg: "16px" }}
                >
                  <Flex align="center" gap={2}>
                    <Image src={maps} w="14px" />
                    <Text fontWeight="700">Urli Kanchan, Maharashtra</Text>
                  </Flex>

                  <Flex align="center" gap={2}>
                    <Image src={areasize} w="18px" />
                    <Text fontWeight="700">Completed</Text>
                  </Flex>
                </Flex>

                <Text
                  mt={{ base: 1, md: 1, lg: 5 }}
                  color="#F4F4F4"
                  lineHeight={{ base: "1.65", md: "1.5", lg: "1.8" }}
                  fontSize={{
                    base: "13px",
                    sm: "13px",
                    md: "14px",
                    lg: "15.5px",
                  }}
                  letterSpacing="0.02em"
                  wordSpacing="0.05em"
                >
                  A thoughtfully planned senior living environment shaped
                  around safety, familiarity, and everyday comfort. Set
                  within a quiet agricultural landscape, the old age home
                  uses a simple and practical architectural language,
                  generous semi-open spaces, natural light, and familiar
                  domestic-scale interiors to create a place that feels
                  welcoming rather than institutional.
                </Text>
              </Box>

              <Flex
                position="relative"
                zIndex={10}
                direction="column"
                w={{ base: "100%", lg: "50%" }}
                maxW={{ base: "100%", lg: "50%" }}
                gap={{ base: 3, md: 4, lg: "6%" }}
                flexShrink={0}
              >
                <Box
                  position="relative"
                  w="100%"
                  height={{
                    base: "clamp(180px, 33svh, 260px)",
                    sm: "clamp(195px, 35svh, 275px)",
                    md: "clamp(200px, 37svh, 255px)",
                    lg: "300px",
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

                    const mobileAnimate = {
                      left: "50%",
                      x: "-50%",
                      top: 0,
                      rotate: 0,
                      opacity: isFrontMobile ? 1 : 0,
                      scale: 1,
                    };

                    const details = sectionDetailsMap[project.section];
                    const thumbnailImage = project.images?.[0];

                    return (
                      <MotionBox
                        key={index}
                        layoutId={
                          mounted ? `project-card-${index}` : undefined
                        }
                        position="absolute"
                        top={0}
                        w={{ base: "84%", sm: "68%", md: "48%", lg: "30%" }}
                        h="100%"
                        zIndex={
                          isMobile
                            ? 10 - stackPosition
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
                        initial={false}
                        animate={isMobile ? mobileAnimate : desktopAnimate}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
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
                  justify="center"
                  w="100%"
                  gap={4}
                  mt={{ base: 2, md: 2, lg: 5 }}
                  flexShrink={0}
                >
                  <Button
                    aria-label="Previous project"
                    onClick={goPrevious}
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
        "Turnkey Execution",
      ],
    },
    {
      title: "Key Spaces",
      content: [
        "Residential / Sleeping Areas",
        "Common Living & Lounge Areas",
        "Dining & Community Spaces",
        "Waiting & Reception Areas",
        "Staff / Administrative Spaces",
        "Semi-Open Corridors & Verandahs",
        "Landscaped Outdoor Areas",
        "Secure Entry & Circulation Areas",
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
        <Detail
          label="Project Type"
          value="Institutional (Old Age Home / Senior Care Facility)"
        />
        <Detail label="Completion Year" value="2025" />
        <Detail label="Project Duration" value="2 Months" />
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
  const total = items.length;

  return (
    <LayoutGroup>
      <motion.div layout transition={{ duration: 0.7, ease }}>
        {items.map((item, index) => {
          const isOpen = active === index;
          // Items in the bottom half of a long list expand upward instead of
          // downward, so their content opens into space that's already
          // visible rather than being pushed off/clipped at the bottom.
          const opensUpward = index >= Math.ceil(total / 2);

          const panel = (
            <AnimatePresence key="panel" initial={false}>
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
                    borderColor="rgba(255, 255, 255, 0.11)"
                    borderRadius="8px"
                    px={{ base: 2.5, md: 3 }}
                    py={{ base: 1.5, md: 2 }}
                    mt={opensUpward ? { base: 1.5, md: 2 } : 0}
                    mb={opensUpward ? 0 : { base: 1.5, md: 2 }}
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
          );

          const trigger = (
            <Flex
              key="trigger"
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
          );

          return (
            <motion.div
              key={item.title}
              layout
              transition={{ duration: 0.7, ease }}
              style={{
                display: "flex",
                flexDirection: opensUpward ? "column-reverse" : "column",
              }}
            >
              {opensUpward ? (
                <>
                  {panel}
                  {trigger}
                </>
              ) : (
                <>
                  {trigger}
                  {panel}
                </>
              )}

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
        "Create an intuitive and easy-to-navigate environment with clear circulation, familiar spatial cues, and comfortable shared spaces that support independent movement, encourage meaningful social interaction, and foster a strong sense of belonging among residents.",
    },
    {
      title: "Requirements",
      content: [
        "Safe and comfortable spaces suited to the needs of elderly residents",
        "A familiar residential character that creates a sense of belonging",
        "Clearly defined common areas for interaction, dining, and recreation",
        "Generous corridors and semi-open spaces for comfortable movement and informal interaction",
        "Good natural light, ventilation, and visual connection with the surrounding landscape",
        "Secure entrances, windows, and circulation areas without creating an overly restrictive environment",
        "Easy-to-maintain materials and finishes suitable for everyday use",
        "Practical planning that prioritizes essential comfort while remaining budget-conscious",
        "Green outdoor areas that provide residents with opportunities to sit, relax, and connect with nature",
        "A balance between private living spaces and shared community areas",
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
        "Set within a rural agricultural landscape, the facility offers open surroundings, expansive views, abundant greenery, and a quiet environment. Its placement among cultivated fields and vegetation makes the natural setting an integral part of residents' daily experience.",
    },
    {
      title: "Spatial Zoning",
      content:
        "Organized the facility around a clear separation of residential, communal, dining, administrative, and circulation areas. Common spaces are positioned to remain visually connected and easily accessible, while corridors and verandahs act as transitional spaces between private rooms and shared activities.",
    },
    {
      title: "Senior-Centric Planning",
      content:
        "Developed the spaces with everyday senior living in mind, prioritizing simple circulation, visibility, accessibility, security, and ease of use. Wide movement zones, open common areas, ramps for physically disabled residents, controlled entrances, protective grills, and clear connections between spaces contribute to a safer environment.",
    },
    {
      title: "Landscape Integration",
      content:
        "Used the surrounding agricultural landscape and existing greenery as an extension of the living environment. Gardens, planted edges, open views, and vegetation around the building soften the built form while providing a calmer and more natural setting for residents.",
    },
  ];
  return <AccordionContent items={items} />;
}

function Section4Content() {
  const items: AccordionItem[] = [
    {
      title: "Architectural Character",
      content:
        "Retained a straightforward RCC architectural language with clean rectangular volumes, flat roofs, shaded verandahs, and simple façade articulation. The restrained form keeps construction practical and economical while maintaining a welcoming residential character.",
    },
    {
      title: "Materiality",
      content:
        "Established a durable and budget-conscious material palette using simple plastered surfaces, ceramic and marble-finish flooring, metal grills, painted walls, timber-finish elements, and locally practical materials. The emphasis is on longevity, ease of maintenance, and everyday functionality rather than unnecessary ornamentation.",
    },
    {
      title: "Interior Character",
      content:
        "Created warm, familiar interiors with wood flooring, simple furniture, plants, soft colours, and generous common areas that encourage comfort and social interaction.",
    },
    {
      title: "Budget-Conscious Design",
      content:
        "Focused design decisions on essential comfort, durability, and functionality rather than expensive architectural gestures. Simple forms, readily available materials, practical finishes, and efficient use of existing spaces help create a comfortable senior living environment while keeping construction and maintenance requirements manageable.",
    },
  ];
  return <AccordionContent items={items} />;
}

function Section5Content() {
  const items: AccordionItem[] = [
    {
      title: "Architectural Execution",
      content:
        "Translated the planning intent into simple, functional architectural elements suited to senior living.",
    },
    {
      title: "Site Integration",
      content:
        "Coordinated built spaces, circulation, landscape, and open areas for a cohesive site experience.",
    },
    {
      title: "Material & Detail Control",
      content:
        "Focused on durable, economical materials and straightforward detailing for long-term use.",
    },
    {
      title: "Spatial Quality",
      content:
        "Maintained natural light, ventilation, shaded semi-open spaces, and comfortable movement throughout.",
    },
    {
      title: "Functional Delivery",
      content:
        "Ensured the built environment remained safe, accessible, easy to navigate, and practical to maintain.",
    },
  ];
  return <AccordionContent items={items} />;
}