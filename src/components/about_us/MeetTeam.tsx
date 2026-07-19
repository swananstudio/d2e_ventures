import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

import {
    aman_bhagwan,
    omkar_dhende,
    pranjal_patil,
    expertise as expertiseIcon,
    responsibilities as responsibilitiesIcon,
    philosophy as philosophyIcon,
} from "../../assets/assets";

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
    index: number;
};

const TeamMember = ({
    name,
    role,
    image,
    reverse = false,
    details,
    index,
}: TeamMemberProps) => {
    return (
        <Grid
            templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }}
            gap={{ base: 6, md: 8, lg: 10 }}
            alignItems="center"
        >
            <Flex
                justifyContent={{
                    base: "center",
                    lg: index % 2 === 0 ? "flex-start" : "flex-end",
                }}
                order={{ base: 1, lg: reverse ? 2 : 1 }}
            >
                <Image
                    src={image}
                    w={{ base: "240px", sm: "280px", md: "320px", lg: "340px" }}
                    h={{ base: "300px", sm: "350px", md: "400px", lg: "420px" }}
                    objectFit="cover"
                    borderRadius="16px"
                />
            </Flex>

            <Flex
                flexDirection="column"
                order={{ base: 2, lg: reverse ? 1 : 2 }}
            >
                <Text
                    fontSize={{ base: "25px", md: "30px", lg: "34px" }}
                    fontWeight="600"
                    lineHeight="1.2"
                >
                    {name}
                </Text>

                <Text mt={1} fontSize={{ base: "12px", md: "13px" }} color="#555">
                    {role}
                </Text>

                <Flex mt={{ base: 7, md: 10 }} flexDirection="column" gap={{ base: 4, md: 6 }}>
                    {details.map((detail) => (
                        <Grid
                            key={detail.title}
                            templateColumns="45px 1fr"
                            gap={3}
                            alignItems="center"
                            borderLeft={index % 2 === 0 ? '2px solid #0000001A' : "none"}
                            borderRight={index % 2 === 0 ? 'none' : "2px solid #0000001A"}
                            pr={index % 2 === 0 ? 'none' : "10%"}
                            pl={index % 2 === 0 ? '10%' : "none "}
                        >
                            <Flex
                                w="42px"
                                h="42px"
                                bg="#0000000D"
                                borderRadius="8px"
                                justifyContent="center"
                                alignItems="center"
                                flexShrink={0}
                            >
                                <Image src={detail.icon} w="20px" h="20px" objectFit={'contain'} />
                            </Flex>

                            <Box>
                                <Text fontSize="14px" fontWeight="600">
                                    {detail.title}
                                </Text>

                                <Text
                                    mt={2}
                                    fontSize={{ base: "12px", md: "13px" }}
                                    lineHeight="1.5"
                                    color="#555"
                                    maxW="500px"
                                >
                                    {detail.description}
                                </Text>
                            </Box>
                        </Grid>
                    ))}
                </Flex>
            </Flex>
        </Grid >
    );
};

const teamMembers: Omit<TeamMemberProps, "index">[] = [
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

            <Flex
                maxW="1300px"
                mx="auto"
                mt={{ base: 12, md: 16 }}
                flexDirection="column"
                gap={{ base: 16, md: 20, lg: 24 }}
            >
                {teamMembers.map((member, index) => (
                    <TeamMember
                        key={member.name}
                        {...member}
                        index={index}
                    />
                ))}
            </Flex>
        </Box>
    );
};

export default MeetTeam;
