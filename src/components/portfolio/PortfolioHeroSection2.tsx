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
import { useState, type ReactNode } from "react";

import Navbar from "../../layout/Navbar";
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

export default function PortfolioHeroSection2() {
  const [currentSection, setCurrentSection] = useState("main");
  const [activeIndex, setActiveIndex] = useState(0);
  const [openedCardIndex, setOpenedCardIndex] = useState<number | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

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
          minH={{ base: "900px", md: "1000px", lg: "100vh" }}
          h={{ base: "auto", lg: "100vh" }}
          w="100%"
          bgImage={`url(${portfolioherosection})`}
          bgSize="cover"
          backgroundPosition="center"
          bgRepeat="no-repeat"
          position="relative"
          overflow="hidden"
        >
          <Box position="absolute" inset={0} bg="rgba(0,0,0,.35)" />

          <Flex
            position="relative"
            zIndex={2}
            direction="column"
            w="100%"
            h="100%"
          >
            <Navbar />

            <Flex
              flex={1}
              pl={{ base: "6%", md: "5%", lg: "3%" }}
              pr={{ base: "6%", md: "4%", lg: "0%" }}
              pb={{ base: "8%", lg: "4%" }}
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              align={{ base: "flex-start", lg: "flex-end" }}
              gap={{ base: "8%", md: "6%", lg: "3%" }}
            >
              <Box
                position="relative"
                zIndex={1}
                color="white"
                w={{ base: "100%", lg: "45%" }}
              >
                <Text
                  fontSize={{
                    base: "42px",
                    sm: "54px",
                    md: "68px",
                    lg: "82px",
                  }}
                  lineHeight="0.95"
                  fontWeight="700"
                >
                  KALPADHAN
                </Text>

                <Text
                  mt={2}
                  fontSize={{
                    base: "30px",
                    sm: "38px",
                    md: "46px",
                    lg: "58px",
                  }}
                  fontWeight="300"
                >
                  FARM
                </Text>

                <Flex
                  mt={6}
                  gap={6}
                  flexWrap="wrap"
                  color="#F5F5F5"
                  fontSize="16px"
                >
                  <Flex align="center" gap={2}>
                    <Image src={maps} w="18px" />
                    <Text>Pune, Maharashtra</Text>
                  </Flex>

                  <Flex align="center" gap={2}>
                    <Image src={areasize} w="18px" />
                    <Text>18,000 Sq.ft.</Text>
                  </Flex>
                </Flex>

                <Text
                  mt={7}
                  color="#F4F4F4"
                  lineHeight="1.8"
                  fontSize={{ base: "16px", md: "18px" }}
                >
                  A farm development project thoughtfully designed to reflect
                  Indian culture through its architecture, materials, and
                  spatial experience.
                </Text>

                <Text
                  mt={4}
                  color="#F4F4F4"
                  lineHeight="1.8"
                  fontSize={{ base: "16px", md: "18px" }}
                >
                  Nestled amidst lush farmland, it features a personalized
                  residence with curated interiors and a private swimming pool.
                </Text>

                <Button
                  mt={5}
                  bg="#FFFFFF25"
                  backdropFilter="blur(12px)"
                  color="white"
                  w={{ base: "100%", sm: "260px", lg: "fit-content" }}
                  border="1px solid rgba(255,255,255,.35)"
                  borderRadius="10px"
                  px={7}
                  _hover={{ bg: "#C8A96B", color: "#000" }}
                  onClick={() => openCard(activeIndex)}
                >
                  <Flex align="center" gap={3}>
                    Explore Gallery
                    <GoArrowRight />
                  </Flex>
                </Button>
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
                  h="42vh"
                  minH="220px"
                  maxH="290px"
                  mt={{ base: 8, sm: 10, md: 0 }}
                  overflow="visible"
                  isolation="isolate"
                >
                  {projectThumbnails.map((project, index) => {
  // Desktop positioning logic
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

  // Mobile stack positioning
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

  return (
    <MotionBox
      key={index}
      layoutId={`project-card-${index}`}
      position="absolute"
      top={0}
      w={{ base: "78%", md: "30%" }}
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
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }
          : {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      style={{
        willChange: "opacity, transform",
      }}
    >
      <Image
        src={project.image}
        w="100%"
        h="100%"
        objectFit="cover"
        draggable={false}
      />
    </MotionBox>
  );
})}
                </Box>

                <Flex justify="center" w="100%" gap={4} mt={5}>
                  <Button
                    aria-label="Previous project"
                    onClick={goPrevious}
                    w="60px"
                    h="60px"
                    minW="60px"
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
                    w="60px"
                    h="60px"
                    minW="60px"
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
  return (
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
      pt={{ base: 5, sm: 6, md: 7, lg: 8 }}
      pb={{ base: 4, sm: 6, lg: 8 }}
      display="flex"
      flexDirection="column"
    >
      <Flex justify="space-between" align="center" mb={{ base: 2, md: 4 }} zIndex={2}>
        <Flex
          as="button"
          align="center"
          gap={3}
          color="#B8965A"
          cursor="pointer"
          _hover={{ color: "#d7b47d" }}
          onClick={onClose}
        >
          <GoArrowLeft size={24} />
          <Text fontSize={{ base: "16px", sm: "18px", md: "22px", lg: "24px" }} fontWeight="500">
            Back to Projects
          </Text>
        </Flex>
        <Flex gap={5} color="#B8965A">
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
        <Text fontSize="28px" fontWeight="700" lineHeight=".95">
          {title}
        </Text>
        <Text fontSize="20px" fontWeight="300">
          {subtitle}
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "360px minmax(0, 1fr)", lg: "440px minmax(0, 1fr)" }}
        gap={{ base: 4, md: 6, lg: 12 }}
        alignItems="stretch"
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
          pb={{ base: 6, md: 6 }}
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
          <Box
            h="100%"
            w="100%"
            maxH={{ base: tallImageMobile ? "30vh" : "26vh", md: "calc(100vh - 90px)" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="black"
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
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </AnimatePresence>
          </Box>
        </GridItem>
      </Grid>
    </MotionBox>
  );
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
        "The farmhouse features four ensuite bedrooms, a double-height living area, private swimming pool, open courtyard, outdoor dining deck, entertainment lounge, and landscaped gardens, thoughtfully designed for seamless indoor and outdoor living.",
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
        <Detail label="Project Type" value="Luxury Farmhouse" />
        <Detail label="Completion Year" value="2024" />
        <Detail label="Project Duration" value="14 Months" />
        <Detail label="Site Area" value="1.5 Acres" />
        <Detail label="Built-up Area" value="8,200 sq.ft." />
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
                      borderColor="whiteAlpha.700"
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