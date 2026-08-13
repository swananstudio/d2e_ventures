import {
    Box,
    Flex,
    Image,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";

import {
    omkar_dhende,
    pranjal_patil,
    aman_bhagwan,

    expertise_white as expertiseIcon,
    responsibilities_white as responsibilitiesIcon,
    philosophy_white as philosophyIcon,
} from "../../assets/assets";

import { useAnimate } from "motion/react";
import { useRef, useState } from "react";


// ============================================================
// TYPES
// ============================================================

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

type Props = {
    member: TeamMemberProps;
};


// ============================================================
// TEAM DATA
// ============================================================

const teamMembers: TeamMemberProps[] = [
    {
        name: "Ar. Omkar Keshav Dhende",
        role: "Project & Business Development Lead",
        image: omkar_dhende,

        details: [
            {
                icon: expertiseIcon,
                title: "Expertise",
                description:
                    "Bringing over 9 years of expertise in architecture, planning, and construction to create functional, well-crafted, and lasting design solutions.",
            },
            {
                icon: responsibilitiesIcon,
                title: "Responsibilities",
                description:
                    "Leading projects from concept to completion by overseeing design coordination, execution, quality, and timely delivery.",
            },
            {
                icon: philosophyIcon,
                title: "Philosophy",
                description:
                    "Believing that great spaces are built through collaboration, attention to detail, and anunwavering commitment to quality.",
            },
        ],
    },

    {
        name: "Ar. Pranjal Prahlad Patil",
        role: "Landscape Design Specialist",
        image: pranjal_patil,
        reverse: true,

        details: [
            {
                icon: expertiseIcon,
                title: "Expertise",
                description:
                    "Experienced in construction management, turnkey execution, and delivering projects with efficiency and precision.",
            },
            {
                icon: responsibilitiesIcon,
                title: "Responsibilities",
                description:
                    "Overseeing site operations, project execution, vendor coordination, and quality control.",
            },
            {
                icon: philosophyIcon,
                title: "Philosophy",
                description:
                    "I believe design is about creating meaning fulexperiences through intelligent planning andtimeless architecture and landscapes.",
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
                    "Specializing in residential architecture andinterior design with a focus on thoughtful planning and functional spaces.",
            },
            {
                icon: responsibilitiesIcon,
                title: "Responsibilities",
                description:
                    "Leading residential design, interior planning, and design coordination to deliver cohesive living environments.",
            },
            {
                icon: philosophyIcon,
                title: "Philosophy",
                description:
                    "Believing every home should reflect its purpose, personality, and the people who live in it",
            },
        ],
    },
];


// ============================================================
// MEET TEAM
// ============================================================

const MeetTeam = () => {
    return (
        <Flex
            w="100%"
            py={{
                base: "40px",
                md: "45px",
                lg: "50px",
                xl: "100px",
            }}
            pb={{
                base: "40px",
                md: "45px",
                lg: "50px",
                xl: "100px",
            }}
            px={{
                base: "6%",
                md: "5%",
                lg: "3%",
                xl: "4%",
            }}
            flexDirection="column"
            justifyContent="center"
            gap={{
                base: "30px",
                md: "38px",
                lg: "45px",
                xl: "50px",
            }}
        >

            {/* ==================================================
                HEADING
            ================================================== */}

            <Text
                textAlign="center"
                fontSize={{
                    base: "28px",
                    sm: "32px",
                    md: "38px",
                    lg: "44px",
                    xl: "48px",
                }}
                fontWeight="700"
                color="#080808"
                className="montserrat"
                lineHeight={1}
            >
                MEET THE TEAM
            </Text>


            {/* ==================================================
                TEAM GRID
            ================================================== */}

            <SimpleGrid
                w="100%"
                columns={{
                    base: 1,
                    md: 2,
                    lg: 3,
                }}
                gap={{
                    base: "24px",
                    sm: "28px",
                    md: "32px",
                    lg: "45px",
                    xl: "70px",
                }}
                alignItems="stretch"
                placeItems="center"
            >

                {teamMembers.map((member) => (
                    <TeamCard
                        key={member.name}
                        member={member}
                    />
                ))}

            </SimpleGrid>

        </Flex>
    );
};

export default MeetTeam;


// ============================================================
// TEAM CARD
// ============================================================

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


    // ========================================================
    // ONLY FOR TABLET + MOBILE
    // ========================================================

    const [isMobileTabletOpen, setIsMobileTabletOpen] =
        useState(false);

    const isMobileTablet = () => {
        return window.innerWidth < 992;
    };


    // ========================================================
    // HOVER START
    //
    // DESKTOP / LAPTOP ORIGINAL
    // ========================================================

    const handleHoverStart = async () => {

        // On tablet/mobile, hover should do nothing.
        if (isMobileTablet()) return;


        // ----------------------------------------------------
        // Move image upward
        // ----------------------------------------------------

        if (imageRef.current) {
            animate(
                imageRef.current,
                {
                    y: "-100%",
                    scale: 1,
                },
                {
                    duration: 1.5,
                    ease: "easeInOut",
                }
            );
        }


        // ----------------------------------------------------
        // Overlay comes from bottom
        // ----------------------------------------------------

        if (overlayRef.current) {
            animate(
                overlayRef.current,
                {
                    y: "0%",
                },
                {
                    duration: 1.5,
                    ease: "easeInOut",
                }
            );
        }


        // ----------------------------------------------------
        // Name
        // ----------------------------------------------------

        if (titleRef.current) {
            await animate(
                titleRef.current,
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
        }


        // ----------------------------------------------------
        // Role
        // ----------------------------------------------------

        if (roleRef.current) {
            await animate(
                roleRef.current,
                {
                    opacity: 1,
                    y: 0,
                },
                {
                    duration: 0.35,
                    ease: "easeOut",
                }
            );
        }


        // ----------------------------------------------------
        // Detail Cards
        // ----------------------------------------------------

        for (
            let index = 0;
            index < detailRefs.current.length;
            index++
        ) {

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


            // ------------------------------------------------
            // Icon animation
            // ------------------------------------------------

            const icon = iconRefs.current[index];

            if (icon) {
                animate(
                    icon,
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


    // ========================================================
    // HOVER END
    //
    // DESKTOP / LAPTOP ORIGINAL
    // ========================================================

    const handleHoverEnd = async () => {

        // On tablet/mobile, hover should do nothing.
        if (isMobileTablet()) return;


        // ----------------------------------------------------
        // Hide details in reverse order
        // ----------------------------------------------------

        for (
            let index = detailRefs.current.length - 1;
            index >= 0;
            index--
        ) {

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


            const icon = iconRefs.current[index];

            if (icon) {
                animate(
                    icon,
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


        // ----------------------------------------------------
        // Hide role
        // ----------------------------------------------------

        if (roleRef.current) {
            await animate(
                roleRef.current,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    duration: 0.2,
                    ease: "easeIn",
                }
            );
        }


        // ----------------------------------------------------
        // Hide name
        // ----------------------------------------------------

        if (titleRef.current) {
            await animate(
                titleRef.current,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    duration: 0.2,
                    ease: "easeIn",
                }
            );
        }


        // ----------------------------------------------------
        // Overlay goes down
        // ----------------------------------------------------

        if (overlayRef.current) {
            animate(
                overlayRef.current,
                {
                    y: "100%",
                },
                {
                    duration: 1.2,
                    ease: "easeInOut",
                }
            );
        }


        // ----------------------------------------------------
        // Image returns
        // ----------------------------------------------------

        if (imageRef.current) {
            animate(
                imageRef.current,
                {
                    y: 0,
                    scale: 1,
                },
                {
                    duration: 1.2,
                    ease: "easeInOut",
                }
            );
        }


        // ----------------------------------------------------
        // Reset icons
        // ----------------------------------------------------

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


    // ========================================================
    // MOBILE / TABLET OPEN
    //
    // Uses the EXACT SAME animation as desktop hover.
    // Only the trigger is different.
    // ========================================================

    const handleMobileTabletOpen = async () => {

        // Prevent this function from doing anything
        // on laptop / desktop.

        if (!isMobileTablet()) return;

        setIsMobileTabletOpen(true);


        // ----------------------------------------------------
        // Move image upward
        // ----------------------------------------------------

        if (imageRef.current) {
            animate(
                imageRef.current,
                {
                    y: "-100%",
                    scale: 1,
                },
                {
                    duration: 1.5,
                    ease: "easeInOut",
                }
            );
        }


        // ----------------------------------------------------
        // Overlay comes from bottom
        // ----------------------------------------------------

        if (overlayRef.current) {
            animate(
                overlayRef.current,
                {
                    y: "0%",
                },
                {
                    duration: 1.5,
                    ease: "easeInOut",
                }
            );
        }


        // ----------------------------------------------------
        // Name
        // ----------------------------------------------------

        if (titleRef.current) {
            await animate(
                titleRef.current,
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
        }


        // ----------------------------------------------------
        // Role
        // ----------------------------------------------------

        if (roleRef.current) {
            await animate(
                roleRef.current,
                {
                    opacity: 1,
                    y: 0,
                },
                {
                    duration: 0.35,
                    ease: "easeOut",
                }
            );
        }


        // ----------------------------------------------------
        // Detail Cards
        // ----------------------------------------------------

        for (
            let index = 0;
            index < detailRefs.current.length;
            index++
        ) {

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


            const icon = iconRefs.current[index];

            if (icon) {
                animate(
                    icon,
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


    // ========================================================
    // MOBILE / TABLET CLOSE
    // ========================================================

    const handleMobileTabletClose = async () => {

        if (!isMobileTablet()) return;


        // ----------------------------------------------------
        // Hide details in reverse order
        // ----------------------------------------------------

        for (
            let index = detailRefs.current.length - 1;
            index >= 0;
            index--
        ) {

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


            const icon = iconRefs.current[index];

            if (icon) {
                animate(
                    icon,
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


        // ----------------------------------------------------
        // Hide role
        // ----------------------------------------------------

        if (roleRef.current) {
            await animate(
                roleRef.current,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    duration: 0.2,
                    ease: "easeIn",
                }
            );
        }


        // ----------------------------------------------------
        // Hide name
        // ----------------------------------------------------

        if (titleRef.current) {
            await animate(
                titleRef.current,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    duration: 0.2,
                    ease: "easeIn",
                }
            );
        }


        // ----------------------------------------------------
        // Overlay goes down
        // ----------------------------------------------------

        if (overlayRef.current) {
            animate(
                overlayRef.current,
                {
                    y: "100%",
                },
                {
                    duration: 1.2,
                    ease: "easeInOut",
                }
            );
        }


        // ----------------------------------------------------
        // Image returns
        // ----------------------------------------------------

        if (imageRef.current) {
            animate(
                imageRef.current,
                {
                    y: 0,
                    scale: 1,
                },
                {
                    duration: 1.2,
                    ease: "easeInOut",
                }
            );
        }


        // ----------------------------------------------------
        // Reset icons
        // ----------------------------------------------------

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


        setIsMobileTabletOpen(false);
    };


    // ========================================================
    // MOBILE / TABLET CLICK
    // ========================================================

    const handleCardClick = () => {

        // Desktop / laptop:
        // Do absolutely nothing.
        if (!isMobileTablet()) return;


        if (isMobileTabletOpen) {
            handleMobileTabletClose();
        } else {
            handleMobileTabletOpen();
        }
    };


    // ========================================================
    // CARD
    // ========================================================

    return (
        <Box
            ref={scope}

            w="100%"

            /*
             * DEFAULT / MOBILE
             */
            h={{
                base: "520px",
                sm: "560px",
                md: "500px",
                lg: "550px",
                xl: "620px",
            }}

            maxW={{
                base: "100%",
                md: "100%",
                lg: "100%",
                xl: "100%",
            }}

            overflow="hidden"
            position="relative"
            cursor="pointer"

            // Desktop / laptop
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}

            // Tablet / mobile
            onClick={handleCardClick}

            bg="rgba(8,8,8,.92)"
            borderRadius="20px"

            /*
             * ================================================
             * HEIGHT-BASED RESPONSIVENESS
             * ================================================
             *
             * UNCHANGED FROM YOUR ORIGINAL CODE
             */

            css={{

                // --------------------------------------------
                // Short desktop / laptop
                // --------------------------------------------

                "@media screen and (min-width: 992px) and (max-height: 800px)": {
                    height: "500px",
                },

                // --------------------------------------------
                // Medium height desktop
                // --------------------------------------------

                "@media screen and (min-width: 992px) and (min-height: 801px) and (max-height: 950px)": {
                    height: "550px",
                },

                // --------------------------------------------
                // Large / tall desktop
                // --------------------------------------------

                "@media screen and (min-width: 1280px) and (min-height: 951px)": {
                    height: "620px",
                },

                // --------------------------------------------
                // Short tablet
                // --------------------------------------------

                "@media screen and (min-width: 768px) and (max-width: 991px) and (max-height: 800px)": {
                    height: "460px",
                },

                // --------------------------------------------
                // Normal tablet
                // --------------------------------------------

                "@media screen and (min-width: 768px) and (max-width: 991px) and (min-height: 801px)": {
                    height: "520px",
                },
            }}
        >

            {/* =================================================
                IMAGE
            ================================================= */}

            <Image
                ref={imageRef}
                src={member.image}
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition="top"
                display="block"
                borderRadius="20px"
            />


            {/* =================================================
                TAP TO VIEW INDICATOR
                ONLY MOBILE + TABLET
                ================================================= */}

            {!isMobileTabletOpen && (
                <Box
                    display={{
                        base: "block",
                        md: "block",
                        lg: "none",
                    }}

                    position="absolute"

                    bottom={{
                        base: "18px",
                        md: "20px",
                    }}

                    left="50%"

                    transform="translateX(-50%)"

                    zIndex={5}

                    pointerEvents="none"
                >

                    <Flex
                        align="center"
                        gap="8px"

                        px={{
                            base: "14px",
                            md: "16px",
                        }}

                        py={{
                            base: "8px",
                            md: "9px",
                        }}

                        borderRadius="full"

                        bg="rgba(0,0,0,0.65)"

                        border="1px solid rgba(255,255,255,0.25)"

                        backdropFilter="blur(8px)"

                        whiteSpace="nowrap"
                    >

                        <Box
                            w="8px"
                            h="8px"
                            borderRadius="full"
                            bg="#C8A96B"

                            css={{
                                animation:
                                    "teamCardPulse 1.5s ease-in-out infinite",

                                "@keyframes teamCardPulse": {

                                    "0%, 100%": {
                                        transform: "scale(1)",
                                        opacity: 1,
                                    },

                                    "50%": {
                                        transform: "scale(1.5)",
                                        opacity: 0.5,
                                    },
                                },
                            }}
                        />

                        <Text
                            color="white"
                            fontSize={{
                                base: "10px",
                                md: "11px",
                            }}
                            fontWeight="500"
                        >
                            Tap to view details
                        </Text>

                    </Flex>

                </Box>
            )}


            {/* =================================================
                OVERLAY
            ================================================= */}

            <Box
                ref={overlayRef}

                position="absolute"
                inset={0}

                w="100%"
                h="100%"

                bg="rgba(8,8,8,.92)"
                color="white"

                px={{
                    base: "18px",
                    sm: "22px",
                    md: "24px",
                    lg: "28px",
                    xl: "32px",
                }}

                py={{
                    base: "24px",
                    sm: "28px",
                    md: "28px",
                    lg: "32px",
                    xl: "40px",
                }}

                display="flex"
                flexDirection="column"
                justifyContent="flex-start"

                transform="translateY(100%)"

                borderRadius="20px"

                overflow="hidden"

                css={{

                    /*
                     * Desktop / laptop
                     * UNCHANGED
                     */

                    "@media screen and (min-width: 992px) and (max-height: 800px)": {
                        padding: "26px 24px",
                    },

                    "@media screen and (min-width: 992px) and (min-height: 801px) and (max-height: 950px)": {
                        padding: "30px 28px",
                    },
                }}
            >

                {/* =================================================
                    NAME
                ================================================= */}

                <Text
                    ref={titleRef}

                    fontSize={{
                        base: "21px",
                        sm: "23px",
                        md: "24px",
                        lg: "29px",
                        xl: "32px",
                    }}

                    lineHeight="1.2"

                    fontWeight="700"

                    opacity={0}

                    transform="translateY(30px)"

                    m={0}

                    css={{

                        /*
                         * Desktop / laptop
                         * UNCHANGED
                         */

                        "@media screen and (min-width: 992px) and (max-height: 800px)": {
                            fontSize: "23px",
                        },
                    }}
                >
                    {member.name}
                </Text>


                {/* =================================================
                    ROLE
                ================================================= */}

                <Text
                    ref={roleRef}

                    mt="8px"

                    mb={{
                        base: "22px",
                        sm: "26px",
                        md: "28px",
                        lg: "32px",
                        xl: "40px",
                    }}

                    fontSize={{
                        base: "11px",
                        sm: "12px",
                        md: "12px",
                        lg: "13px",
                        xl: "15px",
                    }}

                    lineHeight="1.4"

                    color="#C8A96B"

                    fontWeight="500"

                    opacity={0}

                    transform="translateY(30px)"

                    css={{

                        /*
                         * Desktop / laptop
                         * UNCHANGED
                         */

                        "@media screen and (min-width: 992px) and (max-height: 800px)": {
                            marginBottom: "24px",
                            fontSize: "12px",
                        },
                    }}
                >
                    {member.role}
                </Text>


                {/* =================================================
                    DETAILS
                ================================================= */}

                <Flex
                    direction="column"

                    gap={{
                        base: "18px",
                        sm: "21px",
                        md: "22px",
                        lg: "25px",
                        xl: "32px",
                    }}

                    mt={{
                        base: "0px",
                        lg: "10px",
                        xl: "0px",
                    }}

                    css={{

                        /*
                         * Desktop / laptop
                         * UNCHANGED
                         */

                        "@media screen and (min-width: 992px) and (max-height: 800px)": {
                            gap: "18px",
                        },

                        "@media screen and (min-width: 992px) and (min-height: 801px) and (max-height: 950px)": {
                            gap: "22px",
                        },
                    }}
                >

                    {member.details.map((item, index) => (

                        <Box
                            key={item.title}

                            ref={(el: HTMLDivElement | null) => {
                                detailRefs.current[index] = el;
                            }}

                            display="flex"

                            gap={{
                                base: "10px",
                                sm: "12px",
                                md: "13px",
                                lg: "16px",
                                xl: "20px",
                            }}

                            alignItems="flex-start"

                            opacity={0}

                            transform="translateY(35px)"
                        >

                            {/* =================================================
                                ICON
                            ================================================= */}

                            <Flex
                                w={{
                                    base: "36px",
                                    sm: "40px",
                                    md: "42px",
                                    lg: "46px",
                                    xl: "52px",
                                }}

                                h={{
                                    base: "36px",
                                    sm: "40px",
                                    md: "42px",
                                    lg: "46px",
                                    xl: "52px",
                                }}

                                minW={{
                                    base: "36px",
                                    sm: "40px",
                                    md: "42px",
                                    lg: "46px",
                                    xl: "52px",
                                }}

                                borderRadius="7.5px"

                                bg="#FFFFFF0D"

                                justify="center"

                                align="center"

                                border="0.75px solid #FFFFFF1A"
                            >

                                <Image
                                    ref={(el) => {
                                        iconRefs.current[index] = el;
                                    }}

                                    src={item.icon}

                                    w={{
                                        base: "16px",
                                        sm: "18px",
                                        md: "19px",
                                        lg: "21px",
                                        xl: "24px",
                                    }}

                                    h={{
                                        base: "16px",
                                        sm: "18px",
                                        md: "19px",
                                        lg: "21px",
                                        xl: "24px",
                                    }}

                                    objectFit="contain"
                                />

                            </Flex>


                            {/* =================================================
                                TEXT
                            ================================================= */}

                            <Box
                                flex="1"
                                minW={0}
                            >

                                <Text
                                    fontSize={{
                                        base: "11px",
                                        sm: "12px",
                                        md: "12px",
                                        lg: "13px",
                                        xl: "15px",
                                    }}

                                    fontWeight="700"

                                    mb={{
                                        base: "5px",
                                        md: "6px",
                                        xl: "8px",
                                    }}

                                    lineHeight="1.3"
                                >
                                    {item.title}
                                </Text>


                                <Text
                                    fontSize={{
                                        base: "9.5px",
                                        sm: "10px",
                                        md: "10.5px",
                                        lg: "11px",
                                        xl: "12px",
                                    }}

                                    lineHeight={{
                                        base: "1.45",
                                        sm: "1.5",
                                        md: "1.55",
                                        lg: "1.65",
                                        xl: "1.8",
                                    }}

                                    color="rgba(255,255,255,.75)"
                                >
                                    {item.description}
                                </Text>

                            </Box>

                        </Box>

                    ))}

                </Flex>

            </Box>

        </Box>
    );
};