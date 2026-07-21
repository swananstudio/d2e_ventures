import { useRef } from "react";
import { useState } from "react";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "motion/react";
// import { useRef } from "react";
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
    // index: number;
};


const teamMembers: TeamMemberProps[] = [
    {
        name: "Ar. Omkar Keshav Dhende",
        role: "Project & Construction Management Specialist",
        image: omkar_dhende,
        details: [
            { icon: expertiseIcon, title: "Expertise", description: "Bringing over 6 years of expertise in architecture, execution, and construction to create functional, well-crafted, and lasting design solutions." },
            { icon: responsibilitiesIcon, title: "Responsibilities", description: "Leading projects from concept to completion by coordinating design, construction, execution, quality, and timely delivery." },
            { icon: philosophyIcon, title: "Philosophy", description: "Believing that great spaces are built through collaboration, attention to detail, and an unwavering commitment to quality." },
        ],
    },
    {
        name: "Ar. Pranjal Pralhad Patil",
        role: "Project & Construction Management Specialist",
        image: pranjal_patil,
        reverse: true,
        details: [
            { icon: expertiseIcon, title: "Expertise", description: "Experienced in construction management, turnkey execution, and delivering projects with efficiency and precision." },
            { icon: responsibilitiesIcon, title: "Responsibilities", description: "Overseeing site operations, project execution, vendor coordination, and quality control to ensure timely project delivery." },
            { icon: philosophyIcon, title: "Philosophy", description: "I believe design is about creating meaningful experiences through intelligent planning and flawless execution." },
        ],
    },
    {
        name: "Ar. Amaan Asif Bagwan",
        role: "Project & Construction Management Specialist",
        image: aman_bhagwan,
        details: [
            { icon: expertiseIcon, title: "Expertise", description: "Specializing in residential architecture and interior design with a focus on thoughtful planning and functional spaces." },
            { icon: responsibilitiesIcon, title: "Responsibilities", description: "Leading residential design, interior planning, and design coordination to deliver cohesive living environments." },
            { icon: philosophyIcon, title: "Philosophy", description: "Believing every home should reflect its purpose, personality, and the people who live in it." },
        ],
    },
];

const MeetTeam = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });
    const rotateX = useTransform(
        scrollYProgress,
        [0, 0.30],
        [0, 180]
    );

    const imageScale = useTransform(
        scrollYProgress,
        [0, 0.30],
        [0.95, 1]
    );

    const imageOpacity = useTransform(
        scrollYProgress,
        [0.28, 0.35],
        [1, 0]
    );

    const contentY = useTransform(
        scrollYProgress,
        [0.05, 0.25],
        [100, 0]
    );

    const contentOpacity = useTransform(
        scrollYProgress,
        [0.05, 0.25],
        [0, 1]
    );

    const headingY = useTransform(
        scrollYProgress,
        [0.08, 0.20],
        [70, 0]
    );

    const headingOpacity = useTransform(
        scrollYProgress,
        [0.08, 0.20],
        [0, 1]
    );

    const detailY = useTransform(
        scrollYProgress,
        [0.12, 0.30],
        [80, 0]
    );

    const detailOpacity = useTransform(
        scrollYProgress,
        [0.12, 0.30],
        [0, 1]
    );
    // const rotateX = useTransform(
    //     scrollYProgress,
    //     [0, 0.35, 0.65, 1],
    //     [0, 0, 180, 180]
    // );

    // const scale = useTransform(
    //     scrollYProgress,
    //     [0, 0.3],
    //     [0.95, 1]
    // );

    // const opacity = useTransform(
    //     scrollYProgress,
    //     [0.45, 0.55],
    //     [1, 0]
    // );


    const [activeIndex, setActiveIndex] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) {
            setActiveIndex(0);
        } else if (latest < 0.66) {
            setActiveIndex(1);
        } else {
            setActiveIndex(2);
        }
    });
    const member = teamMembers[activeIndex];
    return (
        <Box
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
                h="500vh"
                position="relative"
                mt={{ base: 12, md: 16 }}
            >
                <Flex
                    position="sticky"
                    top={0}
                    h="100vh"
                    align="center"
                    justify="center"
                >
                    <Grid
                        maxW="1300px"
                        w="100%"
                        templateColumns={{
                            base: "1fr",
                            lg: "0.8fr 1.2fr",
                        }}
                        gap={10}
                        alignItems="center"
                    >

                        {/* LEFT IMAGE */}

                        <MotionBox
                            justifySelf="center"
                            w={{ base: "280px", md: "320px", lg: "380px" }}
                            h={{ base: "360px", md: "420px", lg: "500px" }}
                            style={{
                                rotateX,
                                scale: imageScale,
                                opacity: imageOpacity,
                                transformPerspective: 1500,
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <MotionImage
                                key={member.name}
                                style={{
                                    backfaceVisibility: "hidden",
                                }} />
                        </MotionBox>


                        <MotionFlex
                            direction="column"
                            style={{
                                y: contentY,
                                opacity: contentOpacity,
                            }}
                        >

                            <MotionText
                                fontSize={{ base: "28px", md: "34px", lg: "42px" }}
                                style={{
                                    y: headingY,
                                    opacity: headingOpacity,
                                }}
                                fontWeight="600"
                            >
                                {member.name}
                            </MotionText>

                            <Text
                                mt={2}
                                color="#555"
                            >
                                {member.role}
                            </Text>

                            <MotionFlex
                                mt={10}
                                direction="column"
                                gap={6}
                                style={{
                                    y: detailY,
                                    opacity: detailOpacity,
                                }}
                            >
                                {member.details.map((detail) => (

                                    <MotionGrid
                                        key={detail.title}
                                        templateColumns="45px 1fr"
                                        gap={3}
                                    >

                                        <Flex
                                            w="42px"
                                            h="42px"
                                            bg="#0000000D"
                                            borderRadius="8px"
                                            justify="center"
                                            align="center"
                                        >
                                            <Image
                                                src={detail.icon}
                                                w="20px"
                                            />
                                        </Flex>

                                        <Box>

                                            <Text fontWeight="600">
                                                {detail.title}
                                            </Text>

                                            <Text
                                                mt={2}
                                                color="#555"
                                                fontSize="13px"
                                            >
                                                {detail.description}
                                            </Text>

                                        </Box>

                                    </MotionGrid>

                                ))}
                            </MotionFlex>

                        </MotionFlex>

                    </Grid>
                </Flex>
            </Box>

        </Box>
    );
};

export default MeetTeam;