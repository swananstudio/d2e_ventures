import { useRef } from "react";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import {
    aman_bhagwan,
    omkar_dhende,
    pranjal_patil,
    expertise as expertiseIcon,
    responsibilities as responsibilitiesIcon,
    philosophy as philosophyIcon,
} from "../../assets/assets";

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);
const MotionText = motion.create(Text);
const MotionGrid = motion.create(Grid);
const MotionImage = motion.create(Image);

type Detail = {
    icon: string;
    title: string;
    description: string;
};

type TeamMemberProps = {
    name: string;
    role: string;
    image: string;
    reverse?: boolean;
    details: Detail[];
};

const teamMembers: TeamMemberProps[] = [
    {
        name: "Ar. Omkar Keshav Dhende",
        role: "Projects & Business Development Lead",
        image: omkar_dhende,
        details: [
            {
                icon: expertiseIcon,
                title: "Expertise",
                description:
                    "Bringing over eight years of industry experience in project management, construction execution, and business development, with a focus on delivering projects efficiently while upholding the highest standards of quality.",
            },
            {
                icon: responsibilitiesIcon,
                title: "Responsibilities",
                description:
                    "Leading project execution from planning to completion, overseeing client coordination, multidisciplinary team collaboration, quality control, and strategic business development to ensure seamless project delivery.",
            },
            {
                icon: philosophyIcon,
                title: "Philosophy",
                description:
                    "Successful projects are driven by thoughtful planning, transparent communication, and uncompromising attention to quality.",
            },
        ],
    },
    {
        name: "Ar. Pranjal Prahlad Patil",
        role: "Design Head | Landscape Design Specialist",
        image: pranjal_patil,
        reverse: true,
        details: [
            {
                icon: expertiseIcon,
                title: "Expertise",
                description:
                    "Specializes in landscape design and construction-ready documentation, transforming concepts into detailed, buildable solutions that seamlessly blend creativity with technical precision.",
            },
            {
                icon: responsibilitiesIcon,
                title: "Responsibilities",
                description:
                    "Leading the design process through detailed drawings, GFC (Good for Construction) documentation, and design coordination to ensure every project is executed with accuracy and intent.",
            },
            {
                icon: philosophyIcon,
                title: "Philosophy",
                description:
                    "Exceptional landscapes are created when creative vision is supported by precision, functionality, and meticulous attention to detail.",
            },
        ],
    },
    {
        name: "Ar. Amaan Asif Bagwan",
        role: "Interior Design & Execution Lead",
        image: aman_bhagwan,
        details: [
            {
                icon: expertiseIcon,
                title: "Expertise",
                description:
                    "Specializes in interior design and on-site execution, creating functional, refined spaces while ensuring every design is translated seamlessly into reality.",
            },
            {
                icon: responsibilitiesIcon,
                title: "Responsibilities",
                description:
                    "Managing interior planning, material selection, execution coordination, and site supervision to deliver cohesive spaces with exceptional attention to detail and craftsmanship.",
            },
            {
                icon: philosophyIcon,
                title: "Philosophy",
                description:
                    "Great interiors are defined by thoughtful design, purposeful functionality, and flawless execution.",
            },
        ],
    },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// WAAPI/native scroll-timeline offsets must fall strictly within [0, 1] and
// be monotonically increasing, so raw segment math has to be sanitized
// before being handed to useTransform as an inputRange.
const buildInputRange = (values: number[]) => {
    const clamped = values.map(clamp01);
    for (let i = 1; i < clamped.length; i++) {
        if (clamped[i] <= clamped[i - 1]) {
            clamped[i] = Math.min(1, clamped[i - 1] + 0.0001);
        }
    }
    return clamped;
};

const useCardTransforms = (
    scrollYProgress: MotionValue<number>,
    index: number,
    total: number,
    reverse?: boolean
) => {
    const segment = 1 / total;
    const segmentStart = index * segment;
    const segmentEnd = segmentStart + segment;
    const overlap = segment * 0.35;

    const inputRange = buildInputRange([
        segmentStart - overlap,
        segmentStart + overlap,
        segmentEnd - overlap,
        segmentEnd + overlap,
    ]);

    const isFirst = index === 0;

    const opacity = useTransform(
        scrollYProgress,
        inputRange,
        isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0]
    );

    const scale = useTransform(
        scrollYProgress,
        inputRange,
        isFirst ? [1, 1, 1, 0.92] : [0.92, 1, 1, 0.92]
    );

    const y = useTransform(
        scrollYProgress,
        inputRange,
        isFirst ? [0, 0, 0, 80] : [80, 0, 0, 80]
    );

    const x = useTransform(
        scrollYProgress,
        inputRange,
        isFirst
            ? [0, 0, 0, reverse ? 50 : -50]
            : reverse
                ? [-50, 0, 0, 50]
                : [50, 0, 0, -50]
    );

    const rotateX = useTransform(
        scrollYProgress,
        inputRange,
        isFirst ? [0, 0, 0, -12] : [12, 0, 0, -12]
    );

    const blurAmount = useTransform(
        scrollYProgress,
        inputRange,
        isFirst ? [0, 0, 0, 10] : [10, 0, 0, 10]
    );
    const filter = useTransform(blurAmount, (value) => `blur(${value}px)`);
    const zIndex = useTransform(scrollYProgress, inputRange, [0, total, total, 0]);

    return { opacity, scale, y, x, rotateX, filter, zIndex };
};

type TeamMemberCardProps = {
    member: TeamMemberProps;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
};

const TeamMemberCard = ({ member, index, total, scrollYProgress }: TeamMemberCardProps) => {
    const { opacity, scale, y, x, rotateX, filter, zIndex } = useCardTransforms(
        scrollYProgress,
        index,
        total,
        member.reverse
    );

    return (
        <MotionGrid
          
            position="absolute"
            inset={0}
            templateColumns={{
                base: "1fr",
                lg: "0.8fr 1.2fr",
            }}
            gap={10}
            alignItems="center"
            style={{
                opacity,
                scale,
                y,
                x,
                rotateX,
                filter,
                zIndex,
                transformPerspective: 1500,
                transformStyle: "preserve-3d",
            }}
        >
            <MotionBox
                justifySelf="center"
                w={{ base: "280px", md: "320px", lg: "380px" }}
                h={{ base: "360px", md: "420px", lg: "500px" }}
            >
                <MotionImage
                    src={member.image}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    borderRadius="16px"
                    style={{
                        backfaceVisibility: "hidden",
                    }}
                />
            </MotionBox>

            <MotionFlex direction="column">
                <MotionText
                    fontSize={{ base: "28px", md: "34px", lg: "42px" }}
                    fontWeight="600"
                >
                    {member.name}
                </MotionText>

                <Text mt={2} color="#555">
                    {member.role}
                </Text>

                <Flex mt={10} direction="column" gap={6}>
                    {member.details.map((detail) => (
                        <Grid key={detail.title} templateColumns="45px 1fr" gap={3}>
                            <Flex
                                w="42px"
                                h="42px"
                                bg="#0000000D"
                                borderRadius="8px"
                                justify="center"
                                align="center"
                            >
                                <Image src={detail.icon} w="20px" />
                            </Flex>

                            <Box>
                                <Text fontWeight="600">{detail.title}</Text>
                                <Text mt={2} color="#555" fontSize="13px">
                                    {detail.description}
                                </Text>
                            </Box>
                        </Grid>
                    ))}
                </Flex>
            </MotionFlex>
        </MotionGrid>
    );
};

const MeetTeam = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    return (
        <Box
        position={'relative'}
            w="100%"
            bg="#FAF9F6"
            px={{ base: "5%", md: "8%", lg: "10%" }}
            py={{ base: "60px", md: "80px", lg: "50px" }}
        >
            <Text
                textAlign="center"
                fontSize={{ base: "30px", md: "40px", lg: "48px" }}
                fontWeight="900"
                color="#080808"
                className="michroma_font"
            >
                MEET THE TEAM
            </Text>

            <Box
                ref={sectionRef}
                h={`${teamMembers.length * 200}vh`}
                position="relative"
                mt={{ base: 12, md: 16 }}
            >
                <Flex
                    position="sticky"
                    top={0}
                    h="100vh"
                    w="100%"
                    justify="center"
                    align="center"
                    overflow="hidden"
                >
                    <Grid
                        maxW="1300px"
                        w="100%"
                        position="relative"
                        minH={{ base: "560px", md: "460px", lg: "520px" }}
                    >
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard
                                key={member.name}
                                member={member}
                                index={index}
                                total={teamMembers.length}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </Grid>
                </Flex>
            </Box>
        </Box>
    );
};

export default MeetTeam;