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
  MB_ClientVision,
  MB_MainPageImg,
  MB_PlanningandStrategy,
  MB_ProjectOverview1,
  MB_ProjectOverview2,
  MB_ProjectOverview3,
  MB_ProjectOverview4,
  maps,
  areasize,
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

const tallImageSections = new Set(["section1", "section4"]);

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

export default function PortfolioProject4() {
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
          minH={{ base: "auto", md: "100vh", lg: "100vh" }}
          h={{ base: "auto", md: "100vh", lg: "100vh" }}
          w="100%"
          bgImage={`url(${MB_MainPageImg})`}
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
              pb={{ base: "3%", md: "1.5%", lg: "4%" }}
              pt={{ base: 2, md: "auto", lg: 0 }}
              direction={{ base: "column", lg: "row" }}
              justify={{ base: "flex-end", lg: "space-between" }}
              align={{ base: "stretch", lg: "flex-end" }}
              gap={{ base: 3, md: 3, lg: "3%" }}
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
                    sm: "42px",
                    md: "52px",
                    lg: "72px",
                  }}
                  lineHeight="0.95"
                  fontWeight="700"
                >
                  MAHABALESHWAR
                </Text>

                <Text
                  mt={{ base: 1, md: 2, lg: 2 }}
                  fontSize={{
                    base: "22px",
                    sm: "28px",
                    md: "34px",
                    lg: "50px",
                  }}
                  fontWeight="300"
                >
                  VILLA
                </Text>

                <Flex
                  mt={{ base: 2, md: 3, lg: 8 }}
                  gap={{ base: 3, md: 5, lg: 6 }}
                  flexWrap="wrap"
                  color="#F5F5F5"
                  fontSize={{ base: "13px", md: "15px", lg: "16px" }}
                >
                  <Flex align="center" gap={2}>
                    <Image src={maps} w="14px" />
                    <Text fontWeight="700">Mahabaleshwar, Maharashtra</Text>
                  </Flex>

                  <Flex align="center" gap={2}>
                    <Image src={areasize} w="18px" />
                    <Text fontWeight="700">Ongoing</Text>
                  </Flex>
                </Flex>

                <Text
                  mt={{ base: 2, md: 3, lg: 5 }}
                  color="#F4F4F4"
                  lineHeight="1.8"
                  fontSize={{
                    base: "13px",
                    sm: "14px",
                    md: "15px",
                    lg: "15.5px",
                  }}
                  letterSpacing="0.02em"
                  wordSpacing="0.05em"
                >
                  A contemporary villa envisioned as a luxurious escape that
                  embraces Mahabaleshwar's natural character. The design aims
                  to merge seamlessly with its surroundings while maintaining a
                  distinctly modern identity through clean forms, large glass
                  openings, and carefully crafted outdoor spaces.
                </Text>
              </Box>

              <Flex
                position="relative"
                zIndex={10}
                direction="column"
                w={{ base: "100%", lg: "50%" }}
                maxW={{ base: "100%", lg: "50%" }}
                gap={{ base: "5%", lg: "6%" }}
              >
                <Box
                  position="relative"
                  w="100%"
                  height={{
                    base: "260px",
                    sm: "280px",
                    md: "240px",
                    lg: "300px",
                  }}
                  mt={{ base: 2, md: 3, lg: 0 }}
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
      overflow="hidden"
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

      <Box display={{ base: "block", md: "none" }} mb={2}>
        <Text fontSize="24px" fontWeight="700" lineHeight=".95">
          {title}
        </Text>
        <Text fontSize="18px" fontWeight="300">
          {subtitle}
        </Text>
      </Box>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "360px minmax(0, 1fr)",
          lg: "440px minmax(0, 1fr)",
        }}
        gap={{ base: 3, md: 6, lg: 12 }}
        alignItems={{ base: "stretch", md: "flex-end", lg: "stretch" }}
        flex={1}
        overflow="hidden"
        minH={0}
      >
        <GridItem
          order={{ base: 2, md: 1 }}
          display="flex"
          flexDirection="column"
          overflowY="auto"
          pr={{ base: 1, md: 2 }}
          pb={{ base: 2, md: 0, lg: 6 }}
          h="100%"
          minH={0}
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <Box mt={{ base: 0, md: "auto" }}>
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
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          {isVideo && typeof image === "string" ? (
            <Box
              position="relative"
              w="100%"
              maxH={{
                base: tallImageMobile ? "30vh" : "26vh",
                md: "calc(100vh - 90px)",
              }}
              aspectRatio={{ base: "16 / 10", md: "16 / 10" }}
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
              h="100%"
              w="100%"
              maxH={{
                base: tallImageMobile ? "30vh" : "26vh",
                md: "calc(100vh - 90px)",
              }}
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
        templateColumns="repeat(2, 1fr)"
        gapX={{ base: 4, md: 8 }}
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