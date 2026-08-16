import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  List,
  Text,
  chakra,
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


import {
  PortfolioProject2Img,
  GC_clientVision,
  GC_ExecutionandDelivery,
  GC_PlanningandStrategy,
  GC_ProjectOverview,
} from "../../assets/assets";

const MotionBox = motion(Box);

const projectThumbnails = [
  { image: GC_ProjectOverview, section: "section1" },
  { image: GC_clientVision, section: "section2" },
  { image: GC_PlanningandStrategy, section: "section3" },
  { image: GC_ExecutionandDelivery, section: "section4", isVideo: true },
];

const sectionOrder = ["section1", "section2", "section3", "section4"];

const tallImageSections = new Set(["section1", "section2"]);

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
    isVideo?: boolean;
  }
> = {
  section1: {
    title: "PROJECT",
    subtitle: "Overview",
    image: GC_ProjectOverview,
    imageAlt: "Project overview",
  },
  section2: {
    title: "PROJECT",
    subtitle: "Goal & Vision",
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
  const [activeIndex, setActiveIndex] = useState<number>(0);
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
          bgImage={`url(${PortfolioProject2Img})`}
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
          {/*-Navbar-*/}

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
                mb={{ base: 10, lg: 18 }}
              >
                <Text
                  fontSize={{
                    base: "42px",
                    sm: "54px",
                    md: "68px",
                    lg: "79px",
                  }}
                  lineHeight="0.95"
                  fontWeight="700"
                >
                  GOODWILL
                </Text>

                <Text
                  mt={2}
                  fontSize={{
                    base: "30px",
                    sm: "38px",
                    md: "46px",
                    lg: "50px",
                  }}
                  fontWeight="300"
                >
                  CRESCENT
                </Text>

                <Text
                  mt={5}
                  color="#F4F4F4"
                  lineHeight="1.8"
                  fontSize={{ base: "16px", md: "18px", lg: "15.5px" }}
                  letterSpacing="0.02em"
                  wordSpacing="0.05em"
                >
                  This residential interior is thoughtfully designed to blend
                  warm wood tones, soft neutrals, and natural textures, creating
                  a calm and contemporary home. The space balances
                  functionality with character through custom details, ambient
                  lighting, curated décor, and earthy accents. The result is an
                  inviting environment that feels both refined and lived-in.
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
                  h="42vh"
                  minH="220px"
                  maxH="290px"
                  mt={{ base: 8, sm: 10, md: 0 }}
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
                        {/* Thumbnail Media */}
                        {project.isVideo ? (
                          <chakra.video
                            src={project.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            position="relative"
                            zIndex={0}
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

                        {/* Dark Gradient directly behind title text on card image */}
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

                        {/* Title text content */}
                        <Box
                          position="absolute"
                          left={0}
                          right={0}
                          bottom={0}
                          px={{ base: 3, md: 4 }}
                          pb={{ base: 3, md: 4 }}
                          pointerEvents="none"
                          zIndex={2}
                        >
                          <Text
                            color="rgba(255,255,255,.9)"
                            fontSize={{ base: "10px", md: "11px" }}
                            letterSpacing="0.08em"
                            fontWeight="500"
                            mb="2px"
                            textTransform="uppercase"
                          >
                            {details.title}
                          </Text>
                          <Text
                            color="white"
                            fontSize={{ base: "16px", md: "19px" }}
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
  isVideo?: boolean;
  children: ReactNode;
};

type AccordionItem = { title: string; content: string | string[] };

function DetailLayout({
  title,
  subtitle,
  image,
  imageAlt,
  isVideo,
  children,
  layoutId,
  onClose,
  onBack,
  onNext,
  isFirst,
  isLast,
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

      {/* Grid aligned to flex-end so both columns share the same bottom baseline */}
      <Grid
        templateColumns={{ base: "1fr", md: "360px minmax(0, 1fr)", lg: "440px minmax(0, 1fr)" }}
        gap={{ base: 4, md: 6, lg: 12 }}
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
          {/* Outer container with fixed aspect-ratio enforcing equal height and width across all slides */}
          <Box
            position="relative"
            w="100%"
            maxH={{ base: "32vh", md: "calc(100vh - 120px)" }}
            aspectRatio={{ base: "16 / 10", md: "16 / 10" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="black"
            overflow="hidden"
          >
            <AnimatePresence mode="wait">
              {isVideo ? (
                <motion.video
                  key={image}
                  src={image}
                  autoPlay
                  loop
                  muted
                  playsInline
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
              ) : (
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
              )}
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
                          as="ul"
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