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
//import Navbar from "../../layout/Navbar";

import {
  PortfolioProject2Img,
  GC_clientVision,
  GC_ExecutionandDelivery,
  GC_PlanningandStrategy,
  
  GC_ExecutionandDelivery_CoverImg,
  maps,
  areasize,
  GC_Project_Overview_1,
  GC_Project_Overview_2,
  GC_Project_Overview_3,
  GC_Project_Overview_4,
  GC_Project_Overview_5,
} from "../../assets/assets";

const MotionBox = motion(Box);

const overviewImages = [
  GC_Project_Overview_1,
  GC_Project_Overview_2,
  GC_Project_Overview_3,
  GC_Project_Overview_4,
  GC_Project_Overview_5,
];

const projectThumbnails = [
  { image: GC_Project_Overview_2, section: "section1" },
  { image: GC_clientVision, section: "section2" },
  { image: GC_PlanningandStrategy, section: "section3" },
  { image: GC_ExecutionandDelivery_CoverImg, section: "section4" },
];

const sectionOrder = ["section1", "section2", "section3", "section4"];

const tallImageSections = new Set(["section1", "section2"]);

const morphTransition: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 30,
  mass: 1.0,
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
    image: overviewImages,
    imageAlt: "Project overview",
    isCarousel: true,
  },
  section2: {
    title: "CLIENT",
    subtitle: "Vision",
    image: GC_clientVision,
    imageAlt: "Project Goal",
  },
  section3: {
    title: "PLANNING &",
    subtitle: "STRATEGY",
    image: GC_PlanningandStrategy,
    imageAlt: "Planning and strategy",
  },
  section4: {
    title: "EXECUTION",
    subtitle: "& Delivery",
    image: GC_ExecutionandDelivery,
    imageAlt: "Execution and delivery",
    isVideo: true,
  },
};

export default function PortfolioProject2() {
  const [currentSection, setCurrentSection] = useState<string>("main");
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [openedCardIndex, setOpenedCardIndex] = useState<number | null>(null);

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
    let distance = index - activeIndex;

    if (distance > projectThumbnails.length / 2) {
      distance -= projectThumbnails.length;
    }

    if (distance < -projectThumbnails.length / 2) {
      distance += projectThumbnails.length;
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
          minH={{ base: "auto", md: "100vh", lg: "100vh" }}
          h={{ base: "auto", md: "100vh", lg: "100vh" }}
          w="100%"
          bgImage={`url(${PortfolioProject2Img})`}
          bgSize="cover"
          backgroundPosition="center"
          bgRepeat="no-repeat"
          position="relative"
          overflow="hidden"
          py={{ base: 2, sm: 3, md: 4, lg: 0 }} 
        >
          <Box position="absolute" inset={0} bg="rgba(0,0,0,.35)" />

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
                 pb={{ base: "10%", md: "1.5%", lg: "4%" }}
              pt={{ base: "88px" , md: "auto", lg: 0 }}
              direction={{ base: "column", lg: "row" }}
              justify={{ base: "flex-end", lg: "space-between" }}
              align={{ base: "stretch", lg: "flex-end" }}
              gap={{ base: 3, md: 3, lg: "3%" }}
            >
              {/* LEFT SIDE TEXT BLOCK */}
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
                    sm: "42px",
                    md: "52px",
                    lg: "68px",
                    xl: "76px",
                  }}
                  lineHeight="0.95"
                  fontWeight="700"
                >
                  GOODWILL
                </Text>

                <Text
                  mt={{ base: 1, md: 2 }}
                  fontSize={{
                    base: "22px",
                    sm: "28px",
                    md: "34px",
                    lg: "42px",
                  }}
                  fontWeight="300"
                >
                  CRESCENT
                </Text>

                <Flex
                  mt={{ base: 2, md: 3, lg: 8 }}
                  gap={{ base: 3, md: 5, lg: 6 }}
                  flexWrap="wrap"
                  color="#F5F5F5"
                  fontSize={{ base: "13px", md: "15px" }}
                >
                  <Flex align="center" gap={2}>
                    <Image src={maps} w="14px" />
                    <Text fontWeight="700">Pune, Maharashtra</Text>
                  </Flex>

                  <Flex align="center" gap={2}>
                    <Image src={areasize} w="18px" />
                    <Text fontWeight="700">22,000 Sq.ft.</Text>
                  </Flex>
                </Flex>

                <Text
                  mt={{ base: 2, md: 3, lg: 5 }}
                  color="#F4F4F4"
                  lineHeight="1.6"
                  fontSize={{
                    base: "13px",
                    sm: "14px",
                    md: "15px",
                    lg: "16px",
                  }}
                  letterSpacing="0.01em"
                >
                  This residential interior is thoughtfully designed to blend
                  warm wood tones, soft neutrals, and natural textures, creating
                  a calm and contemporary home. The space balances
                  functionality with character through custom details, ambient
                  lighting, curated décor, and earthy accents.
                </Text>
              </Box>

              {/* RIGHT SIDE CARDS BLOCK */}
              <Flex
                position="relative"
                zIndex={10}
                direction="column"
                w={{ base: "100%", lg: "50%" }}
                maxW={{ base: "100%", lg: "50%" }}
                align={{ base: "center", lg: "flex-end" }}
              >
                <Box
                  position="relative"
                  w="100%"
                  h={{ base: "260px", sm: "280px", md: "240px", lg: "300px" }}
                  minH={{ base: "230px", md: "220px", lg: "300px" }}
                  maxH={{ base: "320px", md: "260px", lg: "300px" }}
                  mt={{ base: 2, md: 3, lg: 0 }} /* REDUCED MARGIN TOP ABOVE CARDS */
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

                    const mobileAnimate = {
                      left: "50%",
                      x: "-50%",
                      top: 0,
                      rotate: 0,
                      opacity: isFrontMobile ? 1 : 0,
                      scale: 1,
                    };

                    const details = sectionDetailsMap[project.section];

                    return (
                      <MotionBox
                        key={index}
                        layoutId={`project-card-${index}`}
                        position="absolute"
                        top={0}
                        w={{ base: "85%", sm: "70%", md: "46%", lg: "30%" }}
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
                        transition={
                          isMobile
                            ? {
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                              }
                            : {
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                              }
                        }
                        style={{
                          willChange: "opacity, transform",
                        }}
                      >
                        {details.isVideo ? (
                          <video
                            src={details.image as string}
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
                            src={project.image}
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

                <Flex justify="center" w="100%" gap={4} mt={{ base: 2, md: 2, lg: 5 }}> {/* REDUCED MARGIN TOP BELOW CARDS */}
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
                    flexShrink={0}
                  >
                    <GoArrowLeft size={isMobile ? 18 : 22} />
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
                    flexShrink={0}
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
            {...(sectionDetailsMap[currentSection] || sectionDetailsMap.section1)}
          >
            <Box overflow="visible">
              {currentSection === "section1" && <OverviewDetails />}
              {currentSection === "section2" && <Section2Content />}
              {currentSection === "section3" && <Section3Content />}
              {currentSection === "section4" && <Section4Content />}
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
    // Synchronously check which images are already cached by the browser
    // so a revisit doesn't blank out while waiting for onload to re-fire.
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
}: DetailLayoutProps) {
  // Portaled to document.body so this "fixed" overlay is actually fixed to
  // the viewport, instead of being trapped inside Swiper's transformed
  // .swiper-wrapper (which breaks position: fixed + z-index stacking,
  // letting the Navbar show through on top of this overlay).
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
      overflow="hidden"
      px={{ base: 4, sm: 6, md: 8, lg: 12 }}
      pt={{ base: 4, sm: 6, md: 7, lg: 8 }}
      pb={{ base: 4, sm: 6, lg: 8 }}
      display="flex"
      flexDirection="column"
    >
      <Flex justify="space-between" align="center" mb={{ base: 2, md: 4 }} zIndex={2}>
        <Flex
          as="button"
          align="center"
          gap={{ base: 2, md: 3 }}
          color="#B8965A"
          cursor="pointer"
          _hover={{ color: "#d7b47d" }}
          onClick={onClose}
        >
          <GoArrowLeft size={20} />
          <Text fontSize={{ base: "14px", sm: "18px", md: "22px", lg: "24px" }} fontWeight="500">
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
            <GoChevronLeft size={26} />
          </Box>
          <Box
            as="button"
            cursor={isLast ? "default" : "pointer"}
            opacity={isLast ? 0.3 : 1}
            _hover={isLast ? {} : { color: "#d7b47d" }}
            onClick={isLast ? undefined : onNext}
          >
            <GoChevronRight size={26} />
          </Box>
        </Flex>
      </Flex>

      <Box display={{ base: "block", md: "none" }} mb={2}>
        <Text fontSize="24px" fontWeight="700" lineHeight=".95">
          {title}
        </Text>
        <Text fontSize="18px" fontWeight="300">
          {subtitle}
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "360px minmax(0, 1fr)", lg: "440px minmax(0, 1fr)" }}
        gap={{ base: 3, md: 6, lg: 12 }}
        alignItems={{ base: "stretch", md: "flex-end" }}
        flex={1}
        overflow="hidden"
        minH={0}
      >
        <GridItem
          order={{ base: 2, md: 1 }}
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          overflowY="auto"
          pr={{ base: 1, md: 2 }}
          pb={{ base: 2, md: 0 }}
          maxH={{ base: "100%", md: "calc(100vh - 120px)" }}
          minH={0}
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <Box w="100%">
            <Box display={{ base: "none", md: "block" }} mb={{ md: 3, lg: 3 }}>
              <Text
                fontSize={{ md: "38px", lg: "52px" }}
                fontWeight="700"
                lineHeight=".95"
              >
                {title}
              </Text>
              <Text fontSize={{ md: "26px", lg: "34px" }} fontWeight="300">
                {subtitle}
              </Text>
            </Box>
            {children}
          </Box>
        </GridItem>

        <GridItem
          order={{ base: 1, md: 2 }}
          w="100%"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          overflow="hidden"
        >
          <Box
            position="relative"
            w="100%"
            maxH={{ base: "28vh", md: "calc(100vh - 120px)" }}
            aspectRatio={{ base: "16 / 10", md: "16 / 10" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="black"
            overflow="hidden"
          >
            {isCarousel && Array.isArray(image) ? (
              <ImageCarousel images={image} alt={imageAlt} />
            ) : isVideo && typeof image === "string" ? (
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
            ) : (
              <motion.img
                key={image as string}
                src={image as string}
                alt={imageAlt}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </Box>
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
      <Text color="#D6B46A" fontSize={{ base: "12px", sm: "13px", md: "14px" }} fontWeight="500">
        {label}
      </Text>
      <Text fontSize={{ base: "13px", sm: "14px", md: "16px" }}>{value}</Text>
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
      content: ["Interior Design", "Space Planning"],
    },
    {
      title: "Key Spaces",
      content:
        "The residence includes a cozy, modern living area, dining space, modular kitchen, bedrooms, and well-planned storage solutions. Thoughtful space planning, custom joinery, textured finishes, and curated furnishings create a cohesive character in every room.",
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
        <Detail label="Project Type" value="Residential Interior" />
        <Detail label="Completion Year" value="2025" />
        <Detail label="Project Duration" value="1 Month" />
        <Detail label="Status" value="Completed" />
        <Detail label="Design Approach" value="Contemporary • Warm Minimalism" />
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
                <Text fontSize={{ base: "15px", sm: "17px", md: "20px" }} fontWeight="500">
                  {item.title}
                </Text>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <Text
                    fontSize={{ base: "18px", md: "24px" }}
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
                      borderColor="rgba(255, 255, 255, 0.11)"
                      borderRadius="8px"
                      px={{ base: 2.5, md: 3 }}
                      py={{ base: 1.5, md: 2 }}
                      mb={{ base: 1.5, md: 2 }}
                    >
                      {Array.isArray(item.content) ? (
                        <List.Root
                          as="ul"
                          color="whiteAlpha.800"
                          fontSize={{ base: "12px", sm: "13px", md: "15px" }}
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
                          fontSize={{ base: "12px", sm: "13px", md: "15px" }}
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
        "To shape a contemporary home that feels relaxed, personal, and naturally inviting.",
    },
    {
      title: "Design Requirements",
      content: [
        "Modern residential aesthetic with a sense of warmth",
        "Balanced use of timber, neutral tones, and tactile finishes",
        "Efficient planning for comfortable everyday living",
        "Bespoke cabinetry, furniture, and built-in storage",
        "Ambient and accent lighting to enhance the interiors",
        "Distinct living, dining, kitchen, and private spaces",
        "Consistent material language across the residence",
        "Personalised elements that make the space feel truly lived-in",
      ],
    },
  ];
  return <AccordionContent items={items} />;
}

function Section3Content() {
  const items: AccordionItem[] = [
    {
      title: "Space Planning",
      content:
        "Optimised layouts were developed to improve circulation, functionality, and everyday usability.",
    },
    {
      title: "Functional Zoning",
      content:
        "Living, dining, kitchen, and private areas were clearly defined while maintaining visual continuity.",
    },
    {
      title: "Material Strategy",
      content:
        "A restrained palette of wood, neutral finishes, and tactile materials was established to create warmth and cohesion.",
    },
    {
      title: "Lighting Strategy",
      content:
        "Ambient, task, and accent lighting were layered to enhance functionality and establish a comfortable atmosphere.",
    },
  ];
  return <AccordionContent items={items} />;
}

function Section4Content() {
  const items: AccordionItem[] = [
    {
      title: "End-to-End Execution",
      content:
        "Translated the design intent into a finished interior through detailed coordination, fabrication, installation, and finishing.",
    },
    {
      title: "Vendor Coordination",
      content:
        "Coordinated carpentry, electrical, lighting, furniture, furnishings, and décor to maintain design consistency.",
    },
    {
      title: "Quality Control",
      content:
        "Reviewed finishes, joinery, detailing, and installation at every stage to ensure accuracy and workmanship.",
    },
  ];
  return <AccordionContent items={items} />;
}