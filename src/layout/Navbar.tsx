import {
    Drawer,
    Portal,
    CloseButton,
    chakra,
} from "@chakra-ui/react";
import { logo } from "../assets/assets";
import {
    Flex,
    Image,
    Text,
    IconButton,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { motion } from "motion/react"

const Navbar = () => {
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const MotionFlex = chakra(motion(Flex))
    const routes = [
        { label: "HOME", path: "/" },
        { label: "PORTFOLIO", path: "/portfolio" },
        { label: "SERVICES", path: "/services" },
        { label: "ABOUT US", path: "/about-us" },
        { label: "CONTACT US", path: "/contact-us" },
    ];
    const navigate = useNavigate()
    const isHomePage = location.pathname === "/";
    return (
        <>
            <MotionFlex
                initial={
                    isHomePage
                        ? {
                            y: -100,
                            opacity: 0.5,
                        }
                        : false
                }
                animate={
                    isHomePage
                        ? {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 1,
                                ease: "easeInOut",
                            },
                        }
                        : {}
                }
                exit={
                    isHomePage
                        ? {
                            y: -100,
                            opacity: 0,
                            transition: {
                                duration: 0.8,
                                ease: "easeInOut",
                            },
                        }
                        : {}
                }


                w="100%"
                h={{ base: "80px", lg: "100px" }}
                px={{
                    base: "6%",
                    md: "5%",
                    lg: "3%",
                }}
                alignItems="center"
                justifyContent="space-between"
            >
                {/* Logo */}

                <Flex alignItems="center">
                    <Image
                        src={logo}
                        h={{
                            base: "42px",
                            lg: "60px",
                        }}
                        onClick={() => navigate('/')}
                    />
                </Flex>

                {/* Desktop Menu */}

                <Flex
                    display={{
                        base: "none",
                        lg: "flex",
                    }}
                    alignItems="center"
                    gap={8}
                >
                    {routes.map((route) => (
                        <Link
                            key={route.path}
                            to={route.path}
                        >
                            <Text
                                px={2}
                                pb={1}
                                color={
                                    location.pathname === route.path
                                        ? "#C8A96B"
                                        : "#FFFFFF"
                                }
                                fontWeight={
                                    location.pathname === route.path
                                        ? "500"
                                        : "400"
                                }
                                borderBottom={
                                    location.pathname === route.path
                                        ? "2px solid #C8A96B"
                                        : "none"
                                }
                                transition=".25s"
                                _hover={{
                                    color: "#C8A96B",
                                }}
                            >
                                {route.label}
                            </Text>
                        </Link>
                    ))}
                </Flex>

                {/* Mobile Menu Button */}

                <IconButton
                    display={{
                        base: "flex",
                        lg: "none",
                    }}
                    aria-label="Open Menu"
                    variant="ghost"
                    color="#C8A96B"
                    fontSize="40px"
                    // size={'lg'}
                    size='2xl'
                    h='max-content'
                    w='max-content'
                    justifyContent={'flex-end'}
                    m={0}
                    // p={0}
                    p={' 0px 0px 20px 0px'}
                    alignItems={'flex-end'}

                    onClick={() => setOpen(true)}
                    _hover={{ bgColor: 'transparent' }}
                >
                    <CgMenuRightAlt />
                </IconButton>
            </MotionFlex >

            {/* Drawer */}

            < Drawer.Root
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
                placement="top"
            >
                <Portal>
                    <Drawer.Backdrop />

                    <Drawer.Positioner>
                        <Drawer.Content
                            bg="#111"
                            color="white"
                        >
                            <Drawer.Header>
                                <Flex
                                    justify="space-between"
                                    align="center"
                                >
                                    <Image
                                        src={logo}
                                        h="45px"
                                    />

                                    <Drawer.CloseTrigger asChild>
                                        <CloseButton
                                            color="white"
                                        />
                                    </Drawer.CloseTrigger>
                                </Flex>
                            </Drawer.Header>

                            <Drawer.Body>
                                <Flex
                                    direction="column"
                                    gap={6}
                                    mt={8}
                                >
                                    {routes.map((route) => (
                                        <Link
                                            key={route.path}
                                            to={route.path}
                                            onClick={() =>
                                                setOpen(false)
                                            }
                                        >
                                            <Text
                                                fontSize="18px"
                                                fontWeight={
                                                    location.pathname ===
                                                        route.path
                                                        ? "600"
                                                        : "400"
                                                }
                                                color={
                                                    location.pathname ===
                                                        route.path
                                                        ? "#C8A96B"
                                                        : "#FFFFFF"
                                                }
                                            >
                                                {route.label}
                                            </Text>
                                        </Link>
                                    ))}
                                </Flex>
                            </Drawer.Body>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root >
        </>
    );
};

export default Navbar;