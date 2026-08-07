import {
    Box,
    Flex,
} from "@chakra-ui/react";


import {
    omkar_dhende,
    pranjal_patil,
    aman_bhagwan,

    expertise as expertiseIcon,
    responsibilities as responsibilitiesIcon,
    philosophy as philosophyIcon,
} from "../../assets/assets";

import {
    // Image,
    Text,
} from "@chakra-ui/react";

import { useAnimate } from "motion/react";
import { useRef } from "react";

export interface TeamDetail {
    icon: string;
    title: string;
    description: string;
}

export interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
    reverse?: boolean;
    details: TeamDetail[];
}

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
                    "Bringing over eight years of industry experience in project management, construction execution, and business development.",
            },
            {
                icon: responsibilitiesIcon,
                title: "Responsibilities",
                description:
                    "Leading project execution from planning to completion.",
            },
            {
                icon: philosophyIcon,
                title: "Philosophy",
                description:
                    "Successful projects are driven by thoughtful planning.",
            },
        ],
    },

    {
        name: "Ar. Pranjal Prahlad Patil",
        role: "Landscape Design Specialist",
        image: pranjal_patil,
        details: [
            {
                icon: expertiseIcon,
                title: "Expertise",
                description:
                    "Landscape design and construction-ready documentation.",
            },
            {
                icon: responsibilitiesIcon,
                title: "Responsibilities",
                description:
                    "Leading the design process and GFC documentation.",
            },
            {
                icon: philosophyIcon,
                title: "Philosophy",
                description:
                    "Creative vision supported by technical precision.",
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
                    "Interior design and execution.",
            },
            {
                icon: responsibilitiesIcon,
                title: "Responsibilities",
                description:
                    "Material selection and site supervision.",
            },
            {
                icon: philosophyIcon,
                title: "Philosophy",
                description:
                    "Purposeful functionality and flawless execution.",
            },
        ],
    },
];

const MeetTeam = () => {
    return (
        <Flex
            py={'50px'}
            px={{
                base: "6%",
                lg: "4%",
            }}
            w='100%'
            flexDirection={'column'}
            justifyContent={'center'}
            gapY={'50px'}
        >
            <Text

                textAlign="center"
                fontSize={{ base: "30px", md: "40px", lg: "48px" }}
                fontWeight="800"
                color="#080808"
                className="michroma_font"
                lineHeight={1}
            >
                MEET THE TEAM
            </Text>

            <Flex
                wrap="wrap"
                gap={'50px'}
                justify="center"
            >
                {teamMembers.map((member) => (
                    <TeamCard
                        key={member.name}
                        member={member}
                    />
                ))}
            </Flex>
        </Flex>
    );
};

export default MeetTeam;





type Props = {
    member: TeamMemberProps;
};

const TeamCard = ({
    member,
}: Props) => {

    const [scope, animate] = useAnimate();

    const imageRef = useRef<HTMLImageElement>(null);

    const overlayRef = useRef<HTMLDivElement>(null);

    const titleRef = useRef<HTMLParagraphElement>(null);

    const roleRef = useRef<HTMLParagraphElement>(null);

    const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

    const iconRefs = useRef<(HTMLImageElement | null)[]>([]);

    const handleHoverStart = async () => {

        // Move image upward
        animate(
            imageRef.current!,
            {
                y: "-100%",
                scale: 1,
            },
            {
                duration: 1.5,
                ease: "easeInOut",
            }
        );

        // Overlay comes from bottom
        animate(
            overlayRef.current!,
            {
                y: "0%",
            },
            {
                duration: 1.5,
                ease: "easeInOut",
            }
        );

        // Name
        await animate(
            titleRef.current!,
            {
                opacity: 1,
                y: 0,
            },
            {
                duration: 0.45,
                delay: 0.75,
                ease: "easeOut",
            }
        );

        // Role
        await animate(
            roleRef.current!,
            {
                opacity: 1,
                y: 0,
            },
            {
                duration: 0.35,
                ease: "easeOut",
            }
        );

        // Detail Cards
        for (let index = 0; index < detailRefs.current.length; index++) {

            const detail = detailRefs.current[index];

            if (!detail) continue;

            await animate(
                detail,
                {
                    opacity: 1,
                    y: 0,
                },
                {
                    duration: 0.35,
                    ease: "easeOut",
                }
            );

            // Icon animation
            if (iconRefs.current[index]) {

                animate(
                    iconRefs.current[index]!,
                    {
                        scale: [0.4, 1.25, 1],
                        rotate: [-25, 10, 0],
                    },
                    {
                        duration: 0.45,
                        ease: "easeOut",
                    }
                );

            }
        }

    };

    const handleHoverEnd = async () => {

        // Hide details in reverse order
        for (let index = detailRefs.current.length - 1; index >= 0; index--) {

            const detail = detailRefs.current[index];

            if (!detail) continue;

            await animate(
                detail,
                {
                    opacity: 0,
                    y: 35,
                },
                {
                    duration: 0.18,
                    ease: "easeIn",
                }
            );

            if (iconRefs.current[index]) {
                animate(
                    iconRefs.current[index]!,
                    {
                        scale: 0.5,
                        rotate: -20,
                    },
                    {
                        duration: 0.2,
                        ease: "easeIn",
                    }
                );
            }
        }

        // Hide role
        await animate(
            roleRef.current!,
            {
                opacity: 0,
                y: 30,
            },
            {
                duration: 0.2,
                ease: "easeIn",
            }
        );

        // Hide name
        await animate(
            titleRef.current!,
            {
                opacity: 0,
                y: 30,
            },
            {
                duration: 0.2,
                ease: "easeIn",
            }
        );

        // Overlay goes down
        animate(
            overlayRef.current!,
            {
                y: "100%",
            },
            {
                duration: 1.2,
                ease: "easeInOut",
            }
        );

        // Image returns
        animate(
            imageRef.current!,
            {
                y: 0,
                scale: 1,
            },
            {
                duration: 1.2,
                ease: "easeInOut",
            }
        );

        // Reset icon transform so next hover starts correctly
        iconRefs.current.forEach((icon) => {
            if (!icon) return;

            animate(
                icon,
                {
                    scale: 1,
                    rotate: 0,
                },
                {
                    duration: 0,
                }
            );
        });
    };
    return (
        <Box
            ref={scope}
            w={{
                base: "100%",
                lg: "30%",
            }}
            h="620px"
            overflow="hidden"
            position="relative"
            cursor="pointer"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            bg="gray.100"
        >
            {/* IMAGE */}

            <img
                ref={imageRef}
                src={member.image}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                }}
            />

            {/* OVERLAY */}

            <div
                ref={overlayRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(8,8,8,.92)",
                    color: "white",
                    padding: "40px 32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    transform: "translateY(100%)",
                }}
            >
                {/* NAME */}

                <p
                    ref={titleRef}
                    style={{
                        fontSize: "30px",
                        fontWeight: 700,
                        opacity: 0,
                        transform: "translateY(30px)",
                        margin: 0,
                    }}
                >
                    {member.name}
                </p>

                {/* ROLE */}

                <p
                    ref={roleRef}
                    style={{
                        marginTop: "8px",
                        marginBottom: "40px",
                        color: "#C8A96B",
                        fontWeight: 500,
                        opacity: 0,
                        transform: "translateY(30px)",
                    }}
                >
                    {member.role}
                </p>

                <Flex
                    direction="column"
                    gap={8}
                >
                    {member.details.map((item, index) => (
                        <div
                            key={item.title}
                            ref={(el) => {
                                detailRefs.current[index] = el;
                            }}
                            style={{
                                display: "flex",
                                gap: "20px",
                                alignItems: "flex-start",
                                opacity: 0,
                                transform: "translateY(35px)",
                            }}
                        >
                            <Flex
                                w="52px"
                                h="52px"
                                minW="52px"
                                bg="#fff"
                                justify="center"
                                align="center"
                            >
                                <img
                                    ref={(el) => {
                                        iconRefs.current[index] = el;
                                    }}
                                    src={item.icon}
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        objectFit: "contain",
                                    }}
                                />
                            </Flex>

                            <Box>
                                <Text
                                    fontSize="18px"
                                    fontWeight="700"
                                    mb={2}
                                >
                                    {item.title}
                                </Text>

                                <Text
                                    fontSize="14px"
                                    lineHeight="1.8"
                                    color="rgba(255,255,255,.75)"
                                >
                                    {item.description}
                                </Text>
                            </Box>
                        </div>
                    ))}
                </Flex>
            </div>
        </Box>
    );
};