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
  portfolioherosection,
  portfolio_hero_section_swiper1,
  portfolio_hero_section_swiper2,
  portfolio_hero_section_swiper3,
  portfolio_hero_section_swiper4,
  portfolio_hero_section_swiper5,
  maps,
  areasize,
} from "../../assets/assets";

const MotionBox = motion.create(Box);

const projectThumbnails = [
  { image: portfolio_hero_section_swiper1, section: "section1" },
  { image: portfolio_hero_section_swiper2, section: "section2" },
  { image: portfolio_hero_section_swiper3, section: "section3" },
  { image: portfolio_hero_section_swiper4, section: "section4" },
  { image: portfolio_hero_section_swiper5, section: "section5" },
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
    image: string;
    imageAlt: string;
  }
> = {
  section1: {
    title: "PROJECT",
    subtitle: "Overview",
    image: portfolio_hero_section_swiper1,
    imageAlt: "Project overview",
  },
  section2: {
    title: "CLIENT",
    subtitle: "Vision",
    image: portfolio_hero_section_swiper2,
    imageAlt: "Client vision",
  },
  section3: {
    title: "PLANNING &",
    subtitle: "STRATEGY",
    image: portfolio_hero_section_swiper3,
    imageAlt: "Planning and strategy",
  },
  section4: {
    title: "DESIGN",
    subtitle: "Development",
    image: portfolio_hero_section_swiper4,
    imageAlt: "Design development",
  },
  section5: {
    title: "Execution",
    subtitle: "& Delivery",
    image: portfolio_hero_section_swiper5,
    imageAlt: "Execution and delivery",
  },
};

export default function PortfolioProject1() {
  const [currentSection, setCurrentSection] = useState("main");
  const [activeIndex, setActiveIndex] = useState(1);
  const [openedCardIndex, setOpenedCardIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

 const isMobile = useBreakpointValue({ base: true, lg: false }) ?? true;
  useEffect(() => {
    setActiveIndex(isMobile ? 0 : 1);
  }, [isMobile]);
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
          bgImage={`url(${portfolioherosection})`}
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
                    lg: "79px",
                  }}
                  lineHeight="0.95"
                  fontWeight="700"
                >
                  KALPADHAN
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
                  FARM
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
                  lineHeight="1.8"
                  fontSize={{ base: "13px", sm: "14px", md: "15px", lg: "15.5px" }}
                  letterSpacing="0.02em"
                  wordSpacing="0.05em"
                >
                  A farm development project thoughtfully designed to reflect
                  Indian culture through its architecture, materials, and
                  spatial experience. Nestled amidst lush farmland, it features
                  a personalized residence with curated interiors and a private
                  swimming pool.
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

                    return (
                      <MotionBox
                        key={index}
                        layoutId={mounted ? `project-card-${index}` : undefined}
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
                        <Image
                          src={project.image}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          draggable={false}
                          position="relative"
                          zIndex={0}
                        />

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

                <Flex justify="center" w="100%" gap={4} mt={{ base: 2, md: 2, lg: 5 }}>
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
            {...(sectionDetailsMap[currentSection] || sectionDetailsMap.section1)}
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
  image: string;
  imageAlt: string;
  children: ReactNode;
};

type AccordionItem = { title: string; content: string | string[] };

function DetailLayout({
  title,
  subtitle,
  image,
  imageAlt,
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
            <AnimatePresence mode="wait">
              <motion.img
                key={image}
                src={image}
                alt={imageAlt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </AnimatePresence>
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
      <Text color="#D6B46A" fontSize={{ base: "13px", sm: "14px", md: "14px" }} fontWeight="500">
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
      content: ["Architecture", "Interior Design", "Landscape", "Turnkey Execution"],
    },
    {
      title: "Key Spaces",
      content:
        "The farmhouse features three ensuite bedrooms, a double-height living area, private swimming pool, open courtyard, outdoor dining deck, entertainment lounge, and landscaped gardens, thoughtfully designed for seamless indoor and outdoor living.",
    },
  ];

  return (
    <PlainContent>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gapX={{ base: 4, md: 8 }}
        gapY={{ base: 2, md: 3 }}
        mb={{ base: 2, md: 3 }}
      >
        <Detail label="Project Type" value="Luxury Farmhouse" />
        <Detail label="Completion Year" value="2024" />
        <Detail label="Project Duration" value="14 Months" />
        <Detail label="Site Area" value="22,000 sq.ft." />
        <Detail label="Built-up Area" value="2500 sq.ft." />
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
                <Text fontSize={{ base: "16px", sm: "18px", md: "20px" }} fontWeight="500">
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
        "To develop a farmhouse that serves as a weekend retreat, preserving the openness and character of the agricultural landscape.",
    },
    {
      title: "Requirements",
      content: [
        "Traditional Indian architecture with contemporary planning",
        "Vernacular sloping roofs, natural materials, and earthy finishes",
        "Personalized family retreat with integrated indoor–outdoor living",
        "Private pool, verandahs, and rooftop sit-out overlooking farmland",
        "Distinct private and recreational zones with seamless circulation",
        "Optimized for panoramic views, natural daylight, and cross ventilation",
      ],
    },
  ];
  return <AccordionContent items={items} />;
}

function Section3Content() {
  const items: AccordionItem[] = [
    {
      title: "Contextual Planning",
      content: ["Site Analysis • Orientation", "Topography • Environmental Response"],
    },
    {
      title: "Spatial Strategy",
      content: ["Spatial Zoning • Circulation", "Functional Planning • User Experience"],
    },
    {
      title: "Integrated Design",
      content: ["Passive Design • Landscape Integration", "Daylighting • Ventilation"],
    },
    {
      title: "Execution Planning",
      content: [
        "Technical Coordination • Services Integration",
        "Buildability • Project Delivery",
      ],
    },
  ];
  return <AccordionContent items={items} />;
}

function Section4Content() {
  const items: AccordionItem[] = [
    {
      title: "Roofscape",
      content:
        "Traditional sloping roofs reinterpret vernacular architecture while enhancing climate responsiveness.",
    },
    {
      title: "Materiality",
      content:
        "A restrained palette of natural materials and earthy finishes creates a timeless architectural character.",
    },
    {
      title: "Spatial Experience",
      content:
        "Open living spaces, verandahs, and courtyards blur the boundary between indoors and outdoors.",
    },
    {
      title: "Landscape Integration",
      content:
        "The pool, gardens, and outdoor spaces are designed as an extension of the architecture.",
    },
  ];
  return <AccordionContent items={items} />;
}

function Section5Content() {
  const items: AccordionItem[] = [
    {
      title: "End-to-End Delivery",
      content:
        "Led a 14-month execution journey from concept development and planning through construction, finishing, and final handover.",
    },
    {
      title: "Integrated Coordination",
      content:
        "Coordinated architecture, interiors, landscape, structural, and MEP teams while managing 20+ specialized contractors and vendors.",
    },
    {
      title: "Quality Assurance",
      content:
        "Conducted 100+ site reviews, ensuring construction quality, material excellence, timely progress, and meticulous workmanship at every stage.",
    },
    {
      title: "Seamless Execution",
      content:
        "Delivered a cohesive built environment where architecture, interiors, and landscape came together as one unified design vision.",
    },
  ];
  return <AccordionContent items={items} />;
}